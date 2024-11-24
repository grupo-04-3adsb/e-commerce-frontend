import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./InfoUsuarios.module.css";
import { FaRegEdit } from "react-icons/fa";
import ModalEnd from "../../components/Modal-endereco/ModalEnd";
import { Button } from "@nextui-org/react";
import { updateImageUrl } from "../../hooks/api/usuarioApi"; 

function InfoUsuarios() {
  const { usuario } = useSelector((state) => state.usuario);
  const endereco = usuario?.usuario?.enderecos[0];
  const [imgUrl, setImgUrl] = useState(usuario?.usuario?.imgUrl);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch('/api/uploadImage', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      const newImgUrl = data.url; 

      setImgUrl(newImgUrl);

      await updateImageUrl(usuario?.usuario?.id, newImgUrl);

      alert("Imagem atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar imagem:", error);
      alert("Erro ao atualizar imagem.");
    }
  };

  return (
    <div className={styles.infoUsuariosPage}>
      <div className={styles.breadcrumb}>
        <a href="/">Home</a> &gt; <span>Informações</span>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.profilePicContainer}>
          <img
            src={imgUrl}
            alt="Profile"
            className={styles.profilePic}
          />
          <div className={styles.editIcon}>
            <label htmlFor="file-upload" className={styles.fileUploadLabel}>
              <FaRegEdit size={24} color="#EB6D6D"/>
            </label>
            <input
              id="file-upload"
              type="file"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.profileSection}>
            <h2 className={styles.boldText}>Bem-vindo, {usuario?.usuario?.nome}</h2>
            <p>{usuario?.usuario?.email}</p>
            <Button className={styles.customButton}>
              Editar perfil
            </Button>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.addressSection}>
            <h2 className={styles.boldText}>Endereço:</h2>
            <div className={styles.addressInfo}>
              <p>CEP: {endereco?.cep}</p>
            </div>
            <ModalEnd endereco={endereco} textoBotao={"Editar Endereço"} className={styles.customButton} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoUsuarios;
