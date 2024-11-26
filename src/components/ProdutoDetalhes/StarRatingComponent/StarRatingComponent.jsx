import React, { useState, useEffect } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { getMediaAvaliacaoPorProduto } from '../../../hooks/api/mediaAvaliacaoApi';

const StarRating = ({ rating }) => {
  const stars = [];
  const ratingValue = isNaN(rating) ? 0 : rating; 

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(ratingValue)) {
      stars.push(<FaStar key={i} color="#FFD700" />); // Estrela cheia
    } else if (i === Math.ceil(ratingValue) && !Number.isInteger(ratingValue)) {
      stars.push(<FaStarHalfAlt key={i} color="#FFD700" />); // Meia estrela
    } else {
      stars.push(<FaRegStar key={i} color="#FFD700" />); // Estrela vazia
    }
  }

  return <div style={{ display: 'flex', gap: '4px' }}>{stars}</div>;
};

const ProductRating = ({ productId }) => {
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const media = await getMediaAvaliacaoPorProduto(productId);
        console.log('Resposta da API:', media);

        const ratingValue = Number(media);
        
        if (!isNaN(ratingValue) && ratingValue >= 0 && ratingValue <= 5) {
          setRating(ratingValue);
        } else {
          setError('Não existe avaliações neste produto');
        }
      } catch (error) {
        setError('Erro ao carregar a média de avaliações');
      } finally {
        setLoading(false);
      }
    };

    fetchRating();

  }, [productId]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {rating !== null && (
        <div className='flex gap-2 items-center'>
          <StarRating rating={rating} />
          <p>{rating} de 5</p>
        </div>
      )}
    </div>
  );
};

export default ProductRating;
