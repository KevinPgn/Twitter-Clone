import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { cloudinary, UploadApiResponse, UploadApiErrorResponse } from '@/lib/cloudinary';
import { auth } from '@/lib/auth';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { content, image } = req.body;
    let imageUrl: string | null = null;
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      // Si une image est fournie, télécharge-la sur Cloudinary
      if (image) {
        const uploadResponse: UploadApiResponse | UploadApiErrorResponse = await cloudinary.uploader.upload(image, {
          folder: 'tweets',
        });

        if ('error' in uploadResponse) {
          throw new Error(uploadResponse.error.message);
        }

        imageUrl = uploadResponse.secure_url;
      }

      // Crée le tweet dans la base de données
      const tweet = await prisma.tweet.create({
        data: {
          content,
          imageUrl,
          authorId: userId,
        },
      });

      res.status(200).json({ tweet });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create tweet' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
