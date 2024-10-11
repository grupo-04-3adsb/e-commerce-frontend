import styles from "./FilterComponent.module.css";
import filterImage from "../../assets/images/filtro.png";
import StarRatings from "react-star-ratings";
import { useState } from "react";
import { Slider, Checkbox } from "@nextui-org/react";

export default function FilterComponent() {
  const [rating, setRating] = useState(0);
  const changeRating = (newRating) => {
    setRating(newRating);
  };

  const [preco, setPreco] = useState([0, 1000]);
  const [producao, setProducao] = useState([0, 1000]);
  const [lucro, setLucro] = useState([50, 150]);

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterHeader}>
        <img src={filterImage} alt="Filtro" className={styles.filterImage} />
        <h2 className={styles.filterTitle}>Filtro</h2>
      </div>
      <div className={styles.filterContent}>
        <div className={styles.filterSection}>
          <h3>Categorias</h3>
          <ul>
            <li>Todas as categorias</li>
            <li>Cadernos</li>
            <li>Topo de bolo</li>
            <li>Centro de mesa</li>
            <li>Agendas</li>
            <li>Festa</li>
            <li>Presente</li>
          </ul>
        </div>
        <div className={styles.filterSection}>
          <h3>Subcategorias</h3>
          <ul>
            <li>Todas as subcategorias</li>
            <li>Caderno argolado</li>
            <li>Caderno inteligente</li>
            <li>Caderno de espiral</li>
            <li>Calendário</li>
            <li>Presente dia dos pais</li>
          </ul>
        </div>
        <div className={styles.filterSection}>
          <h3>Material</h3>
          <ul>
            <li>Folha A4</li>
            <li>Argola</li>
            <li>Papelão</li>
            <li>Espiral</li>
            <li>Papel adesivo</li>
            <li>Folha vegetal</li>
            <li>Tubo plástico</li>
          </ul>
        </div>

        <div className={styles.filterSection}>
          <h3>Preço</h3>
          <div className="flex flex-col gap-4 w-full h-full max-w-md items-start justify-center">
            <div>
              <p className="text-default-500 font-medium text-small">
                Preço: {Array.isArray(preco) && preco.map((p) => `$${p}`).join(" – ")}
              </p>
              <Slider
                color="danger"
                size="sm"
                formatOptions={{ style: "currency", currency: "USD" }}
                step={10}
                maxValue={1000}
                minValue={0}
                value={preco}
                onChange={setPreco}
                className="max-w-md"
              />
            </div>
          </div>
        </div>
        
        <div className={styles.filterSection}>
          <h3>Avaliação</h3>
          <StarRatings
            rating={rating}
            starRatedColor="gold"
            starHoverColor="gold"
            starEmptyColor="gray"
            changeRating={changeRating}
            numberOfStars={5}
            name="rating"
            starDimension="20px"
            starSpacing="2px"
          />
        </div>

        <div className={styles.filterSection}>
          <h3>Outros</h3>
          <Checkbox
            defaultSelected
            size="sm"
            color="danger"
            className="customCheckbox"
          >
            Personalizável
          </Checkbox>
          <Checkbox size="sm" color="danger" className="customCheckbox">
            Novo
          </Checkbox>
          <Checkbox size="sm" color="danger" className="customCheckbox">
            Desconto
          </Checkbox>
        </div>
      </div>
    </div>
  );
}
