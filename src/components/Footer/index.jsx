import logo from "../../assets/images/logo_TC_atelie.png";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaTwitterSquare,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoTiktok } from "react-icons/io5";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles["contact-box"]}>
          <div className={styles["contact-text"]}>
            <h3>ENTRE EM CONTATO CONOSCO</h3>
            <p>
              TIRE QUALQUER DÚVIDA ENVIANDO UM SIMPLES EMAIL EM POUCOS SEGUNDOS
            </p>
          </div>
          <button
            onClick={() =>
              (window.location.href = "mailto:contato@tcatelie.com")
            }
          >
            CLIQUE AQUI
          </button>
        </div>
        <div className={styles["footer-top"]}>
          <div className={styles["footer-column"]}>
            <div className={styles["footer-logo"]}>
              <img src={logo} alt="Logo" />
              <span>TCAteliê</span>
            </div>
            <p className={styles["footer-description"]}>
              TCAteliê: Criando soluções inovadoras para o seu dia a dia.
              Comprometidos com a qualidade e a satisfação dos nossos clientes.
            </p>
            <div className={styles["social-media-links"]}>
              <FaFacebookSquare />
              <AiFillInstagram />
              <FaLinkedin />
              <IoLogoTiktok />
              <FaTwitterSquare />
              <FaYoutube />
            </div>
          </div>
          <div className={styles["footer-column"]}>
            <h3>Navegue</h3>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#sobre">Sobre</a>
              </li>
              <li>
                <a href="#produtos">Produtos</a>
              </li>
              <li>
                <a href="#contato">Contato</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
              <li>
                <a href="#careers">Carreiras</a>
              </li>
            </ul>
          </div>
          <div className={styles["footer-column"]}>
            <h3>Contato</h3>
            <p>
              <FaPhone /> (11) 1234-5678
            </p>
            <p>
              <FaEnvelope /> contato@tcatelie.com
            </p>
            <p>
              <FaMapMarkerAlt /> Rua Exemplo, 123, São Paulo, SP
            </p>
            <p>Horário de Funcionamento: Seg - Sex, 9h - 18h</p>
          </div>
          <div className={styles["footer-column"]}>
            <h3>Não perca nada</h3>
            <p>Inscreva-se para receber as últimas novidades e ofertas.</p>
            <form className={styles["newsletter-form"]}>
              <input type="email" placeholder="Seu email" />
              <button type="submit">Inscrever-se</button>
            </form>
          </div>
        </div>
        <div className={styles["footer-bottom"]}>
          <span>
            ©2024 TCAteliê. Todos os direitos reservados. Design e
            desenvolvimento por E-BUY.
          </span>
        </div>
      </footer>
    </>
  );
};
