import Slider from 'react-slick';
import Produto from '../../Card-produto/index';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ProdutosNovidade({ produtos }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: null,
        autoplaySpeed: 0,
        centerMode:  
       true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,  
      
              slidesToScroll: 1
            }
          }
        ]
      };

  return (
    <div className="carrossel">
      <Slider {...settings}>
        {produtos.map((produto) => (
          <div key={produto.id}>
            <Produto produto={produto} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ProdutosNovidade;