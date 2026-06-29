import statisticsService from '../services/statisticsService.js';

export const getStatistics = async (req, res, next) => {
  try {
    const stats = await statisticsService.getStatistics();
    res.json(stats);
  } catch (err) {
    next(err);
  }
};
