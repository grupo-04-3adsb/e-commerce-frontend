import { useEffect, useState } from "react";

const useFAQ = () => {
  const [perguntas, setPerguntas] = useState([
    {
      titulo: "Como faço para trocar a senha?",
      resposta:
        "Para trocar a senha, acesse o menu de configurações e clique em 'Alterar senha'.",
    },
    {
      titulo: "Quais formas de pagamento são aceitas?",
      resposta: "Aceitamos cartões de crédito, débito, boleto bancário e Pix.",
    },
    {
      titulo: "Qual o prazo de entrega dos produtos?",
      resposta:
        "O prazo de entrega varia conforme a localização e o método de envio escolhido. Consulte o prazo estimado no momento da compra.",
    },
    {
      titulo: "Como posso rastrear meu pedido?",
      resposta:
        "Após a confirmação do envio, você receberá um código de rastreamento por e-mail para acompanhar seu pedido no site da transportadora.",
    },
    {
      titulo: "Posso devolver um produto?",
      resposta:
        "Sim, aceitamos devoluções dentro do prazo de 7 dias corridos após o recebimento. O produto deve estar em perfeitas condições e com a embalagem original.",
    },
    {
      titulo: "O site é seguro para compras?",
      resposta:
        "Sim, utilizamos criptografia SSL para garantir a segurança de suas informações durante a compra.",
    },
  ]);

  const [perguntasFiltradas, setPerguntasFiltradas] = useState(perguntas);

  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    if (pesquisa) {
      const perguntasFiltradas = perguntas.filter((pergunta) =>
        pergunta.titulo
          .toLowerCase()
          .includes(
            pesquisa.toLowerCase() ||
              pergunta.resposta.toLowerCase().includes(pesquisa.toLowerCase())
          )
      );
      setPerguntasFiltradas(perguntasFiltradas);
    }
  }, [pesquisa]);

  return { perguntasFiltradas, setPesquisa };
};

export default useFAQ;
