import React from 'react'

import image from '../../../assets/images/Banner-home.png'
import './banner.modules.css'

const BannerHome = () => {
  return (
    <div className='banner-container'>
      <div className='banner-content'>
        <img src={image} alt="" />
        <h1>ESCREVA SEUS SONHOS AGORA</h1>
        <button>COMPRE AGORA</button>
      </div>
    </div>
  );
};

export default BannerHome 