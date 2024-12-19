import styles from "./styles.module.scss";
import { BiSolidHome } from "react-icons/bi";
import { adminMenu } from "./constants";
import Logo from "@icons/images/nailLaBoxLogo.png";
import { MdOutlineMenu } from "react-icons/md";
import { useState } from "react";
import classNames from "classnames";

function AdminSideBar() {
    const [openNavMenu, setOpenNavMenu] = useState(true);
    const {
        container,
        openNav,
        menuNavBtn,
        navMenu,
        menuItem,
        menuIcon,
        menuLabel,
        sideBarLogo,
        sideBarTitle,
        menuBox,
        menuTitle
    } = styles;
    const handleMenuNav = () => {
        setOpenNavMenu(!openNavMenu);
    };
    return (
        <div>
            <div
                className={classNames(container, {
                    [openNav]: openNavMenu
                })}
            >
                <div>
                    <MdOutlineMenu
                        className={menuNavBtn}
                        onClick={handleMenuNav}
                    />
                </div>
                <div>
                    <img src={Logo} className={sideBarLogo} alt="" />
                    {/* <span className={sideBarTitle}>NailLaBox</span> */}
                </div>
                <div className={menuBox}>
                    {adminMenu.map((item) => (
                        <>
                            <p className={menuTitle}>{item.label}</p>
                            <ul className={navMenu}>
                                {item.subMenu.map((menu) => {
                                    let Icon = menu.icon;
                                    return (
                                        <li
                                            className={menuItem}
                                            key={menu.label}
                                        >
                                            <div className={menuIcon}>
                                                <Icon />
                                            </div>
                                            <div className={menuLabel}>
                                                {menu.label}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminSideBar;
