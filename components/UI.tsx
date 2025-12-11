import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Timer } from 'lucide-react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'outline';
  className?: string;
  pulse?: boolean;
}

export const CtaButton: React.FC<ButtonProps> = ({ text, onClick, href, variant = 'primary', className = '', pulse = false }) => {
  const baseClasses = "relative group flex items-center justify-center px-8 py-4 font-serif font-bold tracking-widest uppercase text-sm md:text-base transition-all duration-300 overflow-hidden";
  
  const variants = {
    primary: "bg-blood-600 text-white hover:bg-blood-500 border border-transparent shadow-[0_0_15px_rgba(192,57,43,0.3)]",
    outline: "bg-transparent text-white border border-white/20 hover:border-blood-600 hover:text-blood-500"
  };

  const pulseClass = pulse ? "animate-pulse-slow shadow-[0_0_30px_rgba(192,57,43,0.6)]" : "";

  const content = (
    <span className="relative z-10 flex items-center gap-2">
      {text}
      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </span>
  );

  if (href) {
      return (
        <motion.a
            href={href}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${baseClasses} ${variants[variant]} ${pulseClass} ${className}`}
        >
            {content}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] skew-x-12" />
        </motion.a>
      )
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${pulseClass} ${className}`}
      onClick={onClick}
    >
      {content}
       <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12" />
    </motion.button>
  );
};

export const Badge: React.FC<{ children: React.ReactNode; type?: 'warning' | 'info' | 'success' }> = ({ children, type = 'info' }) => {
    let colors = 'bg-evidence-400/10 text-evidence-400 border-evidence-400/30';
    if (type === 'warning') colors = 'bg-blood-600/10 text-blood-500 border-blood-600/30';
    if (type === 'success') colors = 'bg-green-500/10 text-green-500 border-green-500/30';

    return (
        <span className={`inline-block px-3 py-1 text-[10px] md:text-xs font-mono border ${colors} mb-4 tracking-[0.2em] uppercase backdrop-blur-sm`}>
            {children}
        </span>
    );
};

export const Marquee: React.FC<{ items: string[] }> = ({ items }) => {
  return (
    <div className="relative flex overflow-hidden bg-blood-600/5 border-y border-blood-600/20 py-4 select-none">
      <motion.div
        className="flex whitespace-nowrap gap-12"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-4 text-blood-500/80 font-mono text-sm tracking-widest uppercase font-bold">
            <span>{item}</span>
            <span className="text-white/20">•</span>
          </div>
        ))}
      </motion.div>
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-noir-900 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-noir-900 to-transparent z-10" />
    </div>
  );
};

export const ScarcityTimer: React.FC = () => {
  const [time, setTime] = useState({ m: 14, s: 59 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        if (prev.s === 0) {
          if (prev.m === 0) return { m: 14, s: 59 }; // Reset loop for demo
          return { m: prev.m - 1, s: 59 };
        }
        return { m: prev.m, s: prev.s - 1 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 text-blood-500 font-mono text-sm bg-blood-600/10 px-4 py-2 rounded border border-blood-600/20 w-fit mx-auto md:mx-0">
      <Timer size={14} className="animate-pulse" />
      <span>OFERTA EXPIRA EM: <span className="text-white font-bold">{String(time.m).padStart(2, '0')}:{String(time.s).padStart(2, '0')}</span></span>
    </div>
  );
};