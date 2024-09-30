import React from 'react';
import { Footer } from '../../components/Footer';
import SectionNovidades from '../../components/home-components/SectionNovidades';
import SectionProdutosMaisVendidos from '../../components/home-components/SectionProdutosMaisVendidos';
import image from '../../assets/images/image 7.png';
import banner from '../../assets/images/Frame 600.png';
import './Home.css';
import SectionCategorias from '../../components/home-components/SectionCategorias';

const Home = () => {
  return (
    <div className="main-page">
      <div className="carrossel-principal">
        <img src={image} alt="" />
      </div>
      <SectionNovidades />
      <SectionProdutosMaisVendidos />
      <div className="banner">
        <img src={banner} alt="" />
      </div>
      <SectionCategorias />
    </div>
  );
}

export default Home;