import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";

const CountdownTimer = ({ targetDate }) => {
    const { box, timeSpace } = styles;
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

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
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const formatNumber = (number) => {
        return String(number).padStart(2, "0");
    };

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval, index, array) => {
        if (timeLeft[interval] !== undefined && timeLeft[interval] > 0) {
            timerComponents.push(
                <>
                    <span key={interval} className={box}>
                        {formatNumber(timeLeft[interval])}
                    </span>
                    <span className={timeSpace}>
                        {index < array.length - 1 ? " : " : ""}
                    </span>
                </>
            );
        }
    });

    return timerComponents;
};

export default CountdownTimer;
