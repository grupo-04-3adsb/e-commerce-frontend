import { z } from "zod";

const menorDeIdade = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age >= 18;
};

const UserDTO = z.object({
  nome: z.string()
    .nonempty("Nome deve estar preenchido")
    .min(3, "Nome deve ter mais de 3 letras"),
  
  email: z.string()
    .nonempty("Email não pode estar vazio.")
    .email("Email deve ser válido"),
  
  senha: z.string()
    .nonempty("Senha não pode estar vazia.")
    .min(8, "Senha deve ter pelo menos 8 caracteres e incluir uma letra maiúscula, uma letra minúscula, um número e um caractere especial")
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#]).*$/, 
      "Senha deve ter pelo menos 8 caracteres e incluir uma letra maiúscula, uma letra minúscula, um número e um caractere especial"),
  
  cpf: z.string()
    .nonempty("CPF não pode estar vazio."),

  telefone: z.string()
    .nonempty("Telefone não pode estar vazio."),

  genero: z.string()
    .nonempty("Gênero não pode estar vazio."),
  
  dataNascimento: z.string()
    .nonempty("Data de nascimento não pode estar vazia.")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Data de nascimento deve estar no formato YYYY-MM-DD")
    .refine((date) => menorDeIdade(date), "Usuário deve ser maior de idade")
});

export { UserDTO };
