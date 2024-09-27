import Produto from '../../Card-produto/index';
import Objprodutos from '../../../mock/cardProduto';
import '../SectionProdutosMaisVendidos/SectionProdutosMaisVendidos.modules.css';

const ProdutosMaisVendidos = ()=> {

  return (
    <div className="bannerNovidade">
      <div className="top-card">
        <div className="produtos-mais-vendidos">
          <p>OS MELHORES</p>
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
        <Produto produto={Objprodutos.produto5} />
      </div>
    </div>
  );
}

export default ProdutosMaisVendidos;