import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useEffect, useState } from "react";

function BarChart({ value }) {
    const [data, setData] = useState([]);
    const [label, setLabel] = useState([]);
    useEffect(() => {
        if (value) {
            const labels = [];
            const datas = [];
            value.forEach((item) => {
                labels.push(item.createAt);
                datas.push(item.revenue);
            });
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
