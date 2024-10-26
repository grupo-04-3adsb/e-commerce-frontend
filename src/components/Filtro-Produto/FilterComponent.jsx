import styles from "./FilterComponent.module.css";
import filterImage from "../../assets/images/filtro.png";
import StarRatings from "react-star-ratings";
import { useState, useEffect } from "react";
import { Slider, Checkbox } from "@nextui-org/react";
import { getTodosOsProdutos, getProdutosFiltrados } from "../../hooks/api/produtosApi";
import { getCategorias } from "../../hooks/api/categoriasApi"; // Certifique-se de que o caminho esteja correto
import { getSubcategorias } from "../../hooks/api/subCategoriasApi"; // Importar a função para buscar subcategorias

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

  // Estado para armazenar categorias e subcategorias
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]); // Estado para subcategorias

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

      if (produtos.content.length === 0) {
        setHasMore(false);
      } else {
        if (reset) {
          setFilteredProducts(produtos.content);
        } else {
          setFilteredProducts((prev) => {
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

  useEffect(() => {
    const fetchCategorias = async () => {
      const fetchedCategorias = await getCategorias();
      setCategorias(fetchedCategorias.slice(0, 5)); // Limita a 5 categorias
    };

    fetchCategorias();
  }, []);

  useEffect(() => {
    const fetchSubcategorias = async () => {
      const fetchedSubcategorias = await getSubcategorias();
      setSubcategorias(fetchedSubcategorias.slice(0, 5)); // Limita a 5 subcategorias
    };

    fetchSubcategorias();
  }, []);

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
            {categorias.map((cat) => (
              <li key={cat.idCategoria} onClick={() => {
                setCategoria(cat.nomeCategoria);
                setSubcategoria(""); // Reseta a subcategoria ao mudar de categoria
              }}>
                {cat.nomeCategoria}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.filterSection}>
          <h3>Subcategorias</h3>
          <ul>
            <li onClick={() => setSubcategoria("")}>Todas as subcategorias</li>
            {subcategorias.map((subcat) => (
              <li key={subcat.idSubcategoria} onClick={() => setSubcategoria(subcat.nomeSubcategoria)}>
                {subcat.nomeSubcategoria}
              </li>
            ))}
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
