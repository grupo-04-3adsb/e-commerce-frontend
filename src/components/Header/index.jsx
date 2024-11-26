import { Select, SelectItem } from "@nextui-org/select";
import {
  Autocomplete,
  AutocompleteItem,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import {
  Button,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";

import style from "./Navbar.module.css";

import { FaFacebook, FaInstagram, FaSearch } from "react-icons/fa";
import { BiCart, BiHeart, BiLogIn, BiLogOut, BiUser } from "react-icons/bi";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import FormComponent from "../Form";

import {
  cadastroFields,
  validaCadastroFields,
} from "../../models/forms/cadastroUsuarioFields";
import loginFields from "../../models/forms/loginUsuarioFields";

import { categoriaMocks } from "../../data/mock/categorias";
import { menuItems } from "../../data/menu";
import { moedas } from "../../data/mock/moedas";
import { idiomas } from "../../data/mock/idiomas";
import useLogin from "../../hooks/useLogin";
import useCadastroUsuario from "../../hooks/useCadastro";
import { useSelector } from "react-redux";
import useHeader from "./useHeader";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCadastroOpen, setIsCadastroOpen] = useState(false);
  const [isCadastroValido, setIsCadastroValido] = useState(false);
  const [isModalLogOutOpen, setIsModalLogOutOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    handleSubmitLogin,
    errorsLogin,
    registerLogin,
    apiLoginMessage,
    onLogout,
  } = useLogin();
  const { handleSubmit, apiCadastroMessage, errors, handleValidarUsuario } =
    useCadastroUsuario();

  const { hasMore, items, isLoading, onLoadMore, pesquisa, setPesquisa } =
    useHeader();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { isUsuarioLogado, usuario } = useSelector((state) => state.usuario);
  const [auxiliarValues, setAuxiliarValues] = useState({});

  const handleValidaCadastro = async (data) => {
    try {
      const isValid = await handleValidarUsuario(data);

      setIsCadastroValido(isValid);

      if (isValid) {
        setIsCadastroOpen(false);
      }

      setAuxiliarValues(data);
    } catch (error) {
      console.error("Erro ao validar o cadastro:", error);
    }
  };

  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    isEnabled: hasMore && isOpen,
    shouldUseLoader: false,
    onLoadMore: () => {
      onLoadMore();
    },
  });

  return (
    <nav className={style.navContainer}>
      <div className={style.mainNavbar}>
        {windowWidth >= 421 && (
          <div className={style.socialLinks}>
            <Button
              className={style.btnIcon}
              size="sm"
              color="white"
              variant="flat"
              isIconOnly
              endContent={<FaFacebook />}
            />
            <Button
              className={style.btnIcon}
              size="sm"
              color="white"
              variant="flat"
              isIconOnly
              endContent={<FaInstagram />}
            />
          </div>
        )}
        <h6>TCAteliê</h6>
        <div className={style.navActions}>
          {isUsuarioLogado ? (
            <>
              <Link to="/info-usuarios">
                <Button
                  size="sm"
                  color="white"
                  variant="flat"
                  startContent={<BiUser />}
                >
                  <span>{usuario?.usuario?.nome}</span>
                </Button>
              </Link>
            </>
          ) : (
            windowWidth >= 474 && (
              <>
                <Button
                  onClick={() => setIsLoginOpen(true)}
                  size="sm"
                  color="white"
                  variant="flat"
                  endContent={<BiLogIn />}
                >
                  Login
                </Button>
                <Button
                  onClick={() => setIsCadastroOpen(true)}
                  size="sm"
                  color="white"
                  variant="bordered"
                  endContent={<BiUser />}
                >
                  Cadastre-se
                </Button>
              </>
            )
          )}
          {isUsuarioLogado && windowWidth >= 474 && (
            <Button
              onClick={() => setIsModalLogOutOpen(true)}
              size="sm"
              color="white"
              variant="bordered"
              endContent={<BiLogOut />}
            >
              Sair
            </Button>
          )}

          <Button
            className={style.btnIcon}
            size="lg"
            color="white"
            variant="flat"
            isIconOnly
            endContent={<BiCart />}
            onClick={() => {
              window.location.href = "/carrinho";
            }}
          />
        </div>
      </div>
      <Navbar
        maxWidth="full"
        position="sticky"
        className={style.searchBar}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent
          className={windowWidth > 968 ? "sm:hidden" : ""}
          justify="start"
        >
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className={windowWidth > 968 ? "sm:hidden" : ""}
          />
        </NavbarContent>
        {windowWidth > 968 && (
          <NavbarContent className="hidden sm:flex gap-4" justify="start">
            <NavbarItem>
              <Link to="/">
                <span>Home</span>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link to="/sobre">
                <span>Sobre</span>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link to="/produtos">
                <span>Produtos</span>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Select
                size="sm"
                className={style.selectCategory}
                placeholder="Categorias"
              >
                {categoriaMocks.map((categoria) => (
                  <SelectItem key={categoria.key}>{categoria.label}</SelectItem>
                ))}
              </Select>
            </NavbarItem>
            <NavbarItem>
              <Link to="/contato">
                <span>Contato</span>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link to="/lancamentos">
                <span>Lançamentos</span>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link to="/meus-pedidos">
                <span>Meus pedidos</span>
              </Link>
            </NavbarItem>
          </NavbarContent>
        )}

        <Autocomplete
          variant="bordered"
          isLoading={isLoading}
          defaultItems={items}
          placeholder="Pesquisar produto"
          scrollRef={scrollerRef}
          fullWidth={true}
          items={items}
          selectionMode="single"
          className={style["custom-autocomplete"]}
          onOpenChange={(open) => {
            setIsOpen(open);
          }}
          onInputChange={(value) => {
            setPesquisa(value);
          }}
          onSelectionChange={(item) => {
            window.location.href = `/produtos/${item}`;
          }}
          startContent={<FaSearch />}
        >
          {(item) => (
            <AutocompleteItem key={item?.nome} className="autocomplete-item">
              <div className="flex flex-row items-center gap-4">
                <img
                  src={item?.urlProduto}
                  alt={item?.nome}
                  className="w-10 h-10 rounded-md object-cover"
                />
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-gray-800 capitalize">
                    {item?.nome} | {item?.sku}
                  </p>
                  <p className="text-xs text-gray-500">
                    R$ {item?.preco?.toFixed(2)}
                  </p>
                </div>
              </div>
            </AutocompleteItem>
          )}
        </Autocomplete>

        <NavbarMenu
          className={`${style.navbarMenu} ${
            isMenuOpen ? style.menuOpen : style.menuClosed
          }`}
        >
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                href="/home"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
          <br />
          {!isUsuarioLogado && windowWidth < 474 && (
            <>
              <Button
                onClick={() => setIsLoginOpen(true)}
                size="lg"
                color="white"
                variant="bordered"
                endContent={<BiLogIn />}
              >
                Login
              </Button>
              <Button
                onClick={() => setIsCadastroOpen(true)}
                size="lg"
                color="white"
                variant="bordered"
                endContent={<BiUser />}
              >
                Cadastre-se
              </Button>
            </>
          )}
          {isUsuarioLogado && (
            <Button
              onClick={() => setIsModalLogOutOpen(true)}
              size="sm"
              color="white"
              variant="bordered"
              endContent={<BiLogOut />}
            >
              Sair
            </Button>
          )}

          {isUsuarioLogado && windowWidth < 474 && (
            <NavbarItem>
              <Button
                className={style.btnIcon}
                size="sm"
                color="white"
                variant="flat"
                isIconOnly
                endContent={<FaFacebook />}
              />
              <Button
                className={style.btnIcon}
                size="sm"
                color="white"
                variant="flat"
                isIconOnly
                endContent={<FaInstagram />}
              />
            </NavbarItem>
          )}
        </NavbarMenu>
      </Navbar>
      <Modal
        size="sm"
        isOpen={isModalLogOutOpen}
        onClose={() => setIsModalLogOutOpen(false)}
      >
        <ModalContent>
          <ModalHeader>
            <h1>LogOut</h1>
          </ModalHeader>
          <ModalBody>
            <p>Deseja realmente sair da sua conta?</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsModalLogOutOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={onLogout}>Sair</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <FormComponent
        visible={isCadastroOpen}
        onClose={() => {
          setIsCadastroOpen(false);
        }}
        title={"Cadastro"}
        onSubmit={handleValidaCadastro}
        fields={[validaCadastroFields]}
        submitLabel={"Enviar"}
        isSocialLogin={true}
        error={errors}
        apiMessage={apiCadastroMessage}
      />
      <FormComponent
        visible={isCadastroValido}
        onClose={() => {
          setIsCadastroValido(false);
        }}
        title={"Cadastro"}
        fields={cadastroFields}
        submitLabel={"Cadastrar"}
        onSubmit={handleSubmit}
        isSocialLogin={true}
        error={errors}
        apiMessage={apiCadastroMessage}
        defaultValues={auxiliarValues}
      />
      <FormComponent
        visible={isLoginOpen}
        onClose={() => {
          setIsLoginOpen(false);
        }}
        title={"Login"}
        fields={loginFields}
        submitLabel={"Entrar"}
        onSubmit={handleSubmitLogin}
        isSocialLogin={true}
        error={errorsLogin}
        defaultValues={{}}
        register={registerLogin}
        apiMessage={apiLoginMessage}
      />
    </nav>
  );
};

export default Header;
