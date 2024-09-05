import { Button } from "../ui/button"

export const Subscribe = () => {
  return <div className="border border-white/10 rounded-2xl p-5">
    <h2 className="text-xl font-bold mb-2">Abonnez-vous à Premium</h2>
    <p className="text-sm text-white/80">Abonnez‑vous pour profiter de nouvelles fonctionnalités et recevoir une part des revenus publicitaires si vous respectez les critères.</p>

    <Button className="w-fit px-5 rounded-full bg-blue-500 hover:bg-blue-600 mt-4">
      Souscrire
    </Button>
  </div>
}