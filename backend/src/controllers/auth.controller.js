import bcrypt from 'bcryptjs';

import { env } from '../config/env.js';
import { signAuthToken } from '../utils/jwt.js';

export async function loginAdminController(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail !== env.adminEmail.toLowerCase()) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    if (!env.adminPasswordHash) {
      return res.status(500).json({
        success: false,
        message: 'Admin password hash is not configured.',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, env.adminPasswordHash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const user = {
      id: 'admin_001',
      name: 'Acowale Admin',
      email: env.adminEmail,
      role: 'admin',
    };

    const token = signAuthToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    return next(error);
  }
}