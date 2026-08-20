"use client";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, QrCode } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TrustBar } from "@/components/shared/TrustBar";

interface HeroProps {
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  primaryCTA?: string;
  primaryHref?: string;
}

function fade(delay: number, prefersReduced: boolean | null) {
  return {
    initial: prefersReduced ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, type: "spring" as const, damping: 25, stiffness: 120 },
  };
}

export function Hero({ title, subtitle, image, imageAlt, primaryCTA = "List Your Business", primaryHref = "/join" }: HeroProps) {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image src={image} alt={imageAlt} fill priority className="object-cover" />
        {/* Scrim: never below 50% opacity where headline copy sits */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/70 to-ink/50" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 pt-36 pb-20 md:pt-48 md:pb-28 text-center">
        <motion.h1
          {...fade(0.1, prefersReduced)}
          className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold leading-tight tracking-tight text-white"
        >
          {title}
        </motion.h1>

        <motion.p
          {...fade(0.25, prefersReduced)}
          className="mt-5 text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto"
        >
          {subtitle}
        </motion.p>

        <motion.div
          {...fade(0.45, prefersReduced)}
          className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <Link
            href={primaryHref}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            {primaryCTA}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#directory"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          >
            Browse the Directory
          </Link>
        </motion.div>
      </div>

      <div className="relative z-10 bg-background/95 backdrop-blur-sm border-t border-border">
        <TrustBar />
      </div>
    </section>
  );
}
