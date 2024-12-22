import HomePage from "@components/HomePage/HomePage";
import ProductDetailPage from "@pages/ProductDetailPage/ProductDetailPage";
import CartPage from "@pages/CartPage/CartPage";
import DefaultLayout from "@components/DefaultLayout/DefaultLayout";
import SearchPage from "@pages/SearchPage/SearchPage";
import AdminLayout from "@components/AdminLayout/AdminLayout";
import ProductManage from "@pages/ProductManage/ProductManage";
import ProductCreatePage from "@pages/ProductCreatePage/ProductCreatePage";
import ProductAdminDetail from "@pages/ProductAdminDetail/ProductAdminDetail";
const routers = [
    { path: "/", component: HomePage, layout: DefaultLayout },
    { path: "/detail", component: ProductDetailPage, layout: DefaultLayout },
    { path: "/cart", component: CartPage, layout: DefaultLayout },
    { path: "/search", component: SearchPage, layout: DefaultLayout },
    { path: "/admin", component: ProductManage, layout: AdminLayout },
    {
        path: "admin/product/create",
        component: ProductCreatePage,
        layout: AdminLayout
    },
    {
        path: "admin/product/detail/:id",
        component: ProductAdminDetail,
        layout: AdminLayout
    }
];

export default routers;
