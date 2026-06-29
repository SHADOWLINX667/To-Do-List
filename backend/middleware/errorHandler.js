export const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err.message);
  console.error('Stack:', err.stack);

  if (err.name === 'ZodError') {
    return res.status(400).json({
      error: 'Validation error',
      details: err.errors
    });
  }

  if (err.status === 404) {
    return res.status(404).json({ error: 'Not found' });
  }

  // Prisma errors
  if (err.code === 'P1000' || err.code === 'P1001') {
    return res.status(503).json({
      error: 'Database connection error',
      message: 'Unable to connect to database. Please check your connection string.'
    });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    code: err.code
  });
};
