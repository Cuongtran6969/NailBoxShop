import { useState } from "react";
import { useContext } from 'react';
import styles from "./styles.module.scss";
import classNames from "classnames";
import { SideBarContext } from '@/contexts/SideBarProvider';
import Login from "../SideBarContent/Login/Login";

function SideBar() {
    const { container, sideBar, overlay, slideSideBar } = styles;
    const { isOpen, setIsOpen } = useContext(SideBarContext);
    //dang de true de code template login/signup

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={container}>
            <div
                className={classNames({
                    [overlay]: isOpen
                })}
                onClick={handleToggle}
            />
            <div
                className={classNames(sideBar, {
                    [slideSideBar]: isOpen
                })}
            >
                {isOpen && (
                    <div className=""></div>
                )
                }
                <Login />
            </div>
        </div>
    );
}

export default SideBar;
