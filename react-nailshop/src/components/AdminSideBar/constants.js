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
                icon: GoHomeFill, // Reference the path
                path: ""
            },
            {
                label: "Customer",
                icon: HiOutlineUsers, // Reference the path
                path: "/admin/customer"
            },
            {
                label: "Orders",
                icon: BsCart3,
                path: "/admin/orders"
            },
            {
                label: "Analytics",
                icon: GrAnalytics,
                path: "/admin/analytics"
            },
            {
                label: "Product",
                icon: FiBox,
                path: "/admin"
            }
        ]
    },
    {
        label: "Sales",
        subMenu: [
            {
                label: "My Store",
                icon: IoStorefrontOutline,
                path: ""
            },
            {
                label: "Campaign",
                icon: LuTicketPercent,
                path: "/admin/campaign"
            },
            {
                label: "Shipment",
                icon: MdOutlineLocalShipping,
                path: ""
            }
        ]
    },
    {
        label: "Order",
        subMenu: [
            {
                label: "Quản lý đơn hàng",
                icon: FaPeopleCarryBox,
                path: ""
            }
        ]
    },
    {
        label: "",
        subMenu: [
            {
                label: "Settings",
                icon: IoSettingsOutline,
                path: ""
            },
            {
                label: "Logout",
                icon: CiLogout,
                path: ""
            }
        ]
    }
];
