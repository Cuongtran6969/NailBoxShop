import { GoHomeFill } from "react-icons/go";
import { HiOutlineUsers } from "react-icons/hi2";
import { BsCart3 } from "react-icons/bs";
import { GrAnalytics } from "react-icons/gr";
import { FiBox } from "react-icons/fi";
import { IoStorefrontOutline } from "react-icons/io5";
import { LuTicketPercent } from "react-icons/lu";
import { MdOutlineLocalShipping } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

export const adminMenu = [
    {
        label: "Menu",
        subMenu: [
            {
                label: "Home",
                icon: GoHomeFill, // Reference the component
                component: ""
            },
            {
                label: "Customer",
                icon: HiOutlineUsers, // Reference the component
                component: ""
            },
            {
                label: "Orders",
                icon: BsCart3,
                component: ""
            },
            {
                label: "Analytics",
                icon: GrAnalytics,
                component: ""
            },
            {
                label: "Product",
                icon: FiBox,
                component: ""
            }
        ]
    },
    {
        label: "Sales",
        subMenu: [
            {
                label: "My Store",
                icon: IoStorefrontOutline,
                component: ""
            },
            {
                label: "Discounts",
                icon: LuTicketPercent,
                component: ""
            },
            {
                label: "Shipment",
                icon: MdOutlineLocalShipping,
                component: ""
            }
        ]
    },
    {
        label: "",
        subMenu: [
            {
                label: "Settings",
                icon: IoSettingsOutline,
                component: ""
            },
            {
                label: "Logout",
                icon: CiLogout,
                component: ""
            }
        ]
    }
];
