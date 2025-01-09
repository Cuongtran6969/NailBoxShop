import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

function LineChart({ current, previous }) {
    const [previousData, setPreviousData] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [label, setLabel] = useState([]);
    useEffect(() => {
        if (current && previous) {
            const labels = [];
            const datas_one = [];
            const datas_two = [];

            current.forEach((item) => {
                labels.push(item.createAt);
                datas_one.push(item.revenue);
            });
            previous.forEach((item) => {
                datas_two.push(item.revenue);
            });
            setPreviousData(datas_one);
            setCurrentData(datas_two);
            setLabel(labels);
        }
    }, [current, previous]);
    return (
        <Line
            data={{
                labels: label,
                datasets: [
                    {
                        data: previousData,
                        label: "Hiện tại",
                        borderColor: "#3e95cd",
                        fill: false
                    },
                    {
                        data: currentData,
                        label: "Trước đó",
                        borderColor: "#8e5ea2",
                        fill: false
                    }
                ]
            }}
            options={{
                title: {
                    display: true,
                    text: "World population per region (in millions)"
                },
                legend: {
                    display: true,
                    position: "bottom"
                }
            }}
        />
    );
}
export default LineChart;
