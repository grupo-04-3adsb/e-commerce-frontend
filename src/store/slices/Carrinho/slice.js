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
    },
    setCart: (state, action) => {
      state.itens = action.payload;
    },
    clearCart: (state) => {
      state.itens = [];
    },
    removeItemFromCart: (state, action) => {
      state.itens = state.itens.filter(
        (item) => item.idUnico !== action.payload.idUnico && item.id !== action.payload.id
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

export const { addItemToCart, setCart, clearCart, removeItemFromCart, updateItemQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
