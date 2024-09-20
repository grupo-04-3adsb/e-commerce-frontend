import { combineReducers } from "@reduxjs/toolkit";
import usuarioSlice from "./slices/UsuarioAutenticado/slice";
import loadingSlice from "./slices/Loading/slice"

const rootReducer = combineReducers({
  usuario: usuarioSlice,
  loading: loadingSlice
});

export default rootReducer;
