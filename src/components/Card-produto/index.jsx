import React, { useState } from 'react';
import './Card-produto.module.css'; // Importando o arquivo de estilos

function Produto({ produtos }) {

    const [rating, setRating] = useState(0);

    const handleRating = (value) => {
      setRating(value);
    };

    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => handleRating(i)}
          className={i <= rating ? 'star active' : 'star'}
        >
          ★
        </span>
      );
    }

  return (
    <div className="produto">
      <img src="caminho_para_a_imagem.jpg" alt={produtos.nome} />
      <div className="informacoes">
        <h2>{produtos.nome}</h2>
        <div className="preco">
          <span>R${produtos.preco}</span>
          <span className="desconto">R$50,00</span>
        </div>
        <div className="avaliacao">
          {stars}
        </div>
        <div className="acoes">
          <button>♥</button>
        </div>
      </div>
    </div>
  );
}

export default Produto;