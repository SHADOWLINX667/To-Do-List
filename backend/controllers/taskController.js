import taskService from '../services/taskService.js';
import { validateCreateTask, validateUpdateTask } from '../validators/taskValidator.js';

export const getAllTasks = async (req, res, next) => {
  try {
    const result = await taskService.getAllTasks(req.query);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    res.json(task);
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const data = validateCreateTask(req.body);
    const task = await taskService.createTask(data);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const data = validateUpdateTask(req.body);
    const task = await taskService.updateTask(req.params.id, data);
    res.json(task);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const toggleTaskComplete = async (req, res, next) => {
  try {
    const task = await taskService.toggleTaskComplete(req.params.id);
    res.json(task);
  } catch (err) {
    next(err);
  }
};
