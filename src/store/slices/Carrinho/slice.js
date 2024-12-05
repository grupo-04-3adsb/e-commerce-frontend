import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  itens: JSON.parse(localStorage.getItem("carrinho")) || [],
};

const cartSlice = createSlice({
  initialState,
  name: "carrinho",
  reducers: {
    addItemToCart: (state, action) => {
      state.itens.push(action.payload);
    },
    setCart: (state, action) => {
      state.itens = action.payload;
    },
    setIdCarrinho: (state, action) => {
      state.id = action.payload
    },
    clearCart: (state) => {
      state.itens = [];
    },
    removeItemFromCart: (state, action) => {
      state.itens = state.itens.filter(
        (item) => item.idUnico !== action.payload.idUnico
      );
    },
    updateItemQuantity: (state, action) => {
      const { idUnico, quantidade } = action.payload;
      const item = state.itens.find((item) => (item.id || item.idUnico) === idUnico);
      if (item) {
        item.quantidade = quantidade;
      }
    },    
  },
});

export const { addItemToCart, setCart, clearCart, removeItemFromCart, updateItemQuantity, setIdCarrinho } =
  cartSlice.actions;
export default cartSlice.reducer;
