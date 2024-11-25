import PlainsComparisonTable from "@/components/academia/plains-comparison-table";
import { SubscriptionPlanCard } from "@/components/academia/subscription-plans-card";
import { plansBasicInfo } from "@/lib/data";

export default function Page () {
    return(
        <div className="container py-10">
        <h1 className="text-3xl font-bold text-center mb-10">Planes de Suscripción</h1>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {plansBasicInfo.map((plan, index) => (
            <SubscriptionPlanCard key={index} plan={plan} />
          ))}
        </div>
        <PlainsComparisonTable/>
      </div>
    )
}