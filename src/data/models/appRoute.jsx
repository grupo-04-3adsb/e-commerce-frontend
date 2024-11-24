import Home from "../../pages/Home/Home"
import NotFound404 from "../../pages/NotFound404"
import Produtos from "../../pages/Produtos/Produtos"
import React, { Suspense } from "react";
import UserInfo from "../../pages/UserInfo/UserInfo";
import InfoUsuarios from "../../pages/InfoUsuarios/InfoUsuarios";
import ProdutoDetalhes from "../../pages/ProdutoDetalhes/ProdutoDetalhes";

export const APP_ROUTES = [
    {
        path: "/infos",
        component: InfoUsuarios,
        meta: {
          breadcrumb: [{ parent: "Home", label: "Informações" }],
        }
    },
    {
        path: "/",
        component: Home,
        meta: {
          breadcrumb: [{ parent: "", label: "Home" }],
        }
    },
    {
        path: "/produtos",
        component: Produtos,
        meta: {
          breadcrumb: [{ parent: "Home", label: "Produtos" }],
        }
    },
    {
        path: "*",
        component: NotFound404,
        meta: {
          breadcrumb: [{ parent: "", label: "NotFound" }],
        }
    },
    {
        path: "/infos/edit",
        component: UserInfo,
        meta: {
          breadcrumb: [{ parent: "Informações", label: "Usuário" }],
        }
      },
      {
        path: "/produtos/:nomeProduto",
        component: ProdutoDetalhes ,
        meta: {
          breadcrumb: [{ parent: "Produtos", label: "Produto" }],
        }
      }  
]