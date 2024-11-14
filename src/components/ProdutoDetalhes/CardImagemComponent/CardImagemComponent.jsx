import React, { useState, useEffect } from 'react';
import style from './CardImagemComponent.module.css';

const CardImagemComponent = ({ imagens, nome }) => {
  const [imagemPrincipal, setImagemPrincipal] = useState(imagens[0]);
  const [indiceAtual, setIndiceAtual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceAtual((prevIndex) => (prevIndex + 1) % imagens.length);
    }, 5000);

    return () => clearInterval(intervalo);
  }, [imagens.length]);

  useEffect(() => {
    setImagemPrincipal(imagens[indiceAtual]);
  }, [indiceAtual, imagens]);

  const handleThumbnailClick = (url, index) => {
    setImagemPrincipal(url);
    setIndiceAtual(index);
  };

  return (
    <div className={style.cardImagem}>
      <div className={style.thumbnailImages}>
        {imagens.slice(1).map((url, index) => (
          <div
            key={index}
            className={style.thumbnail}
            onClick={() => handleThumbnailClick(url, index + 1)}
          >
            <img src={url} alt={`${nome} thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className={style.mainImage}>
        <img src={imagemPrincipal} alt={nome} />
      </div>
    </div>
  );
};

export default CardImagemComponent;
