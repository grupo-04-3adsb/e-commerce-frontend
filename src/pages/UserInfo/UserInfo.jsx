// import AppBreadcrumb from "../../components/CustomBreadCrumbs/BreadCrumbs";
import styles from "./UserInfo.module.css"

function UserInfo() {
  return (
    
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <h2>Informações do usuário</h2>
        <form>
          <div className={styles.campo}>
            <label>Nome</label>
            <input type="text" value="XPTO" disabled />
          </div>

          <div className={styles.campo}>
              <label>Email</label>
              <input type="email" value="mail@mail.com" disabled />
          </div>

          <div className={styles.campo}>
            <label>CPF</label>
            <input type="text" value="123.456.912-03" disabled />
          </div>

          <div className={styles.campo}>
            <label>Data de Nascimento</label>
            <input type="date" value="2005-01-01" disabled />
          </div>

          <div className={styles.campo}>
            <label>Gênero</label>
            <input type="text" value="Masculino" disabled />
          </div>

          <div className={styles.buttons}>
            <button type="button" className={styles.delete}>Encerrar Conta</button>
            <button type="button" className={styles.update}>Atualizar informações</button>
          </div>
        </form>
      </div>

      <div className={styles.addresses}>
        <h2>Endereços cadastrados</h2>
        <div className={styles.addressCard}>
          <div className={styles.addressHeader}>
            <span>Casa</span>
            <span className={styles.default}>Padrão</span>
          </div>
          <p>Rua XPTO</p>
          <p>Bairro XPTO</p>
          <p>Cidade XPTO</p>
          <p>CEP XPTO</p>
          <button type="button" className={styles.edit}>Editar</button>
        </div>

        {/* Repita o bloco acima para outros endereços */}
        
        <button type="button" className={styles.addAddress}>Cadastrar endereço</button>
      </div>
    </div>
  );
}
  
  export default UserInfo;