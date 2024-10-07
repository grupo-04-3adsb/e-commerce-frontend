import { z } from "zod";
import genero, { generoOptions } from "../enums/genero";
import roles from "../enums/roles";

const UsuarioDTO = z.object({
  nome: z.string().nonempty("Nome não pode ser vazio"),
  cpf: z
    .string()
    .length(11, "O CPF deve ter 11 dígitos")
    .refine((value) => /^[0-9]+$/.test(value), {
      message: "O CPF deve conter apenas dígitos.",
    }),
  telefone: z
    .string()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Formato: (XX) XXXXX-XXXX"),
  email: z.string().email("E-mail inválido"),
  senha: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .regex(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/,
      "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um símbolo"
    ),
  confirmarSenha: z.string(),
  genero: z.string().refine(
    (g) => {
      return generoOptions.some((gen) => gen.value === g.toUpperCase());
    },
    {
      message: (g) => `O valor fornecido não é um gênero válido.`,
    }
  ),
  dataNascimento: z.string().refine(
    (date) => {
      const dataNasc = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - dataNasc.getFullYear();
      const month = today.getMonth() - dataNasc.getMonth();
      const day = today.getDate() - dataNasc.getDate();
      return (
        age > 18 || (age === 18 && (month > 0 || (month === 0 && day >= 0)))
      );
    },
    {
      message: "O usuário deve ser maior de idade",
    }
  ),
  imgUrl: z.string().optional(),
  status: z.string().optional(),
  enderecos: z.array(z.object({})).optional(),
});

export default UsuarioDTO;
