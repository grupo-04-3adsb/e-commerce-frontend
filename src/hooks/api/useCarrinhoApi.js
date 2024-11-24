import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../axiosConfig";
import { useSelector } from "react-redux";

const useCarrinhoApi = () => {
  const { token } = useSelector((state) => state?.usuario);

  const adicionarItemCarrinho = useMutation({
    mutationFn: async ({ itemPedido, idUsuario }) => {
      console.log("Adicionando item ao carrinho:", itemPedido);
      console.log("ID do usuário:", idUsuario);
      const response = await axiosInstance.post(
        `/item-pedidos/${idUsuario}`,
        itemPedido,
      );
      return response;
    },
    onError: (error) => {
      console.error("Erro ao adicionar item ao carrinho");
    },
  });

	const buscarCarrinhoPorIdUsuario = useMutation({
		mutationFn: async (idUsuario) => {
			const response = await axiosInstance.get(`/pedidos/carrinho/${idUsuario}`)
			console.log("Carrinho do usuário:", response.data);
			return response;
		},
		onError: (error) => {
			console.error("Erro ao buscar carrinho por ID do usuário");
		},
	})

  return {
    adicionarItemCarrinho: adicionarItemCarrinho.mutateAsync,
		buscarCarrinhoPorIdUsuario: buscarCarrinhoPorIdUsuario.mutateAsync,
  };
};

export default useCarrinhoApi;
