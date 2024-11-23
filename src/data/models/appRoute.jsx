import Home from "../../pages/Home/Home";
import NotFound404 from "../../pages/NotFound404";
import Produtos from "../../pages/Produtos/Produtos";
import UserInfo from "../../pages/UserInfo/UserInfo";
import Carrinho from "../../pages/Carrinho";
import ProdutoDetalhes from "../../pages/ProdutoDetalhes/ProdutoDetalhes";
import InfoUsuarios from "../../pages/InfoUsuarios/InfoUsuarios";

export const APP_ROUTES = [
  {
    path: "/informacoes",
    component: InfoUsuarios,
    meta: {
      breadcrumb: [{ parent: "Home", label: "Informações" }],
    },
  },
  {
    path: "/",
    component: Home,
    meta: {
      breadcrumb: [{ parent: "", label: "Home" }],
    },
  },
  {
    path: "/produtos",
    component: Produtos,
    meta: {
      breadcrumb: [{ parent: "Home", label: "Produtos" }],
    },
  },
  {
    path: "*",
    component: NotFound404,
    meta: {
      breadcrumb: [{ parent: "", label: "NotFound" }],
    },
  },
  {
    path: "/user-info",
    component: UserInfo,
    meta: {
      breadcrumb: [{ parent: "Informações", label: "Usuário" }],
    },
  },
  {
    path: "/carrinho",
    component: Carrinho,
    meta: {
      breadcrumb: [{ parent: "Home", label: "Carrinho" }],
    },
  },
  {
    path: "/produtos/:productName",
    component: ProdutoDetalhes,
    meta: {
      breadcrumb: [{ parent: "Produtos", label: "Detalhes do Produto" }],
    },
  },
];
