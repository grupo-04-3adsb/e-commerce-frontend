import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound404.module.css';
import bookImage from '../../assets/images/originalImage.png';

const NotFound404 = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textSection}>
        <h1 className={styles.title}>OPS!</h1>
        <h2 className={styles.subtitle}>PÁGINA NÃO ENCONTRADA</h2>
        <p className={styles.description}>
          Parece que você se perdeu, mas não se preocupe! Vamos te ajudar a voltar.
        </p>
        <Link to="/" className={styles.link}>
          Voltar Para a Home
        </Link>
      </div>
      <div className={styles.imageSection}>
        <img src={bookImage} alt="Livro 404" className={styles.image} />
      </div>
    </div>
  );
};

export default NotFound404;
