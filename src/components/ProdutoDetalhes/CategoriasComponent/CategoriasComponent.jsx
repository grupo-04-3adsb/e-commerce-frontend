import { useEffect, useState } from "react";
import { Chip } from "@nextui-org/react";
import { getCategoriaESubcategoriaPorProduto } from "../../../hooks/api/categoriasSubProdutoApi";

export default function CategoriasComponent({ produtoId }) {
  const [categoria, setCategoria] = useState(null);
  const [subcategoria, setSubcategoria] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCategoriaESubcategoriaPorProduto(produtoId);
      if (data) {
        setCategoria(data.categoria.nomeCategoria);
        setSubcategoria(data.subcategoria.nomeSubcategoria);
      }
    };

    fetchData();
  }, [produtoId]);

  return (
    <div className="flex gap-4">
      {categoria && <Chip style={{ backgroundColor: '#D57878', color: 'white' }}>{categoria}</Chip>}
      {subcategoria && <Chip style={{ backgroundColor: '#D57878', color: 'white' }}>{categoria}</Chip>}
    </div>
  );
}
