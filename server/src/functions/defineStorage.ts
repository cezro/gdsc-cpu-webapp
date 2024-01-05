import multer from 'multer';

export default function defineStorage(directory: string) {
  return multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, directory);
    },
    filename: (request, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      callback(
        null,
        file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]
      );
    },
  });
}
