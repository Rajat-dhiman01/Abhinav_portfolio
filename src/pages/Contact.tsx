import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SOCIALS = [
  {
    name: "Instagram",
    handle: "@abhinavdhimanmusic",
    description: "Behind the scenes, reels & live moments",
    url: "https://instagram.com/abhinavdhimanmusic",
    color: "hover:border-pink-500/40 hover:bg-pink-500/5",
    iconColor: "text-pink-400",
    arrowColor: "group-hover:text-pink-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    handle: "@abhinavdhimanmusic",
    description: "Full performances, covers & music videos",
    url: "https://youtube.com/@abhinavdhimanmusic",
    color: "hover:border-red-500/40 hover:bg-red-500/5",
    iconColor: "text-red-500",
    arrowColor: "group-hover:text-red-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const Contact = () => {
  const navigate = useNavigate();
  const headerRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: false });
  const socialsInView = useInView(socialsRef, { once: false, margin: "-5%" });
  const bottomInView = useInView(bottomRef, { once: false, margin: "-5%" });

  return (
    <div className="min-h-screen bg-primary pt-24 pb-20 flex flex-col">

      {/* Page Header */}
      <div ref={headerRef} className="text-center mb-16 px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5 }}
          className="font-manrope text-accent text-xs uppercase tracking-[0.3em] mb-4"
        >
          Stay Connected
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-cinzel text-cream text-4xl md:text-6xl font-bold tracking-wide"
        >
          Get In Touch
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={headerInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-16 h-px bg-accent mx-auto mt-6"
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="font-manrope text-muted text-sm md:text-base mt-6 max-w-lg mx-auto leading-relaxed"
        >
          Follow Abhinav's journey, watch live performances, and be part of the music.
        </motion.p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto w-full px-4 md:px-8 flex flex-col gap-6">

        {/* Social Cards */}
        <div ref={socialsRef} className="flex flex-col gap-4">
          {SOCIALS.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={socialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{ scale: 1.015 }}
              className={`group flex items-center justify-between gap-6 p-6 md:p-8 rounded-2xl border border-[#1a1a1a] bg-secondary transition-all duration-300 ${s.color}`}
            >
              <div className="flex items-center gap-5">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0 ${s.iconColor} transition-transform duration-300 group-hover:scale-110`}>
                  {s.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-cinzel text-cream text-lg md:text-xl font-bold">{s.name}</p>
                  </div>
                  <p className="font-manrope text-muted text-xs uppercase tracking-widest mb-2">{s.handle}</p>
                  <p className="font-manrope text-muted text-sm leading-relaxed hidden sm:block">{s.description}</p>
                </div>
              </div>
              <div className={`flex-shrink-0 transition-all duration-300 ${s.arrowColor} group-hover:translate-x-1`}>
                <ArrowRight className="w-5 h-5 text-muted" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Info Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={socialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="flex items-center gap-4 p-5 rounded-xl border border-[#1a1a1a] bg-secondary">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="font-manrope text-xs uppercase tracking-widest text-muted mb-1">Email</p>
              <a
                href="mailto:abhinavdhiman567@gmail.com"
                className="font-manrope text-cream text-sm hover:text-accent transition-colors break-all"
              >
                abhinavdhiman567@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-xl border border-[#1a1a1a] bg-secondary">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="font-manrope text-xs uppercase tracking-widest text-muted mb-1">Based In</p>
              <p className="font-manrope text-cream text-sm">Rishikesh, Uttarakhand</p>
              <p className="font-manrope text-muted text-xs mt-0.5">Available across India</p>
            </div>
          </div>
        </motion.div>

        {/* Booking CTA */}
        <motion.div
          ref={bottomRef}
          initial={{ opacity: 0, y: 20 }}
          animate={bottomInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl border border-[#1a1a1a] bg-secondary p-8 md:p-12 text-center"
        >
          {/* Ghost text background */}
          <p className="absolute inset-0 flex items-center justify-center font-cinzel text-[80px] md:text-[120px] font-bold text-white opacity-[0.03] select-none pointer-events-none leading-none">
            BOOK
          </p>

          <div className="relative z-10">
            <p className="font-manrope text-accent text-xs uppercase tracking-[0.3em] mb-4">Ready to perform at your event?</p>
            <h2 className="font-cinzel text-cream text-2xl md:text-4xl font-bold tracking-wide mb-4">
              Send a Booking Inquiry
            </h2>
            <p className="font-manrope text-muted text-sm md:text-base max-w-md mx-auto leading-relaxed mb-8">
              Whether it&apos;s a resort, wedding, or corporate evening — Abhinav responds within 24 hours.
            </p>
            <button
              onClick={() => navigate("/booking")}
              className="group inline-flex items-center gap-3 bg-accent hover:bg-accent-light text-white font-manrope text-sm font-semibold uppercase tracking-widest px-8 py-4 rounded-lg transition-colors duration-300"
            >
              Book Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;