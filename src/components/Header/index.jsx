import { Select, SelectItem } from "@nextui-org/select";
import { Input } from "@nextui-org/react";
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
import { BiCart, BiHeart, BiLogIn, BiUser } from "react-icons/bi";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import FormComponent from "../Form";

import cadastroFields from "../../models/forms/cadastroUsuarioFields";
import loginFields from "../../models/forms/loginUsuarioFields";

import { categoriaMocks } from "../../data/mock/categorias";
import { menuItems } from "../../data/menu";
import { moedas } from "../../data/mock/moedas";
import { idiomas } from "../../data/mock/idiomas";
import useLogin from "../../hooks/useLogin";
import useCadastroUsuario from "../../hooks/useCadastro";
import { useSelector } from "react-redux";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCadastroOpen, setIsCadastroOpen] = useState(false);

  const { onSubmitLogin, handleSubmitLogin, errorsLogin, registerLogin, apiLoginMessage } =
    useLogin();
  const {
    onSubmitCadastro,
    handleSubmitCadastro,
    errorsCadastro,
    registerCadastro,
    apiCadastroMessage
  } = useCadastroUsuario();

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

  const onHandleSubmitLogin = () => {
    handleSubmitLogin(onSubmitLogin);
  };

  const onHandleSubmitCadastro = (data) => {
    handleSubmitCadastro(onSubmitCadastro);
  };

  return (
    <nav className={style.navContainer}>
      <div className={style.infobar}>
        <span className={style.deliveryInfo}>
          Realizamos entregas de <b>segunda</b> a <b>sexta</b>, das
          <b>7h às 23h</b>
        </span>
        <div className={style.selection}>
          <Select size="sm" placeholder="Idioma" variant="underlined">
            {idiomas.map((idioma) => (
              <SelectItem key={idioma.key}>{idioma.label}</SelectItem>
            ))}
          </Select>
          <Select size="sm" placeholder="Moeda" variant="underlined">
            {moedas.map((moeda) => (
              <SelectItem key={moeda.key}>{moeda.label}</SelectItem>
            ))}
          </Select>
        </div>
      </div>
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
              <Button
                size="sm"
                color="white"
                variant="flat"
                startContent={<BiUser />}
              >
                <span>{usuario.nome}</span>
              </Button>
              <Button
                className={style.btnIcon}
                size="sm"
                color="white"
                variant="flat"
                isIconOnly
                endContent={<BiHeart />}
              />
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
          <Button
            className={style.btnIcon}
            size="lg"
            color="white"
            variant="flat"
            isIconOnly
            endContent={<BiCart />}
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

        <Input
          radius="sm"
          type="search"
          placeholder="Pesquisar por produto"
          labelPlacement="outside"
          endContent={
            <FaSearch className="text-1xl text-default-500 pointer-events-none flex-shrink-0" />
          }
        />

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
          {windowWidth <= 421 && (
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
      <FormComponent
        visible={isCadastroOpen}
        onClose={() => {
          setIsCadastroOpen(false);
        }}
        title={"Cadastro"}
        fields={cadastroFields}
        submitLabel={"Cadastrar"}
        onSubmit={onHandleSubmitCadastro}
        isSocialLogin={true}
        error={errorsCadastro}
        register={registerCadastro}
        apiMessage={apiCadastroMessage}
      />
      <FormComponent
        visible={isLoginOpen}
        onClose={() => {
          setIsLoginOpen(false);
        }}
        title={"Login"}
        fields={loginFields}
        submitLabel={"Entrar"}
        onSubmit={onHandleSubmitLogin}
        isSocialLogin={true}
        error={errorsLogin}
        register={registerLogin}
        apiMessage={apiLoginMessage}
      />
    </nav>
  );
};

export default Header;
