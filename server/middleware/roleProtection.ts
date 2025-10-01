import type { RequestHandler } from 'express';
import type { User } from '@shared/schema';
import { storage } from '../storage';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export function requireRole(role: 'student' | 'instructor' | 'admin'): RequestHandler {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
      }

      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      const userRole = user.role || 'student';
      
      // Admin has access to everything
      if (userRole === 'admin') {
        return next();
      }
      
      // Check exact role match
      if (userRole === role) {
        return next();
      }

      return res.status(403).json({ 
        message: `Access denied. Required role: ${role}` 
      });
    } catch (error) {
      console.error('Role protection error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}

export function requireInstructor(): RequestHandler {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
      }

      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      const userRole = user.role || 'student';

      // Allow both instructors and admins
      if (userRole === 'instructor' || userRole === 'admin') {
        return next();
      }

      return res.status(403).json({ 
        message: 'Access denied. Instructor privileges required.' 
      });
    } catch (error) {
      console.error('Instructor protection error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}

export function requireAdmin(): RequestHandler {
  return requireRole('admin');
}

export function requireStudent(): RequestHandler {
  return requireRole('student');
}