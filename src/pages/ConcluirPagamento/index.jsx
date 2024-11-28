import { StatusScreen, initMercadoPago } from "@mercadopago/sdk-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ConcluirPagamento = () => {
  const { paymentId } = useParams();

  useEffect(() => {
    initMercadoPago("APP_USR-3c6334b2-22cd-4b02-ae0e-da7109159701", {
      locale: "pt-BR",
    });
  }, []);

  const onError = (error) => {
    console.error("Erro ao processar o pagamento PIX:", error);
  };

  const onReady = () => {
    console.log("Status Screen está pronto.");
  };

  return (
    <div className="h-auto mb-10 flex items-center justify-center text-gray-500">
      <div id="statusScreen_container"></div>
      {paymentId ? (
        <StatusScreen
          initialization={{
            paymentId: paymentId,
          }}
          onReady={onReady}
          onError={onError}
          locale="pt-BR"
          customization={{
            visual: {
              style: {
                theme: "bootstrap"
              }
            }
          }}
          
        />
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default ConcluirPagamento;
