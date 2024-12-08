import React from 'react';
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