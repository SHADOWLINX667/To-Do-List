import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import styles from './ChartContainer.module.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function WeeklyChart({ weeklyStats }) {
  if (!weeklyStats) {
    return <div className={styles.noData}>No weekly data available</div>;
  }

  const labels = Object.keys(weeklyStats);
  const data = {
    labels,
    datasets: [
      {
        label: 'Tasks Created',
        data: Object.values(weeklyStats),
        borderColor: '#5B5CEB',
        backgroundColor: 'rgba(91, 92, 235, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#5B5CEB',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'var(--color-text-primary)',
          font: {
            size: 12,
            weight: '600',
          },
          padding: 16,
          usePointStyle: true,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'var(--color-text-secondary)',
        },
        grid: {
          color: 'var(--color-border-light)',
        },
      },
      x: {
        ticks: {
          color: 'var(--color-text-secondary)',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>Weekly Tasks Created</h3>
      <Line data={data} options={options} />
    </div>
  );
}

export default WeeklyChart;
