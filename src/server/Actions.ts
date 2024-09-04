"use server"
import prisma from "@/lib/prisma"
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
         await prisma.tweet.create({
            data: {
                content,
                imageUrl,
                authorId: userId,
            }
        })

        revalidatePath("/")
        return {success: true}
    })

export const deleteTweet = authenticatedAction
    .schema(z.object({
        tweetId: z.string(),
    }))
    .action(async ({ parsedInput: { tweetId }, ctx: { userId } }) => {
        const tweet = await prisma.tweet.findUnique({
            where: { id: tweetId },
            select: { authorId: true }
        });

        if (!tweet) {
            throw new Error("Tweet not found");
        }

        if (tweet.authorId !== userId) {
            throw new Error("You are not authorized to delete this tweet");
        }

        await prisma.tweet.delete({
            where: { id: tweetId }
        });

        revalidatePath("/");
        return { success: true };
    });

export const createCommentToTheTweet = authenticatedAction
    .schema(z.object({
        tweetId: z.string(),
        content: z.string().min(1).max(280),
    }))
    .action(async ({ parsedInput: { tweetId, content }, ctx: { userId } }) => {
        await prisma.comment.create({
            data: {
                content,
                tweetId,
                authorId: userId,
            }
        });

        revalidatePath(`/tweet/${tweetId}`);
        return { success: true };
    });

export const likeTheTweet = authenticatedAction
    .schema(z.object({
        tweetId: z.string(),
    }))
    .action(async ({ parsedInput: { tweetId }, ctx: { userId } }) => {
        const existingLike = await prisma.likes.findUnique({
            where: {
                authorId_tweetId: {
                    authorId: userId,
                    tweetId,
                }
            }
        });

        if (existingLike) {
            await prisma.likes.delete({
                where: {
                    id: existingLike.id,
                }
            });
        } else {
            await prisma.likes.create({
            data: {
                tweetId,
                    authorId: userId,
                }
            });
        }

        revalidatePath(`/`);
    });

export const checkIfTheUserHasAlreadyLikedTheTweet = authenticatedAction
    .schema(z.object({
        tweetId: z.string(),
    }))
    .action(async ({ parsedInput: { tweetId }, ctx: { userId } }) => {
        const existingLike = await prisma.likes.findUnique({
            where: {
                authorId_tweetId: {
                    authorId: userId,
                    tweetId,
                }
            },
            select: {
                authorId: true,
            }
        });

        return existingLike;
    });