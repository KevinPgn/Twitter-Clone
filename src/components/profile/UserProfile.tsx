import { Button } from "../ui/button"
import { BtnFollow } from "./BtnFollow"

export const UserProfiled = ({user, userConnected}: {user: any, userConnected: any}) => {  
  const isFollowing = user.following.length > 0
  return (
    <div className="text-white border-b border-white/10 pb-3">
      <div className="relative">
        {/* Banner image placeholder */}
        {user.banner ? <img src={user.banner} alt="Banner" className="w-full h-[200px] object-cover" /> : (
            <div className="w-full h-[200px] bg-gray-800"/>
        )}
        
        <div className="flex justify-between px-4">
          <img 
            src={user.image} 
            alt={user.name} 
            className="w-32 h-32 object-cover rounded-full border-4 border-gray-900 relative -top-12"
          />
          {userConnected === user.id ? (
            <Button variant="ghost" className="text-sm mt-2 border border-white/10 px-4 py-1 rounded-full">
                Éditer le profil
            </Button>
          ): (
            <BtnFollow userId={user.id} isFollowing={isFollowing} />
          )}
        </div>
      </div>

      <div className="px-4 pb-3">
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-gray-500 font-medium">@{user.name.toLowerCase().replace(/\s+/g, '')}</p>
        
        <div className="flex items-center mt-3 text-sm text-gray-400">
          <span className="mr-4">
            <i className="far fa-calendar-alt mr-1"></i>
            {user.birthday}
          </span>
          <span>
            {user.bio}
          </span>
          <span>
            <i className="far fa-calendar-plus mr-1"></i>
            {new Date(user.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
          </span>
        </div>

        <div className="flex mt-3 text-sm">
          <span className="mr-4 text-gray-400"><strong className="text-white">{user._count.following}</strong> abonnements</span>
          <span className="text-gray-400"><strong className="text-white">{user._count.followers}</strong> abonnés</span>
        </div>
      </div>
    </div>
  )
}