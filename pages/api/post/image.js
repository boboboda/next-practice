// pages/api/post/image.js
import { IncomingForm } from 'formidable';
import path from 'path';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const uploadDir = path.join(process.cwd(), '/public/uploads');
  await fs.mkdir(uploadDir, { recursive: true });

  const form = new IncomingForm({
    uploadDir: uploadDir,
    keepExtensions: true,
  });

  try {
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const file = files.image;
    if (!file) {
      console.log('No file found in the request');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // 클라이언트에 이미지 URL 반환
    const imageUrl = `/uploads/${file[0].newFilename}`; // 상대 경로
    return res.status(200).json({ url: imageUrl });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}