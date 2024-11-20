"use client"

import { transitionVariantsPage } from "@/lib/motion-transitions";
import { AnimatePresence, motion } from "framer-motion";

const TransitionPage = () => {
    return (
        <AnimatePresence mode="wait">
            <div>
                <motion.div
                    className="fixed top-0 bottom-0 right-full w-screen h-screen z-30 bg-gradient-cover opacity-75 blur-xl"
                    variants={transitionVariantsPage}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
                    {...(motion.div as any)} 
                ></motion.div>
            </div>
        </AnimatePresence>
    );
}

export default TransitionPage;