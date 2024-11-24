import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  clearCart,
  setCart,
  removeItemFromCart,
} from "../store/slices/Carrinho/slice";
import { useEffect } from "react";
import useCarrinhoApi from "./api/useCarrinhoApi";

const useCarrinho = () => {
  const { buscarCarrinhoPorIdUsuario, adicionarItemCarrinho } =
    useCarrinhoApi();
  const dispatch = useDispatch();
  const carrinho = useSelector((state) => state.carrinho);

  const addItem = (item) => {
    console.log("Adicionando item ao carrinho:", item);
    dispatch(addItemToCart(construirObjItemPedido(item)));
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
          itemPedido: construirItemPedidoRequestDto(item),
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
        itensMap.set(item.produto.id, { ...item });
      }
    });

    return Array.from(itensMap.values());
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
      personalizacoes: [],
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
      fkProduto: item.produto.id,
      fkPedido: item.fkPedido || null,
      personalizacoes: item.personalizacoes || [],
    };
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
