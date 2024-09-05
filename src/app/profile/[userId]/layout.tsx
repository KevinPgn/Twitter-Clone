import { LayoutProfile } from "@/components/profile/LayoutProfile";
interface UserProfileLayoutProps {
    children: React.ReactNode
    params: {
        userId: string
    }
}

export default function UserProfileLayout({children, params}: UserProfileLayoutProps) {
    return <main className="flex-1 h-full border-l border-r border-white/10">
        <LayoutProfile userId={params.userId}/>
        {children}
    </main>
}