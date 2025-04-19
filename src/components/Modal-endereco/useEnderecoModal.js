import { useEffect, useState } from "react";
import { useToast } from "../../context/ToastContext";
import { useEnderecosInfo } from "../../hooks/api/enderecosApi";
import { useDisclosure } from "@nextui-org/react";

const useEnderecoModal = ({ endereco = {}, isEditando }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({ ...endereco });
	const [loadingEndereco, setLoadingEndereco] = useState(false);
	const [loadingAction, setLoadingAction] = useState(false);

  const { cadastrarEndereco, editarEndereco } = useEnderecosInfo();
  const { getEnderecoById } = useEnderecosInfo();

  const toast = useToast();

  const fetchEnderecoExistente = async () => {
    try {
      const response = await getEnderecoById(endereco.id);
      const enderecoResp = response;
      setFormData({
        cep: enderecoResp.cep,
        rua: enderecoResp.rua,
        bairro: enderecoResp.bairro,
        cidade: enderecoResp.cidade,
        logradouro: enderecoResp.logradouro,
        estado: enderecoResp.estado,
        numero: enderecoResp.numero,
        pais: enderecoResp.pais,
        complemento: enderecoResp.complemento,
        instrucaoEntrega: enderecoResp.instrucaoEntrega,
        enderecoPadrao: enderecoResp.enderecoPadrao,
      });
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
      toast.error("Erro ao buscar endereço.");
    }
  };

  useEffect(() => {
    setLoadingEndereco(true);
    if (!isEditando) {
      setFormData({
        cep: "",
        rua: "",
        bairro: "",
        cidade: "",
        logradouro: "",
        estado: "",
        numero: "",
        pais: "",
        complemento: "",
        instrucaoEntrega: "",
        enderecoPadrao: false,
      });
    } else {
      if (endereco.id) {
        fetchEnderecoExistente();
      } else {
        setFormData({
          cep: endereco.cep,
          rua: endereco.rua,
          bairro: endereco.bairro,
          cidade: endereco.cidade,
          logradouro: endereco.logradouro,
          estado: endereco.estado,
          numero: endereco.numero,
          pais: endereco.pais,
          complemento: endereco.complemento,
          instrucaoEntrega: endereco.instrucaoEntrega,
          enderecoPadrao: endereco.enderecoPadrao,
        });
      }
    }
		setLoadingEndereco(false);
  }, [endereco, isEditando]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const carregarValores = (e) => {
    if (formData.length != 0) {
      return e;
    }
  };

  const handleSubmit = async () => {
		setLoadingAction(true);
    toast.success("Aguarde, estamos processando sua solicitação.");
    if (isEditando) {
      try {
        const IdEndereco = endereco.id;
        await editarEndereco({
          putDto: formData,
          idEndereco: IdEndereco,
        });
        toast.success("Endereço atualizado com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar endereço:", error);
        toast.error("Erro ao atualizar endereço.");
      }
    } else {
      try {
        await cadastrarEndereco(formData);
        alert("Endereço cadastrado com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar endereço:", error);
        toast.error("Erro ao cadastrar endereço.");
      }
    }
    onOpenChange(false);
		setLoadingAction(false);
  };

  return {
    isOpen,
    onOpen,
    onOpenChange,
    formData,
    setFormData,
    handleChange,
    carregarValores,
    handleSubmit,
		loadingEndereco,
		loadingAction
  };
};

export default useEnderecoModal;
