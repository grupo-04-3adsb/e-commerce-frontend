import React, { useEffect, useState } from "react";
import { BiCart, BiPencil, BiTrash } from "react-icons/bi";
import {
  Card,
  Divider,
  Button,
  Image,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Textarea,
  Skeleton,
} from "@nextui-org/react";
import useCarrinho from "../../hooks/useCarrinho";
import ItemCarrinhoModal from "../Modais/ItemCarrinhoModal";
import { FaEye, FaPix } from "react-icons/fa6";
import useFreteApi from "../../hooks/api/useFreteApi";
import { toast } from "react-toastify";
import OpcoesFrete from "../../components/OpcoesFrete";
import { useDispatch, useSelector } from "react-redux";
import { updateItemQuantity } from "../../store/slices/Carrinho/slice";
import { useUsuariosInfos } from "../../hooks/api/useUsuarioInfosApi";
import ModalGeneric from "../../components/Modal";
import { FaHome } from "react-icons/fa";
import useProdutosApi from "../../hooks/api/useProdutosApi";
import Sugestoes from "../../components/Sugestoes";
import { useViaCepApi } from "../../hooks/api/useViaCepApi";
import { loading } from "../../store/slices/Loading/slice";

const Carrinho = () => {
  const {
    carrinho,
    removeItem,
    construirItemPedidoRequestDto,
    refreshCart,
    atualizarDadosCarrinho,
    loadingCarrinho,
  } = useCarrinho();

  const dispatch = useDispatch();

  const { carregarInfosEnderecos } = useUsuariosInfos();
  const { calcularFreteCarrinho } = useFreteApi();
  const { sugerirProdutos } = useProdutosApi();
  const { buscarCep } = useViaCepApi();
  const [opcoesFrete, setOpcoesFrete] = useState([]);
  const [opcaoFrete, setOpcaoFrete] = useState(null);
  const [produtosSugeridos, setProdutosSugeridos] = useState([]);
  const usuario = useSelector((state) => state.usuario?.usuario?.usuario);

  const [cep, setCep] = useState("");
  const [isModalVisualizarItem, setIsModalVisualizarItem] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  const [quantidade, setQuantidade] = useState(1);
  const [imagemAtual, setImagemAtual] = useState(0);
  const [enderecosUsuario, setEnderecosUsuario] = useState([]);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);
  const [isModalEnderecoEditarVisible, setIsModalEnderecoEditarVisible] =
    useState(false);

  const [isModalEnderecosVisible, setIsModalEnderecosVisible] = useState(false);

  const handleOpenModalEnderecos = () => setIsModalEnderecosVisible(true);
  const handleCloseModalEnderecos = () => setIsModalEnderecosVisible(false);

  const [numeroEndereco, setNumeroEndereco] = useState(null);
  const [instrucaoEntrega, setInstrucaoEntrega] = useState(null);
  const [complemento, setComplemento] = useState(null);
  const [isSugestaoLoading, setIsSugestaoLoading] = useState(true);
  const [isSugestaoFreteLoading, setIsSugestaoFreteLoading] = useState(false);

  const selecionarEndereco = (endereco) => {
    setCep(endereco.cep);
    setEnderecoSelecionado(endereco);
    setIsModalEnderecosVisible(false);
  };

  const imagensCarrossel = [
    { url: itemSelecionado?.produto.urlProduto },
    ...(itemSelecionado?.produto.imagensAdicionais || []),
  ];

  const avancarImagem = () => {
    setImagemAtual((prev) => (prev + 1) % imagensCarrossel.length);
  };

  useEffect(() => {
    const interval = setInterval(avancarImagem, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleRemoveItem = (item) => {
    dispatch(loading(true));
    removeItem(item);
    dispatch(loading(false));
  };

  const handleVisualizarItem = (item) => {
    setItemSelecionado(item);
    setIsModalVisualizarItem(true);
  };

  const handleCloseModalVisualizarItem = () => {
    setIsModalVisualizarItem(false);
    setItemSelecionado(null);
  };

  const handleCalcularFrete = async () => {
    if (!cep) {
      toast.error("Digite um CEP válido para calcular o frete.");
      return;
    }

    const cepValido = /^[0-9]{5}-?[0-9]{3}$/.test(cep);
    if (!cepValido) {
      toast.error("Digite um CEP válido para calcular o frete.");
      return;
    }

    const payload = carrinho.itens.map((item) => {
      return construirItemPedidoRequestDto(item);
    });

    const retornoViaCep = await buscarCep(cep);

    setEnderecoSelecionado({
      rua: retornoViaCep.logradouro,
      numero: null,
      complemento: "N/A",
      bairro: retornoViaCep.bairro,
      cidade: retornoViaCep.localidade,
      estado: retornoViaCep.uf,
      cep: retornoViaCep.cep,
      pais: "Brasil",
      instrucaoEntrega: "N/A",
      logradouro: null,
    });

    if (carrinho.itens.length > 0) {
      setIsSugestaoFreteLoading(true);
      const response = await calcularFreteCarrinho({ cep, carrinho: payload });
      setOpcoesFrete(response);
      setIsSugestaoFreteLoading(false);
    }
  };

  const alterarQuantidade = (acao) => {
    if (!itemSelecionado) return;

    const novaQuantidade =
      acao === "incrementar"
        ? quantidade + 1
        : quantidade > 1
        ? quantidade - 1
        : quantidade;

    setQuantidade(novaQuantidade);
    itemSelecionado.quantidade = novaQuantidade;
    updateItemQuantity(itemSelecionado.idUnico, novaQuantidade);
  };

  useEffect(() => {
    setIsSugestaoLoading(true);
    const payload = carrinho.itens.map((item) => {
      return construirItemPedidoRequestDto(item);
    });

    sugerirProdutos({ carrinho: payload })
      .then((response) => {
        setProdutosSugeridos(response);
        setIsSugestaoLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao sugerir produtos:", error);
      });

    refreshCart();
  }, []);

  useEffect(() => {
    if (usuario) {
      const carregarDados = async () => {
        try {
          const response = await carregarInfosEnderecos();
          setEnderecosUsuario(response);

          if (response) {
            const enderecoPadrao = response.find(
              (endereco) => endereco.enderecoPadrao
            );

            if (enderecoPadrao) {
              setEnderecoSelecionado(enderecoPadrao);
              setCep(enderecoPadrao.cep);

              const payload = carrinho.itens.map((item) =>
                construirItemPedidoRequestDto(item)
              );

              if (carrinho.itens.length > 0) {
                const responseFrete = await calcularFreteCarrinho({
                  cep: enderecoPadrao.cep,
                  carrinho: payload,
                });

                setOpcoesFrete(responseFrete);

                if (responseFrete.length > 0) {
                  setOpcaoFrete(
                    responseFrete.find((opcao) => opcao.name === "SEDEX")
                  );
                }
              }
            }
          }
        } catch (error) {
          console.error("Erro ao carregar endereços ou calcular frete:", error);
        }
      };

      carregarDados();
    }
  }, [usuario]);

  const handleFinalizarCompra = () => {
    if (!opcaoFrete) {
      toast.error("Selecione uma opção de frete para finalizar a compra.");
      return;
    }

    if (!enderecoSelecionado) {
      toast.error("Selecione um endereço para entrega.");
      return;
    }

    if (
      enderecoSelecionado.numero === null ||
      enderecoSelecionado.numero === ""
    ) {
      setIsModalEnderecoEditarVisible(true);
      return;
    }

    const payload = {
      id: carrinho.id,
      itens: carrinho.itens.map((item) => {
        return construirItemPedidoRequestDto(item);
      }),
      statusPedido: "CARRINHO",
      concluido: false,
      idsResponsaveis: [],
      valorFrete: parseFloat(opcaoFrete.price),
      dataPedido: new Date(),
      cliente: usuario.nome,
      codigoRastreio: null,
      tempoEntrega: opcaoFrete.delivery_range.max,
      enderecoEntrega: {
        rua: enderecoSelecionado?.rua,
        numero: enderecoSelecionado?.numero,
        complemento: enderecoSelecionado?.complemento,
        bairro: enderecoSelecionado?.bairro,
        cidade: enderecoSelecionado?.cidade,
        estado: enderecoSelecionado?.estado,
        cep: enderecoSelecionado?.cep,
        pais: enderecoSelecionado?.pais,
        instrucaoEntrega: enderecoSelecionado?.instrucaoEntrega,
        logradouro: enderecoSelecionado?.logradouro,
      },
    };

    let valid = atualizarDadosCarrinho(payload);

    if (valid) {
      toast.success("Redirecionando para Checkout...");
      setTimeout(() => {
        window.location.href = "/carrinho/checkout";
      }, 2000);
    } else {
      toast.error("Ocorreu um erro, verifique os dados e tente novamente.");
    }
  };

  return (
    <div className="w-full flex flex-col gap-8 p-8">
      <ItemCarrinhoModal
        avancarImagem={avancarImagem}
        alterarQuantidade={alterarQuantidade}
        handleCloseModalVisualizarItem={handleCloseModalVisualizarItem}
        handleRemoveItem={handleRemoveItem}
        imagemAtual={imagemAtual}
        imagensCarrossel={imagensCarrossel}
        isModalVisualizarItem={isModalVisualizarItem}
        itemSelecionado={itemSelecionado}
        quantidade={quantidade}
        setImagemAtual={setImagemAtual}
        setQuantidade={setQuantidade}
      />
      <ModalGeneric
        isVisible={isModalEnderecoEditarVisible}
        onClose={() => setIsModalEnderecoEditarVisible(false)}
        title="Informações do endereço de entrega."
        subtitle={`Por favor, preencha no mínimo o
           número do endereço de entrega para continuar.`}
        body={
          <>
            <Input
              placeholder="Número do endereço"
              value={enderecoSelecionado?.numero}
              onChange={(e) => setNumeroEndereco(e.target.value)}
              className="mb-4 border-zinc-500 border-1 rounded-xl"
              variant="flat"
              type="number"
              radius="md"
              color="primary"
              required={true}
            />

            <Textarea
              placeholder="Instruções de entrega"
              value={instrucaoEntrega}
              onChange={(e) => setInstrucaoEntrega(e.target.value)}
              className="mb-4 border-zinc-500 border-1 rounded-xl"
              variant="flat"
              radius="md"
              color="primary"
            />
            <Textarea
              placeholder="Complemento"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
              className="mb-4 border-zinc-500 border-1 rounded-xl"
              variant="flat"
              radius="md"
              color="primary"
            />
            <Button
              variant="solid"
              color="primary"
              className="w-full bg-[#0070F3]"
              onClick={() => {
                if (numeroEndereco === null || numeroEndereco === "") {
                  toast.error("Por favor, preencha o número do endereço.");
                  return;
                } else {
                  enderecoSelecionado.numero = numeroEndereco;
                  enderecoSelecionado.instrucaoEntrega = instrucaoEntrega;
                  enderecoSelecionado.complemento = complemento;
                  setIsModalEnderecoEditarVisible(false);
                }
              }}
            >
              Salvar
            </Button>
          </>
        }
      />

      {usuario && (
        <ModalGeneric
          title="Selecionar Endereço"
          body={
            <div className="grid grid-cols-1 gap-4">
              {enderecosUsuario ? (
                enderecosUsuario.map((endereco) => (
                  <div
                    key={endereco.id}
                    className={`flex flex-col p-4 border rounded-lg shadow-md transition-all cursor-pointer 
                      ${
                        endereco.enderecoPadrao
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300"
                      } 
                      ${
                        endereco.id === enderecoSelecionado?.id
                          ? "ring-2 ring-blue-600"
                          : ""
                      }
                      hover:shadow-lg hover:border-blue-500`}
                    onClick={() => selecionarEndereco(endereco)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-lg">
                        {endereco.rua}, {endereco.numero}
                      </h3>
                      {endereco.enderecoPadrao && (
                        <span className="flex items-center gap-1 text-blue-500">
                          <FaHome />
                          <span className="text-sm">Padrão</span>
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {endereco.bairro} - {endereco.cidade}/{endereco.estado}
                    </p>
                    <p className="text-sm text-gray-500">CEP: {endereco.cep}</p>
                    {endereco.instrucaoEntrega && (
                      <p className="text-xs text-gray-400 italic mt-2">
                        {endereco.instrucaoEntrega}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center gap-6">
                  <div className="text-center items-center justify-center flex flex-col">
                    <BiCart size={64} className="text-gray-400" />
                    <h3 className="text-xl font-semibold text-gray-700 mt-4">
                      Nenhum endereço cadastrado!
                    </h3>
                    <p className="text-gray-600">
                      Adicione um endereço para entrega.
                    </p>
                    <Button
                      size="sm"
                      color="primary"
                      variant="solid"
                      className="mt-4"
                    >
                      <a href="/infos/edit">Adicionar Endereço</a>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          }
          isVisible={isModalEnderecosVisible}
          onClose={handleCloseModalEnderecos}
        />
      )}

      <h1 className="flex items-center gap-3 text-gray-800">
        <BiCart size={32} />
        Carrinho de Compras
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <Card className="w-full h-full rounded-sm">
            <CardHeader>
              <h3 className="text-md font-semibold">Produtos</h3>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-col gap-4">
              {loadingCarrinho ? (
                <>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-20 w-20 rounded-lg bg-default-300" />
                      <div className="flex-1 space-y-3">
                        <Skeleton className="h-6 w-3/5 rounded-lg bg-default-300" />
                        <Skeleton className="h-4 w-4/5 rounded-lg bg-default-300" />
                        <Skeleton className="h-4 w-2/5 rounded-lg bg-default-300" />
                      </div>
                    </div>
                    <Skeleton className="h-20 w-full rounded-lg bg-default-300" />
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-20 w-20 rounded-lg bg-default-300" />
                      <div className="flex-1 space-y-3">
                        <Skeleton className="h-6 w-3/5 rounded-lg bg-default-300" />
                        <Skeleton className="h-4 w-4/5 rounded-lg bg-default-300" />
                        <Skeleton className="h-4 w-2/5 rounded-lg bg-default-300" />
                      </div>
                    </div>
                    <Skeleton className="h-20 w-full rounded-lg bg-default-300" />
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-20 w-20 rounded-lg bg-default-300" />
                      <div className="flex-1 space-y-3">
                        <Skeleton className="h-6 w-3/5 rounded-lg bg-default-300" />
                        <Skeleton className="h-4 w-4/5 rounded-lg bg-default-300" />
                        <Skeleton className="h-4 w-2/5 rounded-lg bg-default-300" />
                      </div>
                    </div>
                    <Skeleton className="h-20 w-full rounded-lg bg-default-300" />
                  </div>
                </>
              ) : carrinho.itens.length === 0 ? (
                <Skeleton isLoaded className="rounded-lg">
                  <CardBody className="flex flex-col items-center justify-center gap-6">
                    <div className="text-center items-center justify-center flex flex-col">
                      <BiCart size={64} className="text-gray-400" />
                      <h3 className="text-xl font-semibold text-gray-700 mt-4">
                        Seu carrinho está vazio!
                      </h3>
                      <p className="text-gray-600">
                        Adicione itens ao carrinho para visualizar aqui.
                      </p>
                    </div>
                    <Button
                      size="lg"
                      color="primary"
                      variant="solid"
                      className="bg-blue-500 text-white"
                      onClick={() => {
                        window.location.href = "/produtos";
                      }}
                    >
                      Ir para Produtos
                    </Button>
                  </CardBody>
                </Skeleton>
              ) : (
                carrinho.itens.map((item, index) => (
                  <Card
                    key={index}
                    className=" border rounded-md p-6 transition-transform transform hover:scale-[1.01] "
                  >
                    <CardBody className="flex flex-col md:flex-row items-center gap-6">
                      <div className="w-28 h-28 flex-shrink-0">
                        <Image
                          src={item.produto?.urlProduto}
                          alt={item.produto?.nome}
                          width={112}
                          height={112}
                          objectFit="cover"
                          className="rounded-lg border"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg md:text-xl font-bold text-gray-900">
                          {item.produto?.nome}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.produto?.descricao}
                        </p>
                        <p className="text-sm text-gray-700 mt-3">
                          <strong>Personalizações:</strong>{" "}
                          <span className="font-medium">
                            {item?.personalizacoes
                              ? item.personalizacoes.length > 0
                                ? item.personalizacoes.length
                                : "Nenhuma"
                              : "Nenhuma"}
                          </span>
                          {item?.personalizacoes &&
                            item?.personalizacoes.length > 0 && (
                              <span className="ml-2 text-sm text-gray-600">
                                +R$
                                {(
                                  item.personalizacoes.reduce(
                                    (acc, p) =>
                                      acc + p?.opcaoPersonalizacao?.acrescimo,
                                    0
                                  ) * item.quantidade
                                ).toFixed(2)}
                              </span>
                            )}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-800">
                          R${" "}
                          {(
                            (item?.produto.preco -
                              item?.produto.preco *
                                (item?.produto.desconto / 100)) *
                            item?.quantidade
                          ).toFixed(2)}
                        </p>
                        {item?.desconto > 0 && (
                          <p className="text-sm text-green-500 text-right mt-1">
                            <span className="line-through text-gray-500">
                              R$
                              {(item.produto?.preco * item.quantidade).toFixed(
                                2
                              )}
                            </span>
                            <span className="ml-2">-{item.desconto}%</span>
                          </p>
                        )}
                        <p className="text-sm text-gray-600 mt-2">
                          <strong>Final com personalizações:</strong>{" "}
                          <span className="font-medium text-gray-900">
                            R${" "}
                            {(
                              (item.produto.preco -
                                item.produto.preco *
                                  (item.produto.desconto / 100) +
                                (item.personalizacoes
                                  ? item.personalizacoes.reduce(
                                      (acc, p) =>
                                        acc + p?.opcaoPersonalizacao?.acrescimo,
                                      0
                                    )
                                  : 0)) *
                              item.quantidade
                            ).toFixed(2)}
                          </span>
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          <strong>Quantidade:</strong>{" "}
                          <span className="font-medium">{item.quantidade}</span>
                        </p>
                      </div>
                    </CardBody>
                    <CardFooter className="flex justify-between items-center mt-4 border-t pt-4">
                      <Button
                        size="sm"
                        color="primary"
                        variant="ghost"
                        onClick={() => handleVisualizarItem(item)}
                        className="flex items-center gap-2 hover:text-blue-600"
                      >
                        <FaEye className="text-lg" />
                        Visualizar
                      </Button>
                      <Button
                        size="sm"
                        color="danger"
                        variant="solid"
                        onClick={() => handleRemoveItem(item)}
                        className="flex items-center gap-2 hover:bg-red-500"
                      >
                        <BiTrash className="text-lg" />
                        Remover
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </CardBody>
          </Card>
        </div>
        <div className="w-full md:w-[35%]">
          <Card variant="flat" className="w-full rounded-sm">
            <CardHeader>
              <h3 className="text-sm font-semibold text-gray-800">
                Resumo do Pedido
              </h3>
            </CardHeader>
            <Divider />
            <CardBody className="py-6">
              <div className="flex justify-between mb-4">
                <p className="text-gray-700">Subtotal:</p>
                <p className="font-bold text-gray-800">
                  R$
                  {carrinho.itens
                    .reduce(
                      (acc, item) =>
                        acc + item?.produto.preco * item.quantidade,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="text-gray-700">
                  Custo adicional com personalizações:
                </p>
                <p className="font-bold text-gray-800">
                  R${" "}
                  {carrinho.itens
                    .reduce(
                      (acc, item) =>
                        acc +
                        (item?.personalizacoes
                          ? item?.personalizacoes.reduce(
                              (acc, personalizacao) =>
                                acc +
                                personalizacao?.opcaoPersonalizacao?.acrescimo,
                              0
                            )
                          : 0) *
                          item.quantidade,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="text-gray-700">Desconto:</p>
                <p
                  className={`font-bold text-gray-800 ${
                    carrinho.itens.some((item) => item?.desconto > 0)
                      ? "text-green-500"
                      : ""
                  }`}
                >
                  - R$
                  {carrinho.itens
                    .reduce(
                      (acc, item) =>
                        acc +
                        item?.produto.preco *
                          (item?.produto.desconto / 100) *
                          item.quantidade,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="text-gray-700">Frete:</p>
                <p className="font-bold text-gray-800">
                  {opcaoFrete
                    ? `${opcaoFrete?.currency || "R$"} ${
                        opcaoFrete?.price || "0.00"
                      }`
                    : "R$ 0.00"}
                </p>
              </div>
              <Divider className="my-4" />
              <div className="flex justify-between">
                <p className="text-xl font-semibold text-gray-800">Total:</p>
                <p className="text-xl font-bold text-gray-900">
                  R$
                  {(
                    carrinho.itens.reduce(
                      (acc, item) =>
                        acc +
                        (item?.produto.preco -
                          item?.produto.preco * (item?.produto.desconto / 100) +
                          (item?.personalizacoes
                            ? item?.personalizacoes.reduce(
                                (acc, personalizacao) =>
                                  acc +
                                  personalizacao?.opcaoPersonalizacao
                                    ?.acrescimo,
                                0
                              )
                            : 0)) *
                          item?.quantidade,
                      0
                    ) + parseFloat(opcaoFrete?.price || 0.0)
                  ).toFixed(2)}
                </p>
              </div>
              <Divider className="my-4" />
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Forma de Pagamento
                </h3>
                <div
                  className="flex items-center gap-4 bg-green-50 p-4 rounded-lg shadow-md border
                border-green-500 transition-all
                "
                >
                  <FaPix size={32} className="text-green-500" />
                  <div>
                    <p className="text-gray-800 font-bold text-md">
                      Pagamento via Pix
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Input
                  placeholder="Digite o CEP"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  className="mb-4 border-zinc-500 border-1 rounded-xl"
                  variant="flat"
                  radius="md"
                  color="primary"
                />
                <Button
                  isDisabled={cep.length < 8 && carrinho.itens.length === 0}
                  color="primary"
                  onClick={handleCalcularFrete}
                  className="w-full bg-[#0070F3] mb-4"
                >
                  Consultar Frete
                </Button>
                {usuario && (
                  <Button
                    variant="ghost"
                    className="w-full text-gray-600"
                    onClick={handleOpenModalEnderecos}
                  >
                    Escolher Endereço Salvo
                  </Button>
                )}
              </div>
              {isSugestaoFreteLoading ? (
                <div className="flex flex-col space-y-4 gap-4 mt-4">
                  {Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <Card
                        key={index}
                        className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-100 animate-pulse"
                      >
                        <Skeleton className="w-3/4 h-6 mb-2" />
                        <Skeleton className="w-1/2 h-4" />
                      </Card>
                    ))}
                </div>
              ) : opcoesFrete.length > 0 ? (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Opções de Frete
                  </h3>
                  <OpcoesFrete
                    opcoesFrete={opcoesFrete}
                    opcaoSelecionada={opcaoFrete}
                    setOpcaoFrete={setOpcaoFrete}
                    enderecoSelecionado={enderecoSelecionado}
                  />
                </div>
              ) : (
                <div className="mt-6 text-center text-gray-600">
                  <h3 className="text-lg font-semibold mb-2">
                    Nenhuma opção de frete disponível
                  </h3>
                  <p className="text-sm">
                    Verifique as informações do endereço ou tente novamente.
                  </p>
                </div>
              )}
            </CardBody>
            <CardFooter className="flex flex-col gap-1">
              <Button
                color="danger"
                variant="solid"
                className="w-full bg-[#EB6D6D]"
                isDisabled={
                  carrinho.itens.length === 0 || !opcaoFrete || !usuario
                }
                onClick={() => handleFinalizarCompra()}
              >
                Finalizar Compra
              </Button>
              {!usuario && (
                <p className="text-gray-600">
                  Faça login para finalizar a compra.
                </p>
              )}
              {carrinho.itens.length === 0 && (
                <p className="text-gray-600">
                  Adicione itens ao carrinho para finalizar a compra.
                </p>
              )}
              {!opcaoFrete && carrinho.itens.length > 0 && (
                <p className="text-gray-600">
                  Selecione uma opção de frete para finalizar a compra.
                </p>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
      <Divider orientation="horizontal" />
      <Sugestoes
        produtosSugeridos={produtosSugeridos}
        loading={isSugestaoLoading}
      />
    </div>
  );
};

export default Carrinho;
