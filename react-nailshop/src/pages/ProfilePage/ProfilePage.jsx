import { useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import SideBar from "@pages/ProfilePage/components/SideBar";
import UserInfo from "@pages/ProfilePage/components/UserInfo";
import MyOrder from "@pages/ProfilePage/components/MyOrder";

import { Container, Col, Row } from "react-bootstrap";

function ProfilePage() {
    const [isNavVisible, setNavVisible] = useState(true);
    const {
        appContainer,
        toggleBtn,
        navContent,
        mainContent,
        full,
        profileDetails,
        leftNav,
        visible,
        hidden,
        toggleIcon,
        headerMenu,
        containerContent
    } = styles;

    const toggleNav = () => {
        setNavVisible(!isNavVisible);
    };

    return (
        <Container>
            <div className={appContainer}>
                {isNavVisible && (
                    <div
                        className={classNames(leftNav, {
                            [visible]: isNavVisible
                        })}
                    >
                        <SideBar toggleNav={toggleNav} />
                    </div>
                )}

                {/* Nội dung chính */}
                <div
                    className={classNames(mainContent, {
                        [full]: !isNavVisible
                    })}
                >
                    <div className={containerContent}>
                        {/* <UserInfo /> */}
                        <MyOrder />
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default ProfilePage;
