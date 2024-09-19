import { z } from "zod";

const LoginDTO = z.object({
    email: z.string().email("E-mail inválido."),
    senha: z.string().nonempty("Senha não pode estar vazia.")
})

export default LoginDTO;