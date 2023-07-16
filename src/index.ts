import express, { Request, Response } from 'express';
import fs from 'fs';
import multer from 'multer';
import { recognize } from 'tesseract.js';

const app = express();
const upload = multer({ dest: './src/temp/' });

app.post('/', upload.single('image'), async (req: Request, res: Response) => {
  const { destination, filename } = req.file;
  const file = destination.concat(filename);

  try {
    return recognize(file, 'por')
      .then(response => {
        fs.unlinkSync(file);
        res.status(200).send(response.data.text);
      });
  } catch (error) {
    fs.unlinkSync(file);
    res.status(400).send(error);
  }
});

export { app };
