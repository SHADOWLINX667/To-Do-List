import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import styles from './ChartContainer.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function CategoryChart({ categoryStats }) {
  if (!categoryStats || categoryStats.length === 0) {
    return <div className={styles.noData}>No category data available</div>;
  }

  const data = {
    labels: categoryStats.map((c) => c.category),
    datasets: [
      {
        label: 'Completed',
        data: categoryStats.map((c) => c.completed),
        backgroundColor: '#10B981',
      },
      {
        label: 'Total',
        data: categoryStats.map((c) => c.total),
        backgroundColor: '#5B5CEB',
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
      <h3 className={styles.chartTitle}>Tasks by Category</h3>
      <Bar data={data} options={options} />
    </div>
  );
}

export default CategoryChart;
