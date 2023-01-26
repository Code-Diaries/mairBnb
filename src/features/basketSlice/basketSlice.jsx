import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    basketItem: JSON.parse(localStorage.getItem('basket')) || [],
    basketOpen: false,
    basketCount: (JSON.parse(localStorage.getItem('basket')))?.length || ""
}

const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        setBasketItem: (state, { payload }) => {

            state.basketItem = [...state.basketItem, payload]
            localStorage.setItem('basket', JSON.stringify(state.basketItem))
            console.log(state.basketItem);

        },
        setBasketCount: (state) => {

            state.basketCount = state.basketItem.length
            localStorage.setItem('basketCount', JSON.stringify(state.basketCount))
            console.log(state.basketCount);

        },
        setBasketOpen: (state) => {
            state.basketOpen = !state.basketOpen;
        },
        removeItemFromBasket: (state, { payload }) => {
            state.basketItem = state.basketItem.filter(item => item.id !== payload.id)
            localStorage.setItem('basket', JSON.stringify(state.basketItem))
            state.basketCount = state.basketItem.length
            localStorage.setItem('basketCount', JSON.stringify(state.basketCount))
        },
        clearAll: (state) => {
            state.basketItem = []
            localStorage.setItem('basket', JSON.stringify(state.basketItem))
            state.basketCount = ""
            localStorage.setItem('basketCount', JSON.stringify(state.basketCount))
        }
    }
});

export const { setBasketItem, setBasketCount, setBasketOpen, removeItemFromBasket, clearAll } = basketSlice.actions

export default basketSlice.reducer