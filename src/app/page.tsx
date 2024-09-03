import { Categories } from "@/components/homePage/Categories";
import { SidebarRight } from "@/components/sidebarRight/SidebarRight";

export default function Home() {
  return (
    <div className="flex flex-1">
      <main className="flex-1 h-full border-l border-r border-white/10">
        <Categories />
      </main>
      <SidebarRight />
    </div>
  );
}
