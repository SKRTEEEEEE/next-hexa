import PlainsComparisonTable from "@/components/plains-comparison-table";
import { SubscriptionPlanCard } from "@/components/subscription-plans-card";
export const plans = [
    {
      name: "Plan Gratuito",
      description: "Perfecto para comenzar",
      price: "0€",
      period: "mes",
      subtitle: "🎉 Subscribe para comenzar !",
      features: [
        "Acceso a cursos profesionales",
        "Acceso a multiples ejercicios",
        "Foro de la comunidad",
        "Recursos de aprendizaje básicos",
        // "Actualizaciones mensuales de contenido",
      ],
    },
    {
      name: "Plan Básico",
      description: "Ideal para estudiantes dedicados",
      price: "9.99€",
      period: "mes",
      subtitle: "💶 Ahora, primer mes GRATIS !",
      features: [
        "Todo lo incluido en el Plan Gratuito",
        "Acceso a cursos exclusivos",
        "Descuentos exclusivos de la comunidad",
        "Soporte por email",
      ],
      extraFeatures: [
        "Acceso a foro exclusivo",
        "Acceso a ejercicios exclusivos",
        // "Descuentos en suscripciones a cursos",
        "Recursos de aprendizaje gratuitos/incluidos"
      ],
    },
    {
      name: "Plan Premium",
      description: "Para profesionales y expertos",
      price: "19.99€",
      period: "mes",
      subtitle: "🧰 Primer mes, solo 10€ !",
      features: [
        "Todo lo incluido en el Plan Básico",
        // "Mentorías personalizadas incluidas",
        "Soporte prioritario 24/7",
        "Acceso a todos los cursos",
        "Acceso a todos los ejercicios",
        // "Suscripción a cursos incluida",
  
      ],
      extraFeatures: [
        "Voto para elección de próximos ejercicios",
        "Descarga de contenido offline",
      ],
    },
  ]
export default function Page () {
    return(
        <div className="container py-10">
        <h1 className="text-3xl font-bold text-center mb-10">Planes de Suscripción</h1>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <SubscriptionPlanCard key={index} plan={plan} />
          ))}
        </div>
        <PlainsComparisonTable/>
      </div>
    )
}