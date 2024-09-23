import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound404.css';
import bookImage from '../../assets/images/originalImage.png';

const NotFound404 = () => {
  return (
    <div className="container">
      <div className="text-section">
        <h1 className="title">OPS!</h1>
        <h2 className="subtitle">PÁGINA NÃO ENCONTRADA</h2>
        <p className="description">
          Parece que você se perdeu, mas não se preocupe! Vamos te ajudar a voltar.
        </p>
        <Link to="/" className="link">
          Voltar Para a Home
        </Link>
      </div>
      <div className="image-section">
        <img src={bookImage} alt="Livro 404" className="image" />
      </div>
    </div>
  );
};

export default NotFound404;
