import { verifyAuthToken } from '../utils/jwt.js';

export function requireAdminAuth(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token is required.',
      });
    }

    const token = authorizationHeader.split(' ')[1];
    const decodedToken = verifyAuthToken(token);

    if (decodedToken.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access is required.',
      });
    }

    req.user = decodedToken;

    return next();
  } catch {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token.',
    });
  }
}