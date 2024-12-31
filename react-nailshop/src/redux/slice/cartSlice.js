import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        list: [],
        total: 0,
        listBuy: [],
        totalCheckout: 0
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
                return sum + price * product.quantity;
            }, 0);
        },
        updateQuantity(state, action) {
            const check = state.list.findIndex(
                (order) =>
                    order.productId === action.payload.productId &&
                    order.size == action.payload.size &&
                    order.designId == action.payload.designId
            );
            if (check !== -1) {
                state.list[check].quantity = action.payload.quantity;
            }
            console.log(action.payload);

            state.total = state.list.reduce((sum, product) => {
                let price =
                    product.price - product.price * 0.01 * product.discount;
                return sum + price * product.quantity;
            }, 0);

            //buy list
            const checkBuy = state.listBuy.findIndex(
                (order) =>
                    order.productId === action.payload.productId &&
                    order.size == action.payload.size &&
                    order.designId == action.payload.designId
            );
            if (checkBuy !== -1) {
                state.listBuy[checkBuy].quantity = action.payload.quantity;
                state.totalCheckout = state.listBuy.reduce((sum, product) => {
                    let price =
                        product.price - product.price * 0.01 * product.discount;
                    return sum + price * product.quantity;
                }, 0);
            }
        },
        removeItem(state, action) {
            const { productId, size, designId } = action.payload;
            state.list = state.list.filter(
                (product) =>
                    product.productId !== productId ||
                    product.size !== size ||
                    product.designId !== designId
            );
            state.total = state.list.reduce((sum, product) => {
                let price =
                    product.price - product.price * 0.01 * product.discount;
                return sum + price * product.quantity;
            }, 0);

            //checkBuy
            const checkBuy = state.listBuy.findIndex(
                (order) =>
                    order.productId === action.payload.productId &&
                    order.size == action.payload.size &&
                    order.designId == action.payload.designId
            );
            if (checkBuy !== -1) {
                state.listBuy = state.listBuy.filter(
                    (product) =>
                        product.productId !== productId ||
                        product.size !== size ||
                        product.designId !== designId
                );
                state.totalCheckout = state.listBuy.reduce((sum, product) => {
                    let price =
                        product.price - product.price * 0.01 * product.discount;
                    return sum + price * product.quantity;
                }, 0);
            }
        },
        changeListBuy(state, action) {
            const check = state.listBuy.findIndex(
                (order) =>
                    order.productId === action.payload.productId &&
                    order.size == action.payload.size &&
                    order.designId == action.payload.designId
            );
            if (check !== -1) {
                state.listBuy = state.listBuy.filter(
                    (product) =>
                        product.productId !== action.payload.productId ||
                        product.size !== action.payload.size ||
                        product.designId !== action.payload.designId
                );
            } else {
                state.listBuy.push(action.payload);
            }
            state.totalCheckout = state.listBuy.reduce((sum, product) => {
                let price =
                    product.price - product.price * 0.01 * product.discount;
                return sum + price * product.quantity;
            }, 0);
        }
    }
});
const { actions, reducer } = cartSlice;

export const { addToCart, updateQuantity, removeItem, changeListBuy } = actions;

export default reducer;
