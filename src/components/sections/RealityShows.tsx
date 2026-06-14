import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const shows = [
  {
    image: '/images/thevoice.png',
    show: 'The Voice India Kids',
    network: '&TV',
    description: 'Reached the Battle Rounds on one of India\'s most prestigious singing competitions, showcasing exceptional vocal talent at a young age.',
    badge: 'Television Rounds Reached',
  },
  {
    image: '/images/saregama.png',
    show: 'Sa Re Ga Ma Pa',
    network: 'Zee TV',
    description: 'Performed on the iconic Sa Re Ga Ma Pa stage, one of India\'s longest running and most celebrated music reality shows.',
    badge: 'National Participant',
  },
]

const RealityShows = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="relative w-full bg-primary py-16 px-6 md:px-16"
    >
      {/* Subtle top border */}
      <div className="absolute top-0 left-16 right-16 h-px bg-[#1a1a1a]" />

      {/* Section header */}
      <div className="flex flex-col items-center gap-3 mb-16">
        <motion.p
          className="font-manrope text-accent text-xs tracking-[0.3em] uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        >
          Recognition
        </motion.p>
        <motion.h2
          className="font-cinzel text-cream text-4xl font-semibold text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        >
          As Seen On National Television
        </motion.h2>
        <motion.div
          className="w-10 h-px bg-accent mt-2"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
          style={{ transformOrigin: 'center' }}
        />
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-10">
        {shows.map((show, index) => (
          <motion.div
            key={index}
            className="relative group flex flex-col bg-secondary overflow-hidden w-full md:w-[420px]"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 + index * 0.2 }}
          >
            {/* Image */}
            <div className="relative overflow-hidden" style={{ height: '280px' }}>
              <img
                src={show.image}
                alt={show.show}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay on image */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to bottom, transparent 50%, #141414 100%)',
                }}
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3 p-8">

              {/* Network badge */}
              <span className="font-manrope text-accent text-xs tracking-[0.25em] uppercase">
                {show.network}
              </span>

              {/* Show name */}
              <h3 className="font-cinzel text-cream text-2xl font-semibold leading-snug">
                {show.show}
              </h3>

              {/* Description */}
              <p className="font-cormorant text-muted text-base leading-relaxed">
                {show.description}
              </p>

              {/* Badge */}
              <div className="flex items-center gap-2 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                <span className="font-manrope text-muted text-xs tracking-wide uppercase">
                  {show.badge}
                </span>
              </div>
            </div>

            {/* Animated bottom border on hover */}
            <div className="absolute bottom-0 left-0 w-0 h-px bg-accent transition-all duration-500 group-hover:w-full" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default RealityShows