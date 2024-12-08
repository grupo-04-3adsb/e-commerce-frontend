import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import ModalEnd from "../../components/Modal-endereco/ModalEnd";
import { Button, Image, Skeleton } from "@nextui-org/react";
import useUploadImage from "../../hooks/api/useUploadImageApi";

function InfoUsuarios() {
  const { usuario } = useSelector((state) => state.usuario);
  const endereco = usuario?.usuario?.enderecos[0];
  const [imgUrl, setImgUrl] = useState(usuario?.usuario?.imgUrl);
  const { uploadImage } = useUploadImage();
  const [loading, setLoading] = useState(true);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await uploadImage(
        file,
        "usuario",
        "",
        usuario?.usuario?.idUsuario
      );
      setImgUrl(response?.url);
    } catch (error) {
      console.error("Erro ao carregar a imagem:", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="flex flex-col items-center py-8 px-4 bg-gray-50">
      <div className="flex w-full max-w-screen-xl gap-10 flex-col md:flex-row bg-white shadow-lg rounded-xl p-8">
        <div className="relative flex items-center justify-center mb-8 md:mb-0">
          <Skeleton
            isLoaded={!loading}
            animated
            width={176}
            height={176}
            css={{
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            classNames={{ base: "bg-gray-200" }}
          >
            <Image
              src={imgUrl || "/src/assets/images/default_user_img.jpg"}
              alt="Profile"
              className="w-44 rounded-full object-cover border-4 border-[#EB6D6D] shadow-md"
            />
          </Skeleton>
          <div
            className={`absolute bottom-2 right-2 bg-white z-[10] rounded-full p-2 transition-all transform ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "hover:scale-110 hover:bg-gray-200 active:scale-100"
            } focus:outline-none focus:ring-4 focus:ring-[#EB6D6D] shadow-md`}
          >
            <label
              htmlFor="file-upload"
              className={`cursor-pointer flex items-center justify-center transition-all transform ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
              }`}
            >
              <FaRegEdit
                size={28}
                color={loading ? "#A0A0A0" : "#EB6D6D"}
                className={`transition-all transform ${
                  loading ? "" : "hover:rotate-12"
                }`}
              />
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleImageChange}
              disabled={loading}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-screen-lg space-y-8 md:space-y-0 md:gap-12">
          <div className="flex flex-col items-start text-left space-y-6 w-full md:w-1/2">
            <Skeleton
              isLoaded={!loading}
              animated
              width="60%"
              height={30}
              classNames={{ base: "bg-gray-200" }}
            >
              <h2 className="text-3xl font-semibold text-gray-800 tracking-wide">
                Bem-vindo, {usuario?.usuario?.nome}
              </h2>
            </Skeleton>

            <Skeleton
              isLoaded={!loading}
              animated
              width="80%"
              height={20}
              classNames={{ base: "bg-gray-200" }}
            >
              <p className="text-lg text-gray-600">{usuario?.usuario?.email}</p>
            </Skeleton>

            <Skeleton
              isLoaded={!loading}
              animated
              width={180}
              height={40}
              classNames={{ base: "bg-gray-200" }}
            >
              <Link to="/infos/edit">
                <Button className="bg-[#EB6D6D] text-white py-3 px-16 text-lg font-semibold rounded-lg shadow-md transition-all transform hover:scale-105 hover:bg-[#d45a5a] focus:outline-none focus:ring-2 focus:ring-[#EB6D6D]">
                  Editar perfil
                </Button>
              </Link>
            </Skeleton>
          </div>

          <div className="w-full h-0.5 bg-gray-300 my-6 md:hidden" />

          <div className="flex flex-col items-start text-left space-y-6 w-full md:w-1/2">
            <Skeleton
              isLoaded={!loading}
              animated
              width="60%"
              height={30}
              classNames={{ base: "bg-gray-200" }}
            >
              <h2 className="text-3xl font-semibold text-gray-800 tracking-wide">
                Endereço:
              </h2>
            </Skeleton>

            <Skeleton
              isLoaded={!loading}
              animated
              width="80%"
              height={20}
              classNames={{ base: "bg-gray-200" }}
            >
              <div className="text-lg text-gray-600">
                <p>CEP: {endereco?.cep}</p>
              </div>
            </Skeleton>

            <Skeleton
              isLoaded={!loading}
              animated
              width={180}
              height={40}
              classNames={{ base: "bg-gray-200" }}
            >
              <ModalEnd
                endereco={endereco}
                textoBotao="Editar Endereço"
                className="bg-[#EB6D6D] text-white py-3 px-8 text-lg font-semibold rounded-lg shadow-md transition-all transform hover:scale-105 hover:bg-[#d45a5a] focus:outline-none focus:ring-2 focus:ring-[#EB6D6D]"
              />
            </Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoUsuarios;
