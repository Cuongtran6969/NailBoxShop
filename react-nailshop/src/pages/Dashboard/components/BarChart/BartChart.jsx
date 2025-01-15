import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useEffect, useState } from "react";
const weekLabel = [
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
    "Chủ nhật"
];
function BarChart({ value, time }) {
    const [data, setData] = useState([]);
    const [label, setLabel] = useState([]);
    useEffect(() => {
        if (value) {
            let labels = [];
            const datas = [];
            value.forEach((item) => {
                labels.push(item.createAt);
                datas.push(item.revenue);
            });
            if (time === "Weekly") {
                labels = weekLabel;
            }
            setData(datas);
            setLabel(labels);
        }
    }, [value]);
    return (
        <div
            style={{
                background: "#1890ff",
                width: "600px",
                height: "400px",
                color: "#fff",
                padding: "8px",
                borderRadius: "15px"
            }}
        >
            <Bar
                data={{
                    labels: label,
                    datasets: [
                        {
                            label: "Doanh thu (vnd đồng)",
                            backgroundColor: [
                                "#d9e6fe",
                                "#d9e6fe",
                                "#d9e6fe",
                                "#d9e6fe",
                                "#d9e6fe"
                            ],
                            data: data
                        }
                    ]
                }}
                options={{
                    legend: { display: false },
                    title: {
                        display: true,
                        text: "Predicted world population (millions) in 2050"
                    }
                }}
            />
        </div>
    );
}

export default BarChart;
