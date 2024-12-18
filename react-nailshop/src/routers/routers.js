import HomePage from "@components/HomePage/HomePage";
import ProductDetailPage from "@pages/ProductDetailPage/ProductDetailPage";
import CartPage from "@pages/CartPage/CartPage";
import DefaultLayout from "@components/DefaultLayout/DefaultLayout";

const routers = [
    { path: "/", component: HomePage, layout: DefaultLayout },
    { path: "/detail", component: ProductDetailPage, layout: DefaultLayout },
    { path: "/cart", component: CartPage, layout: DefaultLayout }
];

export default routers;
