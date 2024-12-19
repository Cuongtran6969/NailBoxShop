import { Row, Col, Container } from "react-bootstrap";
import { Input, Space, Dropdown } from "antd";
const { Search } = Input;
import { IoSearchOutline } from "react-icons/io5";
import styles from "./styles.module.scss";
import { useMemo, useState } from "react";
import { items } from "./constants";
function AminHeader() {
    const { container, searchBox, userInfo, userName, userRole } = styles;
    return (
        <div className={container}>
            <Row style={{ alignItems: "center" }}>
                <Col sm={10}>
                    <div className={searchBox}>
                        <input />
                        <button>
                            <IoSearchOutline />
                        </button>
                    </div>
                </Col>
                <Col sm={2}>
                    <div className={userInfo}>
                        <Dropdown
                            menu={{
                                items
                            }}
                            placement="bottom"
                            arrow={{
                                pointAtCenter: true
                            }}
                        >
                            <img
                                src="https://cdn.pixabay.com/photo/2017/07/18/23/40/group-2517459_640.png"
                                alt=""
                            />
                        </Dropdown>
                        <div>
                            <h5 className={userName}>Tran cuong</h5>
                            <span className={userRole}>Hello world</span>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default AminHeader;
