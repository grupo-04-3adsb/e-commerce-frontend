import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  clearCart,
  setCart,
  removeItemFromCart,
} from "../store/slices/Carrinho/slice";
import useCarrinhoApi from "./api/useCarrinhoApi";

const useCarrinho = () => {
  const { buscarCarrinhoPorIdUsuario, adicionarItemCarrinho } =
    useCarrinhoApi();
  const dispatch = useDispatch();
  const carrinho = useSelector((state) => state.carrinho);
  const isUsuarioLogado = useSelector((state) => state.usuario);
  const usuario = useSelector((state) => state.usuario?.usuario?.usuario)

  const addItem = (item) => {
    console.log("Preparando item pedido:", item)
    let objItem = construirObjItemPedido(item)
    if (verificarUnicidade(objItem, carrinho)) {
      alert("Produto já adicionado ao carrinho com as mesmas personalizações.");
      throw new Error(
        "Produto já adicionado ao carrinho com as mesmas personalizações."
      );
    }
    dispatch(addItemToCart(objItem));
    if (isUsuarioLogado) {
      objItem = construirItemPedidoRequestDto(item);
      console.log(objItem)
      const response = adicionarItemCarrinho({
        itemPedido: objItem,
        idUsuario: usuario.idUsuario
      });
      console.log("Response: ", response)
    }
  };

  const setCarrinho = (items) => {
    dispatch(setCart(items));
  };

  const clearCarrinho = () => {
    dispatch(clearCart());
  };

  const removeItem = (item) => {
    dispatch(removeItemFromCart(item));
  };

  const sincronizarCarrinho = async (idUsuario) => {
    console.log("Sincronizando carrinho do usuário:", idUsuario);
    try {
      const carrinhoLocal = JSON.parse(localStorage.getItem("carrinho")) || [];

      const response = await buscarCarrinhoPorIdUsuario(idUsuario);
      const carrinhoBackend = response.data || [];

      const carrinhoConsolidado = mesclarCarrinhos(
        carrinhoLocal,
        carrinhoBackend
      );

      for (const item of carrinhoConsolidado) {
        await adicionarItemCarrinho({
          itemPedido: construirObjItemPedido(item),
          idUsuario,
        });
      }

      setCarrinho(carrinhoConsolidado);
      localStorage.setItem("carrinho", JSON.stringify(carrinhoConsolidado));
    } catch (error) {
      console.error("Erro ao sincronizar o carrinho:", error);
    }
  };

  const mesclarCarrinhos = (local, backend) => {
    const itensMap = new Map();

    local.forEach((item) => {
      itensMap.set(item.produto.id, { ...item });
    });

    backend?.itens.forEach((item) => {
      if (itensMap.has(item.produto.id)) {
        const itemExistente = itensMap.get(item.produto.id);
        itensMap.set(item.produto.id, {
          ...itemExistente,
          quantidade: itemExistente.quantidade + item.quantidade,
        });
      } else {
        itensMap.set(construirObjItemPedido(item));
      }
    });

    return Array.from(itensMap.values());
  };

  const construirObjItemPedido = (item) => {
    return {
      id: item.id || new Date().getTime() + "_" + item.produto.nome,
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
      personalizacoes: item.personalizacoes,
    };
  };

  const construirItemPedidoRequestDto = (item) => {
    return {
      id: item.id || null,
      quantidade: item.quantidade || 1,
      valor: item.valor,
      valorTotal: item.valorTotal,
      desconco: item.desconto,
      valorDesconto: item.valorDesconto,
      valorFrete: item.valorFrete || null,
      custoProducao: item.custoProducao || null,
      feito: item.feito || null,
      fkProduto: item.id,
      fkPedido: item.fkPedido || null,
      personalizacoes: item?.personalizacao ? item.personalizacoes.map((personalizacao) => {
        return {
          descricaoPersonalizacao: personalizacao.descricaoPersonalizacao,
          fkPersonalizacao: personalizacao.personalizacao.idPersonalizacao,
          fkOpcaoPersonalizacao: personalizacao.opcaoPersonalizacao.idOpcao
        }
      }) : [],
    };
  };

  const verificarUnicidade = (novoItem, carrinho) => {
    const itens = Array.isArray(carrinho) ? carrinho : carrinho.itens || [];

    for (const item of itens) {
      if (item?.produto?.id === novoItem?.produto?.id) {
        const personalizacoesExistentes = item.personalizacoes || [];
        const personalizacoesNovas = novoItem.personalizacoes || [];

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

  return {
    carrinho,
    addItem,
    setCarrinho,
    clearCarrinho,
    removeItem,
    sincronizarCarrinho,
    mesclarCarrinhos,
  };
};

export default useCarrinho;
