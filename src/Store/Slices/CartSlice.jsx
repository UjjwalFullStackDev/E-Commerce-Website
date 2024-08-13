import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // cartItem: [],
    cartItem: localStorage.getItem("cartItem")
    ? JSON.parse(localStorage.getItem("cartItem"))
    :[],
    cartTotalQty: 0,
    cartTotalPrice: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
                // state.cartItem.push(action.payload)
                // console.log(action.payload);
                const ItemIndex = state.cartItem.findIndex(
                    (item) => item.id === action.payload.id
                );

                if (ItemIndex >= 0){
                    state.cartItem[ItemIndex].cartQty +=1
                }

                else{
                    let tempProductItem = {...action.payload, cartQty: 1};
                    state.cartItem.push(tempProductItem)
                }
                localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
        },
        DecreaseCart(state, action) {
            const ItemIndex = state.cartItem.findIndex(
                (item) => item.id === action.payload.id
            );

            if (state.cartItem[ItemIndex].cartQty > 1){
                state.cartItem[ItemIndex].cartQty -=1
            }

            else if(state.cartItem[ItemIndex].cartQty ===1) {
                const nextCartItem = state.cartItem.filter(
                    (item) => item.id !== action.payload.id
                );
                state.cartItem = nextCartItem
            }
            localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
        },
        ClearCart(state, action) {
            state.cartItem = [];
            localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
        },
        RemoveItem(state, action) {
            state.cartItem = state.cartItem.filter(
                (item) => item.id !== action.payload
            )
            localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
        }
    }
})

export const {addToCart, DecreaseCart, ClearCart, RemoveItem} =cartSlice.actions
export default cartSlice.reducer;