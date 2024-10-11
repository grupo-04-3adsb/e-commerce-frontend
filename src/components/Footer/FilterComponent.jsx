import styles from "./FilterComponent.module.css";
import filterImage from "../../assets/images/filtro.png";
import StarRatings from "react-star-ratings";
import { useState } from "react";
import { Slider, Checkbox } from "@nextui-org/react";
import cn from "classnames";

export default function FilterComponent() {
  const [rating, setRating] = useState(0);


  const changeRating = (newRating) => {
    setRating(newRating);
  };

  

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
          <Slider
            min={0}
            max={100}
            step={1}
            defaultValue={[0, 100]}
            className={styles.slider}
          />
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
