import { BackToHomePage } from "@/components/tweetDetails/BackToHomePage";
import { TweetDetailsId } from "@/components/tweetDetails/TweetDetailsId";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

interface TweetIdPageProps {
  params: {
    tweetId: string
  }
}

export default async function TweetIdPage({ params }: TweetIdPageProps) {
  const session = await auth()
  const user = session?.user
  
  const tweet = await prisma.tweet.findUnique({
    where: {
      id: params.tweetId
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
      comments: {
        select: {
          id: true,
          content: true,
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            }
          }
        }
      },
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
          authorId: user.id
        },
        select: {
          authorId: true,
        }
      } : undefined,
      retweets: user ? {
        where: {
          authorId: user.id
        },
        select: {
          authorId: true,
        }
      } : undefined,
      bookmarks: user ? {
        where: {
          authorId: user.id
        },
        select: {
          authorId: true,
        }
      } : undefined,
    },
  })

  const tweetWithStatus = tweet ? ({
    ...tweet,
    isLiked: tweet.likes && tweet.likes.length > 0,
    isBookmarked: tweet.bookmarks && tweet.bookmarks.length > 0,
    isRetweeted: tweet.retweets && tweet.retweets.length > 0
  }) : null;

  return (
    <div className="flex flex-1 gap-5">
      <main className="flex-1 h-full border-l border-r border-white/10">
        <BackToHomePage />
        <TweetDetailsId tweet={tweetWithStatus} user={user}/>
      </main>
    </div>
  );
}
