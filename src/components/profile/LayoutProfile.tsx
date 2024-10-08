import { RouterBackToHome } from "./RouterBackToHome"
import prisma from "@/lib/prisma"
import { UserProfiled } from "./UserProfile"
import { auth } from "@/lib/auth"

export const LayoutProfile = async ({userId}: {userId: string}) => {
  const session = await auth()
  const userConnected = session?.user?.id

  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
        id: true,
        name: true,
        image: true,
        banner: true,
        birthday: true,
        createdAt: true,
        followers: {
          where: {
            followingId: userConnected
          },
          select: {
            followingId: true
          }
        },
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
    <UserProfiled user={user} userConnected={userConnected} />
  </>
}