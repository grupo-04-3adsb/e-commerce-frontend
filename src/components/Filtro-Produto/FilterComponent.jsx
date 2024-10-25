import styles from "./FilterComponent.module.css";
import filterImage from "../../assets/images/filtro.png";
import StarRatings from "react-star-ratings";
import { useState, useEffect } from "react";
import { Slider, Checkbox } from "@nextui-org/react";
import { getTodosOsProdutos, getProdutosFiltrados } from "../../hooks/api/produtosApi";

export default function FilterComponent({ setFilteredProducts }) {
  const [rating, setRating] = useState(0);
  const changeRating = (newRating) => setRating(newRating);

  const [preco, setPreco] = useState([0, 1000]);
  const [categoria, setCategoria] = useState("");
  const [subcategoria, setSubcategoria] = useState("");
  const [personalizavel, setPersonalizavel] = useState(false);
  const [novo, setNovo] = useState(false);
  const [desconto, setDesconto] = useState(false);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const applyFilters = async (reset = false) => {
    const filters = {
      categoria,
      subcategoria,
      precoMinimo: preco[0],
      precoMaximo: preco[1],
      avaliacao: rating,
      personalizavel,
      novo,
      desconto,
    };

    try {
      const produtos = Object.values(filters).every((filter) => filter === "" || filter === 0 || filter === false)
        ? await getTodosOsProdutos(page, 9)
        : await getProdutosFiltrados({ ...filters }, page, 9);

      // Se não houver produtos, desabilite a carga de mais produtos
      if (produtos.content.length === 0) {
        setHasMore(false);
      } else {
        // Se reset for verdadeiro, limpa a lista anterior e adiciona os novos produtos
        if (reset) {
          setFilteredProducts(produtos.content);
        } else {
          setFilteredProducts((prev) => {
            // Adiciona novos produtos se não estiverem presentes
            const newProducts = produtos.content.filter(produto => 
              !prev.some(existingProduct => existingProduct.id === produto.id)
            );
            return [...prev, ...newProducts];
          });
        }
      }
    } catch (error) {
      console.error("Erro ao buscar produtos filtrados:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  useEffect(() => {
    applyFilters();
  }, [page]);

  const handleApplyFilters = () => {
    setPage(0);
    setHasMore(true);
    applyFilters(true); // Limpa a lista anterior ao aplicar novos filtros
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterHeader}>
        <img src={filterImage} alt="Filtro" className={styles.filterImage} />
        <h2 className={styles.filterTitle}>Filtro</h2>
      </div>
      <div className={styles.filterContent}>
        <div className={styles.filterSection}>
          <h3>Categorias</h3>
          <ul>
            <li onClick={() => setCategoria("")}>Todas as categorias</li>
            <li onClick={() => setCategoria("Cadernos")}>Cadernos</li>
            <li onClick={() => setCategoria("Topo de bolo")}>Topo de bolo</li>
            <li onClick={() => setCategoria("Centro de mesa")}>Centro de mesa</li>
            <li onClick={() => setCategoria("Agendas")}>Agendas</li>
            <li onClick={() => setCategoria("Festa")}>Festa</li>
            <li onClick={() => setCategoria("Presente")}>Presente</li>
          </ul>
        </div>

        <div className={styles.filterSection}>
          <h3>Subcategorias</h3>
          <ul>
            <li onClick={() => setSubcategoria("")}>Todas as subcategorias</li>
            <li onClick={() => setSubcategoria("Caderno argolado")}>Caderno argolado</li>
            <li onClick={() => setSubcategoria("Caderno inteligente")}>Caderno inteligente</li>
            <li onClick={() => setSubcategoria("Caderno de espiral")}>Caderno de espiral</li>
            <li onClick={() => setSubcategoria("Calendário")}>Calendário</li>
            <li onClick={() => setSubcategoria("Presente dia dos pais")}>Presente dia dos pais</li>
          </ul>
        </div>

        <div className={styles.filterSection}>
          <h3>Preço</h3>
          <div className="flex flex-col gap-4 w-full h-full max-w-md items-start justify-center">
            <div>
              <p className="text-default-500 font-medium text-small">
                Preço: {Array.isArray(preco) && preco.map((p) => `R$ ${p}`).join(" – ")}
              </p>
              <Slider
                color="danger"
                size="sm"
                step={10}
                maxValue={1000}
                minValue={0}
                value={preco}
                onChange={setPreco}
                className="max-w-md"
              />
            </div>
          </div>
        </div>

        <div className={styles.filterSection}>
          <h3>Avaliação</h3>
          <StarRatings
            rating={rating}
            starRatedColor="gold"
            starHoverColor="gold"
            starEmptyColor="gray"
            changeRating={changeRating}
            numberOfStars={5}
            name="rating"
            starDimension="20px"
            starSpacing="2px"
          />
        </div>

        <div className={styles.filterSection}>
          <h3>Outros</h3>
          <Checkbox
            defaultSelected={personalizavel}
            size="sm"
            color="danger"
            onChange={(e) => setPersonalizavel(e.target.checked)}
          >
            Personalizável
          </Checkbox>
          <Checkbox
            defaultSelected={novo}
            size="sm"
            color="danger"
            onChange={(e) => setNovo(e.target.checked)}
          >
            Novo
          </Checkbox>
          <Checkbox
            defaultSelected={desconto}
            size="sm"
            color="danger"
            onChange={(e) => setDesconto(e.target.checked)}
          >
            Desconto
          </Checkbox>
        </div>

        <button onClick={handleApplyFilters} className={styles.applyFiltersButton}>Aplicar Filtros</button>
      </div>
    </div>
  );
}
