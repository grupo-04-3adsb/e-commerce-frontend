import styles from "./FilterComponent.module.css";
import filterImage from "../../assets/images/filtro.png";
import StarRatings from "react-star-ratings";
import { useState, useEffect } from "react";
import {
  Slider,
  Checkbox,
  Button,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { getProdutos } from "../../hooks/api/produtosApi";
import { getCategorias } from "../../hooks/api/categoriasApi";
import { getSubcategorias } from "../../hooks/api/subCategoriasApi";

export default function FilterComponent({ setFilteredProducts, setTotalProdutos }) {
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
      setTotalProdutos(produtosResponse.totalElements)

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
    };
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
          <Accordion
            className={styles.accordion}
            motionProps={{
              variants: {
                enter: {
                  y: 0,
                  opacity: 1,
                  height: "auto",
                  transition: {
                    height: {
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      duration: 1,
                    },
                    opacity: {
                      easings: "ease",
                      duration: 1,
                    },
                  },
                },
                exit: {
                  y: -10,
                  opacity: 0,
                  height: 0,
                  transition: {
                    height: {
                      easings: "ease",
                      duration: 0.25,
                    },
                    opacity: {
                      easings: "ease",
                      duration: 0.3,
                    },
                  },
                },
              },
            }}
          >
            <AccordionItem title={<h3>Categorias</h3>}>
              <div className={styles.filterSection}>
                <Checkbox
                  key={1}
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
                  <p className="text-sm">Todas as categorias</p>
                </Checkbox>
                {categorias.map((cat) => (
                  <Checkbox
                    key={cat.idCategoria}
                    size="sm"
                    color="danger"
                    isSelected={selectedCategorias.includes(cat.nomeCategoria)}
                    onChange={() => handleCategoriaChange(cat.nomeCategoria)}
                  >
                    <p className="text-sm">{cat.nomeCategoria}</p>
                  </Checkbox>
                ))}
              </div>
            </AccordionItem>
            <AccordionItem title={<h3>Subcategorias</h3>}>
              <div className={styles.filterSection}>
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
                  <p className="text-sm">Todas as subcategorias</p>
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
                    <p className="text-sm">{subcat.nomeSubcategoria}</p>
                  </Checkbox>
                ))}
              </div>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="px-2">
          <h3>Preço</h3>
          <div className="flex flex-col gap-4 w-full h-full max-w-md items-start justify-center">
            <p className="text-default-500 font-medium text-small">
              Preço:{" "}
              {Array.isArray(preco) && preco.map((p) => `R$ ${p}`).join(" – ")}
            </p>
            <Slider
              color="danger"
              size="sm"
              step={10}
              maxValue={1000}
              minValue={0}
              value={preco}
              onChange={setPreco}
              className="w-full"
            />
          </div>
        </div>

        <div className="px-2">
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

        <div className="px-2 flex flex-col">
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

        <Button
          onClick={handleApplyFilters}
          variant="solid"
          color="primary"
          size="md"
        >
          Aplicar Filtros
        </Button>
      </div>
    </div>
  );
}
