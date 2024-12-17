import { useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
function SideBar() {
    const { container, sideBar, overlay, slideSideBar } = styles;
    const [isopen, setOpen] = useState(false);
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
            ></div>
        </div>
    );
}

export default SideBar;
