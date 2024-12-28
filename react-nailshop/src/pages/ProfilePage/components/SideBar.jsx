import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import { BsPinMap } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import styles from "../styles.module.scss";
import { Menu } from "antd";
import { Divider } from "antd";
import { LuMoveLeft } from "react-icons/lu";

const items = [
    {
        key: "key1",
        label: "Tài khoản",
        type: "group",
        children: [
            {
                key: "sub1",
                label: "Thông tin",
                icon: <FaRegCircleUser />
            }
        ]
    },
    {
        key: "key2",
        label: "Chung",
        type: "group",
        children: [
            {
                key: "sub2",
                label: "Đơn hàng",
                icon: <BsCart4 />
            },
            {
                key: "sub3",
                label: "Địa chỉ",
                icon: <BsPinMap />
            },
            {
                key: "sub4",
                label: "Thoát",
                icon: <MdLogout />
            }
        ]
    }
];
const SideBar = ({ toggleNav }) => {
    const onClick = (e) => {
        console.log("click ", e);
    };
    const { headerMenu } = styles;
    return (
        <div>
            <div className={headerMenu} onClick={toggleNav}>
                <span className="me-2">
                    <LuMoveLeft />
                </span>
                <span>Setting</span>
            </div>
            <Divider className="m-0" />
            <Menu
                onClick={onClick}
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                items={items}
                style={{
                    fontSize: "15px",
                    width: "250px",
                    margin: "0 auto",
                    backgroundColor: "#f8f9fa"
                }}
            />
        </div>
    );
};
export default SideBar;
