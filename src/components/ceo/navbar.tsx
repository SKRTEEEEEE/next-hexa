"use client"


import { itemsNavbar } from "@/lib/data-ceo";

import { MotionTransition } from "../oth/transition-component";
import { Link, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";

const Navbar = () => {
    const router = usePathname()
    const locale = useLocale()

    return (
        <MotionTransition position="right" className="fixed z-40 flex flex-col items-center justify-center w-full mt-auto h-max bottom-10">
            <nav>
                <div className="flex items-center justify-center gap-2 px-4 py-1 rounded-full bg-foreground/15 background-blur-sm">
                    {itemsNavbar.map((item) => (
                        <div
                            key={item.id}
                            className={`px-3 py-2 transition duration-150 rounded-full cursor-pointer hover:bg-secondary-ceo ${router === item.link && 'bg-secondary-ceo'}`}
                            data-tooltip-target="tooltip-default">
                            <Link href={item.link as "/ceo" | "/ceo/proyectos" | "/ceo/portafolio" | "/ceo/info" | "/ceo/estudios" | "/ceo/code"}>{item.icon} 
                                <p id={item.title} className="sr-only">{item.desc[locale as 'es' | 'de' | 'en']}</p>
                            </Link>
                            
                        </div>
                    ))}
                </div>
            </nav>
        </MotionTransition>
    );
}

export default Navbar;