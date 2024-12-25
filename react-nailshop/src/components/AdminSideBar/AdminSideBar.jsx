import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { GrAnalytics } from "react-icons/gr";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsBox } from "react-icons/bs";
import { PiTicket } from "react-icons/pi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import Logo from "@icons/images/nailLaBoxLogo.png";
import styles from "./styles.module.scss";
import classNames from "classnames";
const items = [
    {
        key: "sub1",
        label: "Analytics",
        icon: <GrAnalytics />,
        path: "/analytics"
    },
    {
        key: "sub2",
        label: "Customer",
        icon: <HiOutlineUserGroup />,
        children: [
            {
                key: "1",
                label: "Manager user",
                path: "/admin/users"
            },
            {
                key: "2",
                label: "Create user",
                path: "/admin/users/create"
            }
        ]
    },
    {
        type: "divider"
    },
    {
        key: "sub3",
        label: "Product",
        icon: <BsBox />,
        children: [
            {
                key: "3",
                label: "Manager product",
                path: "/admin/products"
            },
            {
                key: "4",
                label: "Create product",
                path: "/admin/products/create"
            }
        ]
    },
    {
        key: "grp1",
        label: "Sales",
        type: "group",
        children: [
            {
                key: "sub4",
                label: "Campaign",
                icon: <PiTicket />,
                children: [
                    {
                        key: "5",
                        label: "Manager campaign",
                        path: "/admin/campaigns"
                    },
                    {
                        key: "6",
                        label: "Create campaign",
                        path: "/admin/campaigns/create"
                    }
                ]
            },
            {
                key: "sub5",
                label: "Shipment",
                icon: <MdOutlineLocalShipping />,
                children: [
                    {
                        key: "7",
                        label: "Manager ship"
                    },
                    {
                        key: "8",
                        label: "Create ship"
                    }
                ]
            }
        ]
    },
    {
        type: "divider"
    },
    {
        key: "grp2",
        label: "Settings",
        type: "group",
        children: [
            {
                key: "sub6",
                label: "Settings",
                icon: <IoSettingsOutline />
            },
            {
                key: "sub7",
                label: "Logout",
                icon: <CiLogout />
            }
        ]
    }
];

const AdminSideBar = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Lấy thông tin đường dẫn hiện tại
    const [selectedKey, setSelectedKey] = useState("");
    const [openKeys, setOpenKeys] = useState([]);
    const [openNavMenu, setOpenNavMenu] = useState(true);
    const { container, openNav, sideBarLogo } = styles;

    // Tìm selectedKey và openKeys từ pathname
    const findKeysFromPathname = (pathname, items) => {
        let selectedKey = "";
        let openKeys = [];

        const traverse = (items, parentKey = null) => {
            for (const item of items) {
                if (item.path === pathname) {
                    selectedKey = item.key;
                    if (parentKey) openKeys.push(parentKey);
                }
                if (item.children) {
                    traverse(item.children, item.key);
                }
            }
        };

        traverse(items);
        return { selectedKey, openKeys };
    };

    useEffect(() => {
        const { selectedKey, openKeys } = findKeysFromPathname(
            location.pathname,
            items
        );
        setSelectedKey(selectedKey);
        setOpenKeys(openKeys);
    }, [location.pathname]);

    const onClick = (e) => {
        const key = e.key;
        // Tìm path tương ứng
        const findPath = (items, key) => {
            for (const item of items) {
                if (item.key === key && item.path) return item.path;
                if (item.children) {
                    const childPath = findPath(item.children, key);
                    if (childPath) return childPath;
                }
            }
            return null;
        };

        const path = findPath(items, key);
        // Điều hướng và cập nhật trạng thái
        if (path) {
            navigate(path);
        }
        setSelectedKey(key);
    };

    const onOpenChange = (keys) => {
        setOpenKeys(keys);
    };

    return (
        <div>
            <div
                className={classNames(container, {
                    [openNav]: openNavMenu
                })}
            >
                <div>
                    <img src={Logo} className={sideBarLogo} alt="" />
                </div>
                <Menu
                    className="mt-5"
                    onClick={onClick}
                    selectedKeys={[selectedKey]} // Đồng bộ trạng thái với đường dẫn hiện tại
                    openKeys={openKeys} // Hiển thị menu đang mở
                    onOpenChange={onOpenChange} // Cập nhật trạng thái menu mở
                    mode="inline"
                    items={items}
                />
            </div>
        </div>
    );
};

export default AdminSideBar;
