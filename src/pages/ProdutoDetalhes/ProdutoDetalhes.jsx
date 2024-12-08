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
import ProductDetails from "../../components/ProductDetail";

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
        {window.innerWidth <= 1138 && (
          <ProductDetails
            handleAdicionarCarrinho={handleAdicionarCarrinho}
            handleComprarAgora={handleComprarAgora}
            handleIncrementar={handleIncrementar}
            handleDecrementar={handleDecrementar}
            handlePersonalizacaoChange={handlePersonalizacaoChange}
            handleContatoVendedor={handleContatoVendedor}
            produto={produto}
            quantidade={quantidade}
            personalizacoesSelecionadas={personalizacoesSelecionadas}
            uploadedImages={uploadedImages}
            setIsModalCompraSeguraVisible={setIsModalCompraSeguraVisible}
            usuario={usuario}
            vendedor={vendedor}
          />
        )}
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
      {window.innerWidth > 1138 && (
        <ProductDetails
          handleAdicionarCarrinho={handleAdicionarCarrinho}
          handleComprarAgora={handleComprarAgora}
          handleIncrementar={handleIncrementar}
          handleDecrementar={handleDecrementar}
          handlePersonalizacaoChange={handlePersonalizacaoChange}
          handleContatoVendedor={handleContatoVendedor}
          produto={produto}
          quantidade={quantidade}
          personalizacoesSelecionadas={personalizacoesSelecionadas}
          uploadedImages={uploadedImages}
          setIsModalCompraSeguraVisible={setIsModalCompraSeguraVisible}
          usuario={usuario}
          vendedor={vendedor}
        />
      )}
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
