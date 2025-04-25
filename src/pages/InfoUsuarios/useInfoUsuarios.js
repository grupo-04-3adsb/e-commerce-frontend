import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import usePedidoApi from "../../hooks/api/usePedidosApi";

const useInfoUsuarios = () => {
  const { usuario } = useSelector((state) => state.usuario.usuario);
  const [pedidos, setPedidos] = useState([]);
  const { buscarPedidosUsuario } = usePedidoApi();

  const fetchData = async () => {
    try {
      const response = await buscarPedidosUsuario({
        idCliente: usuario?.idUsuario,
        statusExcluidos: ["CANCELADO", "CARRINHO"].toString(),
        size: 1
      });
      setPedidos(response.data.content);
    } catch (error) {
      console.error("Erro ao buscar pedidos do usuário:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    pedidos,
  };
};

export default useInfoUsuarios;
