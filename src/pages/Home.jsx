import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionNovidades from '../components/home-components/SectionNovidades';
import SectionProdutosMaisVendidos from '../components/home-components/SectionProdutosMaisVendidos';
import SectionCategorias from './SectionCategorias';

function Home() {
  return (
    <div>
      <Header />
      <img src="./assets/images/image 7.png" alt="" />
      <SectionNovidades />
      <SectionProdutosMaisVendidos />
      <SectionCategorias />
      <Footer />
    </div>
  );
}

export default Home;