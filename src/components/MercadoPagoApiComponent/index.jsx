import React, { useEffect, useState } from "react";
import { initMercadoPago, Payment, StatusScreen } from "@mercadopago/sdk-react";
import axios from "axios";
import { set } from "zod";

const MercadoPagoApiComponent = () => {
  const [preferenceIdBrick, setPreferenceIdBrick] = useState(null);
  const [paymentId, setPaymentId] = useState(null);

  useEffect(() => {
    initMercadoPago("APP_USR-3c6334b2-22cd-4b02-ae0e-da7109159701", {
      locale: "pt-BR",
    });

    const fetchPreferenceIdBrick = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/mercadopago/pix/1",
          {},
          { headers: { "Content-Type": "application/json" } }
        );

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
    };

    fetchPreferenceIdBrick();
  }, []);

  const initialization = {
    amount: 10000,
    preferenceId: preferenceIdBrick,
    payer: {
      firstName: "Nome",
      lastName: "Sobrenome",
      email: "email@example.com",
    },
  };

  const customization = {
    paymentMethods: {
      ticket: "all",
      bankTransfer: "all",
      creditCard: "all",
      debitCard: "all",
      mercadoPago: "all",
    },
  };

  const onSubmit = async ({ selectedPaymentMethod, formData }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/mercadopago/process_payment/1",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (response.status === 200) {
        console.log("Pagamento processado com sucesso:", response.data);
        setPaymentId(response.data);
      } else {
        console.error(
          "Erro ao processar pagamento: status inesperado",
          response.status
        );
      }
    } catch (error) {
      console.error("Erro ao processar o pagamento:", error);
      throw error;
    }
  };
  

  const onError = (error) => {
    console.error("Erro no Payment Brick:", error);
  };

  const onReady = () => {
    console.log("Payment Brick está pronto.");
  };

  const onErrorPaymentPix = (error) => {
    console.error("Erro ao processar o pagamento PIX:", error);
  };

  const onReadyPaymentPix = () => {
    console.log("Payment PIX está pronto.");
  };

  return (
    <div className="h-[700px] mb-10 flex items-center justify-center text-gray-500">
      <div id="paymentBrick_container"></div>
      {preferenceIdBrick ? (
        <Payment
          initialization={initialization}
          customization={customization}
          onSubmit={onSubmit}
          onReady={onReady}
          onError={onError}
        />
      ) : (
        <p>Carregando...</p>
      )}
      {paymentId && (
        <StatusScreen
          initialization={{
            paymentId: paymentId,
          }}
          onReady={onReadyPaymentPix}
          onError={onErrorPaymentPix}
        />
      )}
    </div>
  );
};

export default MercadoPagoApiComponent;
