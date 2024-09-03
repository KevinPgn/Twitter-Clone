"use server"
import prisma from "@/lib/prisma"
import {cloudinary, UploadApiResponse, UploadApiErrorResponse} from "@/lib/cloudinary"
import {z} from "zod"
import { authenticatedAction } from "@/lib/safe-actions"
import { revalidatePath } from "next/cache"
/*
// We make a twitter clone with Nextjs and prisma

model Tweet {
  id String @id @default(cuid())
  content String
  imageUrl String?
  views Int @default(0)

  authorId String
  author User @relation(fields: [authorId], references: [id], onDelete: Cascade)
  
  likes Likes[]
  comments Comment[]
  retweets Retweet[]
  bookmarks Bookmark[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Likes {
  id String @id @default(cuid())

  authorId String
  author User @relation(fields: [authorId], references: [id], onDelete: Cascade)
  
  tweetId String
  tweet Tweet @relation(fields: [tweetId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([authorId, tweetId])
}

model Comment {
  id String @id @default(cuid())
  content String

  tweetId String
  tweet Tweet @relation(fields: [tweetId], references: [id], onDelete: Cascade)

  authorId String
  author User @relation(fields: [authorId], references: [id], onDelete: Cascade)

  parentId String?
  parent Comment? @relation("replies", fields: [parentId], references: [id], onDelete: Cascade)
  replies Comment[] @relation("replies")

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Retweet {
  id String @id @default(cuid())

  authorId String
  author User @relation(fields: [authorId], references: [id], onDelete: Cascade)
  
  tweetId String
  tweet Tweet @relation(fields: [tweetId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([authorId, tweetId])
}

model Bookmark {
  id String @id @default(cuid())

  authorId String
  author User @relation(fields: [authorId], references: [id], onDelete: Cascade)
  
  tweetId String
  tweet Tweet @relation(fields: [tweetId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([authorId, tweetId])
}

model Follow {
  id String @id @default(cuid())

  followerId String
  follower User @relation(name: "followers", fields: [followerId], references: [id], onDelete: Cascade)

  followingId String
  following User @relation(name: "following", fields: [followingId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([followerId, followingId])
}

*/

export const createTweet = authenticatedAction
    .schema(z.object({
        content: z.string().min(1).max(280),
        imageUrl: z.string().optional(),
    }))
    .action(async ({parsedInput: {content, imageUrl}, ctx: {userId}}) => {
      let image: string | null = null

      if (image) {
        const uploadResponse: UploadApiResponse | UploadApiErrorResponse = await cloudinary.uploader.upload(image, {
          folder: 'tweets',
        });
        if ('error' in uploadResponse) {
          throw new Error(uploadResponse.error.message);
        }
        image = uploadResponse.secure_url
      }

      await prisma.tweet.create({
            data: {
                content,
                imageUrl: image,
                authorId: userId,
            }
        })

        revalidatePath("/")
        return {success: true}
    })