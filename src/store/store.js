import { configureStore } from "@reduxjs/toolkit";
import usuarioAutenticadoReducer from "./slices/UsuarioAutenticado/index"

export const store = configureStore({
    reducer: usuarioAutenticadoReducer
})