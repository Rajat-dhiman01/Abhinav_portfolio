import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Palmtree, Building2, Coffee, Briefcase, Heart, Music } from 'lucide-react'

const services = [
  {
    icon: Palmtree,
    title: 'Resorts',
    description: 'Elegant live performances crafted for resort atmospheres and leisure settings.',
  },
  {
    icon: Building2,
    title: 'Hotels',
    description: 'Sophisticated sets tailored for hotel lobbies, dining halls, and special evenings.',
  },
  {
    icon: Coffee,
    title: 'Cafes',
    description: 'Intimate acoustic performances that elevate the café experience.',
  },
  {
    icon: Briefcase,
    title: 'Corporate Events',
    description: 'Professional live music for corporate gatherings, launches, and award nights.',
  },
  {
    icon: Heart,
    title: 'Weddings',
    description: 'Soulful performances that make every wedding moment truly unforgettable.',
  },
  {
    icon: Music,
    title: 'Private Events',
    description: 'Exclusive live sets curated for private celebrations and special occasions.',
  },
]

const Services = () => {
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
          Services
        </motion.p>
        <motion.h2
          className="font-cinzel text-cream text-4xl font-semibold text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        >
          What I Perform At
        </motion.h2>
        <motion.div
          className="w-10 h-px bg-accent mt-2"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
          style={{ transformOrigin: 'center' }}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <motion.div
              key={index}
              className="group relative flex flex-col items-center text-center gap-4 bg-secondary p-6 md:p-10 border border-[#1a1a1a] hover:border-accent transition-colors duration-500 cursor-default"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 + index * 0.1 }}
            >
              {/* Icon */}
              <div className="text-accent mb-2 transition-transform duration-500 group-hover:scale-110">
                <Icon size={32} strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className="font-cinzel text-cream text-lg font-semibold">
                {service.title}
              </h3>

              {/* Description */}
              <p className="font-cormorant text-muted text-base leading-relaxed">
                {service.description}
              </p>

              {/* Bottom accent line on hover */}
              <div className="absolute bottom-0 left-0 w-0 h-px bg-accent transition-all duration-500 group-hover:w-full" />
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

export default Services