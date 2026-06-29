import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './ChartContainer.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function PriorityChart({ priorityStats }) {
  if (!priorityStats || priorityStats.length === 0) {
    return <div className={styles.noData}>No priority data available</div>;
  }

  const data = {
    labels: ['Low', 'Medium', 'High'],
    datasets: [
      {
        data: priorityStats.map((p) => p.total),
        backgroundColor: ['#3B82F6', '#F59E0B', '#EF4444'],
        borderColor: 'var(--color-bg-secondary)',
        borderWidth: 2,
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
  };

  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>Priority Distribution</h3>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default PriorityChart;
