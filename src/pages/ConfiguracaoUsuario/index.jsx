import FormComponent from "../../components/Form";
import { generoOptions } from "../../enums/genero";
import {
  FaMapMarkerAlt,
  FaHome,
  FaEnvelope,
  FaClock,
  FaEdit,
} from "react-icons/fa";
import { configurarUsuarioFields } from "../../models/forms/configurarUsuarioFields";
import { useEffect, useState } from "react";
import ModalGeneric from "../../components/ModalGenerico";
import { logradouroOptions } from "../../enums/logradouro";
import { Button } from "@nextui-org/react";
import { enderecoFields } from "../../models/forms/formularioEnderecoFields";
import { useSelector } from "react-redux";

const ConfiguracaoUsuario = () => {
  const [isModalCadastroEnderecoVisible, setIsModalCadastroEnderecoVisible] =
    useState(false);
  const [tipoModalEndereco, setTipoModalEndereco] = useState("CADASTRO");
  const [isModalSenhaAtualVisible, setIsModalSenhaAtualVisible] =
    useState(false);
  const [isModalNovaSenhaVisible, setIsModalNovaSenhaVisible] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState("");
  const { usuario } = useSelector((state) => state.usuario.usuario);

  const enderecos = [
    {
      id: 1,
      rua: "Avenida Paulista",
      numero: "1000",
      complemento: "Apt 101",
      bairro: "Bela Vista",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01311-100",
      pais: "Brasil",
      instrucaoEntrega: "Deixar na portaria",
      enderecoPadrao: true,
      logradouro: "AVENIDA",
      dthrCadastro: "2023-01-01T10:00:00",
      dthrAtualizacao: "2023-01-05T10:00:00",
    },
    {
      id: 2,
      rua: "Rua Exemplo",
      numero: "456",
      complemento: "Casa 2",
      bairro: "Centro",
      cidade: "Rio de Janeiro",
      estado: "RJ",
      cep: "20000-000",
      pais: "Brasil",
      instrucaoEntrega: "Deixar na caixa de correios",
      enderecoPadrao: false,
      logradouro: "RUA",
      dthrCadastro: "2023-02-01T10:00:00",
      dthrAtualizacao: "2023-02-05T10:00:00",
    },
    {
      id: 3,
      rua: "Rua Teste",
      numero: "789",
      complemento: "",
      bairro: "Jardim",
      cidade: "Belo Horizonte",
      estado: "MG",
      cep: "30000-000",
      pais: "Brasil",
      instrucaoEntrega: "",
      enderecoPadrao: false,
      logradouro: "RUA",
      dthrCadastro: "2023-03-01T10:00:00",
      dthrAtualizacao: "2023-03-05T10:00:00",
    },
    {
      id: 4,
      rua: "Avenida Brasil",
      numero: "100",
      complemento: "",
      bairro: "Centro",
      cidade: "Curitiba",
      estado: "PR",
      cep: "80000-000",
      pais: "Brasil",
      instrucaoEntrega: "",
      enderecoPadrao: false,
      logradouro: "AVENIDA",
      dthrCadastro: "2023-04-01T10:00:00",
      dthrAtualizacao: "2023-04-05T10:00:00",
    },
    {
      id: 5,
      rua: "Rua Nova",
      numero: "200",
      complemento: "Lote 2",
      bairro: "Nova Lima",
      cidade: "Minas Gerais",
      estado: "MG",
      cep: "34000-000",
      pais: "Brasil",
      instrucaoEntrega: "Deixar na garagem",
      enderecoPadrao: false,
      logradouro: "RUA",
      dthrCadastro: "2023-05-01T10:00:00",
      dthrAtualizacao: "2023-05-05T10:00:00",
    },
  ];

  const handleShowModalEndereco = (tipo) => {
    setTipoModalEndereco(tipo);
    setIsModalCadastroEnderecoVisible(true);
  };

  const validarSenhaAtual = () => {
    if (senhaAtual === "senhaCorreta") {
      setIsModalSenhaAtualVisible(false);
      setIsModalNovaSenhaVisible(true);
    } else {
      alert("Senha atual incorreta");
    }
  };

  const handleNovaSenhaSubmit = (dados) => {
    const { novaSenha, confirmarSenha } = dados;
    if (novaSenha === confirmarSenha) {
      alert("Senha alterada com sucesso");
      setIsModalNovaSenhaVisible(false);
    } else {
      alert("As senhas não coincidem");
    }
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-5 mb-10">
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Informações do Usuário
          </h2>
          <FormComponent
            visible={true}
            isSocialLogin={false}
            apiMessage={{}}
            defaultValues={usuario}
            fields={configurarUsuarioFields}
          />
          <div className="flex flex-col sm:flex-row justify-end sm:space-x-4 space-y-4 sm:space-y-0 mt-6 w-full">
            <button className="w-full sm:w-auto flex-1 px-4 py-2 rounded-lg bg-[#D57878] text-white hover:bg-[#d86666] transition-colors">
              Deletar
            </button>
            <button className="w-full sm:w-auto flex-1 px-4 py-2 rounded-lg bg-[#D57878] text-white hover:bg-[#d86666] transition-colors">
              Salvar
            </button>
            <Button
              variant="flat"
              className="bg-[#D57878] text-white hover:bg-[#d86666] transition-colors"
              onClick={() => setIsModalSenhaAtualVisible(true)}
            >
              Alterar Senha
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Endereços do Usuário
          </h2>

          <div className="max-h-[350px] overflow-y-auto">
            {enderecos.map((endereco) => (
              <div
                key={endereco.id}
                className="border p-6 rounded-lg shadow-sm mb-6 bg-gray-50 hover:shadow-md transition-shadow relative"
              >
                <Button
                  isIconOnly={true}
                  startContent={<FaEdit className="w-5 h-5" />}
                  onClick={() => handleShowModalEndereco("EDICAO")}
                  className="absolute top-4 right-12 text-blue-600 hover:text-blue-800 transition-colors bg-transparent"
                />

                <div className="flex items-center mb-4">
                  <FaMapMarkerAlt className="text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-700">
                    {endereco.logradouro} {endereco.rua}, {endereco.numero}
                  </h3>
                </div>

                <div className="text-sm text-gray-600 space-y-2">
                  {endereco.complemento && (
                    <p>
                      <FaHome className="inline-block text-gray-500 mr-1" />
                      <strong>Complemento:</strong> {endereco.complemento}
                    </p>
                  )}
                  <p>
                    <FaHome className="inline-block text-gray-500 mr-1" />
                    <strong>Bairro:</strong> {endereco.bairro},{" "}
                    {endereco.cidade}, {endereco.estado}
                  </p>
                  <p>
                    <FaEnvelope className="inline-block text-gray-500 mr-1" />
                    <strong>CEP:</strong> {endereco.cep}
                  </p>
                  <p>
                    <FaHome className="inline-block text-gray-500 mr-1" />
                    <strong>País:</strong> {endereco.pais}
                  </p>
                  {endereco.instrucaoEntrega && (
                    <p>
                      <FaHome className="inline-block text-gray-500 mr-1" />
                      <strong>Instruções de Entrega:</strong>{" "}
                      {endereco.instrucaoEntrega}
                    </p>
                  )}
                  <p className="mt-3">
                    <FaClock className="inline-block text-gray-500 mr-1" />
                    <strong>Data de Cadastro:</strong>{" "}
                    {new Date(endereco.dthrCadastro).toLocaleDateString()}
                  </p>
                  <p>
                    <FaClock className="inline-block text-gray-500 mr-1" />
                    <strong>Última Atualização:</strong>{" "}
                    {new Date(endereco.dthrAtualizacao).toLocaleDateString()}
                  </p>
                  <p className="mt-4">
                    <strong className="text-sm font-semibold text-green-600">
                      {endereco.enderecoPadrao ? "Endereço Padrão" : ""}
                    </strong>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => handleShowModalEndereco("CADASTRO")}
            className="mt-6 w-full bg-gradient-to-r from-[#D57878] to-[#e75f5f] text-white py-2 rounded-lg hover:from-[#bd7474] hover:to-[#f56d6d] transition-colors font-semibold"
          >
            Cadastrar novo endereço
          </button>
        </div>
      </div>

      <ModalGeneric
        isVisible={isModalSenhaAtualVisible}
        title="Confirme sua senha atual"
        size="md"
        onClose={() => setIsModalSenhaAtualVisible(false)}
        body={
          <div>
            <FormComponent
              error={{}}
              visible={true}
              isSocialLogin={false}
              apiMessage={{}}
              fields={[
                [
                  {
                    name: "senhaAtual",
                    label: "Senha Atual",
                    type: "password",
                    required: true,
                  },
                ],
              ]}
              defaultValues={{}}
            />
          </div>
        }
        footer={
          <Button
            onClick={validarSenhaAtual}
            className="bg-[#D57878] text-white hover:bg-[#d86666] transition-colors"
          >
            Confirmar Senha
          </Button>
        }
      />

      <ModalGeneric
        isVisible={isModalNovaSenhaVisible}
        title="Definir nova senha"
        size="md"
        onClose={() => setIsModalNovaSenhaVisible(false)}
        body={
          <FormComponent
            error={{}}
            visible={true}
            isSocialLogin={false}
            apiMessage={{}}
            fields={[
              [
                {
                  name: "novaSenha",
                  label: "Nova Senha",
                  type: "password",
                  required: true,
                },
                {
                  name: "confirmarSenha",
                  label: "Confirmar Nova Senha",
                  type: "password",
                  required: true,
                },
              ],
            ]}
            defaultValues={{}}
            onSubmit={handleNovaSenhaSubmit}
          />
        }
        footer={
          <Button
            className="bg-[#D57878] text-white hover:bg-[#d86666] transition-colors"
            onClick={() => handleNovaSenhaSubmit({ novaSenha, confirmarSenha })}
          >
            Alterar Senha
          </Button>
        }
      />

      <ModalGeneric
        isVisible={isModalCadastroEnderecoVisible}
        title={
          tipoModalEndereco === "CADASTRO"
            ? "Cadastrar Endereço"
            : "Editar Endereço"
        }
        size="3xl"
        onClose={() => setIsModalCadastroEnderecoVisible(false)}
        body={
          <FormComponent
            error={{}}
            visible={true}
            isSocialLogin={false}
            apiMessage={{}}
            fields={enderecoFields}
            defaultValues={{}}
          />
        }
        footer={
          <Button
            type="button"
            variant="solid"
            style={{
              backgroundColor: "#D57878",
              color: "white",
            }}
          >
            {tipoModalEndereco === "CADASTRO"
              ? "Cadastrar endereço"
              : "Editar endereço"}
          </Button>
        }
      />
    </div>
  );
};

export default ConfiguracaoUsuario;
