import axios from "axios";
import React, {useEffect, useState} from "react";
import {Bar} from "react-chartjs-2";
import {BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip} from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
    movieID: number;
}

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
    }[];
}

const BarChart: React.FC<BarChartProps> = ({ movieID }) => {
    const [chartData, setChartData] = useState<ChartData>({
        labels: [],
        datasets: [
            {
                label: "Ratings",
                data: [],
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.4)",
            },
        ],
    });

    useEffect(() => {
        const getChartData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/v1/movies/${movieID}/statistics`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
                const labels: string[] = Object.keys(response.data);
                const counts: number[] = Object.values(response.data);
                setChartData((prevChartData) => ({
                    ...prevChartData,
                    labels: labels,
                    datasets: [
                        {
                            ...prevChartData.datasets[0],
                            data: counts,
                        },
                    ],
                }));
            } catch (error) {
                console.error(error);
            }
        };

        getChartData();
    }, [movieID]);

    return (
        <div className="chart-container">
            <Bar data={chartData} />
        </div>
    );
};

export default BarChart;
