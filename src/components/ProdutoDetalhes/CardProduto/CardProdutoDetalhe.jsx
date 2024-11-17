import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosConfig";

export default function Produtos({ produtoAtualId }) {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axiosInstance.get("/produtos?page=0&size=15");
        
        const produtosFiltrados = response.data.content
          .filter((produto) => produto.id !== produtoAtualId)
          .sort(() => Math.random() - 0.5)

        setProdutos(produtosFiltrados.slice(0, 8));
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProdutos();
  }, [produtoAtualId]);

  const handleCardClick = (nome) => {
    window.scrollTo(0, 0);
    navigate(`/produtos/${nome}`);
  };

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {produtos.map((produto) => (
        <Card
          shadow="sm"
          key={produto.id}
          isPressable
          onPress={() => handleCardClick(produto.nome)}
        >
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={produto.nome}
              className="w-full object-cover h-[140px]"
              src={produto.urlProduto}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{produto.nome}</b>
            <p className="text-default-500">R$ {produto.preco.toFixed(2)}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
