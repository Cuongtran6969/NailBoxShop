import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
const NotFoundPage = () => {
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
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
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
export default NotFoundPage;
