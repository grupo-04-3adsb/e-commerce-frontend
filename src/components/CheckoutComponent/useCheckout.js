import { useEffect, useState } from "react";
import usePedidoApi from "../../hooks/api/usePedidosApi";
import { initMercadoPago } from "@mercadopago/sdk-react";

const useCheckout = ({ idPedido }) => {
  const { checkOut, processarPagamento } = usePedidoApi();
  const [preferenceIdBrick, setPreferenceIdBrick] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

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
      const response = await processarPagamento(idPedido);

      if (response.status === 200) {
        const paymentId = response.data;
        window.location.href = `/produtos/pedido/concluir-pagamento/${paymentId}`;
      } else {
        console.error(
          "Erro ao processar pagamento: status inesperado",
          response.status
        );
      }
    } catch (error) {
      console.error("Erro ao processar o pagamento:", error);
    }
  };

	const onError = (error) => {
		console.error("Erro ao fazer pedido");
	}

  return {
    preferenceIdBrick,
    onSubmit,
		onReady,
		onError,
		isLoading
  };
};

export default useCheckout;
