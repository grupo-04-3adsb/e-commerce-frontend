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
            <p>RUA: {rua}</p>
            <p>BAIRRO: {bairro}</p>
            <p>CIDADE: {cidade}</p>
            <p>CEP: {cep}</p>
            <button type="button" className={styles.edit}>Editar</button>
        </div>
    )
}

export default CardEndereco
