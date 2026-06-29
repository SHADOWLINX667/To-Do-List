import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required').max(50),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  dueDate: z.string().datetime().optional().nullable()
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  category: z.string().min(1).max(50).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  dueDate: z.string().datetime().optional().nullable(),
  completed: z.boolean().optional()
});

export const validateCreateTask = (data) => {
  return createTaskSchema.parse(data);
};

export const validateUpdateTask = (data) => {
  return updateTaskSchema.parse(data);
};
