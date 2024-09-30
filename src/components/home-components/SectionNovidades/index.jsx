import Produto from '../../Card-produto/index';
import Objprodutos from '../../../mock/cardProduto';
import '../SectionNovidades/SectionNovidades.modules.css';

const ProdutosNovidade = ()=> {

  return (
    <div className="bannerNovidade">
      <div className="top-card">
        <div className="today">
          <p>NOVIDADES</p>
        </div>
        <div className="ver-mais">
          <a href="#">VER MAIS</a>
        </div>
      </div>
      <div className="cards">
        <Produto produto={Objprodutos.produto1} />
        <Produto produto={Objprodutos.produto2} />
        <Produto produto={Objprodutos.produto3} />
        <Produto produto={Objprodutos.produto4} />
      </div>
    </div>
  );
}

export default ProdutosNovidade;