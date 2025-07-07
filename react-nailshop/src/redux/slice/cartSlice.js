import { createSlice } from "@reduxjs/toolkit";
// Hàm helper: Lấy dữ liệu từ localStorage
const loadFromLocalStorage = (key, defaultValue) => {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : defaultValue;
};

// Hàm helper: Lưu dữ liệu vào localStorage
const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

// Khởi tạo trạng thái từ localStorage
const initialState = loadFromLocalStorage("cart", {
    list: [],
    total: 0,
    listBuy: [],
    totalCheckout: 0,
    totalAfterVoucher: 0,
    voucher: null,
    orderError: null,
    orderSuccess: null
});

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            state.orderError = null;
            state.orderSuccess = null;
            const check = state.list.findIndex(
                (order) =>
                    order.productId === action.payload.productId &&
                    order.size == action.payload.size &&
                    order.designId == action.payload.designId
            );
            if (check !== -1) {
                let currentQuantity = state.list[check].quantity;
                let newQuantity = currentQuantity + action.payload.quantity;
                console.log(action.payload);

                let maxQuantity = action.payload.stock; // Số lượng tối đa
                console.log("maxQuantity" + maxQuantity);
                if (newQuantity > maxQuantity) {
                    state.orderError =
                        "Bạn đã đạt số lượng tối đa cho sản phẩm này trong giỏ hàng!";
                    return;
                }
                state.list[check].quantity = newQuantity;
            } else {
                if (action.payload.quantity > action.payload.stock) {
                    state.orderError =
                        "Bạn không thể thêm quá số lượng tối đa vào giỏ hàng!";
                    return;
                }
                state.list.push(action.payload);
            }
            state.total = state.list.reduce((sum, product) => {
                let price =
                    product.price - product.price * 0.01 * product.discount;
                return sum + price * product.quantity;
            }, 0);
            state.orderSuccess = "Thêm vào giỏ hàng thành công";
            saveToLocalStorage("cart", state);
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
                if (state.voucher) {
                    state.totalAfterVoucher =
                        state.totalCheckout -
                        0.01 * state.voucher.amount * state.totalCheckout;
                } else {
                    state.totalAfterVoucher = state.totalCheckout;
                }
            }
            saveToLocalStorage("cart", state);
        },
        updateCartItem(state, action) {
            const check = state.list.findIndex(
                (order) =>
                    order.productId === action.payload.productId &&
                    order.size == action.payload.size &&
                    order.designId == action.payload.designId
            );
            if (check !== -1) {
                state.list[check].price = action.payload.price;
                state.list[check].discount = action.payload.discount;
            }

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
                state.listBuy[checkBuy].discount = action.payload.discount;
                state.totalCheckout = state.listBuy.reduce((sum, product) => {
                    let price =
                        product.price - product.price * 0.01 * product.discount;
                    return sum + price * product.quantity;
                }, 0);
                if (state.voucher) {
                    state.totalAfterVoucher =
                        state.totalCheckout -
                        0.01 * state.voucher.amount * state.totalCheckout;
                } else {
                    state.totalAfterVoucher = state.totalCheckout;
                }
            }
            saveToLocalStorage("cart", state);
        },
        removeItem(state, action) {
            const { productId, size, designId } = action.payload;
            console.log({ productId, size, designId });
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
                if (state.voucher) {
                    state.totalAfterVoucher =
                        state.totalCheckout -
                        0.01 * state.voucher.amount * state.totalCheckout;
                } else {
                    state.totalAfterVoucher = state.totalCheckout;
                }
            }
            saveToLocalStorage("cart", state);
        },
        changeListBuy(state, action) {
            //handle click checkbox choose buy
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
            if (state.voucher) {
                state.totalAfterVoucher =
                    state.totalCheckout -
                    0.01 * state.voucher.amount * state.totalCheckout;
            } else {
                state.totalAfterVoucher = state.totalCheckout;
            }
            saveToLocalStorage("cart", state);
        },
        resetBuyOrder(state, action) {
            if (state.listBuy.length < state.list.length) {
                state.listBuy = state.list;
                state.totalCheckout = state.total;
                if (state.voucher) {
                    state.totalAfterVoucher =
                        state.totalCheckout -
                        0.01 * state.voucher.amount * state.totalCheckout;
                } else {
                    state.totalAfterVoucher = state.totalCheckout;
                }
            } else if (state.listBuy.length === state.list.length) {
                state.listBuy = [];
                state.totalCheckout = 0;
                state.totalAfterVoucher = 0;
            }
            saveToLocalStorage("cart", state);
        },
        removeOrderCart(state, action) {
            //remove cart order checkbox choose
            state.list = state.list.filter(
                (product) =>
                    !state.listBuy.some(
                        (selected) =>
                            selected.productId === product.productId &&
                            selected.size === product.size &&
                            selected.designId === product.designId
                    )
            );

            state.listBuy = [];
            state.totalCheckout = 0;
            state.totalAfterVoucher = 0;
            state.voucher = null;
            state.total = state.list.reduce((sum, product) => {
                let price =
                    product.price - product.price * 0.01 * product.discount;
                return sum + price * product.quantity;
            }, 0);
            saveToLocalStorage("cart", state);
        },
        buyNowToCart(state, action) {
            //clic buy now so have a product buy
            state.listBuy = [];
            state.totalCheckout = 0;
            state.listBuy.push(action.payload);
            state.totalCheckout =
                (action.payload.price -
                    action.payload.price * 0.01 * action.payload.discount) *
                action.payload.quantity;
            if (state.voucher) {
                state.totalAfterVoucher =
                    state.totalCheckout -
                    0.01 * state.voucher.amount * state.totalCheckout;
            } else {
                state.totalAfterVoucher = state.totalCheckout;
            }
            saveToLocalStorage("cart", state);
        },
        applyVoucher(state, action) {
            state.voucher = action.payload;
            state.totalAfterVoucher =
                state.totalCheckout * (1 - state.voucher.amount / 100);
            saveToLocalStorage("cart", state);
        },
        removeVoucher(state) {
            state.voucher = null;
            state.totalAfterVoucher = state.totalCheckout;
            saveToLocalStorage("cart", state);
        },
        clearOrderStatus(state) {
            state.orderError = null;
            state.orderSuccess = null;
            saveToLocalStorage("cart", state);
        }
    }
});
const { actions, reducer } = cartSlice;

export const {
    addToCart,
    updateQuantity,
    removeItem,
    changeListBuy,
    resetBuyOrder,
    removeOrderCart,
    buyNowToCart,
    applyVoucher,
    removeVoucher,
    updateCartItem,
    clearOrderStatus
} = actions;

export default reducer;
