import React, { useState } from "react";
import {
  Card,
  CardBody,
  Image,
  Button,
  Divider,
  Checkbox,
} from "@nextui-org/react";

const OpcoesFrete = ({
  opcoesFrete,
  opcaoSelecionada = null,
  setOpcaoFrete,
  enderecoSelecionado,
}) => {
  const [selecionado, setSelecionado] = useState(
    opcaoSelecionada ? opcaoSelecionada.id : null
  );

  const handleSelecionar = (id) => {
    let opcao = opcoesFrete.find((opcao) => opcao.id === id);
    if(opcao.error) return;

    setSelecionado(id);
    setOpcaoFrete(opcao);
  };

  if (!opcoesFrete || opcoesFrete.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-4">
        <p className="text-lg font-medium">
          Nenhuma opção de frete disponível.
        </p>
        <p className="text-sm">
          Verifique o CEP ou tente novamente mais tarde.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 overflow-y-auto p-4 rounded-md">
      {enderecoSelecionado && (
        <div className="border border-gray-300 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Endereço de Entrega
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {enderecoSelecionado.nome}
          </p>
          <p className="text-sm text-gray-600">
            {enderecoSelecionado.rua}, {enderecoSelecionado.numero},{" "}
            {enderecoSelecionado.bairro}, {enderecoSelecionado.cidade} -{" "}
            {enderecoSelecionado.estado}, {enderecoSelecionado.cep}
          </p>
        </div>
      )}

      {opcoesFrete
        .filter((opcao) => opcao.name === "SEDEX")
        .map((opcao, index) => (
          <Card
            key={index}
            className={`shadow-lg border rounded-lg p-2 transition-transform transform hover:scale-[1.02] ${
              selecionado === opcao.id ? "border-blue-500" : "border-gray-200"
            } ${opcao.error ? "border-red-500 opacity-35" : "cursor-pointer"}`}
          >
            <CardBody
              className="flex gap-3"
              onClick={() => handleSelecionar(opcao.id)}
            >
              <div className="flex flex-row w-full justify-between items-center">
                <Image
                  src={opcao.company.picture}
                  alt={opcao.company.name}
                  className="rounded-lg object-contain"
                  height={20}
                />
                <Checkbox
                  isSelected={selecionado === opcao.id}
                  onChange={() => handleSelecionar(opcao.id)}
                  color="primary"
                  size="sm"
                  aria-label="Selecionar frete"
                  isDisabled={!!opcao.error}
                />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800">
                  {opcao.name} - {opcao.company.name}
                </h4>
                {opcao.error ? (
                  <p className="text-sm text-red-600 mt-1">{opcao.error}</p>
                ) : (
                  <p className="text-sm text-gray-600 mt-1">
                    Serviço disponível. Selecione para continuar.
                  </p>
                )}
                <div className="mt-2">
                  {opcao.price && (
                    <p className="text-sm text-gray-800 font-semibold">
                      Preço:{" "}
                      <span className="text-green-600">{`${opcao.currency} ${opcao.price}`}</span>
                    </p>
                  )}
                  {opcao.delivery_range && (
                    <p className="text-sm text-gray-800 font-semibold">
                      Prazo de entrega:{" "}
                      <span className="text-gray-600">
                        {opcao.delivery_range.min} a {opcao.delivery_range.max}{" "}
                        dias
                      </span>
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    *A data de entrega não contempla o prazo de produção.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      <Divider />
    </div>
  );
};

export default OpcoesFrete;
