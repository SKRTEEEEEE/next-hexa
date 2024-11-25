

import SliderTechs from "@/components/ceo/slider-techs";
import { MotionTransition } from "@/components/oth/transition-component";
import TransitionPage from "@/components/oth/transition-page";
import { Button } from "@/components/ui/button";
import { readAllTechsUC } from "@/core/application/usecases/entities/tech";
import { FullTechData, Leng } from "@/core/domain/entities/Tech";
import { flattenTechs } from "@/lib/techs";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

const AboutMePage = async () => {
    const lenguajes = await readAllTechsUC()
    let allLeng: false | FullTechData[]
    if (!lenguajes) {
        allLeng = false
    } else {
        allLeng = flattenTechs(lenguajes)
    }
    const t = await getTranslations()


    return (
        <main className="bg-opacity-90 mx-8 mt-16 pb-8 md:pb-0 md:mt-0 sm:mt-12">
            <TransitionPage />
            <div className="bottom-0 right-0 hidden md:inline-block md:absolute">
                <Image src="/ceo/circles.png" width="300" height="300" className="w-full h-full " alt={t("ceo.images.circular")} />
            </div>
            <MotionTransition position='right' className="bottom-0 left-0 hidden xl:inline-block xl:absolute">
                <Image src="/ceo/services.svg" width="400" height="400" className="w-[350px] h-full " alt={t("ceo.images.tablet_office")} />
            </MotionTransition>
            <div className="md:grid flex flex-col items-center justify-center min-h-dvh max-w-5xl md:gap-6 gap-4 mx-auto md:grid-cols-2">
                <section className="max-w-[450px]">

                    <h1 tabIndex={0} className="text-xl leading-tight text-center sm:text-left xl:text-4xl xl:mb-5">{t("ceo.info.section.skills.h1.0")} <span className="font-bold text-secondary-ceo"> {t("ceo.info.section.skills.h1.1")}.</span></h1>
                    <h2 className='hover:text-secondary-ceo-600/20 text-secondary-ceo-300'>{t("ceo.info.section.skills.h2")}: </h2>
                    <ul className="md:mb-3 xl:text-xl 
                    text-gray-300">
                        <li className="p-1 px-4 mb-2 border-secondary-ceo/10 border-4 rounded-md">
                            <span className="text-3xl" tabIndex={0}>Fullstack web JS</span><br />React.js, Next.js, Node.js, Express.js, MongoDB, Mongoose.js, TailwindCss, etc...
                        </li>
                        <li className="p-1 px-4 mb-2 border-secondary-ceo/10 border-4 rounded-md"><span className="text-3xl" tabIndex={0}>Fullstack dApp <i>EVM</i></span><br />Solidity, Ether.js, Thirdweb, Hardhat, Forge, Chainlink, etc... </li>
                    </ul>
                    <div className="space-y-2 flex flex-col w-full">
                        <Button className="w-full" variant={"secondary"}><Link href={"/ceo/docs/techs"}>{t("ceo.info.section.skills.buttons.tech")}</Link></Button>
                        <Button variant={"outline"} className="w-full"><Link href={"/admin/techs"}>{t("ceo.info.section.skills.buttons.admin")}</Link></Button>
                    </div>


                </section>

                {/* SLIDER */}
                {allLeng !== false ? <section>

                    <h2 className='hover:text-secondary-ceo-600/20 text-secondary-ceo-300 mb-4' tabIndex={0}>{t("ceo.info.section.slider.h2")}: </h2>
                    <SliderTechs data={allLeng} />
                </section> :
                    <section>

                        <h2 className='hover:text-secondary-ceo-600/20 text-secondary-ceo-300 mb-4' tabIndex={0}>🚧Building.... //_🐲 </h2>

                    </section>}
            </div>
        </main>
    );
}

export default AboutMePage;