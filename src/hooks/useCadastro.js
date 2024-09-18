import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UsuarioDTO from "../models/UsuarioDTO";
import { useCadastroUsuarioApi } from "./api/useCadastroUsuarioApi";

const useCadastroUsuario = () => {
  const {mutate, error, data} = useCadastroUsuarioApi();
  
  const {
    handleSubmit,
    formState: { errors },
    register,
    setError, 
  } = useForm({
    resolver: zodResolver(UsuarioDTO),
  });


  const onSubmit = (data) => {
    if (data.senha !== data.confirmarSenha) {
      setError("confirmarSenha", {
        type: "manual",
        message: "A senha e a confirmação da senha não coincidem.",
      });
      return; 
    }

    data.role = "USER";
    mutate(data);
  };

  return {
    handleSubmitCadastro: handleSubmit(onSubmit),
    registerCadastro: register,
    errorsCadastro: errors,
    data,
    error
  };
};

export default useCadastroUsuario;
