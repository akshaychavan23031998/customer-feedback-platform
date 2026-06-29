export function getHealthStatus(req, res) {
  return res.status(200).json({
    success: true,
    message: 'Customer Feedback API is running.',
    data: {
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
    },
  });
}