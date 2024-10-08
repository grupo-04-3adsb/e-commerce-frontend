import Produto from '../../Card-produto/index';
import Objprodutos from '../../../mock/cardProduto';
import '../SectionNovidades/SectionNovidades.modules.css';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProdutosNovidade = ()=> {

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    arrows: true,
    dots: true,
    centerMode: true,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: false,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerMode: true,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          centerMode: true,
          slidesToScroll: 1
        }
      }
    ]
  };

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
        <Slider {...settings}>
          {Object.keys(Objprodutos).map((key, index) => (
            <Produto key={index} produto={Objprodutos[key]} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default ProdutosNovidade;