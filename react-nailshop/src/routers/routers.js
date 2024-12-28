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
import AccessDeniedPage from "@pages/ErrorPage/AccessDeniedPage";
import ProfilePage from "@pages/ProfilePage/ProfilePage";
import { ROLE } from "@/constants";
const routers = [
    {
        path: "/accessdenied",
        component: HomePage,
        layout: AccessDeniedPage
    },
    {
        path: "/",
        component: HomePage,
        layout: DefaultLayout
    },
    {
        path: "/profile",
        component: ProfilePage,
        layout: DefaultLayout
    },
    {
        path: "/detail/:id",
        component: ProductDetailPage,
        layout: DefaultLayout
    },
    {
        path: "/cart",
        component: CartPage,
        layout: DefaultLayout,
        roles: [ROLE.USER]
    },
    {
        path: "/search",
        component: SearchPage,
        layout: DefaultLayout
    },
    {
        path: "/admin/products",
        component: ProductManage,
        layout: AdminLayout,
        roles: [ROLE.ADMIN, ROLE.STAFF]
    },
    {
        path: "admin/products/create",
        component: ProductCreatePage,
        layout: AdminLayout,
        roles: [ROLE.ADMIN, ROLE.STAFF]
    },
    {
        path: "admin/product/detail/:id",
        component: ProductAdminDetail,
        layout: AdminLayout,
        roles: [ROLE.ADMIN, ROLE.STAFF]
    },
    {
        path: "admin/users",
        component: UserManagerPage,
        layout: AdminLayout,
        roles: [ROLE.ADMIN]
    },
    {
        path: "admin/campaigns/create",
        component: CampaignPage,
        layout: AdminLayout,
        roles: [ROLE.ADMIN, ROLE.STAFF]
    },
    {
        path: "admin/campaigns/update/:id",
        component: CampaignUpdate,
        layout: AdminLayout,
        roles: [ROLE.ADMIN, ROLE.STAFF]
    },
    {
        path: "admin/campaigns",
        component: CampaignManage,
        layout: AdminLayout,
        roles: [ROLE.ADMIN, ROLE.STAFF]
    }
];

export default routers;
