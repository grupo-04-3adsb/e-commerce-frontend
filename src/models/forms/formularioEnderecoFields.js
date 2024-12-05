import { logradouroOptions } from "../../enums/logradouro";

export const enderecoFields = [
  [
    {
      label: "CEP",
      name: "cep",
      type: "text",
      required: true,
      mask: "#####-###",
    },
    {
      label: "Rua",
      name: "rua",
      type: "text",
      required: true,
    },
  ],
  [
    {
      label: "Bairro",
      name: "bairro",
      type: "text",
      required: true,
    },
    {
      label: "Cidade",
      name: "cidade",
      type: "text",
      required: true,
    },
  ],
  [
    {
      label: "Logradouro",
      name: "logradouro",
      type: "select",
      fullWidth: true,
      isRequired: true,
      options: logradouroOptions,
    },
    {
      label: "Estado",
      name: "estado",
      type: "text",
      required: true,
    },
  ],
  [
    {
      label: "Número",
      name: "numero",
      type: "number",
      required: true,
    },
    {
      label: "Complemento",
      name: "complemento",
      type: "text",
    },
    {
      label: "Endereço Padrão",
      name: "enderecoPadrao",
      type: "checkbox",
    },
  ],

  [
    {
      label: "Instruções de Entrega",
      name: "instrucaoEntrega",
      type: "textarea",
    },
  ],
];
