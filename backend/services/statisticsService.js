import prisma from '../database/db.js';

export class StatisticsService {
  async getStatistics() {
    const [
      totalTasks,
      completedTasks,
      pendingTasks,
      todaysTasks,
      overdueTasks,
      highPriorityTasks,
      tasksCreatedThisWeek,
      allTasks
    ] = await Promise.all([
      prisma.task.count(),
      prisma.task.count({ where: { completed: true } }),
      prisma.task.count({ where: { completed: false } }),
      this.getTodaysTasks(),
      this.getOverdueTasks(),
      prisma.task.count({ where: { priority: 'high', completed: false } }),
      this.getTasksCreatedThisWeek(),
      prisma.task.findMany()
    ]);

    const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
    const categoryStats = this.calculateCategoryStats(allTasks);
    const priorityStats = this.calculatePriorityStats(allTasks);
    const weeklyStats = this.calculateWeeklyStats(allTasks);
    const monthlyStats = this.calculateMonthlyStats(allTasks);
    const insights = this.calculateInsights(allTasks);

    return {
      summary: {
        totalTasks,
        completedTasks,
        pendingTasks,
        completionRate,
        todaysTasks,
        overdueTasks,
        highPriorityTasks,
        tasksCreatedThisWeek
      },
      categoryStats,
      priorityStats,
      weeklyStats,
      monthlyStats,
      completionTimeline: this.calculateCompletionTimeline(allTasks),
      insights,
      recentActivity: await this.getRecentActivity()
    };
  }

  async getTodaysTasks() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return prisma.task.count({
      where: {
        createdAt: {
          gte: today,
          lt: tomorrow
        }
      }
    });
  }

  async getOverdueTasks() {
    const now = new Date();
    return prisma.task.count({
      where: {
        dueDate: {
          lt: now
        },
        completed: false
      }
    });
  }

  async getTasksCreatedThisWeek() {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    return prisma.task.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
          lte: now
        }
      }
    });
  }

  calculateCategoryStats(tasks) {
    const stats = {};

    tasks.forEach(task => {
      if (!stats[task.category]) {
        stats[task.category] = { total: 0, completed: 0 };
      }
      stats[task.category].total++;
      if (task.completed) {
        stats[task.category].completed++;
      }
    });

    return Object.entries(stats).map(([category, data]) => ({
      category,
      ...data,
      percentage: Math.round((data.completed / data.total) * 100)
    }));
  }

  calculatePriorityStats(tasks) {
    const priorities = ['low', 'medium', 'high'];
    return priorities.map(priority => ({
      priority,
      total: tasks.filter(t => t.priority === priority).length,
      completed: tasks.filter(t => t.priority === priority && t.completed).length
    }));
  }

  calculateWeeklyStats(tasks) {
    const stats = {};

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);

      const dayTasks = tasks.filter(
        t => t.createdAt >= date && t.createdAt < nextDay
      );

      stats[dayName] = dayTasks.length;
    }

    return stats;
  }

  calculateMonthlyStats(tasks) {
    const stats = [];

    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      date.setDate(1);
      date.setHours(0, 0, 0, 0);

      const nextMonth = new Date(date);
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      const monthTasks = tasks.filter(t => {
        const created = new Date(t.createdAt);
        return created >= date && created < nextMonth;
      });

      stats.push({
        month: monthName,
        created: monthTasks.length,
        completed: monthTasks.filter(t => t.completed).length
      });
    }

    return stats;
  }

  calculateCompletionTimeline(tasks) {
    const completedTasks = tasks.filter(t => t.completed);

    return completedTasks.map(task => ({
      id: task.id,
      title: task.title,
      completedAt: task.updatedAt,
      daysSinceCreation: Math.round(
        (new Date(task.updatedAt) - new Date(task.createdAt)) / (1000 * 60 * 60 * 24)
      )
    })).sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt)).slice(0, 10);
  }

  calculateInsights(tasks) {
    if (tasks.length === 0) {
      return {
        mostProductiveCategory: null,
        mostUsedCategory: null,
        averageCompletionTime: 0,
        completionPercentage: 0,
        longestPendingTask: null,
        upcomingDeadlines: []
      };
    }

    const categoryStats = this.calculateCategoryStats(tasks);
    const completedTasks = tasks.filter(t => t.completed);

    const averageCompletionTime = completedTasks.length > 0
      ? Math.round(
          completedTasks.reduce((sum, task) => {
            return sum + (new Date(task.updatedAt) - new Date(task.createdAt));
          }, 0) / completedTasks.length / (1000 * 60 * 60 * 24)
        )
      : 0;

    const pendingTasks = tasks.filter(t => !t.completed);
    const longestPending = pendingTasks.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    )[0] || null;

    const now = new Date();
    const upcomingDeadlines = tasks
      .filter(t => t.dueDate && !t.completed && new Date(t.dueDate) > now)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5);

    return {
      mostProductiveCategory: categoryStats.length > 0
        ? categoryStats.reduce((a, b) => a.percentage > b.percentage ? a : b).category
        : null,
      mostUsedCategory: categoryStats.length > 0
        ? categoryStats.reduce((a, b) => a.total > b.total ? a : b).category
        : null,
      averageCompletionTime,
      completionPercentage: tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0,
      longestPendingTask: longestPending,
      upcomingDeadlines
    };
  }

  async getRecentActivity() {
    const tasks = await prisma.task.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 10
    });

    return tasks.map(task => ({
      id: task.id,
      type: task.completed ? 'completed' : task.createdAt === task.updatedAt ? 'created' : 'updated',
      taskTitle: task.title,
      timestamp: task.updatedAt
    }));
  }
}

export default new StatisticsService();
