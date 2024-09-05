import { RouterBackToHome } from "./RouterBackToHome"
import prisma from "@/lib/prisma"
import { UserProfile } from "./UserProfile"

export const LayoutProfile = async ({userId}: {userId: string}) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
        name: true,
        image: true,
        banner: true,
        birthday: true,
        createdAt: true,
        _count: {
            select: {
                tweets: true,
                followers: true,
                following: true
            }
        }
    }
  })

  if(!user){
    return <div>User not found</div>
  }

  return <>
    <RouterBackToHome user={user}/>
    <UserProfile user={user}/>
  </>
}