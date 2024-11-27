import { Payment } from "@mercadopago/sdk-react";
import { useSelector } from "react-redux";
import useCheckout from "./useCheckout";
import { Button, Spinner } from "@nextui-org/react";
import { useParams } from "react-router";

const CheckoutComponent = () => {
  const { usuario } = useSelector((state) => state.usuario);
  const { idPedido } = useParams();
  const { preferenceIdBrick, onError, onSubmit, onReady, isLoading } = useCheckout({
    idPedido: 1,
  });

  const initialization = {
    amount: 10000,
    preferenceId: preferenceIdBrick,
    payer: {
      firstName: usuario.nome,
      email: usuario.email,
    },
  };

  const customization = {
    paymentMethods: {
      bankTransfer: "pix",
    },
  };

  return (
    <div className="mb-10 flex w-full flex-col items-center justify-center text-gray-500">
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
        <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
          {isLoading ? (
            <>
              <Spinner className="animate-spin text-blue-500 w-8 h-8" />
              <p className="text-gray-500 font-medium text-lg">
                Carregando opção de pagamento...
              </p>
            </>
          ) : (
            <Button
              fullWidth={true}
              disabled
              variant="faded"
              color="danger"
              isDisabled
            >
              Preparando pagamento...
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckoutComponent;
