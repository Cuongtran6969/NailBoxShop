import { useContext, useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { SideBarContext } from "@contexts/SideBarProvider";
import Login from "@components/ContentSideBar/Auth/Login";
import Register from "@components/ContentSideBar/Auth/Register";
import ForgetPassword from "@components/ContentSideBar/Auth/ForgetPassword";
import { TfiClose } from "react-icons/tfi";
function SideBar() {
    const { container, sideBar, overlay, slideSideBar, boxIcon } = styles;
    const { isOpen, setIsOpen, type } = useContext(SideBarContext);

    const handleRenderContent = () => {
        switch (type) {
            case "login":
                return <Login />;
            case "register":
                return <Register />;
            case "forgetPassword":
                return <ForgetPassword />;
            // case "cart":
            //     return <Cart />;
            default:
                return <Login />;
        }
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={container}>
            <div
                className={classNames({
                    [overlay]: isOpen
                })}
            />
            <div
                className={classNames(sideBar, {
                    [slideSideBar]: isOpen
                })}
            >
                {isOpen && (
                    <div className={boxIcon} onClick={handleToggle}>
                        <TfiClose />
                    </div>
                )}
                {handleRenderContent()}
            </div>
        </div>
    );
}

export default SideBar;
