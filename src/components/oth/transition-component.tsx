"use client"

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion-transitions";

type MotionTransitionProps = {
    children: React.ReactNode;
    className?: string;
    position: 'right' | 'bottom'
};

export function MotionTransition(props: MotionTransitionProps) {
    const { children, className, position } = props

    return (
        <motion.div
            variants={fadeIn(position)}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={className}
            {...(motion.div as any)}
        >
            {children}
        </motion.div>
    )
}