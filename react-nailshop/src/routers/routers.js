import HomePage from "@components/HomePage/HomePage";
import ProductDetailPage from "@pages/ProductDetailPage/ProductDetailPage";
const routers = [
    { path: "/", component: HomePage },
    { path: "/detail", component: ProductDetailPage }
];

export default routers;
