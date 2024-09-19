import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usuario: null,
  isUsuarioLogado: false,
};

const usuarioSlice = createSlice({
  name: "usuario",
  initialState,
  reducers: {
    login: (state, action) => {
      state.usuario = action.payload;
      state.isUsuarioLogado = true;
    },
    logout: (state) => {
      state.usuario = null;
      state.isUsuarioLogado = false;    
    },
  },
});

export const { login, logout } = usuarioSlice.actions;

export default usuarioSlice.reducer;
