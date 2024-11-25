"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// import { lenguajesResources } from '@/lib/data-ceo';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { FullTechData } from '@/core/domain/entities/Tech';
import { useTranslations } from 'next-intl';

const SliderTechs = ({data}: {data:FullTechData[]}) => {
    const t = useTranslations("ceo.info.section.slider")
    return (
        <Swiper
            breakpoints={{
                320: {
                    slidesPerView: 1,
                    spaceBetween: 15
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 10
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 15
                }
            }}
            freeMode={true}
            pagination={{
                clickable: true
            }}
            modules={[Pagination]}
            className="h-[220px] md:h-[340px] w-[270px] lg:w-[500px] md:w-[360px]"
        >

            <ul>
                {data.map((item, index) => (
                    <SwiperSlide key={index} >
                        <li className="flex px-6 py-8 h-auto md:h-[290px] rounded-lg cursor-pointer bg-[rgba(65,47,123,0.15)] sm:flex-col gap-x-6 sm:gap-x-0 group hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300 hover:border-secondary-ceo border-2">
                            
                            <div className='h-full w-full flex flex-col items-center justify-between'>
                                <div className='flex md:flex-col w-full justify-between items-center'>
                                <h3 className="mb-4 text-xl" tabIndex={0}>{(item.name).charAt(0).toUpperCase() + (item.name).slice(1).toLowerCase()}</h3>
                                
                                <Avatar className='w-16 h-16 mb-2'>
                                    <AvatarImage src={item.img?item.img:""} alt={item.name} />
                                    <AvatarFallback>{item.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                               </div>
                               <div className="flex sm:flex-col w-full justify-between items-center">
                                <h4>{t("affinity")}  </h4>
                                <p className="text-xs">{t(`values.${item.value}`)}: {item.afinidad} %</p></div>
                                <div className="flex sm:flex-col w-full justify-between items-center">
                                <h4>{t("exp")} </h4>
                                <p className="text-xs">{t(`values.${(item.valueexp)}`)}: {item.experiencia} %</p></div>
                            </div>
                        </li>
                    </SwiperSlide>
                ))}</ul>
        </Swiper>
    );
}

export default SliderTechs;