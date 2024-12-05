import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../axiosConfig";
import { useSelector } from "react-redux";
import useUploadImage from "./useUploadImageApi";

const useCarrinhoApi = () => {

  const { uploadImage } = useUploadImage();

  const adicionarItemCarrinho = useMutation({
    mutationFn: async ({ itemPedido, idUsuario }) => {
      const itemPedidoCopy = {
        ...itemPedido,
        personalizacoes: itemPedido.personalizacoes.map((personalizacao) => ({
          ...personalizacao,
        })),
      };

      const itemPedidoParaEnvio = {
        ...itemPedido,
        personalizacoes: itemPedido.personalizacoes.map((personalizacao) => {
          if (personalizacao.descricaoPersonalizacao instanceof File) {
            return {
              ...personalizacao,
              descricaoPersonalizacao:
                personalizacao.descricaoPersonalizacao.name,
            };
          }
          return personalizacao;
        }),
      };

      console.log("Item para envio: ", itemPedidoParaEnvio);
      console.log("ID Usuário carrinho: ", idUsuario);

      const response = await axiosInstance.post(
        `/item-pedidos/${idUsuario}`,
        itemPedidoParaEnvio
      );

      const personalizacoesImagens = response.data.personalizacoes;

      for (const personalizacao of personalizacoesImagens) {
        const file = itemPedidoCopy.personalizacoes.find(
          (p) =>
            p.descricaoPersonalizacao instanceof File &&
            p.descricaoPersonalizacao.name ===
              personalizacao.descricaoPersonalizacao
        );

        if (file) {
          console.log("Encontrou arquivo para upload:", file);
          await uploadImage(
            file.descricaoPersonalizacao,
            "personalizacaoItem",
            "",
            personalizacao.id
          );
        }
      }

      return response;
    },
    onError: (error) => {
      console.error("Erro ao adicionar item ao carrinho:", error);
    },
  });

  const buscarCarrinhoPorIdUsuario = useMutation({
    mutationFn: async (idUsuario) => {
      const response = await axiosInstance.get(
        `/pedidos/carrinho/${idUsuario}`
      );
      console.log("Carrinho do usuário:", response.data);
      return response;
    },
    onError: (error) => {
      console.error("Erro ao buscar carrinho por ID do usuário");
    },
  });

  const removerItemPedido = useMutation({
    mutationFn: async (idItemPedido) => {
      const response = await axiosInstance.delete(
        `/item-pedidos/${idItemPedido}`
      );
      return response;
    },
    onError: (error) => {
      console.error("Erro ao remover item do carrinho");
    },
  });

  const atualizarItemPedido = useMutation({
    mutationFn: async ({ idItemPedido, itemPedido }) => {
      const response = await axiosInstance.put(
        `/item-pedidos/${idItemPedido}/quantidade`,
        itemPedido
      );
      return response;
    },
    onError: (error) => {
      console.error("Erro ao atualizar item do carrinho");
    },
  });

  const atualizarCarrinho = useMutation({
    mutationFn: async ({ idCarrinho, carrinho }) => {
      try {
        const response = axiosInstance.put(`/pedidos/${idCarrinho}`, carrinho,
        );
        return true;
      } catch (error) {
        console.error("Erro ao atualizar carrinho:", error);
        return false;
      }
    },
  });

  return {
    adicionarItemCarrinho: adicionarItemCarrinho.mutateAsync,
    buscarCarrinhoPorIdUsuario: buscarCarrinhoPorIdUsuario.mutateAsync,
    removerItemPedido: removerItemPedido.mutateAsync,
    atualizarItemPedido: atualizarItemPedido.mutateAsync,
    atualizarCarrinho: atualizarCarrinho.mutateAsync,
  };
};

export default useCarrinhoApi;
