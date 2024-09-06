import { auth } from "@/lib/auth"
import { Button } from "../ui/button"
import prisma from "@/lib/prisma"

export const SuggestionsUsers = async () => {
    const session = await auth()
    const currentUserId = session?.user?.id

    const users = await prisma.user.findMany({
        where: {
            AND: [
                { id: { not: currentUserId } },
                {
                    NOT: {
                        followers: {
                            some: {
                                followerId: currentUserId
                            }
                        }
                    }
                }
            ]
        },
        select: {
            id: true,
            name: true,
            image: true,
        },
        orderBy: {
            followers: {
                _count: "desc"
            }
        },
        take: 5
    })

  return <div className="border border-white/10 rounded-2xl flex flex-col gap-5 p-5">
    <h2 className="text-xl font-bold mb-2">Suggestions</h2>
    {users.map((user) => (
        <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10"></div>
                <span className="text-sm font-bold">{user.name}</span>
            </div>
            <Button variant="outline" className="rounded-full px-4 py-2 text-sm text-black">
                Suivre
            </Button>
        </div>
    ))}
  </div>
}