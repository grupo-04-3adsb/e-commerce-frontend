import styles from "./FilterComponent.module.css";
import filterImage from "../../assets/images/filtro.png";
import StarRatings from "react-star-ratings";
import { useState, useEffect } from "react";
import { Slider, Checkbox } from "@nextui-org/react";
import { getProdutos } from "../../hooks/api/produtosApi";
import { getCategorias } from "../../hooks/api/categoriasApi";
import { getSubcategorias } from "../../hooks/api/subCategoriasApi";

export default function FilterComponent({ setFilteredProducts }) {
  const [rating, setRating] = useState(0);
  const changeRating = (newRating) => setRating(newRating);

  const [preco, setPreco] = useState([0, 1000]);
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [selectedCategorias, setSelectedCategorias] = useState([]);
  const [selectedSubcategorias, setSelectedSubcategorias] = useState([]);

  const [personalizavel, setPersonalizavel] = useState(false);
  const [novo, setNovo] = useState(false);
  const [desconto, setDesconto] = useState(false);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [allProducts, setAllProducts] = useState([]);

  const fetchProdutos = async (filtro = {}) => {
    try {
      const produtosResponse = await getProdutos({
        filter: filtro,
        page,
      });

      const produtos = produtosResponse.content;

      setFilteredProducts((prevFilteredProducts) => {
        const prevIds = new Set(
          prevFilteredProducts.map((produto) => produto.id)
        );

        const newProducts = produtos.filter(
          (produto) => !prevIds.has(produto.id)
        );

        return [...prevFilteredProducts, ...newProducts];
      });

    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const applyFilters = async () => {
    const filtro = {
      nomeCategoria: selectedCategorias[0],
      nomeSubcategoria: selectedSubcategorias[0],
      precoMinimo: preco[0],
      precoMaximo: preco[1],
      isPersonalizavel: personalizavel,
      isNovo: novo,
      isDesconto: desconto,
      avaliacao: rating,
    }
    fetchProdutos(filtro);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  useEffect(() => {
    applyFilters(true);
  }, [page]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const fetchedCategorias = await getCategorias();
      setCategorias(fetchedCategorias.slice(0, 5));
    };

    fetchCategorias();
  }, []);

  useEffect(() => {
    const fetchSubcategorias = async () => {
      const fetchedSubcategorias = await getSubcategorias();
      setSubcategorias(fetchedSubcategorias.slice(0, 5));
    };

    fetchSubcategorias();
  }, []);

  const handleApplyFilters = () => {
    setPage(0);
    setHasMore(true);
    setFilteredProducts([]);
    applyFilters(true);
  };

  const handleCategoriaChange = (categoria) => {
    setSelectedCategorias((prev) =>
      prev.includes(categoria)
        ? prev.filter((cat) => cat !== categoria)
        : [...prev, categoria]
    );
  };

  const handleSubcategoriaChange = (subcategoria) => {
    setSelectedSubcategorias((prev) =>
      prev.includes(subcategoria)
        ? prev.filter((subcat) => subcat !== subcategoria)
        : [...prev, subcategoria]
    );
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
          <div>
            <Checkbox
              size="sm"
              color="danger"
              isSelected={selectedCategorias.length === 0}
              onChange={() => {
                if (selectedCategorias.length === 0) {
                  setSelectedCategorias(
                    categorias.map((cat) => cat.nomeCategoria)
                  );
                } else {
                  setSelectedCategorias([]);
                }
              }}
            >
              Todas as categorias
            </Checkbox>
            {categorias.map((cat) => (
              <Checkbox
                key={cat.idCategoria}
                size="sm"
                color="danger"
                isSelected={selectedCategorias.includes(cat.nomeCategoria)}
                onChange={() => handleCategoriaChange(cat.nomeCategoria)}
              >
                {cat.nomeCategoria}
              </Checkbox>
            ))}
          </div>
        </div>

        <div className={styles.filterSection}>
          <h3>Subcategorias</h3>
          <div>
            <Checkbox
              size="sm"
              color="danger"
              isSelected={selectedSubcategorias.length === 0} 
              onChange={() => {
                if (selectedSubcategorias.length === 0) {
                  setSelectedSubcategorias(
                    subcategorias.map((subcat) => subcat.nomeSubcategoria)
                  );
                } else {
                  setSelectedSubcategorias([]);
                }
              }}
            >
              Todas as subcategorias
            </Checkbox>
            {subcategorias.map((subcat) => (
              <Checkbox
                key={subcat.idSubcategoria}
                size="sm"
                color="danger"
                isSelected={selectedSubcategorias.includes(
                  subcat.nomeSubcategoria
                )}
                onChange={() =>
                  handleSubcategoriaChange(subcat.nomeSubcategoria)
                }
              >
                {subcat.nomeSubcategoria}
              </Checkbox>
            ))}
          </div>
        </div>

        <div className={styles.filterSection}>
          <h3>Preço</h3>
          <div className="flex flex-col gap-4 w-full h-full max-w-md items-start justify-center">
            <div>
              <p className="text-default-500 font-medium text-small">
                Preço:{" "}
                {Array.isArray(preco) &&
                  preco.map((p) => `R$ ${p}`).join(" – ")}
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

        <button
          onClick={handleApplyFilters}
          className={styles.applyFiltersButton}
        >
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
}
