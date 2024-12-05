import styles from "./CardEndereco.module.css"
import ModalEnd from "../../components/Modal-endereco/ModalEnd.jsx";

const CardEndereco = ({
    endereco}) => {
    return (
        <div className={styles.addressCard}>
            <div className={styles.addressHeader}>
                <span>Casa</span>
                <span className={styles.default}>Padrão</span>
            </div>
            <p>RUA: {endereco.rua}</p>
            <p>BAIRRO: {endereco.bairro}</p>
            <p>CIDADE: {endereco.cidade}</p>
            <p>CEP: {endereco.cep}</p>
            <ModalEnd endereco={endereco} textoBotao={"Editar"} className={styles.edit} isEditando={true}/>
        </div>
    )
}

export default CardEndereco
