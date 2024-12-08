// import AppBreadcrumb from "../../components/CustomBreadCrumbs/BreadCrumbs";
import styles from "./UserInfo.module.css";
import CardEndereco from "../../components/Card-endereco/CardEndereco";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUsuariosInfos } from "../../hooks/api/useUsuarioInfosApi.js";
import { transformarData } from "../../assets/utils/globals.js";
import ModalEnd from "../../components/Modal-endereco/ModalEnd.jsx";

function UserInfo() {
  const { token } = useSelector((state) => state?.usuario.token);
  const [userInfos, setUserInfos] = useState();

  const [nomeInput, setNomeInput] = useState("");
  const [cpfInput, setCpffInput] = useState("");
  const [dtNascInput, setDtNascInput] = useState("");
  const [generoInput, setGeneroInput] = useState("");

  const [telefoneInput, setTelefoneInput] = useState("");

  const {
    carregarInfosEnderecos,
    dataUser,
    atualizarInfos,
    buscarUsuarioPorId,
    usuarioDataUser,
  } = useUsuariosInfos();
  const [listaEndereco, setListaEndereco] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  async function recuperaValoresEndereco() {
    try {
      const response = await carregarInfosEnderecos();
    } catch (error) {
      console.error(error);
    }
  }

  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  async function toggleEditing() {
    if (isEditing) {
      const putDto = {
        nome: nomeInput,
        cpf: cpfInput,
        dataNascimento: dtNascInput,
        telefone: telefoneInput,
        genero: generoInput,
      };

      try {
        const response = await atualizarInfos(putDto);
        fetchUserById();
      } catch (error) {
        console.error(error);
      }
    }
    setIsEditing((prevState) => !prevState);
  }

  useEffect(() => {
    if (dataUser) {
      setListaEndereco(dataUser);
    }
    setIsEditing(false);
  }, [dataUser]);

  useEffect(() => {
    const request = usuarioDataUser;
    if (request) {
      setNomeInput(userInfos.nome);
      setCpffInput(userInfos.cpf);
      setGeneroInput(userInfos.genero);
      setDtNascInput(transformarData(userInfos.dataNascimento));
      setTelefoneInput(userInfos.numeroTelefone);
      // setUserInfos(usuarioDataUser)
    }
  }, [userInfos]);

  const fetchUserById = async () => {
    try {
      const response = await buscarUsuarioPorId();
      setUserInfos(response);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  useEffect(() => {
    recuperaValoresEndereco();
    fetchUserById();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <h2>Informações do usuário</h2>
        <form className={styles.form}>
          <div className={styles.campo}>
            <label>Nome</label>
            <input
              type="text"
              value={nomeInput}
              disabled={!isEditing}
              onChange={(e) => handleInputChange(e, setNomeInput)}
            />
          </div>

          <div className={styles.campo}>
            <label>CPF</label>
            <input
              type="text"
              value={cpfInput}
              disabled={!isEditing}
              onChange={(e) => handleInputChange(e, setCpffInput)}
            />
          </div>

          <div className={styles.campo}>
            <label>Telefone</label>
            <input
              type="text"
              value={telefoneInput}
              disabled={!isEditing}
              onChange={(e) => handleInputChange(e, setTelefoneInput)}
            />
          </div>

          <div className={styles.campo}>
            <label>Data de Nascimento</label>
            <input
              type="date"
              value={dtNascInput}
              disabled={!isEditing}
              onChange={(e) => handleInputChange(e, setDtNascInput)}
            />
          </div>

          <div className={styles.campo}>
            <label>Gênero</label>
            <input
              type="text"
              value={generoInput}
              disabled={!isEditing}
              onChange={(e) => handleInputChange(e, setGeneroInput)}
            />
          </div>

          <div className={styles.buttons}>
            <button type="button" className={styles.delete}>
              {isEditing ? "Cancelar" : "Encerrar Conta"}
            </button>
            <button
              type="button"
              className={styles.update}
              onClick={toggleEditing}
            >
              {isEditing ? "Salvar" : "Alterar Informações"}
            </button>
          </div>
        </form>
      </div>

      <div className={styles.addresses}>
        <h2>Endereços cadastrados</h2>
        {listaEndereco.map((endereco) => (
          <CardEndereco endereco={endereco} />
        ))}
        <ModalEnd
          endereco={listaEndereco}
          textoBotao={"Cadastrar Endereço"}
          className={styles.cadastrar}
          isEditando={false}
        />
      </div>
    </div>
  );
}

export default UserInfo;
