import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Button, Divider } from "@nextui-org/react";
import { FaPix } from "react-icons/fa6";
import styles from "./CheckoutPedido.module.css";
import { useSelector } from "react-redux";
import CheckoutComponent from "../../components/CheckoutComponent";
import useCarrinhoApi from "../../hooks/api/useCarrinhoApi";

const ResumoPedido = () => {
  const usuario = useSelector((state) => state.usuario?.usuario?.usuario);
  const [dadosPedido, setDadosPedido] = useState({});
  const { buscarCarrinhoPorIdUsuario } = useCarrinhoApi();
  const carrinhoId = useSelector((state) => state.carrinho.id);

  useEffect(() => {
    console.log("CarrinhoId", carrinhoId);
  }, [carrinhoId]);

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const pedidoData = await buscarCarrinhoPorIdUsuario(usuario.idUsuario);
        setDadosPedido(pedidoData.data);
        console.log(pedidoData);
      } catch (error) {
        console.error("Erro ao carregar o pedido:", error);
      }
    };

    fetchPedido();
  }, []);

  return (
    <div className={styles.container}>
      <Card className={`${styles.card} ${styles.cardPagador} py-4`}>
        <CardBody className="overflow-visible py-2">
          <div className={styles.fieldGroup}>
            <h2>Nome Completo do Pagador</h2>
            <input
              type="text"
              value={usuario.nome}
              readOnly
              className={styles.input}
            />
          </div>
          <div className={styles.fieldGroup}>
            <h2>CPF</h2>
            <input
              type="text"
              value={usuario.cpf}
              readOnly
              className={styles.input}
            />
          </div>
          <div className={styles.fieldGroup}>
            <h2>Email</h2>
            <input
              type="email"
              value={usuario.email}
              readOnly
              className={styles.input}
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-row justify-between">
              <h2>Endereço de entrega</h2>
              <h3>
                Data de entrega:{" "}
                {dadosPedido?.dataEntrega}</h3>
            </div>
            <div
              key={dadosPedido?.enderecoEntrega?.id}
              className={`flex flex-col p-4 border rounded-lg shadow-md transition-all cursor-pointer "border-gray-300"
          `}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">
                  {dadosPedido?.enderecoEntrega?.rua},{" "}
                  {dadosPedido?.enderecoEntrega?.numero}
                </h3>
                {dadosPedido?.enderecoEntrega?.enderecoPadrao && (
                  <span className="flex items-center gap-1 text-blue-500">
                    <FaHome />
                    <span className="text-sm">Padrão</span>
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {dadosPedido?.enderecoEntrega?.bairro} -{" "}
                {dadosPedido?.enderecoEntrega?.cidade}/
                {dadosPedido?.enderecoEntrega?.estado}
              </p>
              <p className="text-sm text-gray-500">
                CEP: {dadosPedido?.enderecoEntrega?.cep}
              </p>
              {dadosPedido?.enderecoEntrega?.instrucaoEntrega && (
                <p className="text-xs text-gray-400 italic mt-2">
                  {dadosPedido?.enderecoEntrega?.instrucaoEntrega}
                </p>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
      <div className={styles.cardContainer}>
        <Card className={`${styles.card} ${styles.cardPedido} py-4`}>
          <CardHeader className="pb-0 pt-2 px-4">
            <h2 className={styles.titulo}>Resumo do Pedido</h2>
          </CardHeader>
          <CardBody className={`${styles.cardBody} py-2`}>
            <Divider orientation="horizontal" />
            <h2 className="text-lg font-bold">Produtos</h2>
            {dadosPedido.itens?.map((item, index) => (
              <>
                <div key={index} className={styles.item}>
                  <div className="flex flex-col">
                    <span>{item.produto.nome}</span>
                    <span>Quantidade: {item.quantidade}</span>
                  </div>
                  <span>
                    R${" "}
                    {item.desconto > 0
                      ? (
                          (item.produto.preco -
                            (item.produto.preco * item.desconto) / 100) *
                          item.quantidade
                        ).toFixed(2)
                      : item.produto.preco * item.quantidade}
                  </span>
                </div>
                <Divider orientation="horizontal" />
              </>
            ))}
            <h2 className="text-lg font-bold">Informações de pagamento</h2>
            <div className={styles.item}>
              <span>Frete</span>
              <span>R$ {dadosPedido.valorFrete}</span>
            </div>
            <div className={styles.item}>
              <span>Forma de Pagamento</span>
              <span>
                <FaPix className="text-[#4DB6AC]" />
                {dadosPedido.formaPagamento}
              </span>
            </div>
            <Divider orientation="horizontal" />
            <div className={`${styles.item} ${styles.total}`}>
              <span>Total</span>
              <span>R$ {parseFloat(dadosPedido?.valorTotal).toFixed(2)}</span>
            </div>
          </CardBody>
        </Card>
        <div className={styles.footer}>
          <CheckoutComponent />
        </div>
      </div>
    </div>
  );
};

export default ResumoPedido;
