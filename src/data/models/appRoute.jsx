import Home from "../../pages/Home/Home";
import NotFound404 from "../../pages/NotFound404";
import Produtos from "../../pages/Produtos/Produtos";
import UserInfo from "../../pages/UserInfo/UserInfo";
import Carrinho from "../../pages/Carrinho";
import ProdutoDetalhes from "../../pages/ProdutoDetalhes/ProdutoDetalhes";
import InfoUsuarios from "../../pages/InfoUsuarios/InfoUsuarios";
import ConcluirPagamento from "../../pages/ConcluirPagamento";
import ResumoPedido from "../../pages/ResumoPedido/CheckoutPedido";

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
    isVisible: false,
  },
  {
    path: "/produtos",
    component: Produtos,
    meta: {
      breadcrumb: [{ parent: "Home", label: "Produtos" }],
    },
    isVisible: false,
  },
  {
    path: "*",
    component: NotFound404,
    meta: {
      breadcrumb: [{ parent: "", label: "NotFound" }],
    },
    isVisible: true,
  },
  {
    path: "/carrinho",
    component: Carrinho,
    meta: {
      breadcrumb: [{ parent: "Produtos", label: "Carrinho" }],
    },
    isVisible: true,
  },
  {
    path: "/produtos/:productName",
    component: ProdutoDetalhes,
    meta: {
      breadcrumb: [{ parent: "Produtos", label: "Detalhes do Produto" }],
    },
    isVisible: true,
  },
  {
    path: "/produtos/pedido/concluir-pagamento/:paymentId",
    component: ConcluirPagamento,
    meta: {
      breadcrumb: [{ parent: "Carrinho", label: "Concluir pedido" }],
    },
    isVisible: true,
  },
  {
    path: "/infos/edit",
    component: UserInfo,
    meta: {
      breadcrumb: [{ parent: "Informações", label: "Usuário" }],
    },
  },
  {
    path: "/carrinho/checkout",
    component: ResumoPedido,
    meta: {
      breadcrumb: [{ parent: "Carrinho", label: "Checkout" }],
    },
    isVisible: true,
  },
];
