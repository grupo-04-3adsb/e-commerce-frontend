import { createSlice } from "@reduxjs/toolkit"

const initialState =  {
    usuario: null,
    error: null,
    isUsuarioLogado: false
}

const usuarioAutenticadoSlice = createSlice({
    name: "autenticacao",
    initialState,
    reducers: {
        loginStart(state) {
          state.error = null;
        },
        loginSuccess(state, action) {
          state.isAuthenticated = true;
          state.user = action.payload;
        },
        loginFailure(state, action) {
          state.error = action.payload;
        },
        logout(state) {
          state.user = null;
          state.isAuthenticated = false;
        }
    }
})

export const { loginStart, loginSuccess, loginFailure, logout } = usuarioAutenticadoSlice.actions;

export default usuarioAutenticadoSlice.reducer;