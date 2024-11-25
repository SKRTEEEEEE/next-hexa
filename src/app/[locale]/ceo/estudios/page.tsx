// "use client" -> No me dejava quitar el use client porque el counter services no lo tenia

import CounterServices from "@/components/ceo/counter-services";
import TimeLine from "@/components/ceo/time-line";
import { MotionTransition } from "@/components/oth/transition-component";
import TransitionPage from "@/components/oth/transition-page";
import { useTranslations } from "next-intl";
import Image from "next/image";

const StudiesPage = () => {
    const t = useTranslations("ceo")
    return (
        <main className="w-full max-w-6xl px-4 pb-40 mx-auto mt-40 md:pb-0 md:px-6">

        <TransitionPage />
            
            <MotionTransition position="bottom" className="top-14 right-0 hidden xl:inline-block xl:absolute ">
            <Image priority src="/ceo/avatar1.svg" width={"550"} height={"550"} className="" alt={t("images.office")}/>
                </MotionTransition>
                <h1 tabIndex={0} className="text-2xl leading-tight text-center md:text-left md:text-5xl md:mt-10">
                    <span className="font-bold text-secondary-ceo">
                {t("estudios.h1.0")}
                    </span>
                    {' '}{t("estudios.h1.1")}
                </h1>

                <CounterServices />

                <TimeLine />

            {/* <TransitionPage /> */}
        </main>
    );
}

export default StudiesPage;