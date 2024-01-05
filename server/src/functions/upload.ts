import multer from 'multer';
import path from 'path';

export default function upload(storage: multer.StorageEngine) {
  return multer({
    storage: storage,
    fileFilter: (request, file, callback) => {
      const filetypes = /jpeg|jpg|png|gif/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );

      if (mimetype && extname) {
        return callback(null, true);
      }
      callback(new Error('Error: Images Only!'));
    },
    limits: {
      fileSize: 1024 * 1024,
    },
  });
}
