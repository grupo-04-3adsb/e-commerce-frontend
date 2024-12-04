import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./InfoUsuarios.module.css";
import { FaRegEdit } from "react-icons/fa";
import ModalEnd from "../../components/Modal-endereco/ModalEnd";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
} from "@nextui-org/react";
import useUploadImage from "../../hooks/api/useUploadImageApi";
import usePedidoApi from "../../hooks/api/usePedidosApi";
import { useToast } from "../../context/ToastContext";

function InfoUsuarios() {
  const { usuario } = useSelector((state) => state.usuario);
  const { carregarUltimoPedido } = usePedidoApi();
  const endereco = usuario?.usuario?.enderecos[0];
  const [imgUrl, setImgUrl] = useState(usuario?.usuario?.imgUrl);
  const { uploadImage } = useUploadImage();
  const toast = useToast();
  const [pedido, setPedido] = useState({});

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    console.log(usuario);

    try {
      const response = await uploadImage(
        file,
        "usuario",
        "",
        usuario?.usuario?.idUsuario
      );
    } catch (error) {}
  };

  const fetchData = async () => {
    try {
      const response = await carregarUltimoPedido();
      console.log(response.data);
      setPedido(response.data);
    } catch (error) {
      toast.error("Erro ao buscar último pedido");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.infoUsuariosPage}>
      <div className={styles.mainContent}>
        <div className={styles.profilePicContainer}>
          <img src={imgUrl} alt="Profile" className={styles.profilePic} />
          <div className={styles.editIcon}>
            <label htmlFor="file-upload" className={styles.fileUploadLabel}>
              <FaRegEdit size={24} color="#EB6D6D" />
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
            <h2 className={styles.boldText}>
              Bem-vindo, {usuario?.usuario?.nome}
            </h2>
            <p>{usuario?.usuario?.email}</p>
            <Link to="/infos/edit">
              <Button className={styles.customButton}>Editar perfil</Button>
            </Link>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.addressSection}>
            <h2 className={styles.boldText}>Endereço:</h2>
            <div className={styles.addressInfo}>
              <p>CEP: {endereco?.cep}</p>
            </div>
            <ModalEnd
              endereco={endereco}
              textoBotao={"Editar Endereço"}
              className={styles.customButton}
            />
          </div>
        </div>
      </div>
      <Divider orientation="horizontal" className="w-[90%] mt-10 bg-[#6666]" />
      <div className="flex flex-col w-[90%] mt-10">
        <div className="w-full flex flex-row justify-between">
          <h3 className="text-[1.5rem] font-bold text-[#121212]">
            Últimos pedidos
          </h3>
          <Button variant="faded" color="danger">
            Ver todos
          </Button>
        </div>
        <Card className="mt-5">
          <CardHeader className="w-full justify-between">
            <p className="text-sm font-bold">N° {pedido.id}</p>
            <p className="text-sm font-bold ">{pedido.dataPedido}</p>
          </CardHeader>
          <Divider orientation="horizontal" />
          <CardBody>
            <div className="flex flex-row justify-between items-center">
              <p
                className="
              text-sm font-bold
              "
              >
                Status pedido: {pedido.status}
              </p>
              <Button variant="bordered" color="danger">
                Ver Detalhes
              </Button>
            </div>
            <div className="flex flex-row flex-wrap gap-2">
              {pedido?.itens
                ? pedido?.itens.map((item, index) => (
                    <div className="flex flex-row gap-2 p-4">
                      <Image src={item.produto.urlProduto} width={130} />
                      <div className="flex flex-col p-2">
                        <p>{item?.produto?.nome}</p>
                        <p className="font-bold">
                          Quantidade: {item?.quantidade}
                        </p>
                        <p>Preço unitário: R${item.valor}</p>
                        <p>
                          Desconto: - <span className="text-green-600 font-bold">R${item.valorDesconto}</span>
                        </p>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default InfoUsuarios;
