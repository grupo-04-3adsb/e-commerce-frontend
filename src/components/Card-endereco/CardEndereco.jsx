import styles from "./CardEndereco.module.css"

const CardEndereco = ({
    rua,
    bairro,
    cidade,
    cep }) => {
    return (
        <div className={styles.addressCard}>
            <div className={styles.addressHeader}>
                <span>Casa</span>
                <span className={styles.default}>Padrão</span>
            </div>
            <p>{rua}</p>
            <p>{bairro}</p>
            <p>{cidade}</p>
            <p>{cep}</p>
            <button type="button" className={styles.edit}>Editar</button>
        </div>
    )
}

export default CardEndereco
