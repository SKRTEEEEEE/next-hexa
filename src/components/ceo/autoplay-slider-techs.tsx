"use client"

import { JSX, useRef} from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './autoplay-slider-techs.module.css';

// import required modules
import  { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Tech } from '@/lib/projects';


type AutoplaySliderProps = {
    delay?: number;
    disableOnInteraction?: boolean;
    data: (Tech&{icon:JSX.Element})[];
  }


const AutoplaySliderTechs: React.FC<AutoplaySliderProps> = ({
    delay = 5500,
    disableOnInteraction = false,
    data
  }) => {
  const progressCircle = useRef<SVGSVGElement>(null);
  const progressContent = useRef<HTMLSpanElement>(null);
  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', String(1 - progress));
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };
  return (

      <Swiper
      breakpoints={{
        320: {
            slidesPerView: 1,
            spaceBetween: 15
        },
        // 768: {
        //     slidesPerView: 4,
        //     spaceBetween: 15
        // },
        // 1024: {
        //     slidesPerView: 6,
        //     spaceBetween: 15
        // }
    }}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay,
          disableOnInteraction,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className={`py-12 ${styles.mySwiper}`}
      >

        {data.map((tech)=> 
        {const shouldRenderParagraph = tech?.version && tech?.version.trim() !== '';
          return (<SwiperSlide key={tech.title} className={styles.swiperSlide}>
            {tech.icon}
                    <div className="flex flex-col">
                      <span className='text-xl'> {tech.title} {shouldRenderParagraph && tech.version} </span>
                      <span className="text-xs"><i>{tech.desc}</i></span>
                    </div>

          </SwiperSlide>)}
        )}
        
      
        <div className={`${styles.autoplayProgress} text-secondary-400/20`} slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span className='stroke-secondary-800' ref={progressContent}></span>
        </div>
      </Swiper>
  
  );
}


export default AutoplaySliderTechs;