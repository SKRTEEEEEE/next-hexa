"use client"

import { CoverParticles } from "@/components/oth/cover-particles";
import Introduction from "@/components/ceo/introduction";
import TransitionPage from "@/components/oth/transition-page";

export default function CeoPage() {
    return (
      <main>
        <TransitionPage />
        <div className="flex w-full min-h-dvh bg-no-repeat bg-gradient-cover">
          <CoverParticles />
          <Introduction />
        </div>
      </main>
    );
  }
  