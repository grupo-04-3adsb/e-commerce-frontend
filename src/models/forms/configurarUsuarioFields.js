import { generoOptions } from "../../enums/genero";

export const configurarUsuarioFields = [
  [
    {
      label: "Nome",
      name: "nome",
      type: "text",
      required: true,
    },
  ],
  [
    {
      label: "E-mail",
      name: "email",
      type: "email",
      required: true,
    },
  ],
  [
    {
      label: "CPF",
      name: "cpf",
      type: "text",
      required: true,
      mask: "###.###.###-##",
    },
  ],
  [
    {
      label: "Data de nascimento",
      name: "dataNascimento",
      type: "date",
      required: true,
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
  ],
];
