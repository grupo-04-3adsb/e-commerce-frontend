import { BiHome, BiSolidLockAlt } from "react-icons/bi";
import { FaUser, FaUserCog } from "react-icons/fa";

import Home from "../pages/Home/Home";
import ConfiguracaoUsuario from "../pages/ConfiguracaoUsuario";
import NotFound404 from "../pages/NotFound404";
import path from "path";
import MercadoPagoApiComponent from "../components/MercadoPagoApiComponent";

export const APP_ROUTES = [
  {
    path: "/",
    component: Home,
    meta: {
      breadcrumb: [{ parent: "", label: "Home" }],
    },
    icon: BiHome,
    visible: false,
  },
  {
    path: "/usuario",
    component: () => <h1>Usuário</h1>,
    meta: {
      breadcrumb: [{ parent: "Home", label: "Informações" }],
      session: "Principal",
    },
    icon: FaUser,
    visible: true,
  },
  {
    path: "/usuario/configuracao",
    component: ConfiguracaoUsuario,
    meta: {
      breadcrumb: [{ parent: "Informações", label: "Usuário" }],
      session: "Principal",
    },
    icon: FaUserCog,
    visible: true,
  },
  {
    path: "/pagamento/mercado-pago",
    component: MercadoPagoApiComponent,
    meta: {
      breadcrumb: [{ parent: "Home", label: "Pagamento" }],
    },
    icon: BiSolidLockAlt,
    visible: true,
  }
];
