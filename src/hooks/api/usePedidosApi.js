import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../axiosConfig";
import { useSelector } from "react-redux";

const usePedidoApi = () => {
  const { token, usuario } = useSelector((state) => state.usuario.usuario);

  const checkOut = useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.post(
        `/api/v1/mercadopago/pix/${id}`
      );
      return response;
    },
    onError: (error) => {
      console.error("Erro ao fazer pedido");
    },
  });

  const processarPagamento = useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.post(
        `/api/v1/mercadopago/process_payment/${id}`
      );
      return response;
    },
    onError: (error) => {
      console.error("Erro ao processar pagamento");
    },
  });

  const carregarUltimoPedido = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.get(
        `/pedidos/${usuario?.idUsuario}/ultimo`
      );
      return response;
    },
    onError: (data) => {
      console.error("Erro na consulta: ", data);
    },
  });

  const buscarPedidosUsuario = useMutation({
    mutationFn: async ( params ) => {
      console.log({ params });
      console.log(usuario);
      const response = await axiosInstance.get(`/pedidos`, {
        params,
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    },
    onError: (data) => {
      console.error("Erro na consulta: ", data);
    },
  });

  return {
    checkOut: checkOut.mutateAsync,
    processarPagamento: processarPagamento.mutateAsync,
    carregarUltimoPedido: carregarUltimoPedido.mutateAsync,
    buscarPedidosUsuario: buscarPedidosUsuario.mutateAsync,
  };
};

export default usePedidoApi;
