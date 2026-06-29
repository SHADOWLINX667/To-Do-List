import { useEffect } from 'react';
import {
  FiCheckCircle,
  FiCircle,
  FiTrendingUp,
  FiClock,
  FiAlertCircle,
  FiZap,
  FiCalendar,
  FiTarget,
} from 'react-icons/fi';
import { useStatistics } from '../hooks/useStatistics';
import Loader from '../components/common/Loader';
import StatisticsCard from '../components/statistics/StatisticsCard';
import CompletionChart from '../components/statistics/CompletionChart';
import CategoryChart from '../components/statistics/CategoryChart';
import WeeklyChart from '../components/statistics/WeeklyChart';
import MonthlyChart from '../components/statistics/MonthlyChart';
import PriorityChart from '../components/statistics/PriorityChart';
import styles from './Statistics.module.css';

function Statistics() {
  const { statistics, loading, error, refetch } = useStatistics();

  // Auto-refetch every 30 seconds to keep stats up-to-date
  useEffect(() => {
    const interval = setInterval(refetch, 30000);
    return () => clearInterval(interval);
  }, [refetch]);

  if (loading) {
    return (
      <div className={styles.statistics}>
        <div className={styles.header}>
          <h1 className={styles.title}>Statistics & Analytics</h1>
        </div>
        <Loader />
      </div>
    );
  }

  if (error || !statistics) {
    return (
      <div className={styles.statistics}>
        <div className={styles.header}>
          <h1 className={styles.title}>Statistics & Analytics</h1>
        </div>
        <div className={styles.error}>Error loading statistics: {error}</div>
      </div>
    );
  }

  const { summary, categoryStats, priorityStats, weeklyStats, monthlyStats, insights } = statistics;

  return (
    <div className={styles.statistics}>
      <div className={styles.header}>
        <h1 className={styles.title}>Statistics & Analytics</h1>
        <p className={styles.subtitle}>Track your productivity and task completion</p>
      </div>

      <div className={styles.container}>
        {/* Summary Cards */}
        <div className={styles.summaryGrid}>
          <StatisticsCard
            title="Total Tasks"
            value={summary.totalTasks}
            icon="📋"
            variant="default"
          />
          <StatisticsCard
            title="Completed Tasks"
            value={summary.completedTasks}
            icon="✓"
            variant="success"
          />
          <StatisticsCard
            title="Pending Tasks"
            value={summary.pendingTasks}
            icon="⏳"
            variant="warning"
          />
          <StatisticsCard
            title="Completion Rate"
            value={`${summary.completionRate}%`}
            icon="📈"
            variant="info"
          />
          <StatisticsCard
            title="Today's Tasks"
            value={summary.todaysTasks}
            icon="📅"
            variant="default"
          />
          <StatisticsCard
            title="Overdue Tasks"
            value={summary.overdueTasks}
            icon="⚠️"
            variant={summary.overdueTasks > 0 ? 'error' : 'default'}
          />
          <StatisticsCard
            title="High Priority"
            value={summary.highPriorityTasks}
            icon="🔴"
            variant="error"
          />
          <StatisticsCard
            title="This Week"
            value={summary.tasksCreatedThisWeek}
            icon="📊"
            variant="default"
          />
        </div>

        {/* Charts */}
        <div className={styles.chartsGrid}>
          <CompletionChart completed={summary.completedTasks} pending={summary.pendingTasks} />
          <CategoryChart categoryStats={categoryStats} />
          <WeeklyChart weeklyStats={weeklyStats} />
          <MonthlyChart monthlyStats={monthlyStats} />
          <PriorityChart priorityStats={priorityStats} />
        </div>

        {/* Insights */}
        {insights && (
          <div className={styles.insightsSection}>
            <h2 className={styles.sectionTitle}>Insights</h2>
            <div className={styles.insightsGrid}>
              {insights.mostProductiveCategory && (
                <div className={styles.insightCard}>
                  <div className={styles.insightIcon}>🏆</div>
                  <h3>Most Productive Category</h3>
                  <p>{insights.mostProductiveCategory}</p>
                </div>
              )}
              {insights.mostUsedCategory && (
                <div className={styles.insightCard}>
                  <div className={styles.insightIcon}>⭐</div>
                  <h3>Most Used Category</h3>
                  <p>{insights.mostUsedCategory}</p>
                </div>
              )}
              <div className={styles.insightCard}>
                <div className={styles.insightIcon}>⏱️</div>
                <h3>Avg Completion Time</h3>
                <p>{insights.averageCompletionTime} days</p>
              </div>
              <div className={styles.insightCard}>
                <div className={styles.insightIcon}>📊</div>
                <h3>Completion Percentage</h3>
                <p>{insights.completionPercentage}%</p>
              </div>
              {insights.longestPendingTask && (
                <div className={styles.insightCard}>
                  <div className={styles.insightIcon}>📌</div>
                  <h3>Longest Pending Task</h3>
                  <p title={insights.longestPendingTask.title}>
                    {insights.longestPendingTask.title.substring(0, 30)}
                    {insights.longestPendingTask.title.length > 30 ? '...' : ''}
                  </p>
                </div>
              )}
              {insights.upcomingDeadlines && insights.upcomingDeadlines.length > 0 && (
                <div className={styles.insightCard}>
                  <div className={styles.insightIcon}>🎯</div>
                  <h3>Upcoming Deadlines</h3>
                  <p>{insights.upcomingDeadlines.length} coming up</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Statistics;
