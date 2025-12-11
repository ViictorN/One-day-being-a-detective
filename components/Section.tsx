import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({ children, className = "", id }) => {
  return (
    <section id={id} className={`relative py-24 px-4 md:px-8 max-w-7xl mx-auto ${className}`}>
      {children}
    </section>
  );
};

export const Reveal: React.FC<{ children: React.ReactNode; delay?: number; width?: "fit-content" | "100%" }> = ({ children, delay = 0, width = "fit-content" }) => {
    return (
        <div style={{ position: "relative", width, overflow: "hidden" }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export const ParallaxText: React.FC<{ children: React.ReactNode; offset?: number }> = ({ children, offset = 50 }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    
    const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

    return (
        <motion.div ref={ref} style={{ y }}>
            {children}
        </motion.div>
    );
};