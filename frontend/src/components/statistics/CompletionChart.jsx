import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './ChartContainer.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function CompletionChart({ completed, pending }) {
  const data = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: [completed, pending],
        backgroundColor: ['#10B981', '#F59E0B'],
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
      <h3 className={styles.chartTitle}>Completion Status</h3>
      <Pie data={data} options={options} />
    </div>
  );
}

export default CompletionChart;
