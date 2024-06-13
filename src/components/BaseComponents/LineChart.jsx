import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import PropTypes from 'prop-types';

const LineChart = ({ chartData }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext("2d");

        const chartInstance = new Chart(ctx, {
            type: "line",
            data: chartData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Stock Price'
                    }
                }
            },
        });

        return () => {
            chartInstance.destroy();
        };
    }, [chartData]);

    return <canvas ref={chartRef} />;
};

LineChart.propTypes = {
    chartData: PropTypes.object.isRequired
};

export default LineChart;