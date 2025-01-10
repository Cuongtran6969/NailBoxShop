import { useEffect, useState } from "react";
import { Line } from "@ant-design/charts";
import LineChart from "./components/LineChart/LineChart";
import TotalStatics from "./components/TotalStatics/TotalStatics";
import BarChart from "./components/BarChart/BartChart";
import { Col, Row } from "react-bootstrap";
import ProductManage from "@pages/ProductManage/ProductManage";
import TimeLine from "./components/TimeLine/TimeLine";
import { getInfo } from "@/apis/dashboardService";

function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [time, setTime] = useState("Daily");
    const getInfoDashboard = async () => {
        setLoading(true);
        await getInfo(time)
            .then((res) => {
                setData(res.result);
            })
            .catch((err) => {
                console.log(err);
            });
        setLoading(false);
    };

    useEffect(() => {
        getInfoDashboard();
    }, [time]);

    if (loading) return <div>...</div>;
    console.log(data);

    return (
        <div style={{ height: "800px", overflowY: "scroll" }}>
            <TimeLine time={time} setTime={setTime} />
            <TotalStatics
                time={time}
                order={data.orderSummary}
                revenue={data.revenueResponse}
                user={data.userSummary}
            />
            <Row className="mt-5">
                <Col sm={6}>
                    <BarChart value={data.revenueResponse.listRevenueData} />
                </Col>
                <Col sm={6}>
                    <LineChart
                        current={data.revenueResponse.listRevenueData}
                        previous={data.revenueResponse.previousListRevenueData}
                    />
                </Col>
                <Col sm={12}>
                    <div className="mt-5">
                        <h3>Best Seller</h3>
                        <ProductManage
                            onProductSelection={() => {}}
                            initProduct={data.bestProducts}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Dashboard;
