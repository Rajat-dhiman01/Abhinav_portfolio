import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  {
    number: '10+',
    label: 'Years of Singing',
    sublabel: 'Classical & Contemporary',
  },
  {
    number: '3+',
    label: 'Years Live Performance',
    sublabel: 'Resorts · Hotels · Corporate',
  },
  {
    number: '3',
    label: 'Reality Show Appearances',
    sublabel: 'Sa Re Ga Ma Pa · Indian Idol · The Voice',
  },
]

const Stats = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="relative w-full bg-primary"
      style={{ minHeight: '50vh' }}
    >
      {/* Gradient fade from hero */}
      <div
        className="absolute top-0 left-0 w-full h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #0A0A0A 0%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="relative flex items-center justify-center gap-24 px-16 py-20">

        {/* Left label */}
        <motion.div
          className="flex flex-col gap-2 min-w-[140px]"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <p className="font-manrope text-muted text-xs tracking-[0.3em] uppercase">
            Career
          </p>
          <p className="font-cinzel text-cream text-2xl">
            Highlights
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative flex flex-col" style={{ width: '380px' }}>

          {/* SVG line — positioned absolutely behind the dots */}
          <div className="absolute left-[7px] top-[10px] bottom-[10px]">
            <svg
              width="2"
              height="100%"
              style={{ height: '260px' }}
            >
              <motion.line
                x1="1"
                y1="0"
                x2="1"
                y2="260"
                stroke="#B71C1C"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  isInView
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.3 }}
              />
            </svg>
          </div>

          {/* Stats rows */}
          <div className="flex flex-col gap-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-5"
                initial={{ opacity: 0, x: 20 }}
                animate={
                  isInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: 20 }
                }
                transition={{
                  duration: 0.7,
                  ease: 'easeOut',
                  delay: 0.6 + index * 0.25,
                }}
              >
                {/* Dot — aligned with the line */}
                <motion.div
                  className="w-[14px] h-[14px] rounded-full border-2 border-accent bg-primary flex-shrink-0 mt-2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    isInView
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0, opacity: 0 }
                  }
                  transition={{
                    duration: 0.4,
                    ease: 'easeOut',
                    delay: 0.6 + index * 0.25,
                  }}
                />

                {/* Text */}
                <div className="flex flex-col gap-1">
                  <span className="font-cinzel text-cream text-3xl font-semibold leading-none">
                    {stat.number}
                  </span>
                  <span className="font-manrope text-cream text-sm mt-1">
                    {stat.label}
                  </span>
                  <span className="font-manrope text-muted text-xs tracking-wide">
                    {stat.sublabel}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Stats