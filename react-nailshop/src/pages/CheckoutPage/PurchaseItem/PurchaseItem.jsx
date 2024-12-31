function PurchaseItem({ data }) {
    const parseMoneyFormat = (price) => {
        return new Intl.NumberFormat("vi-VN").format(price);
    };

    return (
        <div className="d-flex align-items-center justify-content-between">
            <div>
                <div style={{ fontSize: "14px", fontWeight: "500" }}>
                    {data.productName}
                </div>
                <p style={{ fontSize: "13px", marginBottom: "0" }}>
                    <span>
                        {parseMoneyFormat(
                            data.price - 0.01 * data.discount * data.price
                        )}
                        ₫
                    </span>
                    <span className="mx-2">x</span>
                    <span>{data.quantity}</span>
                </p>
            </div>
            <div style={{ fontSize: "15px" }}>
                {parseMoneyFormat(
                    (data.price - 0.01 * data.discount * data.price) *
                        data.quantity
                )}
                ₫
            </div>
        </div>
    );
}

export default PurchaseItem;
