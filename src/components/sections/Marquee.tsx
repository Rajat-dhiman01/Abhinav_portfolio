    import { motion } from 'framer-motion'

const items = [
  'Resorts',
  'Hotels',
  'Cafes',
  'Corporate Events',
  'Weddings',
  'Public Shows',
  'Private Events',
  'Live Singer',
  'Stage Performer',
]

const MarqueeStrip = () => {
  const repeated = [...items, ...items, ...items]

  return (
    <div className="relative w-full bg-primary overflow-hidden border-y border-[#1a1a1a] py-4">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{
          duration: 20,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {repeated.map((item, index) => (
          <span key={index} className="flex items-center gap-10">
            <span className="font-manrope text-muted text-xs tracking-[0.25em] uppercase">
              {item}
            </span>
            <span className="text-accent text-xs">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default MarqueeStrip