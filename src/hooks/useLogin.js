import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginDTO from "../models/LoginDTO";
import { useLoginApi } from "./api/useLoginApi";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/UsuarioAutenticado/slice";

const useLogin = () => {
  const { mutateAsync, error, data } = useLoginApi();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(LoginDTO),
  });

  const onSubmit = async (data) => {
    try {
      const response = await mutateAsync(data);
      dispatch(login(response.usuario));
    } catch (err) {
      console.error("Erro ao fazer login");
      console.log(err);
    }
  };

  return {
    handleSubmitLogin: handleSubmit(onSubmit),
    registerLogin: register,
    errorsLogin: errors,
    apiLoginMessage: {
      error:
        error?.status >= 400
          ? "Email ou senha incorretos, tente novamente."
          : null,
      success: data?.token ? "Login realizado com sucesso." : null,
    },
  };
};

export default useLogin;
