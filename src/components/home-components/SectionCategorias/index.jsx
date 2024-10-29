import React, { useEffect, useState } from 'react';
import CardCategoria from '../../Card-categoria';
import { getCategorias } from '../../../hooks/api/categoriasApi';
import '../SectionCategorias/SectionCategorias.modules.css';

const SectionCategorias = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getCategorias();
        setCategorias(data.slice(0, 6));
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategorias();
  }, []);

  return (
    <div className="main">
      <div className="categories">
        <div className="etiqueta">
          <p>CATEGORIAS</p>
        </div>
        <div className="categorias">
          {categorias.map((categoria) => (
            <CardCategoria key={categoria.idCategoria} categoryName={categoria.nomeCategoria} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionCategorias;
