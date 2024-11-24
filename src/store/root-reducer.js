import { combineReducers } from "@reduxjs/toolkit";
import usuarioSlice from "./slices/UsuarioAutenticado/slice";
import loadingSlice from "./slices/Loading/slice";
import cartSlice from "./slices/Carrinho/slice";

const rootReducer = combineReducers({
  usuario: usuarioSlice,
  loading: loadingSlice,
  carrinho: cartSlice,
});

export default rootReducer;
