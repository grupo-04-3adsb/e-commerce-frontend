import { useLoginApi } from "./api/useLoginApi";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/slices/UsuarioAutenticado/slice";
import { loading } from "../store/slices/Loading/slice";
import useCarrinho from "./useCarrinho";

const useLogin = () => {
  const { mutateAsync, error, data } = useLoginApi();
  const { sincronizarCarrinho } = useCarrinho();
  const dispatch = useDispatch();

  const onSubmit = async (formData) => {
    dispatch(loading(true));
    try {
      const response = await mutateAsync(formData); 
      await dispatch(login(response));

      const usuarioId = response?.usuario?.idUsuario;

      if (usuarioId) {
        console.log("Sincronizando carringo ID USUÁRIO: ", usuarioId);
        await sincronizarCarrinho(usuarioId);
      }
      setTimeout(() => {
        window.location.href = "/"
      }, 1000);
    } catch (err) {
      console.error("Erro ao fazer login:", err);
    } finally {
      dispatch(loading(false));
    }
  };

  const onLogout = async () => {
    dispatch(loading(true));
    try {
      localStorage.clear();
      sessionStorage.clear();

      dispatch(logout());

    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    } finally {
      dispatch(loading(false));
      window.location.href = "/";
    }
  };

  return {
    handleSubmitLogin: onSubmit,
    apiLoginMessage: {
      error:
        error?.status >= 400
          ? "Email ou senha incorretos, tente novamente."
          : null,
      success: data?.token ? "Login realizado com sucesso." : null,
    },
    onLogout,
  };
};

export default useLogin;
