import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useGoogleApi } from "./api/useGoogleApi";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/UsuarioAutenticado/slice";
import { loading } from "../store/slices/Loading/slice";

const useGoogle = (callback) => {
  const { mutateAsync, error, data } = useGoogleApi();
  const dispatch = useDispatch();

  useEffect(() => {
    function handleCredentialResponse(response) {
      const token = response.credential;
      const decoded = jwtDecode(token);

      const googleAuthDTO = {
        sub: decoded.sub || "",
        name: decoded.name || "",
        givenName: decoded.given_name || "",
        familyName: decoded.family_name || "",
        email: decoded.email || "",
        emailVerified:
          typeof decoded.email_verified === "boolean"
            ? decoded.email_verified
            : false,
        picture: decoded.picture || "",
      };

      dispatch(loading(true));

      mutateAsync(googleAuthDTO)
        .then((result) => {
          dispatch(login(result));
          if (callback) callback();
        })
        .catch((err) => {
          console.error("Erro ao autenticar com Google:", err);
        })
        .finally(() => {
          dispatch(loading(false));
          window.location.href = "/";
        });
    }

    const initializeGoogleSignIn = () => {
      window.google.accounts.id.initialize({
        client_id:
          "480230079097-llntjmfcgkatg3um57bh7dba6o8velvv.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
    };

    initializeGoogleSignIn();
  }, [dispatch, mutateAsync, callback]);

  return { error, data };
};

export default useGoogle;
