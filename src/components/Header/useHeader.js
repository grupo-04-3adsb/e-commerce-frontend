import { useEffect, useState } from "react";
import useProdutosApi from "../../hooks/api/useProdutosApi";

const useHeader = () => {
  const { pesquisarProdutoSkuNome } = useProdutosApi();

  const [pesquisa, setPesquisa] = useState("");
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    try {
      setIsLoading(true);
      const res = await pesquisarProdutoSkuNome({
        pesquisa,
        page: offset,
        size: limit,
      });

      setItems((prevItems) => {
        const newItems = res?.content || [];
        const filteredItems = newItems.filter(
          (newItem) => !prevItems.some((prevItem) => prevItem.id === newItem.id)
        );
        return [...prevItems, ...filteredItems];
      });
      setHasMore(res?.next !== null);
    } catch (error) {
      console.error("Erro no loadMore:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMore();
  }, [pesquisa, offset]);

  useEffect(() => {
    setItems([]);
    setOffset(0);
  }, [pesquisa]);

  const onLoadMore = () => {
    const newOffset = offset + 1;
    setOffset(newOffset);
  };

  return {
    hasMore,
    items,
    onLoadMore,
    pesquisa,
    setPesquisa,
    isLoading,
  };
};

export default useHeader;
