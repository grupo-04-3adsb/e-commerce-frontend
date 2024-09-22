import { generoOptions } from "../../enums/genero";

export const cadastroFields = [
  [
    {
      label: "Nome",
      name: "nome",
      type: "text",
      fullWidth: true,
      isRequired: true,
    },
    {
      label: "Telefone",
      name: "telefone",
      type: "text",
      fullWidth: true,
      isRequired: true,
      mask: "(##) #####-####",
    },
  ],
  [
    {
      label: "Gênero",
      name: "genero",
      type: "select",
      fullWidth: true,
      isRequired: true,
      options: generoOptions,
    },
    {
      label: "Data de Nascimento",
      name: "dataNascimento",
      type: "date",
      fullWidth: true,
      isRequired: true,
    },
  ],
  [
    {
      label: "CPF",
      name: "cpf",
      type: "text",
      fullWidth: true,
      isRequired: true,
      mask: "###.###.###-##",
    },
  ],
  [
    {
      label: "Email",
      name: "email",
      type: "email",
      isRequired: true,
      fullWidth: true,
    },
  ],
  [
    {
      label: "Senha",
      name: "senha",
      type: "password",
      isRequired: true,
      infoMessage: "A senha deve ter 8 caracteres ou mais, pelo menos 1 letra minúscula e maiúscula, 1 número, 1 caractere especial (@$!%*?&#)",
    },
    {
      label: "Confirmar Senha",
      name: "confirmarSenha",
      type: "password",
      isRequired: true,
    },
  ],
];

export const validaCadastroFields = [
  {
    label: "CPF",
    name: "cpf",
    type: "text",
    fullWidth: true,
    isRequired: true,
    mask: "###.###.###-##",
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    isRequired: true,
    fullWidth: true,
  },
];
