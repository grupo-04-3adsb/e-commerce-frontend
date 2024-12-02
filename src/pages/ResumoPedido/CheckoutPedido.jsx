import React from "react";
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import { FaPix } from "react-icons/fa6";
import styles from "./CheckoutPedido.module.css";

const ResumoPedido = () => {
  return (
    <div className={styles.container}>
      {/* Card do Pagador */}
      <Card className={`${styles.card} ${styles.cardPagador} py-4`}>
        <CardBody className="overflow-visible py-2">
          <div className={styles.fieldGroup}>
            <h2>Nome Completo do Pagador</h2>
            <input
              type="text"
              value="Kauã Nunes de Souza"
              readOnly
              className={styles.input}
            />
          </div>
          <div className={styles.fieldGroup}>
            <h2>CPF</h2>
            <input
              type="text"
              value="123.456.789-00"
              readOnly
              className={styles.input}
            />
          </div>
          <div className={styles.fieldGroup}>
            <h2>Email</h2>
            <input
              type="email"
              value="kaua.souza@sptech.school"
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
            <div className={styles.item}>
              <span>2 Caderno stich (argolado)</span>
              <span>R$ 60,00</span>
            </div>
            <div className={styles.item}>
              <span>Frete</span>
              <span>R$ 20,90</span>
            </div>
            <div className={styles.item}>
              <span>Forma de Pagamento</span>
              <span>
                <FaPix className="text-[#4DB6AC]" />
                Pix
              </span>
            </div>
            <hr className={styles.divider} />
            <div className={`${styles.item} ${styles.total}`}>
              <span>Total</span>
              <span>R$ 80,90</span>
            </div>
          </CardBody>
        </Card>
        <div className={styles.footer}>
          <Button className={styles.customButton}>Finalizar Compra</Button>
        </div>
      </div>
    </div>
  );
};

export default ResumoPedido;
