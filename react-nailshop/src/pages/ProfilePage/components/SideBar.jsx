import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import { BsPinMap } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import styles from "../styles.module.scss";
import { Menu, Divider } from "antd";
import { LuMoveLeft } from "react-icons/lu";
const items = [
    {
        key: "key1",
        label: "Tài khoản",
        type: "group",
        children: [
            {
                key: "myInfo",
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
                key: "myOrder",
                label: "Đơn hàng",
                icon: <BsCart4 />
            },
            {
                key: "logout",
                label: "Thoát",
                icon: <MdLogout />
            }
        ]
    }
];

const SideBar = ({ toggleNav, setType, type }) => {
    const onClick = (e) => {
        setType(e.key);
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
                defaultSelectedKeys={[type ? type : "sub1"]}
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
