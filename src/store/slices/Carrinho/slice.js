import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itens: JSON.parse(localStorage.getItem("carrinho")) || [],
};

const cartSlice = createSlice({
  initialState,
  name: "carrinho",
  reducers: {
    addItemToCart: (state, action) => {
      state.itens.push(action.payload);
      localStorage.setItem("carrinho", JSON.stringify(state.itens)); 
    },
    setCart: (state, action) => {
      state.itens = action.payload;
      localStorage.setItem("carrinho", JSON.stringify(state.itens)); 
    },
    clearCart: (state) => {
      state.itens = [];
      localStorage.removeItem("carrinho"); 
    },
    removeItemFromCart: (state, action) => {
      console.log("Removendo item do carrinho:", action);
      state.itens = state.itens.filter((item) => item.produto.nome !== action.payload.produto.nome);
      localStorage.setItem("carrinho", JSON.stringify(state.itens)); 
    },
  },
});

export const { addItemToCart, setCart, clearCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;