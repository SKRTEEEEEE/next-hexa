"use client"

import { useState } from "react";
import { Check } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { cn, generatePaymentLink } from "@/lib/utils";
import { User } from "@/core/domain/entities/User";
import { RoleType } from "@/core/domain/entities/Role";
import {Link as LinkLocale} from "@/i18n/routing"

type State = {
  actualRole: string;
  button: string;
};

export function SubscriptionPlansDialog({ buttonTitle, user }: { buttonTitle?: string; user: false | User }) {
  const getInitialState = (): State => {
    if (user) {
      switch (user.role) {
        case RoleType.STUDENT:
          return { actualRole: "standard", button: "Tu plan actual" };
        case RoleType.STUDENT_PRO:
          return { actualRole: "premium", button: "Tu plan actual" };
        case null:
          return { actualRole: "free", button: "Tu plan actual" };
        default:
          return { actualRole: "premium", button: "Equivalente a tu plan actual" };
      }
    }
    return { actualRole: "free", button: "Debes Inicia sesión" };
  };

  const [selectedPlan, setSelectedPlan] = useState(getInitialState().actualRole);
  const initialState = getInitialState();

  const plans = [
    {
      id: "free",
      name: "Plan Gratuito",
      price: "$0",
      description: "Perfecto para comenzar",
      features: ["Acceso a cursos profesionales", "Acceso a múltiples ejercicios", "Soporte comunitario"],
    },
    {
      id: "standard",
      name: "Plan Estándar",
      price: "$9.99",
      description: "Ideal para estudiantes dedicados",
      features: ["Todo lo incluido en el Plan Gratuito", "Recursos de aprendizaje gratuitos/incluidos", "Soporte por email"],
    },
    {
      id: "premium",
      name: "Plan Premium",
      price: "$19.99",
      description: "Para profesionales y expertos",
      features: [
        "Todo lo incluido en el Plan Básico",
        "Acceso a todo el contenido",
        "Soporte prioritario 24/7",
      ],
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-fit")}>
          {buttonTitle ? buttonTitle : "Actualizar Plan"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Elige tu plan</DialogTitle>
          <DialogDescription>
            Selecciona el plan que mejor se adapte a tus necesidades de aprendizaje.
          </DialogDescription>
        </DialogHeader>
        <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="grid gap-4">
          {plans.map((plan) => (
            <div key={plan.id} className="relative">
              <RadioGroupItem
                value={plan.id}
                id={plan.id}
                className="peer sr-only"
                aria-labelledby={`${plan.id}-label`}
              />
              <Label
                htmlFor={plan.id}
                className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <div className="flex flex-col">
                  <h3 className="font-semibold" id={`${plan.id}-label`}>
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{plan.price}/mes</p>
                </div>
                {selectedPlan === plan.id && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </Label>
              {selectedPlan === plan.id && (
                <div className="mt-2 pl-4 text-sm">
                  <p className="mb-2 text-muted-foreground">{plan.description}</p>
                  <ul className="space-y-1">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </RadioGroup>
        <Button disabled={selectedPlan === initialState.actualRole || user === false} className="w-full mt-4">
          {
          <Link href={user === false ? "#": selectedPlan === "standard" ? generatePaymentLink(user.id, "STUDENT"): selectedPlan ==="premium" ? generatePaymentLink(user.id, "STUDENT_P"): "#free-eliminar"}>
          {selectedPlan === initialState.actualRole ? initialState.button : user === false ?"Inicia session para configurar":"Confirmar selección"}</Link>}
        </Button>
        <Button variant={"outline"} className="w-full mt-2">
          <LinkLocale href={"/academia/tarifas#comparacion" as any}>Ver todos los detalles</LinkLocale>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
