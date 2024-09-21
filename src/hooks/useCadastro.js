import { useState } from "react";
import { useCadastroUsuarioApi } from "./api/useCadastroUsuarioApi";
import { UserDTO } from "../models/UsuarioSchema";

const validateForm = (data) => {
  const errors = {};

  if (data.senha !== data.confirmarSenha) {
    errors.api = "A senha e a confirmação da senha não coincidem.";
  }

  return errors;
};

const useCadastroUsuario = () => {
  const { data, cadastrarUsuario, validarCPFEmail } =
    useCadastroUsuarioApi();
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (data) => {
    setErrors({})
    setFormValues(data);

    const validationResult = UserDTO.safeParse(data);

    if (!validationResult.success) {
      const validationErrorsZod = validationResult.error.format();
      setErrors(validationErrorsZod);
      return;
    }

    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    data.role = "USER";

    try {
      await cadastrarUsuario.mutateAsync(data);
      window.location.href = "/";
    } catch (err) {
      console.error("Erro ao cadastrar usuário:", err);
      setErrors({
        ...errors,
        api: err.message || "Erro desconhecido. Tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCPF = (cpf) => {
    cpf = cpf.replace(/\D+/g, "");

    if (cpf.length <= 11) {
      cpf = cpf
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    return cpf;
  };

  const handleValidarUsuario = async (data) => {
    setErrors({})
    setLoading(true);

    if (!data.email || !data.cpf) {
      setErrors({ api: "Ambos os campos devem ser preenchidos" });
      setLoading(false);
      return;
    }

    data.cpf = formatCPF(data.cpf);

    try {
      await validarCPFEmail.mutateAsync(data);
      return true;
    } catch (err) {
      console.error("Erro ao validar usuário:", err);
      setErrors({
        api: err.message || "Erro desconhecido. Tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    handleChange,
    handleSubmit,
    handleValidarUsuario,
    loading,
    errors,
    apiCadastroMessage: {
      error: errors.api || null,
      success: data || null,
    },
  };
};

export default useCadastroUsuario;
