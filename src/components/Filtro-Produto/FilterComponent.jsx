import { useState, useEffect } from "react";
import filterImage from "../../assets/images/filtro.png";
import StarRatings from "react-star-ratings";
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

export default function FilterComponent({
  setFilteredProducts,
  setTotalProdutos,
  setIsLoading,
}) {
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
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const fetchProdutos = async (filtro = {}) => {
    try {
      setIsLoading(true);

      const { sortBy, sortOrder, ...rest } = filtro;

      const produtosResponse = await getProdutos({
        filter: rest,
        page,
        size: 10,
        sortBy,
        sortOrder,
      });

      const produtos = produtosResponse.content;
      setTotalProdutos(produtosResponse.totalElements);

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
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = async () => {
    const filtro = {
      nomeCategoria: selectedCategorias.length > 0 ? selectedCategorias[0] : undefined,
      nomeSubcategoria: selectedSubcategorias.length > 0 ? selectedSubcategorias[0] : undefined,
      precoMinimo: preco[0],
      precoMaximo: preco[1],
      isPersonalizavel: personalizavel,
      isNovo: novo,
      isDesconto: desconto,
      avaliacao: rating,
      sortBy,
      sortOrder,
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
    applyFilters();
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
    applyFilters();
  };

  const handleCategoriaChange = (categoria) => {
    setSelectedCategorias((prev) =>
      prev.includes(categoria) ? [] : [categoria]
    );
  };

  const handleSubcategoriaChange = (subcategoria) => {
    setSelectedSubcategorias((prev) =>
      prev.includes(subcategoria) ? [] : [subcategoria]
    );
  };

  const handleOutrosChange = (filterName) => {
    const isSorting = filterName.includes("-");
    const newState = {
      personalizavel: false,
      novo: false,
      desconto: false,
      sortBy: "",
      sortOrder: "",
    };
  
    if (isSorting) {
      const [newSortBy, newSortOrder] = filterName.split("-");
      newState.sortBy = sortBy === newSortBy && sortOrder === newSortOrder ? "" : newSortBy;
      newState.sortOrder = sortBy === newSortBy && sortOrder === newSortOrder ? "" : newSortOrder;
    } else {
      newState[filterName] = !eval(filterName);
    }
  
    setPersonalizavel(newState.personalizavel);
    setNovo(newState.novo);
    setDesconto(newState.desconto);
    setSortBy(newState.sortBy);
    setSortOrder(newState.sortOrder);
  };
  

  return (
    <div className="flex flex-col gap-5 p-5 min-w-[314.77px] shadow-md rounded-md">
      <div className="flex items-center gap-2">
        <img src={filterImage} alt="Filtro" className="w-6 h-6" />
        <h2 className="text-xl font-bold text-gray-800">Filtro</h2>
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <Accordion className="w-full">
            <AccordionItem
              title={<h3 className="text-lg font-bold">Categorias</h3>}
            >
              <div className="flex flex-col gap-3">
                <Checkbox
                  size="sm"
                  color="danger"
                  isSelected={selectedCategorias.length === 0}
                  onChange={() => setSelectedCategorias([])}
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
            <AccordionItem
              title={<h3 className="text-lg font-bold">Subcategorias</h3>}
            >
              <div className="flex flex-col gap-3">
                <Checkbox
                  size="sm"
                  color="danger"
                  isSelected={selectedSubcategorias.length === 0}
                  onChange={() => setSelectedSubcategorias([])}
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
          <h3 className="text-lg font-bold">Preço</h3>
          <div className="flex flex-col gap-4 w-full max-w-md">
            <p className="text-sm text-gray-500 font-medium">
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
          <h3 className="text-lg font-bold">Avaliação</h3>
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
          <h3 className="text-lg font-bold">Outros</h3>
          <div className="flex flex-col gap-2">
            <div>
              <Checkbox
                isSelected={personalizavel}
                size="sm"
                color="danger"
                onChange={() => handleOutrosChange("personalizavel")}
              >
                Personalizável
              </Checkbox>
            </div>
            <div>
              <Checkbox
                isSelected={novo}
                size="sm"
                color="danger"
                onChange={() => handleOutrosChange("novo")}
              >
                Novo
              </Checkbox>
            </div>
            <div>
              <Checkbox
                isSelected={desconto}
                size="sm"
                color="danger"
                onChange={() => handleOutrosChange("desconto")}
              >
                Desconto
              </Checkbox>
            </div>
            <div>
              <Checkbox
                isSelected={sortBy === "nome" && sortOrder === "asc"}
                size="sm"
                color="danger"
                onChange={() => handleOutrosChange("nome-asc")}
              >
                Nome do produto (A - Z)
              </Checkbox>
            </div>
            <div>
              <Checkbox
                isSelected={sortBy === "nome" && sortOrder === "desc"}
                size="sm"
                color="danger"
                onChange={() => handleOutrosChange("nome-desc")}
              >
                Nome do produto (Z - A)
              </Checkbox>
            </div>
            <div>
              <Checkbox
                isSelected={sortBy === "preco" && sortOrder === "asc"}
                size="sm"
                color="danger"
                onChange={() => handleOutrosChange("preco-asc")}
              >
                Preço (Menor - Maior)
              </Checkbox>
            </div>
            <div>
              <Checkbox
                isSelected={sortBy === "preco" && sortOrder === "desc"}
                size="sm"
                color="danger"
                onChange={() => handleOutrosChange("preco-desc")}
              >
                Preço (Maior - Menor)
              </Checkbox>
            </div>
          </div>
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
