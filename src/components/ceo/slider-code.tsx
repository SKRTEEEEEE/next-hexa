"use client"

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';

type Project = {
    id: number;
    name: string;
    description: string;
    path: string;
    contractUrl: string;
    usos: string[];
}

type SliderCodeProps = {
    data: Project[];
}

const SliderCode: React.FC<SliderCodeProps> = ({data}) => {



    return(
        <div className="flex items-center justify-center">

                    
                    <Swiper
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 15
                            },
                        }}
                        freeMode={true}
                        pagination={{
                            clickable: true
                        }}
                        modules={[Pagination]}
                        className="h-[380px] md:h-[300px] w-[270px] xl:w-[750px] lg:w-[650px] sm:w-[550px] mt-4 flex justify-evenly items-evenly"
                    >
                        {data.map(({ id, name, description, path, contractUrl, usos }) => (

                            <SwiperSlide key={id}>
                                <article className='flex flex-col  h-full justify-evenly items-evenly'>

                                    <h2 tabIndex={0} className='text-center text-3xl text-primary-ceo font-semibold'>{name}</h2>
                                    <div className="mt-5 text-center">
                                        {description}
                                    </div>
                                    <section>
                                        <fieldset>
                                            <legend className='text-primary-200'>Principales usos</legend>
                                            <ul>
                                                {usos.map((uso, index) => (
                                                    <li className='text-xs border-primary-ceo-200/10 border-b-2 rounded-sm px-2 py' key={index}>{uso}</li>
                                                ))}</ul>
                                        </fieldset>
                                    </section>

                                    <div className="flex justify-between gap-5 mb-5">


                                        <Link
                                            href={`https://ejemplos-d-apps.vercel.app/${path}`}
                                            target="_blank"
                                            className="p-2 transition duration-150 rounded-lg bg-secondary-ceo hover:bg-secondary/80"
                                        >
                                            Ejemplo desplegado
                                        </Link>
                                        <Link
                                            href={contractUrl}
                                            target="_blank"
                                            className="p-2 transition duration-150 rounded-lg bg-slate-500 hover:bg-slate-500/80"
                                        >
                                            <span className='hidden lg:inline'>Github </span>Código Blockchain
                                        </Link>
                                    </div>
                                </article>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
    )
}


export default SliderCode;