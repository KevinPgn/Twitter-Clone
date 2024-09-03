import { Categories } from "@/components/homePage/Categories";
import { FormCreateTweet } from "@/components/homePage/FormCreateTweet";
import { SidebarRight } from "@/components/sidebarRight/SidebarRight";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth()
  const user = session?.user

  return (
    <div className="flex flex-1">
      <main className="flex-1 h-full border-l border-r border-white/10">
        <Categories />
        <FormCreateTweet user={user}/>
      </main>
      <SidebarRight />
    </div>
  );
}
