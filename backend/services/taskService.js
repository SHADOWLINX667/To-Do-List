import prisma from '../database/db.js';

export class TaskService {
  async getAllTasks(filters = {}) {
    const where = {};

    if (filters.completed !== undefined) {
      where.completed = filters.completed === 'true' || filters.completed === true;
    }

    if (filters.category) {
      where.category = filters.category;
    }

    if (filters.priority) {
      where.priority = filters.priority;
    }

    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
        { category: { contains: filters.search, mode: 'insensitive' } }
      ];
    }

    const orderBy = {};
    if (filters.sort === 'newest') {
      orderBy.createdAt = 'desc';
    } else if (filters.sort === 'oldest') {
      orderBy.createdAt = 'asc';
    } else if (filters.sort === 'priority') {
      orderBy.priority = 'desc';
    } else if (filters.sort === 'dueDate') {
      orderBy.dueDate = 'asc';
    } else if (filters.sort === 'alphabetically') {
      orderBy.title = 'asc';
    } else {
      orderBy.createdAt = 'desc';
    }

    const page = parseInt(filters.page) || 1;
    const limit = parseInt(filters.limit) || 20;
    const skip = (page - 1) * limit;

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        orderBy,
        skip,
        take: limit
      }),
      prisma.task.count({ where })
    ]);

    return {
      tasks,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getTaskById(id) {
    const task = await prisma.task.findUnique({
      where: { id }
    });

    if (!task) {
      const err = new Error('Task not found');
      err.status = 404;
      throw err;
    }

    return task;
  }

  async createTask(data) {
    return prisma.task.create({
      data
    });
  }

  async updateTask(id, data) {
    const task = await prisma.task.findUnique({
      where: { id }
    });

    if (!task) {
      const err = new Error('Task not found');
      err.status = 404;
      throw err;
    }

    return prisma.task.update({
      where: { id },
      data
    });
  }

  async deleteTask(id) {
    const task = await prisma.task.findUnique({
      where: { id }
    });

    if (!task) {
      const err = new Error('Task not found');
      err.status = 404;
      throw err;
    }

    return prisma.task.delete({
      where: { id }
    });
  }

  async toggleTaskComplete(id) {
    const task = await prisma.task.findUnique({
      where: { id }
    });

    if (!task) {
      const err = new Error('Task not found');
      err.status = 404;
      throw err;
    }

    return prisma.task.update({
      where: { id },
      data: { completed: !task.completed }
    });
  }
}

export default new TaskService();
