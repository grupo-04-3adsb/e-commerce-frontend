import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usuario: {},
  isUsuarioLogado: false,
  token: "",
};

const usuarioSlice = createSlice({
  name: "usuario",
  initialState,
  reducers: {
    login: (state, action) => {
      state.usuario = action.payload;
      state.isUsuarioLogado = true;
      state.token = action.payload

    },
    updateUsuario: (state, action) => {
      state.usuario.usuario = { ...state.usuario.usuario, ...action.payload };
    },
    logout: (state) => {
      state.usuario = null;
      state.isUsuarioLogado = false;   
      state.token = "" 
    },
  },
});

export const { login, logout, updateUsuario } = usuarioSlice.actions;

export default usuarioSlice.reducer;
