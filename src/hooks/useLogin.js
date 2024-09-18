import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginDTO from "../models/LoginDTO";
import { useLoginApi } from "./api/useLoginApi";

const useLogin = () => {
  const { mutate, error, data } = useLoginApi();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(LoginDTO),
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return {
    handleSubmitLogin: handleSubmit(onSubmit),
    registerLogin: register,
    errorsLogin: errors,
    error,
    data,
  };
};

export default useLogin;
