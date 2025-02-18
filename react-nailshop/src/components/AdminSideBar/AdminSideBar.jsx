import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { GrAnalytics } from "react-icons/gr";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsBox } from "react-icons/bs";
import { PiTicket } from "react-icons/pi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { BsShop } from "react-icons/bs";
import { MdOutlineCampaign } from "react-icons/md";
import { BsPostcard } from "react-icons/bs";
import { MdOutlineDesignServices } from "react-icons/md";
import { SiMaterialdesignicons } from "react-icons/si";
import Logo from "@icons/images/nailLaBoxLogo.png";
import styles from "./styles.module.scss";
import classNames from "classnames";
const items = [
    {
        key: "sub1",
        label: "Phân tích",
        icon: <GrAnalytics />,
        path: "/admin/analytics"
    },
    {
        key: "sub2",
        label: "Người dùng",
        icon: <HiOutlineUserGroup />,
        path: "/admin/users"
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
                label: "Quản lý sản phẩm",
                path: "/admin/products"
            },
            {
                key: "4",
                label: "Tạo sản phẩm",
                path: "/admin/products/create"
            }
        ]
    },
    {
        key: "grp1",
        label: "Campaign",
        type: "group",
        children: [
            {
                key: "sub4",
                label: "Chiến dịch",
                icon: <MdOutlineCampaign />,
                children: [
                    {
                        key: "5",
                        label: "Quản lý chiến dịch",
                        path: "/admin/campaigns"
                    },
                    {
                        key: "6",
                        label: "Tạo chiến dịch",
                        path: "/admin/campaigns/create"
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
        label: "OrderOrder",
        type: "group",
        children: [
            {
                key: "sub6",
                label: "Đơn hàng",
                icon: <FaPeopleCarryBox />,
                children: [
                    {
                        key: "9",
                        label: "Quản lý đơn hàng",
                        path: "/admin/orders"
                    }
                ]
            }
        ]
    },
    {
        type: "divider"
    },
    {
        key: "grp3",
        label: "Post",
        type: "group",
        children: [
            {
                key: "sub7",
                label: "Bài viết",
                icon: <BsPostcard />,
                children: [
                    {
                        key: "10",
                        label: "Quản lý bài viết",
                        path: "/admin/post/manage"
                    },
                    {
                        key: "11",
                        label: "Tạo bài viết",
                        path: "/admin/post/create"
                    }
                ]
            }
        ]
    },
    {
        key: "grp4",
        label: "Ticket",
        type: "group",
        children: [
            {
                key: "sub8",
                label: "Mã giảm giá",
                icon: <PiTicket />,
                children: [
                    {
                        key: "12",
                        label: "Quản lý ticket",
                        path: "/admin/ticket/manage"
                    },
                    {
                        key: "13",
                        label: "Tạo ticket",
                        path: "/admin/ticket/create"
                    }
                ]
            }
        ]
    },
    {
        key: "grp5",
        label: "Design",
        type: "group",
        children: [
            {
                key: "sub9",
                label: "Design",
                icon: <MdOutlineDesignServices />,

                children: [
                    {
                        key: "14",
                        label: "Mẫu design",
                        path: "/admin/design"
                    },
                    {
                        key: "15",
                        label: "Yêu cầu design",
                        path: "/admin/design/request"
                    }
                ]
            }
        ]
    },
    {
        key: "grp6",
        label: "Setting",
        type: "group",
        children: [
            {
                key: "16",
                label: "Cửa hàng",
                icon: <BsShop />,
                path: "/admin/shop"
            },
            {
                key: "17",
                label: "Cài đặt chung",
                icon: <IoSettingsOutline />,
                path: "/admin/setting"
            }
        ]
    }
];

const AdminSideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
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
                    <img
                        src={Logo}
                        className={sideBarLogo}
                        alt=""
                        onClick={() => navigate("/")}
                    />
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
