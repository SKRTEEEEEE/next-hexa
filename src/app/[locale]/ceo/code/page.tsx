
import Image from 'next/image';
import TransitionPage from '@/components/oth/transition-page';
import { MotionTransition } from '@/components/oth/transition-component';
import SliderCode from '@/components/ceo/slider-code';
import { getWeb3 } from '@/lib/web3';
import { getTranslations } from 'next-intl/server';

const Web3Page = async () => {
    const web3page = await getWeb3()
    const t = await getTranslations()

    return (
        <main>
            <TransitionPage />
            <MotionTransition position='bottom' className="bottom-0 left-0 hidden md:inline-block md:absolute ">
                <Image src="/ceo/avatar-code.png" width="200" height="300" className="w-full h-full " alt={t("ceo.images.pixel")} />
            </MotionTransition>
            <div className='flex flex-col justify-center min-h-dvh'>
                <div className="bottom-0 right-0 hidden md:inline-block md:absolute">
                    <Image src="/ceo/circles.png" width="300" height="300" className="w-full h-full " alt={t("ceo.images.circular")} />
                </div>
                <h1 tabIndex={0} className="text-2xl leading-tight text-center md:text-4xl md:mb-5">
                    {t("ceo.code.h1.0")}
                    <span className="block font-bold text-secondary-ceo"> {t("ceo.code.h1.1")}
                    </span>
                </h1>
                <SliderCode data={web3page} slider_list_tittle={t("ceo.code.slider_list_tittle")} buttons={t.raw("ceo.code.buttons")}/>
               
            </div>
        </main>
    );
}

export default Web3Page;