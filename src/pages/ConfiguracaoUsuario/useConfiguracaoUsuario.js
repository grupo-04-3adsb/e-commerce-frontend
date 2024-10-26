import useConfiguracaoUsuarioApi from "./useConfiguracaoUsuarioApi";

const useConfiguracaoUsuario = () => {

    const {getEnderecoByCepApi} = useConfiguracaoUsuarioApi();

    const [modalValue, setModalValue] = useState({});
    const [tipoModalEnderco, setTipoModalEndereco] = useState("CADASTRO");
    const [viaCepApiResponse, setViaCepApiResponse] = useState({});

    const handleOpenModal = (tipoModal, value) => {
        setTipoModalEndereco(tipoModal);
        setModalValue(value);
    };

    const handleCloseModal = () => {
        setTipoModalEndereco("CADASTRO");
        setModalValue({});
    };

    const handleGetEnderecoByCep = async (cep) => {
        try {
            const response = await getEnderecoByCepApi.mutateAsync(cep);
            setViaCepApiResponse(response);
        } catch (error) {
            console.error("Erro ao buscar endereço pelo CEP:", error);
            throw new Error(
                error.response?.data || "Erro desconhecido. Tente novamente mais tarde."
            );
        }
    };
};

export default useConfiguracaoUsuario;