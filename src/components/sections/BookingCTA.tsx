import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const BookingCTA = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="relative w-full bg-primary overflow-hidden py-20 md:py-40 px-6 md:px-16"
    >
      {/* Top border */}
      <div className="absolute top-0 left-16 right-16 h-px bg-[#1a1a1a]" />

      {/* Background red glow — centered */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(183,28,28,0.12) 0%, transparent 65%)',
        }}
      />

      {/* Decorative large text behind */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ overflow: 'hidden' }}
      >
        <span
          className="font-cinzel text-[180px] font-bold text-center leading-none"
          style={{ color: 'rgba(183,28,28,0.04)', whiteSpace: 'nowrap' }}
        >
          BOOK NOW
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-3xl mx-auto">

        {/* Label */}
        <motion.p
          className="font-manrope text-accent text-xs tracking-[0.3em] uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        >
          Bookings
        </motion.p>

        {/* Heading */}
        <motion.h2
         className="font-cinzel text-cream text-4xl md:text-6xl font-semibold leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
        >
          Book Abhinav For
          <br />
          Your Next Event
        </motion.h2>

        {/* Divider */}
        <motion.div
          className="w-10 h-px bg-accent"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.35 }}
          style={{ transformOrigin: 'center' }}
        />

        {/* Subline */}
        <motion.p
          className="font-cormorant text-muted text-lg md:text-xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.45 }}
        >
          Whether it's a resort, a wedding, or a corporate evening —
          <br />
          let's create something unforgettable.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
        >
          <Link
            to="/booking"
            className="relative inline-flex items-center gap-4 font-manrope text-sm tracking-widest uppercase text-cream bg-accent px-12 py-5 overflow-hidden group"
          >
            {/* Hover fill animation */}
            <span
              className="absolute inset-0 bg-accent-light translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out"
            />
            <span className="relative z-10">Send Booking Inquiry</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>

        {/* Bottom note */}
        <motion.p
          className="font-manrope text-muted text-xs tracking-wide"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
        >
          Available for events across India · Quick response within 24 hours
        </motion.p>

      </div>
    </section>
  )
}

export default BookingCTA