import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items: JSON.parse(localStorage.getItem('carrinho')) || [],
}

const cartSlice = createSlice({
    initialState,
    name: 'cart',
    reducers: {}
})