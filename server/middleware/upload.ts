import multer from 'multer';
import path from 'path';
import { Request } from 'express';

// File filter for different types
const createFileFilter = (allowedTypes: string[], maxSize: number) => {
  return (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Check file type
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      return cb(new Error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`));
    }
    
    // Check file size (Note: this is checked again by multer, but good to have here)
    if (file.size && file.size > maxSize) {
      return cb(new Error(`File too large. Maximum size: ${maxSize / (1024 * 1024)}MB`));
    }
    
    cb(null, true);
  };
};

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploads/';
    
    if (file.fieldname === 'video') {
      uploadPath += 'videos/';
    } else if (file.fieldname === 'thumbnail' || file.fieldname === 'image') {
      uploadPath += 'images/';
    } else if (file.fieldname === 'document') {
      uploadPath += 'documents/';
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, fileExtension);
    const sanitizedBaseName = baseName.replace(/[^a-zA-Z0-9-_]/g, '');
    
    cb(null, `${sanitizedBaseName}-${uniqueSuffix}${fileExtension}`);
  }
});

// Memory storage for temporary processing
const memoryStorage = multer.memoryStorage();

// File upload configurations
export const imageUpload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1,
  },
  fileFilter: createFileFilter(['.jpg', '.jpeg', '.png', '.gif', '.webp'], 5 * 1024 * 1024),
});

export const videoUpload = multer({
  storage: storage,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB
    files: 1,
  },
  fileFilter: createFileFilter(['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm'], 500 * 1024 * 1024),
});

export const documentUpload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 1,
  },
  fileFilter: createFileFilter(['.pdf', '.doc', '.docx', '.txt', '.rtf'], 10 * 1024 * 1024),
});

// Multiple file upload for course materials
export const courseContentUpload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB per file
    files: 10, // Max 10 files
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      '.jpg', '.jpeg', '.png', '.gif', '.webp', // Images
      '.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', // Videos
      '.pdf', '.doc', '.docx', '.txt', '.rtf', // Documents
    ];
    
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      return cb(new Error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`));
    }
    
    cb(null, true);
  },
});

// Profile image upload (smaller size limit)
export const profileImageUpload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
    files: 1,
  },
  fileFilter: createFileFilter(['.jpg', '.jpeg', '.png', '.webp'], 2 * 1024 * 1024),
});

// Memory-based upload for processing before saving
export const memoryUpload = multer({
  storage: memoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 1,
  },
});

// Upload error handler
export const handleUploadError = (err: any, req: Request, res: any, next: any) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File Upload Error',
        message: 'File too large',
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        error: 'File Upload Error',
        message: 'Too many files',
      });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        error: 'File Upload Error',
        message: 'Unexpected field name',
      });
    }
  }
  
  if (err.message && err.message.includes('Invalid file type')) {
    return res.status(400).json({
      error: 'File Upload Error',
      message: err.message,
    });
  }
  
  next(err);
};

// Utility function to get file URL
export const getFileUrl = (req: Request, filename: string, type: 'image' | 'video' | 'document' = 'image') => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  return `${baseUrl}/uploads/${type}s/${filename}`;
};

// Clean up old files (utility function)
export const cleanupFile = (filePath: string) => {
  try {
    const fs = require('fs');
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error('Error cleaning up file:', error);
  }
};