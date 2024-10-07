import React from 'react';
import SectionNovidades from '../../components/home-components/SectionNovidades';
import SectionProdutosMaisVendidos from '../../components/home-components/SectionProdutosMaisVendidos';
import image from '../../assets/images/image 7.png';
import './Home.css';
import SectionCategorias from '../../components/home-components/SectionCategorias';
import BannerHome from '../../components/home-components/banner';

const Home = () => {
  return (
    <div className="main-page">
      <div className="carrossel-principal">
        <img src={image} alt="" />
      </div>
      <SectionNovidades />
      <SectionProdutosMaisVendidos />
      <BannerHome />
      <SectionCategorias />
    </div>
  );
}

export default Home;