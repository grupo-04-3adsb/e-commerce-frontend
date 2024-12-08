import { useEffect, useState } from "react";
import usePedidoApi from "../../hooks/api/usePedidosApi";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { useToast } from "../../context/ToastContext";

const useCheckout = ({ idPedido }) => {
  const { checkOut, processarPagamento } = usePedidoApi();
  const [preferenceIdBrick, setPreferenceIdBrick] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const toast = useToast();

  useEffect(() => {
    initMercadoPago("APP_USR-3c6334b2-22cd-4b02-ae0e-da7109159701", {
      locale: "pt-BR",
    });

    const fetchPreferenceIdBrick = async () => {
      setIsLoading(true);
      try {
        const response = await checkOut(idPedido);

        if (response.status === 200) {
          setPreferenceIdBrick(response.data);
        } else {
          console.error(
            "Erro ao buscar dados: status inesperado",
            response.status
          );
        }
      } catch (error) {
        console.error("Erro na API:", error);
      }
      setIsLoading(false);
    };

    fetchPreferenceIdBrick();
  }, []);

  const onSubmit = async ({ selectedPaymentMethod, formData }) => {
    try {
      toast.success("Gerando código de pagamento...");
      const response = await processarPagamento(idPedido);

      if (response.status === 200) {
        const paymentId = response.data;
        toast.success("Pagamento processado com sucesso!");
        setTimeout(() => {
          window.location.href = `/produtos/pedido/concluir-pagamento/${paymentId}`;
        }, 1000);
      } else {
        console.error(
          "Erro ao processar pagamento: status inesperado",
          response.status
        );
      }
    } catch (error) {
      toast.error("Tivemos um problema ao processar o pagamento :(");
      console.error("Erro ao processar o pagamento:", error);
    }
  };

  const onError = (error) => {
    console.error("Erro ao fazer pedido");
  };

  return {
    preferenceIdBrick,
    onSubmit,
    onError,
    isLoading,
  };
};

export default useCheckout;
