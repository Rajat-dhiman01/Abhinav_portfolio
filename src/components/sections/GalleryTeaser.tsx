import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const PREVIEW_REELS = [
  {
    id: 1,
    src: "https://res.cloudinary.com/dhysr3yfi/video/upload/v1781438502/A_night_full_of_melodies_and_memories_Singer_-_abhinavdhimanmusic_Loction_-_studioxodehradun_icx500.mp4",
    height: "h-[420px]",
    offset: "mt-8",
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dhysr3yfi/video/upload/v1781438502/Sitaare_%EF%B8%8F.._reelkarofeelkaro_reelitfeelit_explore_sitaare_..Camera_-_aintyourrbillu_f4ogsh.mp4",
    height: "h-[520px]",
    offset: "mt-0",
  },
  {
    id: 3,
    src: "https://res.cloudinary.com/dhysr3yfi/video/upload/v1781438507/Tose_naina_laage_%EF%B8%8F__...._tose_naina_laage_piya_saware_sargam_viral_trending_bollywood_hindi_so_a80s3d.mp4",
    height: "h-[420px]",
    offset: "mt-8",
  },
]

const ReelPreview = ({ src, height, offset, index }: { src: string; height: string; offset: string; index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-10%" })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isInView) {
      video.play().catch(() => {})
    } else {
      video.pause()
      video.currentTime = 0
    }
  }, [isInView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.15 }}
      className={`relative ${height} ${offset} w-full rounded-2xl overflow-hidden group cursor-pointer flex-1`}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* Center glow on middle card */}
      {index === 1 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(183,28,28,0.15) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Bottom accent line on middle card */}
      {index === 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
      )}
    </motion.div>
  )
}

const GalleryTeaser = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  return (
    <section ref={ref} className="relative w-full bg-primary py-24 px-6 md:px-16 overflow-hidden">

      {/* Top border */}
      <div className="absolute top-0 left-16 right-16 h-px bg-[#1a1a1a]" />

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 60%, rgba(183,28,28,0.07) 0%, transparent 65%)',
        }}
      />

      {/* Header */}
      <div className="flex flex-col items-center gap-3 mb-16">
        <motion.p
          className="font-manrope text-accent text-xs tracking-[0.3em] uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        >
          Watch Live
        </motion.p>
        <motion.h2
          className="font-cinzel text-cream text-4xl md:text-5xl font-semibold text-center leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        >
          Performances That
          <br />
          <span className="text-accent">Move People</span>
        </motion.h2>
        <motion.div
          className="w-10 h-px bg-accent mt-2"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
          style={{ transformOrigin: 'center' }}
        />
      </div>

      {/* Reel Previews - desktop 3 col, mobile single scroll */}
      <div className="hidden md:flex gap-4 items-start max-w-5xl mx-auto">
        {PREVIEW_REELS.map((reel, index) => (
          <ReelPreview
            key={reel.id}
            src={reel.src}
            height={reel.height}
            offset={reel.offset}
            index={index}
          />
        ))}
      </div>

      {/* Mobile - horizontal scroll */}
      <div className="flex md:hidden gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none">
        {PREVIEW_REELS.map((reel, index) => (
          <motion.div
            key={reel.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative h-[380px] w-[260px] flex-shrink-0 snap-center rounded-2xl overflow-hidden"
          >
            <video
              src={reel.src}
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            {index === 1 && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        className="flex justify-center mt-14"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.5 }}
      >
        <Link
          to="/gallery"
          className="group inline-flex items-center gap-4 font-manrope text-sm tracking-widest uppercase text-cream border border-muted px-10 py-4 hover:border-accent hover:text-accent transition-all duration-300 rounded-sm"
        >
          Explore Full Gallery
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </motion.div>

    </section>
  )
}

export default GalleryTeaser