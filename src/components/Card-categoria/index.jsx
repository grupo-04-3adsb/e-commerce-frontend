import React from 'react';// Estilo importado// Estilo importado
import './categoria.modules.css';

const CardCategoria = ({ categoryName, onClick }) => {
  return (
    <div className="category-ball" onClick={() => onClick(categoryName)}>
      <p>
        {categoryName}
      </p>
    </div>
  );
};

export default CardCategoria;