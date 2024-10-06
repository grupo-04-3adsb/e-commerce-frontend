import Produto from '../../Card-produto/index';
import Objprodutos from '../../../mock/cardProduto';
import '../SectionProdutosMaisVendidos/SectionProdutosMaisVendidos.modules.css';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/bundle';

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
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={4}
        navigation
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        >
        <SwiperSlide><Produto produto={Objprodutos.produto1} /></SwiperSlide>
        <SwiperSlide><Produto produto={Objprodutos.produto2} /></SwiperSlide>
        <SwiperSlide><Produto produto={Objprodutos.produto3} /></SwiperSlide>
        <SwiperSlide><Produto produto={Objprodutos.produto4} /></SwiperSlide>
        <SwiperSlide><Produto produto={Objprodutos.produto4} /></SwiperSlide>
        <SwiperSlide><Produto produto={Objprodutos.produto4} /></SwiperSlide>
        <SwiperSlide><Produto produto={Objprodutos.produto4} /></SwiperSlide> 
        </Swiper>
      </div>
    </div>
  );
}

export default ProdutosMaisVendidos;