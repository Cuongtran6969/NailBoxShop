function PurchaseItem() {
    return (
        <div className="d-flex align-items-center justify-content-between">
            <div>
                <div style={{ fontSize: "14px", fontWeight: "500" }}>
                    Combo 2 bộ Nail box Trắng gạo + Cute đính bướm{" "}
                </div>
                <p style={{ fontSize: "13px", marginBottom: "0" }}>
                    <span>120.000₫</span>
                    <span className="mx-2">x</span>
                    <span>2</span>
                </p>
            </div>
            <div style={{ fontSize: "15px" }}>240.000₫</div>
        </div>
    );
}

export default PurchaseItem;
