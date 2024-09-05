import { auth } from '@/lib/auth'
import React from 'react'
import prisma from '@/lib/prisma'
import { AllTweets } from '@/components/homePage/AllTweets'

const BookmarksPage = async () => {
  const session = await auth()
  const user = session?.user?.id
  
    // get bookmarks from user
    const tweetBookmarked = await prisma.tweet.findMany({
        where: {
          bookmarks: {
            some: {
              authorId: user
            }
          }
        },
        select: {
          id: true,
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            }
          },
          content: true,
          imageUrl: true,
          createdAt: true,
          views: true,
          _count: {
            select: {
              comments: true,
              likes: true,
              bookmarks: true,
              retweets: true,
            }
          },
          likes: user ? {
            where: {
              authorId: user
            },
            select: {
              authorId: true,
            }
          } : undefined,
          retweets: user ? {
            where: {
              authorId: user
            },
            select: {
              authorId: true,
            }
          } : undefined,
          bookmarks: user ? {
            where: {
              authorId: user
            },
            select: {
              authorId: true,
            }
          } : undefined,
        },
        orderBy: {
          createdAt: "desc"
        },
        take: 10
      })
  
    const tweetBookmarkedWithStatus = tweetBookmarked?.map((tweet: any) => ({
      ...tweet,
      isLiked: tweet.likes && tweet.likes.length > 0,
      isBookmarked: tweet.bookmarks && tweet.bookmarks.length > 0,
      isRetweeted: tweet.retweets && tweet.retweets.length > 0
    }));

    return (
    <main className="flex-1 h-full border-l border-r border-white/10">
        {tweetBookmarkedWithStatus.length === 0 ? (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No bookmarks found</p>
            </div>
        ) : (
            tweetBookmarkedWithStatus.map((tweet) => (
                <AllTweets key={tweet.id} tweet={tweet} user={user} />
            ))
        )}
    </main>
  )
}

export default BookmarksPage