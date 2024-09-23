import { useLoginApi } from "./api/useLoginApi";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/slices/UsuarioAutenticado/slice";
import { loading } from "../store/slices/Loading/slice";

const useLogin = () => {
  const { mutateAsync, error, data } = useLoginApi();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {

    dispatch(loading(true));
    try {
      const response = await mutateAsync(data);
      await dispatch(login(response));
      window.location.href = "/"
    } catch (err) {
      console.error("Erro ao fazer login", err);
    } finally {
      dispatch(loading(false));
    }
  };

  const onLogout = async () => {
    dispatch(loading(true));
    try {
      dispatch(logout());
    } catch (err) {
      console.error("Erro ao fazer logout", err);
    } finally {
      dispatch(loading(false));
      window.location.href = "/"
    }
  };

  return {
    handleSubmitLogin: onSubmit,
    apiLoginMessage: {
      error: error?.status >= 400 ? "Email ou senha incorretos, tente novamente." : null,
      success: data?.token ? "Login realizado com sucesso." : null,
    },
    onLogout
  };
};

export default useLogin;
