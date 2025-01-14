import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";

const CountdownTimer = ({ targetDate }) => {
    const { box, timeSpace } = styles;
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    // Hàm tính thời gian còn lại
    function calculateTimeLeft() {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                Mins: Math.floor((difference / 1000 / 60) % 60),
                Secs: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft()); // Cập nhật thời gian mỗi giây
        }, 1000);

        return () => clearInterval(timer); // Dọn dẹp khi component bị unmount
    }, [targetDate]); // Tính toán lại khi targetDate thay đổi

    const formatNumber = (number) => {
        return String(number).padStart(2, "0");
    };

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval, index, array) => {
        if (timeLeft[interval] !== undefined) {
            // Skip rendering Days or Hours if they are 00 and we don't need them
            if (
                (interval === "Days" && timeLeft[interval] === 0) ||
                (interval === "Hours" &&
                    timeLeft[interval] === 0 &&
                    !timeLeft.Days)
            ) {
                return;
            }

            timerComponents.push(
                <>
                    <span key={interval} className={box}>
                        {formatNumber(timeLeft[interval])}
                    </span>
                    {index < array.length - 1 && (
                        <span className={timeSpace}>:</span>
                    )}
                </>
            );
        }
    });

    return timerComponents;
};

export default CountdownTimer;
