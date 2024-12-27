import { Button, Result } from "antd";
function OrderResult({
    status = "error",
    title = "error",
    subTitle = "error"
}) {
    return (
        <Result
            status={status}
            title={title}
            subTitle={subTitle}
            extra={[
                <Button type="primary" key="buy">
                    Buy Again
                </Button>
            ]}
        />
    );
}

export default OrderResult;
