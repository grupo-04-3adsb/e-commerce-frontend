import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  clearCart,
  setCart,
  removeItemFromCart,
  setIdCarrinho,
} from "../store/slices/Carrinho/slice";
import useCarrinhoApi from "./api/useCarrinhoApi";
import { useToast } from "../context/ToastContext";
import { loading } from "../store/slices/Loading/slice";
import { useState } from "react";

const useCarrinho = () => {
  const {
    buscarCarrinhoPorIdUsuario,
    adicionarItemCarrinho,
    removerItemPedido,
    atualizarCarrinho,
  } = useCarrinhoApi();
  const dispatch = useDispatch();
  const carrinho = useSelector((state) => state.carrinho);
  const isUsuarioLogado = useSelector((state) => state?.usuario);
  const usuario = useSelector((state) => state.usuario?.usuario?.usuario);
  const [loadingCarrinho, setLoadingCarrinho] = useState(false);
  const toast = useToast();

  const addItem = async (item) => {
    dispatch(loading(true));
    try {
      let objItem = construirObjItemPedido(item);

      if (verificarUnicidade(objItem, carrinho)) {
        toast.error("Este produto já foi adicionado ao carrinho!");
        dispatch(loading(false));

        return false;
      }

      if (isUsuarioLogado && usuario) {
        objItem = construirItemPedidoRequestDto(item);
        await adicionarItemCarrinho({
          itemPedido: objItem,
          idUsuario: usuario.idUsuario,
        });
      } else {
        dispatch(addItemToCart(objItem));
      }

      toast.success("Produto adicionado ao carrinho com sucesso!");
      dispatch(loading(false));
      return true;
    } catch (error) {
      console.error("Erro ao adicionar item ao carrinho:", error);
      toast.error("Erro ao adicionar o produto ao carrinho. Tente novamente.");
      dispatch(loading(false));
      return false;
    }
  };

  const setCarrinho = (items) => {
    dispatch(setCart(items));
  };

  const clearCarrinho = () => {
    dispatch(clearCart());
  };

  const removeItem = (item) => {
    if (isUsuarioLogado && usuario) {
      removerItemPedido(item.id);
      setTimeout(() => {
        refreshCart();
      }, 2000);
    } else {
      dispatch(removeItemFromCart(item));
    }
    toast.success("Produto removido do carrinho com sucesso!");
  };

  const sincronizarCarrinho = async (idUsuario) => {
    
    try {
      setLoadingCarrinho(true);
      for (const item of carrinho?.itens || []) {
        if (!item.id) {
          const objItem = construirItemPedidoRequestDto(item);
          console.log("OBJ ITEM: ", objItem);
          await adicionarItemCarrinho({
            itemPedido: objItem,
            idUsuario: idUsuario,
          });
        }
      }

      const response = await buscarCarrinhoPorIdUsuario(idUsuario);
      const carrinhoBackend = response.data.itens || [];
      dispatch(setCart(carrinhoBackend));
      dispatch(setIdCarrinho(response.data.id));
    } catch (error) {
      console.error("Erro ao sincronizar o carrinho:", error);
    } finally {
      setLoadingCarrinho(false);
    }
  };

  const construirObjItemPedido = (item) => {
    return {
      id: null,
      quantidade: item?.quantidade || 1,
      valor: item.preco,
      valorTotal:
        (item.preco - item.preco * (item.desconto / 100)) *
        (item?.quantidade || 1),
      desconto: item.desconto,
      valorDesconto: item.preco * (item.desconto / 100),
      valorFrete: null,
      custoProducao: null,
      feito: null,
      produto: item,
      personalizacoes: item.personalizacoesCliente,
      idUnico: Math.random().toString(36).substr(2, 9),
    };
  };

  const construirItemPedidoRequestDto = (item) => {
    return {
      id: item.id || null,
      quantidade: item.quantidade || 1,
      valor: item.valor,
      valorTotal: item.valorTotal,
      desconto: item.desconto,
      valorDesconto: item.valorDesconto,
      valorFrete: item.valorFrete || null,
      custoProducao: item.custoProducao || null,
      feito: item.feito || null,
      fkProduto: item?.produto?.id || item?.id || null,
      fkPedido: item.fkPedido || null,
      personalizacoes: item?.personalizacoesCliente
        ? item.personalizacoesCliente.map((personalizacao) => {
            return {
              descricaoPersonalizacao: personalizacao.descricaoPersonalizacao,
              fkPersonalizacao: personalizacao.personalizacao.idPersonalizacao,
              fkOpcaoPersonalizacao: personalizacao.opcaoPersonalizacao.idOpcao,
            };
          })
        : [],
    };
  };

  const verificarUnicidade = (novoItem, carrinho) => {
    const itens = Array.isArray(carrinho) ? carrinho : carrinho.itens || [];

    for (const item of itens) {
      if (item?.produto?.id === novoItem?.produto?.id) {
        const personalizacoesExistentes = item.personalizacoes || [];
        const personalizacoesNovas = novoItem.personalizacoesCliente || [];

        if (personalizacoesExistentes.length === personalizacoesNovas.length) {
          const listasIguais =
            personalizacoesExistentes.every((pe) =>
              personalizacoesNovas.some((pn) => personalizacoesIguais(pe, pn))
            ) &&
            personalizacoesNovas.every((pn) =>
              personalizacoesExistentes.some((pe) =>
                personalizacoesIguais(pe, pn)
              )
            );

          if (listasIguais) {
            return true;
          }
        }
      }
    }

    return false;
  };

  const personalizacoesIguais = (p1, p2) => {
    if (!p1 || !p2) return false;

    const mesmaPersonalizacao =
      p1.idPersonalizacao === p2.idPersonalizacao &&
      p1.idOpcaoPersonalizacao === p2.idOpcaoPersonalizacao;

    const mesmaDescricao =
      (p1.descricaoPersonalizacao || "").toLowerCase() ===
      (p2.descricaoPersonalizacao || "").toLowerCase();

    return mesmaPersonalizacao && mesmaDescricao;
  };

  const updateItemQuantity = (id, quantidade) => {
    dispatch(updateItemQuantity({ id, quantidade }));
    if (isUsuarioLogado && usuario) {
      atualizarItemPedido({
        idItemPedido: id,
        itemPedido: { quantidade },
      });
    }
  };

  const refreshCart = async () => {
    if (isUsuarioLogado && usuario?.idUsuario) {
      clearCarrinho();
      await sincronizarCarrinho(usuario.idUsuario);
    }
  };

  const atualizarDadosCarrinho = async (carrinho) => {
    const response = await atualizarCarrinho({
      idCarrinho: carrinho.id,
      carrinho,
    });

    return response;
  };

  return {
    carrinho,
    addItem,
    setCarrinho,
    clearCarrinho,
    removeItem,
    sincronizarCarrinho,
    construirItemPedidoRequestDto,
    updateItemQuantity,
    refreshCart,
    atualizarDadosCarrinho,
    loadingCarrinho
  };
};

export default useCarrinho;
