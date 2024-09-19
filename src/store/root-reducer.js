import { combineReducers } from "@reduxjs/toolkit";
import usuarioSlice from "./slices/UsuarioAutenticado/slice";

const rootReducer = combineReducers({
  usuario: usuarioSlice
});

export default rootReducer;
