import React, { useState } from 'react';
import style from './CardImagemComponent.module.css';

const CardImagemComponent = ({ imagens, nome }) => {
  const [imagemPrincipal, setImagemPrincipal] = useState(imagens[0]);

  const handleThumbnailClick = (url) => {
    setImagemPrincipal(url);
  };

  return (
    <div className={style.cardImagem}>
      <div className={style.thumbnailImages}>
        {imagens.slice(1).map((url, index) => (
          <div key={index} className={style.thumbnail} onClick={() => handleThumbnailClick(url)}>
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
