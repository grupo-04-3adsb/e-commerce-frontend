import { generoOptions } from "../../enums/genero";

const cadastroFields = [
  [
    {
      label: "Nome",
      name: "nome",
      type: "text",
      fullWidth: true,
      isInvalid: true,
    },
    {
      label: "Telefone",
      name: "telefone",
      type: "text",
      fullWidth: true,
      isInvalid: true,
      mask: "(99) 99999-9999",
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
      isInvalid: true,
      mask: "99/99/9999",
    },
  ],
  [
    {
      label: "CPF",
      name: "cpf",
      type: "text",
      fullWidth: true,
      isInvalid: true,
      mask: "999.999.999-99",
    },
  ],
  [
    {
      label: "Email",
      name: "email",
      type: "email",
      isInvalid: true,
      fullWidth: true,
    },
  ],
  [
    {
      label: "Senha",
      name: "senha",
      type: "password",
      fullWidth: true,
      isInvalid: true,
    },
    {
      label: "Confirmar Senha",
      name: "confirmarSenha",
      type: "password",
      fullWidth: true,
      isInvalid: true,
    },
  ]
];

export default cadastroFields;
