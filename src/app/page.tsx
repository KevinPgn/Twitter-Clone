import { AllTweets } from "@/components/homePage/AllTweets";
import { Categories } from "@/components/homePage/Categories";
import { FormCreateTweet } from "@/components/homePage/FormCreateTweet";
import { SidebarRight } from "@/components/sidebarRight/SidebarRight";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function Home() {
  const session = await auth()
  const user = session?.user
  
  const tweets = await prisma.tweet.findMany({
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
          authorId: user.id
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

  const tweetsWithLikeStatus = tweets.map((tweet) => ({
    ...tweet,
    isLiked: tweet.likes && tweet.likes.length > 0
  }));

  return (
    <div className="flex flex-1">
      <main className="flex-1 h-full border-l border-r border-white/10">
        <Categories />
        <FormCreateTweet user={user}/>

        {tweetsWithLikeStatus.length > 0 ? (
          tweetsWithLikeStatus.map((tweet) => (
            <AllTweets key={tweet.id} tweet={tweet} user={user}/>
          ))
        ): null}

      </main>
      <SidebarRight />
    </div>
  );
}
