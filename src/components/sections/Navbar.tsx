import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Menu } from 'lucide-react'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Performances', to: '/performances' },
  { label: 'Contact', to: '/contact' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(10,10,10,0.95)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid #1a1a1a' : '1px solid transparent',
        }}
      >
        <div className="flex items-center justify-between px-8 md:px-16 h-20">

          {/* Logo */}
          <Link to="/" className="flex flex-col gap-0">
            <span className="font-cinzel text-cream text-lg font-semibold tracking-wider leading-tight">
              Abhinav Dhiman
            </span>
            <span className="font-manrope text-accent text-[10px] tracking-[0.3em] uppercase">
              Live Singer & Performer
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative group font-manrope text-sm tracking-wide"
                >
                  <span
                    className={`transition-colors duration-300 ${
                      isActive ? 'text-cream' : 'text-muted group-hover:text-cream'
                    }`}
                  >
                    {link.label}
                  </span>

                  {/* Animated underline */}
                  <span className="absolute -bottom-1 left-0 h-px bg-accent transition-all duration-500 ease-in-out w-0 group-hover:w-full" />

                  {/* Active dot */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 h-px bg-accent w-full"
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Link
              to="/booking"
              className="relative font-manrope text-xs tracking-widest uppercase text-cream bg-accent px-6 py-3 overflow-hidden group"
            >
              <span className="absolute inset-0 bg-accent-light translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
              <span className="relative z-10">Book Now</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-cream p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} strokeWidth={1.5} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} strokeWidth={1.5} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: 'rgba(10,10,10,0.98)', backdropFilter: 'blur(16px)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-10">

              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
                >
                  <Link
                    to={link.to}
                    className="font-cinzel text-cream text-3xl font-semibold hover:text-accent transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Book Now in mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: navLinks.length * 0.08, ease: 'easeOut' }}
              >
                <Link
                  to="/booking"
                  className="font-manrope text-xs tracking-widest uppercase text-cream bg-accent px-10 py-4 mt-4 inline-block"
                >
                  Book Now
                </Link>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar