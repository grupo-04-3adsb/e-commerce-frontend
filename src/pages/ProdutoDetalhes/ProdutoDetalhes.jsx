import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CardImagemComponent from "../../components/ProdutoDetalhes/CardImagemComponent/CardImagemComponent";
import { FaArrowRight, FaPaintbrush, FaPix, FaWhatsapp } from "react-icons/fa6";
import {
  TbArrowRightCircle,
  TbMinus,
  TbPlus,
  TbShoppingCartPlus,
} from "react-icons/tb";
import { getProdutoByName } from "../../hooks/api/produtoEspecificoApi";
import AvaliacaoComponent from "../../components/ProdutoDetalhes/AvaliacaoComponent/AvaliacaoComponent";
import CategoriasComponent from "../../components/ProdutoDetalhes/CategoriasComponent/CategoriasComponent";
import Produtos from "../../components/ProdutoDetalhes/CardProduto/CardProdutoDetalhe";
import MockedProduct from "../../components/ProdutoDetalhes/StarRatingComponent/StarRatingComponent";
import useCarrinho from "../../hooks/useCarrinho";
import {
  Button,
  Divider,
  Image,
  Input,
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import { MdArrowForwardIos } from "react-icons/md";
import CompraSeguraModal from "../Modais/CompraSeguraModal";
import { useToast } from "../../context/ToastContext";
import { useSelector } from "react-redux";

const ProdutoDetalhes = () => {
  const { productName } = useParams();
  const [produto, setProduto] = useState(null);
  const [uploadedImages, setUploadedImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [quantidade, setQuantidade] = useState(1);
  const { addItem } = useCarrinho();
  const [personalizacoesSelecionadas, setPersonalizacoesSelecionadas] =
    useState({});
  const [isModalCompraSeguraVisible, setIsModalCompraSeguraVisible] =
    useState(false);
  const usuario = useSelector((state) => state.usuario?.usuario?.usuario);

  const toast = useToast();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduto = async () => {
      console.log("Valor do product name: " + productName);
      try {
        const data = await getProdutoByName(productName);
        setProduto(data);
        console.log(data);
      } catch (error) {
        console.error("Erro ao carregar o produto:", error);
        setProduto(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduto();
  }, [productName]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <Spinner size="lg" color="danger" />
      </div>
    );
  }

  if (!produto) {
    return <div>Produto não encontrado.</div>;
  }

  const handleAdicionarCarrinho = () => {
    if (produto?.isPersonalizacaoObrigatoria) {
      const personalizacoesFeitas =
        Object.keys(personalizacoesSelecionadas).length > 0;

      if (!personalizacoesFeitas) {
        toast.error(
          "Este produto requer personalização. Por favor, escolha ao menos uma personalização."
        );
        return;
      }

      const personalizacoes = Object.values(personalizacoesSelecionadas);
      addItem({
        ...produto,
        quantidade,
        personalizacoesCliente: personalizacoes,
      });
    } else {
      addItem({ ...produto, quantidade });
    }
  };

  const handleComprarAgora = async () => {
    const personalizacoesFeitas =
      Object.keys(personalizacoesSelecionadas).length > 0;
    const personalizacoes = Object.values(personalizacoesSelecionadas);

    if (produto?.isPersonalizacaoObrigatoria && !personalizacoesFeitas) {
      toast.error(
        "Este produto requer personalização. Por favor, escolha ao menos uma personalização."
      );
      return;
    }

    const sucesso = await addItem({
      ...produto,
      quantidade,
      personalizacoesCliente: personalizacoes,
    });

    if (sucesso) {
      navigate("/carrinho");
    }
  };

  const handleIncrementar = () =>
    setQuantidade((prev) => Math.min(prev + 1, 99));
  const handleDecrementar = () =>
    setQuantidade((prev) => Math.max(prev - 1, 1));

  const vendedor = {
    nome: "Thatyana Moreno Franco",
    whatsapp: "5511982837122",
  };

  const handleContatoVendedor = () => {
    const mensagem = `Olá, tenho interesse no produto "${produto.nome}" listado na sua loja.`;
    const url = `https://wa.me/${vendedor.whatsapp}?text=${encodeURIComponent(
      mensagem
    )}`;
    window.open(url, "_blank");
  };

  const handlePersonalizacaoChange = (
    personalizacao,
    descricao,
    opcao,
    imagemPreview = null
  ) => {
    setPersonalizacoesSelecionadas((prev) => {
      const key = personalizacao.idPersonalizacao + "_" + opcao.idOpcao;

      if (!descricao) {
        const { [key]: _, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [key]: {
          descricaoPersonalizacao: descricao,
          personalizacao: personalizacao,
          opcaoPersonalizacao: opcao,
        },
      };
    });

    if (imagemPreview) {
      setUploadedImages((prev) => ({
        ...prev,
        [opcao.idOpcao]: imagemPreview,
      }));
    }

  };

  return (
    <div className="flex flex-wrap gap-5 p-5 w-full max-w-[1400px] mx-auto justify-center">
      <CompraSeguraModal
        setVisible={setIsModalCompraSeguraVisible}
        isVisible={isModalCompraSeguraVisible}
      />
      <div className="flex-1 flex flex-col">
        <CardImagemComponent
          imagens={[
            produto.urlProduto,
            produto.urlProduto,
            ...produto.imagensAdicionais.map((img) => img.url),
          ]}
          nome={produto.nome}
        />
        <div className="mt-8 p-5 border-t border-gray-300 w-full">
          <h2 className="text-xl mb-2">Descrição</h2>
          <p className="text-sm text-gray-600 leading-6">{produto.descricao}</p>
          {produto?.dimensao && (
            <div className="mt-4 text-sm text-gray-600">
              {(() => {
                const [altura, largura, comprimento] =
                  produto.dimensao.split("x");
                return (
                  <>
                    <p>Altura: {altura} cm</p>
                    <p>Largura: {largura} cm</p>
                    <p>Comprimento: {comprimento} cm</p>
                  </>
                );
              })()}
              <p>Peso: {produto?.peso} g</p>
              <p>Código do produto: {produto?.sku}</p>
              <p>Data de lançamento do produto: {produto?.dthrCriacao}</p>
            </div>
          )}
        </div>
        <div className="mt-8 p-5 border-t border-gray-300 w-full">
          <AvaliacaoComponent produtoId={produto.id} />
        </div>
      </div>
      <div className="flex-1 flex flex-col p-2">
        <h1 className="text-4xl mb-2">{produto.nome}</h1>
        <MockedProduct productId={produto.id} />
        <div className="mb-5 flex flex-col gap-2">
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-gray-800">
              R$
              {(
                produto.preco -
                produto.preco * (produto.desconto / 100)
              ).toFixed(2)}
            </span>
            {produto?.desconto > 0 && (
              <span className="text-sm text-gray-600 line-through mb-1">
                R${produto.preco.toFixed(2)}
              </span>
            )}
          </div>
          {produto?.desconto > 0 && (
            <span className="text-sm text-green-600 font-medium">
              Você economiza {produto.desconto}%
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 mb-5">
          <Button
            onClick={handleDecrementar}
            size="sm"
            radius="md"
            isIconOnly={true}
            color="warning"
            variant="ghost"
          >
            <TbMinus />
          </Button>
          <Input
            type="text"
            value={quantidade}
            readOnly
            variant="bordered"
            className="w-12 text-center flex justify-center items-center"
          />
          <Button
            onClick={handleIncrementar}
            size="sm"
            radius="md"
            isIconOnly={true}
            color="success"
            className="text-slate-50"
            variant="shadow"
          >
            <TbPlus />
          </Button>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <Button
            className="bg-[#D57878] text-white hover:bg-[#d46a6a]"
            fullWidth={true}
            onClick={handleComprarAgora}
            isDisabled={
              produto?.isPersonalizacaoObrigatoria &&
              Object.keys(personalizacoesSelecionadas).length === 0
            }
          >
            Comprar Produto
          </Button>
          <Button
            onClick={handleAdicionarCarrinho}
            isIconOnly={true}
            color="danger"
            variant="faded"
            isDisabled={
              produto?.isPersonalizacaoObrigatoria &&
              Object.keys(personalizacoesSelecionadas).length === 0
            }
          >
            <TbShoppingCartPlus />
          </Button>
        </div>
        {produto?.isPersonalizacaoObrigatoria && (
          <p className="text-sm text-gray-600">
            Este produto requer <strong>personalização.</strong>
            Por favor, escolha <strong>ao menos uma personalização.</strong>
          </p>
        )}
        <div className="flex items-center mt-2 gap-2">
          <p className="text-sm text-black font-semibold ">
            Meios de pagamento:{" "}
          </p>{" "}
          <p className="text-sm text-gray-600"> Pague com Pix</p>
          <FaPix className="text-[#4DB6AC]" />
        </div>
        <Divider className="mt-5" orientation="horizontal" />
        <div className=" pt-5">
          <div
            onClick={() => setIsModalCompraSeguraVisible(true)}
            className="flex justify-between items-center mb-3 cursor-pointer hover:bg-gray-300 p-3 rounded-md transition"
          >
            <div>
              <h3 className="font-semibold text-gray-800">
                Compra Segura e Protegida
              </h3>
              <p className="text-sm text-gray-600">
                Seu pedido ou seu dinheiro de volta
              </p>
            </div>
            <MdArrowForwardIos className="text-gray-500 text-lg" />
          </div>
          <div className="flex justify-between items-center cursor-pointer hover:bg-gray-300 p-3 rounded-md transition">
            <div>
              <h3 className="font-semibold text-gray-800">
                Políticas TCAteliê
              </h3>
              <p className="text-sm text-gray-600">
                Reembolso, troca e devolução
              </p>
            </div>
            <MdArrowForwardIos className="text-gray-500 text-lg" />
          </div>
        </div>

        {produto?.isPersonalizavel && (
          <div className="mt-5 p-5 border rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Personalize seu produto
            </h3>
            {produto?.personalizacoes.map((personalizacao) => (
              <div key={personalizacao.idPersonalizacao} className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  {personalizacao.nomePersonalizacao}
                </p>
                {personalizacao.tipoPersonalizacao === "Seleção" && (
                  <div className="flex items-center gap-2">
                    <select
                      className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                      onChange={(e) => {
                        const selectedOption = personalizacao.opcoes.find(
                          (opcao) => opcao.idOpcao === parseInt(e.target.value)
                        );
                        handlePersonalizacaoChange(
                          personalizacao,
                          selectedOption?.nomeOpcao,
                          selectedOption
                        );
                      }}
                    >
                      <option value="">Selecione uma opção</option>
                      {personalizacao.opcoes.map((opcao) => (
                        <option key={opcao.idOpcao} value={opcao.idOpcao}>
                          {opcao.nomeOpcao} (+ R$ {opcao.acrescimo.toFixed(2)})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {personalizacao.tipoPersonalizacao === "Texto" &&
                  personalizacao.opcoes.map((opcao) => (
                    <Tooltip
                      content={
                        <div
                          className="flex items-center gap-2 flex-col"
                          style={{ maxWidth: "200px" }}
                        >
                          <div
                            className="flex items-center gap-2"
                            style={{ maxWidth: "200px" }}
                          >
                            <FaPaintbrush className="text-gray-600" />
                            <span className="text-gray-600 text-sm">
                              Imagem prévia
                            </span>
                          </div>
                          <Image
                            src={opcao?.urlImagemOpcao}
                            width={200}
                            height={200}
                            objectFit="contain"
                          />
                        </div>
                      }
                    >
                      <div key={opcao.idOpcao} className="mb-2">
                        <Input
                          label={opcao.nomeOpcao}
                          size="sm"
                          placeholder="Digite sua personalização"
                          variant="bordered"
                          onChange={(e) =>
                            handlePersonalizacaoChange(
                              personalizacao,
                              e.target.value,
                              opcao
                            )
                          }
                          fullWidth
                        />
                        {opcao.acrescimo > 0 && (
                          <p className="text-xs text-gray-500">
                            + R$ {opcao.acrescimo.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </Tooltip>
                  ))}
                {personalizacao.tipoPersonalizacao === "Imagem" && (
                  <div
                    className={`flex flex-col gap-6 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm
                    ${!usuario
                      ? "opacity-45" : ""
                    }
                  `}
                  >
                    <h4 className="text-gray-800 font-medium">
                      Envie suas imagens:
                    </h4>
                    {personalizacao.opcoes.map((opcao) => (
                      <div key={opcao.idOpcao} className="flex flex-col gap-3">
                        <Tooltip
                          content={
                            <div
                              className="flex items-center gap-2 flex-col"
                              style={{ maxWidth: "200px" }}
                            >
                              <div
                                className="flex items-center gap-2"
                                style={{ maxWidth: "200px" }}
                              >
                                <FaPaintbrush className="text-gray-600" />
                                <span className="text-gray-600 text-sm">
                                  Imagem prévia
                                </span>
                              </div>
                              <Image
                                src={opcao?.urlImagemOpcao}
                                width={200}
                                height={200}
                                objectFit="contain"
                              />
                            </div>
                          }
                        >
                          <label
                            htmlFor={`upload-${opcao.idOpcao}`}
                            className={
                              `flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition
                              ${!usuario ? "cursor-default" : "cursor-pointer"}
                              `}
                          >
                            <span className="text-gray-600 text-sm mb-2">
                              {opcao.nomeOpcao}{" "}
                              {opcao.acrescimo > 0 && (
                                <span className="text-xs text-green-600 font-medium">
                                  (+ R$ {opcao.acrescimo.toFixed(2)})
                                </span>
                              )}
                            </span>
                            <input
                              disabled={!usuario}
                              id={`upload-${opcao.idOpcao}`}
                              type="file"
                              accept="image/png, image/jpeg"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const fileReader = new FileReader();
                                  fileReader.onload = () => {
                                    handlePersonalizacaoChange(
                                      personalizacao,
                                      file,
                                      opcao,
                                      fileReader.result,
                                      file
                                    );
                                  };
                                  fileReader.readAsDataURL(file);
                                }
                              }}
                            />
                            {
                              !usuario && (
                                <span className="text-lg font-extrabold text-gray-950">
                                  Faça login para enviar imagens
                                </span>
                              )
                            }
                          </label>
                        </Tooltip>
                        {uploadedImages[opcao.idOpcao] && (
                          <div className="flex justify-center mt-4">
                            <img
                              src={uploadedImages[opcao.idOpcao]}
                              alt="Pré-visualização"
                              className="w-32 h-32 object-contain border border-gray-300 rounded-lg"
                            />
                          </div>
                        )}
                        <p className="text-xs text-gray-500">
                          Suporte para formatos JPG e PNG.
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <ul className="text-sm text-gray-600">
              <li>
                O valor final do produto pode variar de acordo com as opções de
                personalização escolhidas.
              </li>
              <li>
                O prazo de entrega pode variar de acordo com as opções de
                personalização escolhidas.
              </li>
              <li>O acréscimo das opções não sofre influência de descontos.</li>
            </ul>
          </div>
        )}

        <div className="mt-2 p-5 border rounded-lg shadow-sm">
          <h2 className="text-lg font-bold mb-3 text-slate-600">
            Contate o Vendedor
          </h2>
          <div className="mb-3">
            <p className="text-sm text-gray-800">
              <strong>Nome:</strong> {vendedor.nome}
            </p>
            <p className="text-sm text-gray-800">
              <strong>WhatsApp:</strong> {vendedor.whatsapp}
            </p>
            <p className="text-sm text-gray-800">
              <strong>Localização:</strong> Diadema - SP
            </p>
          </div>
          <Button
            onClick={handleContatoVendedor}
            className="mt-3 bg-green-600 text-white flex items-center gap-2 py-2 px-4 rounded-md hover:bg-green-700 transition-transform transform hover:scale-105 shadow-sm"
            fullWidth={true}
          >
            <FaWhatsapp className="text-lg" />
            Iniciar Conversa
          </Button>
        </div>
      </div>

      <div className="mt-8 p-5 border-t border-gray-300 w-full">
        <h2 className="text-xl mb-2">Categorias</h2>
        <CategoriasComponent produtoId={produto.id} />
      </div>

      <div className="mt-8 p-5 border-t border-gray-300 w-full">
        <h2 className="text-xl mb-2">Produtos</h2>
        <Produtos produtoAtualId={produto.id} />
      </div>
      <div className="w-full flex mt-5">
        <Button className="bg-[#D57878] text-white py-3 px-8 rounded-md text-lg transition-transform hover:scale-105 hover:bg-[#d46a6a]">
          Ver mais
        </Button>
      </div>
    </div>
  );
};

export default ProdutoDetalhes;
