import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="relative w-full h-screen bg-primary overflow-hidden" id="hero">

      {/* Red glow background — matches image lighting */}
      <div className="absolute inset-0">
        <div
          className="absolute right-0 top-0 w-3/4 h-full"
          style={{
            background: 'radial-gradient(ellipse at 80% 40%, rgba(183,28,28,0.18) 0%, transparent 70%)',
          }}
        />
      </div>

     {/* Artist image — full background on mobile, right side on desktop */}
      <motion.div
        className="absolute inset-0 md:inset-auto md:right-0 md:top-0 md:h-full md:w-[58%]"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
      >
        <img
         src="https://res.cloudinary.com/dhysr3yfi/image/upload/f_auto,q_auto,w_1200/v1781464152/abhinachero_lnll1p.png"
          alt="Abhinav Dhiman performing live"
          className="w-full h-full object-cover object-[70%_20%] md:object-left"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 30%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%)',
          }}
        />
        {/* Extra dark overlay on mobile so text stays readable */}
        <div className="absolute inset-0 bg-black/60 md:hidden" />
      </motion.div>

      {/* Left side text content */}
     <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-16 max-w-2xl">
        {/* Label */}
        <motion.p
          className="font-manrope text-accent text-sm tracking-[0.3em] uppercase mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
        >
          Live Singer & Performer
        </motion.p>

        {/* Main heading */}
        <motion.h1
          className="font-cinzel text-cream text-5xl md:text-7xl font-semibold leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.7 }}
        >
          Abhinav
          <br />
          Dhiman
        </motion.h1>

        {/* Divider line */}
        <motion.div
          className="w-16 h-px bg-accent mb-6"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.9 }}
          style={{ transformOrigin: 'left' }}
        />

        {/* Tagline */}
        <motion.p
          className="font-cormorant text-muted text-lg md:text-xl leading-relaxed mb-10"  
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 1.0 }}
        >
          Creating unforgettable moments
          <br />
          through live performances.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 1.1 }}
        >
          <Link
            to="/booking"
            className="font-manrope text-sm tracking-widest uppercase bg-accent text-cream px-8 py-4 hover:bg-accent-light transition-colors duration-300"
          >
            Book Now
          </Link>
          <Link
            to="/performances"
            className="font-manrope text-sm tracking-widest uppercase border border-muted text-cream px-8 py-4 hover:border-cream transition-colors duration-300"
          >
            Watch Performances
          </Link>
        </motion.div>

      </div>

    </section>
  )
}

export default Hero