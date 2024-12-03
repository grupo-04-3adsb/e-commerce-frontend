import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Button} from "@nextui-org/react";
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
      {/* Card do Pagador */}
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
        </CardBody>
      </Card>

      {/* Card do Resumo do Pedido */}
      <div className={styles.cardContainer}>
        <Card className={`${styles.card} ${styles.cardPedido} py-4`}>
          <CardHeader className="pb-0 pt-2 px-4">
            <h2 className={styles.titulo}>Resumo do Pedido</h2>
          </CardHeader>
          <CardBody className={`${styles.cardBody} py-2`}>
            <hr className={styles.divider} />
            {dadosPedido.itens?.map((item, index) => (
              <div key={index} className={styles.item}>
                <span>{item.produto.nome}</span>
                <span>R$ {item.desconto > 0 ? (item.produto.preco -  (item.produto.preco * item.desconto / 100)).toFixed(2) : item.produto.preco}</span>
              </div>
            ))}
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
            <hr className={styles.divider} />
            <div className={`${styles.item} ${styles.total}`}>
              <span>Total</span>
              <span>R$ {dadosPedido.valorTotal}</span>
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
