import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        list: [],
        total: 0
    },
    reducers: {
        addToCart(state, action) {
            const check = state.list.findIndex(
                (order) =>
                    order.productId === action.payload.productId &&
                    order.size == action.payload.size &&
                    order.designId == action.payload.designId
            );
            if (check !== -1) {
                state.list[check].quantity += action.payload.quantity;
            } else {
                state.list.push(action.payload);
            }
            state.total = state.list.reduce((sum, product) => {
                let price =
                    product.price - product.price * 0.01 * product.discount;
                return sum + price;
            }, 0);
        },
        updateQuantity(state, action) {
            const check = state.list.findIndex(
                (product) => product.key === action.payload.key
            );
            if (check !== -1) {
                state.list[check].quantity += action.payload.quantity;
            }
            state.total = state.list.reduce((sum, product) => {
                let price =
                    product.price - product.price * 0.01 * product.discount;
                return sum + price;
            }, 0);
        }
    }
});
const { actions, reducer } = cartSlice;

export const { addToCart, updateQuantity } = actions;

export default reducer;
