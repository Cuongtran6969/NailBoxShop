import { Button, Card, Col, Row, Statistic } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
function formatPrice(price) {
    return new Intl.NumberFormat("vi-VN").format(price);
}
function calculateGrowthPercentage(currentValue, previousValue) {
    if (currentValue === 0 && previousValue === 0) {
        return 0;
    }

    if (previousValue === 0) {
        return 100;
    }

    const growth = ((currentValue - previousValue) / previousValue) * 100;

    return parseFloat(growth.toFixed(2));
}

function TotalStatics({ revenue, order, user, time }) {
    return (
        <>
            <Row gutter={18}>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="Doanh thu"
                            value={formatPrice(revenue.currentRevenue)}
                            suffix="₫"
                        />
                        {!time.includes(" - ") && (
                            <Statistic
                                value={calculateGrowthPercentage(
                                    revenue.currentRevenue,
                                    revenue.previousRevenue
                                )}
                                precision={2}
                                valueStyle={{
                                    color:
                                        calculateGrowthPercentage(
                                            revenue.currentRevenue,
                                            revenue.previousRevenue
                                        ) < 0
                                            ? "#cf1322"
                                            : "#3f8600",
                                    fontSize: "14px"
                                }}
                                prefix={
                                    calculateGrowthPercentage(
                                        revenue.currentRevenue,
                                        revenue.previousRevenue
                                    ) < 0 ? (
                                        <ArrowDownOutlined />
                                    ) : (
                                        <ArrowUpOutlined />
                                    )
                                }
                                suffix="%"
                            />
                        )}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="Đơn hàng"
                            value={order.currentOrder}
                        />
                        {!time.includes(" - ") && (
                            <Statistic
                                value={calculateGrowthPercentage(
                                    order.currentOrder,
                                    order.previousOrder
                                )}
                                precision={2}
                                valueStyle={{
                                    color:
                                        calculateGrowthPercentage(
                                            order.currentOrder,
                                            order.previousOrder
                                        ) < 0
                                            ? "#cf1322"
                                            : "#3f8600",
                                    fontSize: "14px"
                                }}
                                prefix={
                                    calculateGrowthPercentage(
                                        order.currentOrder,
                                        order.previousOrder
                                    ) < 0 ? (
                                        <ArrowDownOutlined />
                                    ) : (
                                        <ArrowUpOutlined />
                                    )
                                }
                                suffix="%"
                            />
                        )}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="Người dùng"
                            value={user.currentTotalUsers}
                        />
                        {!time.includes(" - ") && (
                            <Statistic
                                value={calculateGrowthPercentage(
                                    user.currentTotalUsers,
                                    user.previousTotalUsers
                                )}
                                valueStyle={{
                                    color:
                                        calculateGrowthPercentage(
                                            user.currentTotalUsers,
                                            user.previousTotalUsers
                                        ) < 0
                                            ? "#cf1322"
                                            : "#3f8600",
                                    fontSize: "14px"
                                }}
                                prefix={
                                    calculateGrowthPercentage(
                                        user.currentTotalUsers,
                                        user.previousTotalUsers
                                    ) < 0 ? (
                                        <ArrowDownOutlined />
                                    ) : (
                                        <ArrowUpOutlined />
                                    )
                                }
                                suffix="%"
                            />
                        )}
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default TotalStatics;
