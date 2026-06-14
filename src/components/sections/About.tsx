import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const stats = [
  { number: '10+', label: 'Years of Singing' },
  { number: '3+', label: 'Years Live Performance' },
  { number: '3', label: 'Reality Show Appearances' },
]

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="relative w-full bg-primary overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* Subtle red glow — left side this time */}
      <div
        className="absolute left-0 top-0 w-1/2 h-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 60%, rgba(183,28,28,0.10) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-screen px-6 md:px-16 gap-10 lg:gap-20 py-20">
        {/* Left — Image */}
        <motion.div
         className="relative flex-shrink-0 w-full max-w-[320px] md:max-w-[420px]"
          style={{ height: '420px' }}
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 1.0, ease: 'easeOut', delay: 0.2 }}
        >
          <img
            src="/images/sections3.png"
            alt="Abhinav Dhiman on stage"
            className="w-full h-full object-cover"
            style={{
              maskImage:
                'linear-gradient(to bottom, black 70%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, black 70%, transparent 100%)',
            }}
          />

          {/* Animated running border */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 420 560"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ pointerEvents: 'none' }}
          >
            <motion.rect
              x="1"
              y="1"
              width="418"
              height="558"
              stroke="#B71C1C"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="80 1872"
              style={{
                filter: 'drop-shadow(0 0 8px #B71C1C) drop-shadow(0 0 2px #E53935)',
              }}
              animate={{
                strokeDashoffset: [0, -1952],
              }}
              transition={{
                duration: 3.5,
                ease: 'linear',
                repeat: Infinity,
              }}
            />
          </svg>
        </motion.div>

        {/* Right — Content */}
        <div className="flex flex-col gap-8 max-w-xl">

          {/* Label */}
          <motion.p
            className="font-manrope text-accent text-xs tracking-[0.3em] uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
          >
            About the Artist
          </motion.p>

          {/* Heading */}
          <motion.h2
            className="font-cinzel text-cream text-3xl md:text-5xl font-semibold leading-tight"
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          >
            A Voice That
            <br />
            Moves People
          </motion.h2>

          {/* Divider */}
          <motion.div
            className="w-12 h-px bg-accent"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={
              isInView
                ? { opacity: 1, scaleX: 1 }
                : { opacity: 0, scaleX: 0 }
            }
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.5 }}
            style={{ transformOrigin: 'left' }}
          />

          {/* Paragraph */}
          <motion.p
            className="font-cormorant text-muted text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
          >
            For over 10 years, Abhinav Dhiman has pursued music with unwavering
            dedication, blending soulful vocals with a captivating stage presence
            that resonates with every audience. Recognized through appearances on
            renowned reality shows such as The Voice, Indian Idol, and Sa Re Ga
            Ma Pa, he has spent the last several years performing across resorts,
            cafés, private events, and public stages. His performances are defined
            not just by music, but by the atmosphere, emotion, and unforgettable
            moments they create.
          </motion.p>

          {/* Stats row */}
          <motion.div
           className="flex flex-wrap gap-6 md:gap-10 pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.75 }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col gap-1">
                <span className="font-cinzel text-cream text-3xl font-semibold">
                  {stat.number}
                </span>
                <span className="font-manrope text-muted text-xs tracking-wide uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.9 }}
          >
            <Link
              to="/about"
              className="inline-flex items-center gap-3 font-manrope text-sm tracking-widest uppercase text-cream border-b border-muted pb-1 hover:border-cream transition-colors duration-300"
            >
              Read Full Story
              <span className="text-accent">→</span>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default About