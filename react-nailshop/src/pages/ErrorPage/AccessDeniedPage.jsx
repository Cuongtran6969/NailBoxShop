import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
const AccessDeniedPage = () => {
    const [countdown, setCountdown] = useState(5);
    const navigate = useNavigate();
    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown <= 1) {
                    clearInterval(interval);
                    navigate("/");
                }
                return prevCountdown - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [navigate]);

    return (
        <>
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={
                    <Button type="primary" onClick={() => navigate("/")}>
                        Back Home
                    </Button>
                }
            />
            <p className="text-center">
                You will be redirected to the homepage in {countdown} seconds...
            </p>
        </>
    );
};
export default AccessDeniedPage;
