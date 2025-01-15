import HomePage from "@components/HomePage/HomePage";
import ProductDetailPage from "@pages/ProductDetailPage/ProductDetailPage";
import CartPage from "@pages/CartPage/CartPage";
import CheckoutPage from "@pages/CheckoutPage/CheckoutPage";
import OrderResultPage from "@pages/OrderResultPage/OrderResultPage";
import PaymentPage from "@pages/PaymentPage/PaymentPage";
import DefaultLayout from "@components/DefaultLayout/DefaultLayout";
import SearchPage from "@pages/SearchPage/SearchPage";
import AdminLayout from "@components/AdminLayout/AdminLayout";
import ProductManage from "@pages/ProductManage/ProductManage";
import NewsPage from "@pages/NewsPage/NewsPage";
import NewsDetailPage from "@pages/NewsDetailPage/NewsDetailPage";
import OrderManage from "@pages/OrderManage/OrderManage";
import ShopManage from "@pages/ShopManage/ShopManage";
import TicketManagePage from "@pages/TicketManagePage/TicketManagePage";
import TicketCreatePage from "@pages/TicketCreatePage/TicketCreatePage";
import Dashboard from "@pages/Dashboard/Dashboard";

import SettingShopPage from "@pages/SettingShopPage/SettingShopPage";
import PostCreatePage from "@pages/PostCreatePage/PostCreatePage";
import PostEditPage from "@pages/PostEditPage/PostEditPage";
import PostManagePage from "@pages/PostManagePage/PostManagePage";
import ProductCreatePage from "@pages/ProductCreatePage/ProductCreatePage";
import ProductAdminDetail from "@pages/ProductAdminDetail/ProductAdminDetail";
import UserManagerPage from "@pages/UserManagerPage/UserManagerPage";
import UserEditPage from "@pages/UserEditPage/UserEditPage";
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
        layout: DefaultLayout,
        roles: [ROLE.USER, ROLE.ADMIN, ROLE.STAFF]
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
        path: "/checkout",
        component: CheckoutPage,
        layout: DefaultLayout,
        roles: [ROLE.USER]
    },
    {
        path: "/order-result",
        component: OrderResultPage,
        layout: DefaultLayout,
        roles: [ROLE.USER]
    },
    {
        path: "/blog",
        component: NewsPage,
        layout: DefaultLayout
    },
    {
        path: "/blog/:id",
        component: NewsDetailPage,
        layout: DefaultLayout
    },
    {
        path: "/payment",
        component: PaymentPage,
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
        path: "/admin/orders",
        component: OrderManage,
        layout: AdminLayout,
        roles: [ROLE.ADMIN, ROLE.STAFF]
    },
    {
        path: "/admin/analytics",
        component: Dashboard,
        layout: AdminLayout,
        roles: [ROLE.ADMIN, ROLE.STAFF]
    },
    {
        path: "/admin/shop",
        component: ShopManage,
        layout: AdminLayout,
        roles: [ROLE.ADMIN, ROLE.STAFF]
    },
    {
        path: "/admin/setting",
        component: SettingShopPage,
        layout: AdminLayout,
        roles: [ROLE.ADMIN, ROLE.STAFF]
    },
    {
        path: "/admin/post/create",
        component: PostCreatePage,
        layout: AdminLayout,
        roles: [ROLE.ADMIN, ROLE.STAFF]
    },
    {
        path: "/admin/post/edit/:id",
        component: PostEditPage,
        layout: AdminLayout,
        roles: [ROLE.ADMIN, ROLE.STAFF]
    },
    {
        path: "/admin/post/manage",
        component: PostManagePage,
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
        path: "admin/users/edit/:id",
        component: UserEditPage,
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
    },
    {
        path: "admin/ticket/manage",
        component: TicketManagePage,
        layout: AdminLayout,
        roles: [ROLE.ADMIN, ROLE.STAFF]
    },
    {
        path: "admin/ticket/create",
        component: TicketCreatePage,
        layout: AdminLayout,
        roles: [ROLE.ADMIN, ROLE.STAFF]
    }
];

export default routers;
