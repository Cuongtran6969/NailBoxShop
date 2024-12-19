import AminHeader from "@components/AdminHeader/AdminHeader";
import { Col, Row } from "react-bootstrap";
import AdminSideBar from "@components/AdminSideBar/AdminSideBar";
import styles from "./styles.module.scss";
function AdminLayout({ children }) {
    const { AdminContent } = styles;
    return (
        <>
            <div>
                <Row>
                    <Col sm={2}>
                        <AdminSideBar />
                    </Col>
                    <Col sm={10}>
                        <AminHeader />
                        <div className={AdminContent}>{children}</div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default AdminLayout;
