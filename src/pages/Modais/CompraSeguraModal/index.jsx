import React from "react";
import ModalGeneric from "../../../components/Modal";

const CompraSeguraModal = ({ isVisible = false, setVisible }) => {
  return (
    <ModalGeneric
      isVisible={isVisible}
      onClose={() => setVisible(false)}
      body={
        <div style={{ padding: "1rem", fontSize: "1rem", lineHeight: "1.5" }}>
          <h2
            style={{ marginBottom: "1rem", fontSize: "1.5rem", color: "#333" }}
          >
            Benefícios da Compra Segura
          </h2>
          <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
            <li>
              <strong>Transações Criptografadas:</strong> Todas as suas compras
              são protegidas por tecnologias de ponta para garantir sua
              segurança.
            </li>
            <li>
              <strong>Suporte ao Cliente 24/7:</strong> Nossa equipe está
              disponível para ajudar com qualquer dúvida ou problema a qualquer
              momento.
            </li>
          </ul>
          <div
            style={{
              marginTop: "1.5rem",
              textAlign: "center",
            }}
          >
            <button
              onClick={() => setVisible(false)}
              style={{
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "0.25rem",
                cursor: "pointer",
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      }
      title={"Compra Segura"}
    />
  );
};

export default CompraSeguraModal;
