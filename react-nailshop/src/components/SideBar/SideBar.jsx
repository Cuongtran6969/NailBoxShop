import { useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import Login from "@components/ContentSideBar/Login/Login";
function SideBar() {
    const { container, sideBar, overlay, slideSideBar } = styles;
    const [isopen, setOpen] = useState(true);
    //dang de true de code template login/signup

    const handleToggle = () => {
        setOpen(!isopen);
    };
    console.log(isopen);

    return (
        <div className={container}>
            <div
                className={classNames({
                    [overlay]: isopen
                })}
                onClick={handleToggle}
            />
            <div
                className={classNames(sideBar, {
                    [slideSideBar]: isopen
                })}
            >
                <Login />
            </div>
        </div>
    );
}

export default SideBar;
