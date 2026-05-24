import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ProgressChart = ({ days, habits, history }) => {
  const labels = Array.from({ length: days }, (_, i) => `Day ${i + 1}`);
  
  const dataPoints = labels.map((_, index) => {
    const dayNum = index + 1;
    let count = 0;
    habits.forEach(habit => {
      if (history[habit.id]?.[dayNum]) count++;
    });
    return count;
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Habits Completed',
        data: dataPoints,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.2)', // New indigo tint
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#6366f1',
        pointRadius: 6,
        pointHoverRadius: 8,
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, // Cleaner look
      title: {
        display: true,
        text: 'Your Consistency Curve',
        font: { size: 16, weight: 'bold' },
        color: '#475569'
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
        grid: { borderDash: [5, 5] }
      },
    },
  };

  return (
    <div className="card">
      <div className="chart-container" style={{ height: '350px' }}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default ProgressChart;