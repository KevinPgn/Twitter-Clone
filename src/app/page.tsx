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
      author: true,
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
      }
    },
    orderBy: {
      createdAt: "desc"
    },
    take: 10
  })

  return (
    <div className="flex flex-1">
      <main className="flex-1 h-full border-l border-r border-white/10">
        <Categories />
        <FormCreateTweet user={user}/>
        
        {tweets.length > 0 ? (
          tweets.map((tweet) => (
            <AllTweets key={tweet.id} tweet={tweet}/>
          ))
        ): null}

      </main>
      <SidebarRight />
    </div>
  );
}
