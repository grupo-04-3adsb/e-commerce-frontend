import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usuario: null,
  isUsuarioLogado: false,
  token: null,
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
    logout: (state) => {
      state.usuario = null;
      state.isUsuarioLogado = false;   
      state.token = null 
    },
  },
});

export const { login, logout } = usuarioSlice.actions;

export default usuarioSlice.reducer;
