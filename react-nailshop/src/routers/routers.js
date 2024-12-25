import HomePage from "@components/HomePage/HomePage";
import ProductDetailPage from "@pages/ProductDetailPage/ProductDetailPage";
import CartPage from "@pages/CartPage/CartPage";
import DefaultLayout from "@components/DefaultLayout/DefaultLayout";
import SearchPage from "@pages/SearchPage/SearchPage";
import AdminLayout from "@components/AdminLayout/AdminLayout";
import ProductManage from "@pages/ProductManage/ProductManage";
import ProductCreatePage from "@pages/ProductCreatePage/ProductCreatePage";
import ProductAdminDetail from "@pages/ProductAdminDetail/ProductAdminDetail";
import UserManagerPage from "@pages/UserManagerPage/UserManagerPage";
import CampaignPage from "@pages/CampaignPage/CampaignPage";
import CampaignManage from "@pages/CampaignManage/CampaignManage";
import CampaignUpdate from "@pages/CampaignUpdate/CampaignUpdate";
const routers = [
    { path: "/", component: HomePage, layout: DefaultLayout },
    { path: "/detail", component: ProductDetailPage, layout: DefaultLayout },
    { path: "/cart", component: CartPage, layout: DefaultLayout },
    { path: "/search", component: SearchPage, layout: DefaultLayout },
    { path: "/admin/products", component: ProductManage, layout: AdminLayout },
    {
        path: "admin/products/create",
        component: ProductCreatePage,
        layout: AdminLayout
    },
    {
        path: "admin/product/detail/:id",
        component: ProductAdminDetail,
        layout: AdminLayout
    },
    {
        path: "admin/users",
        component: UserManagerPage,
        layout: AdminLayout
    },
    {
        path: "admin/campaigns/create",
        component: CampaignPage,
        layout: AdminLayout
    },
    {
        path: "admin/campaigns/update/:id",
        component: CampaignUpdate,
        layout: AdminLayout
    },
    {
        path: "admin/campaigns",
        component: CampaignManage,
        layout: AdminLayout
    }
];

export default routers;
