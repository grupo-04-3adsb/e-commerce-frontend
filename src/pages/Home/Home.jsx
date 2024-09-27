import React from 'react';
import Header from '../../components/Header/index';
import { Footer } from '../../components/Footer';
import SectionNovidades from '../../components/home-components/SectionNovidades';
import SectionProdutosMaisVendidos from '../../components/home-components/SectionProdutosMaisVendidos';
import image from '../../assets/images/image 7.png';
import './Home.css';
//import SectionCategorias from './SectionCategorias';

const Home = () => {
  return (
    <div>
      <div className="banner-principal">
        <img src={image} alt="" />
      </div>
      <SectionNovidades />
      <SectionProdutosMaisVendidos />
      {/*<SectionCategorias />*/}
      
    </div>
  );
}

export default Home;