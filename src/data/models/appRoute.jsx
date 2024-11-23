import Home from "../../pages/Home/Home";
import NotFound404 from "../../pages/NotFound404";
import Produtos from "../../pages/Produtos/Produtos";
import React, { Suspense } from "react";
import UserInfo from "../../pages/UserInfo/UserInfo";
import path from "path";
import Carrinho from "../../pages/Carrinho";
import ProdutoDetalhes from "../../pages/ProdutoDetalhes/ProdutoDetalhes";

export const APP_ROUTES = [
  {
    path: "/informacoes",
    component: () => <h1>Informações</h1>,
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
    path: "/produtos/*",
    component: ProdutoDetalhes,
    meta: {
      breadcrumb: [{ parent: "Produtos", label: "Detalhes do Produto" }],
    },
  },
];
