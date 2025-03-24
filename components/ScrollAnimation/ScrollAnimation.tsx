"use client"

import './styles.css'
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "motion/react";
import { wrap } from "@motionone/utils";
import Image from 'next/image';

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax">
      <motion.div className="scroller" style={{ x }}>
        {children}
      </motion.div>
    </div>
  );
}

const logos = [
  { src: '/logos/google.png', alt: 'Google logo', invert: false },
  { src: '/logos/amazon.png', alt: 'Amazon logo', invert: false },
  { src: '/logos/godaddy.png', alt: 'GoDaddy logo', invert: false },
  { src: '/logos/proline.svg', alt: 'Proline logo', invert: false },
  { src: '/logos/flash.svg', alt: 'Flash logo', invert: true },
  { src: '/logos/hitech.png', alt: 'Hitech logo', invert: true },
  { src: '/logos/invert.png', alt: 'Invert logo', invert: true },
  { src: '/logos/snowflake.png', alt: 'Snowflake logo', invert: true }
];

export default function ScrollAnimation() {
  return (
    <section className="mx-auto my-10 flex flex-col w-full">
      <ParallaxText baseVelocity={-2}>
        <div className="marquee-content">
          {logos.map((logo, index) => (
            <div key={`logo1-${index}`} className="marquee-item">
              <Image 
                src={logo.src} 
                alt={logo.alt} 
                width={200} 
                height={200} 
                className={logo.invert ? 'invert' : ''}
              />
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {logos.map((logo, index) => (
            <div key={`logo1-dup-${index}`} className="marquee-item">
              <Image 
                src={logo.src} 
                alt={logo.alt} 
                width={200} 
                height={200} 
                className={logo.invert ? 'invert' : ''}
              />
            </div>
          ))}
        </div>
      </ParallaxText>

      <ParallaxText baseVelocity={2}>
        <div className="marquee-content">
          {logos.map((logo, index) => (
            <div key={`logo2-${index}`} className="marquee-item">
              <Image 
                src={logo.src} 
                alt={logo.alt} 
                width={200} 
                height={200} 
                className={logo.invert ? 'invert' : ''}
              />
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {logos.map((logo, index) => (
            <div key={`logo2-dup-${index}`} className="marquee-item">
              <Image 
                src={logo.src} 
                alt={logo.alt} 
                width={200} 
                height={200} 
                className={logo.invert ? 'invert' : ''}
              />
            </div>
          ))}
        </div>
      </ParallaxText>
    </section>
  );
}