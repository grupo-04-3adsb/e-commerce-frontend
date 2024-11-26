import React, { useState, useEffect } from "react";

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
    <div className="flex flex-wrap gap-5 p-5 w-full max-w-[1200px] mx-auto justify-center">
      <div className="flex flex-col gap-3 mr-3">
        {imagens.slice(1).map((url, index) => (
          <div
            key={index}
            className="w-36 h-36 bg-gray-200 rounded-md transition-transform hover:scale-110 hover:shadow-lg cursor-pointer"
            onClick={() => handleThumbnailClick(url, index + 1)}
          >
            <img
              src={url}
              alt={`${nome} thumbnail ${index + 1}`}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-1 w-[800px] h-auto overflow-hidden rounded-xl">
        <img
          src={imagemPrincipal}
          alt={nome}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default CardImagemComponent;
