import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play, Volume2, VolumeX } from "lucide-react";

type MediaType = "reel" | "youtube" | "photo";

interface MediaItem {
  id: number;
  type: MediaType;
  src: string;
  youtubeId?: string;
  title: string;
  height: "tall" | "medium" | "short";
}

const MEDIA: MediaItem[] = [
  {
    id: 1,
    type: "reel",
    src: "https://res.cloudinary.com/dhysr3yfi/video/upload/v1781438502/A_night_full_of_melodies_and_memories_Singer_-_abhinavdhimanmusic_Loction_-_studioxodehradun_icx500.mp4",
    title: "A Night Full of Melodies & Memories",
    height: "tall",
  },
  {
    id: 2,
    type: "reel",
    src: "https://res.cloudinary.com/dhysr3yfi/video/upload/v1781438502/Agar_aapko_yeh_performance_acchi_lagi_toh_Like_Share_kijiye_aur_inhein_aage_badhne_ka_mauka_d_bt2hza.mp4",
    title: "Agar Aapko Yeh Performance Acchi Lagi",
    height: "medium",
  },
  {
    id: 3,
    type: "reel",
    src: "https://res.cloudinary.com/dhysr3yfi/video/upload/v1781438502/Sitaare_%EF%B8%8F.._reelkarofeelkaro_reelitfeelit_explore_sitaare_..Camera_-_aintyourrbillu_f4ogsh.mp4",
    title: "Sitaare",
    height: "short",
  },
  {
    id: 4,
    type: "youtube",
    src: "https://www.youtube.com/embed/Pn468TpWFHQ?si=QqnSMulx1w3rxgje",
    youtubeId: "Pn468TpWFHQ",
    title: "Live Performance — Abhinav Dhiman",
    height: "tall",
  },
  {
    id: 5,
    type: "reel",
    src: "https://res.cloudinary.com/dhysr3yfi/video/upload/v1781438507/Tose_naina_laage_%EF%B8%8F__...._tose_naina_laage_piya_saware_sargam_viral_trending_bollywood_hindi_so_a80s3d.mp4",
    title: "Tose Naina Laage",
    height: "medium",
  },
  {
    id: 6,
    type: "reel",
    src: "https://res.cloudinary.com/dhysr3yfi/video/upload/v1781438502/Sajde_%EF%B8%8F__.._-_aintyourrbillu_.._Sajde_FaheemAbdulla_SajdeCover_ViralReels_ReelKaroFeel_dmtyd0.mp4",
    title: "Sajde",
    height: "short",
  },
  {
    id: 7,
    type: "youtube",
    src: "https://www.youtube.com/embed/MPiNpkDYYXs?si=zdxZzeq2VvAgytud",
    youtubeId: "MPiNpkDYYXs",
    title: "O Meri Jaan — Abhinav Dhiman",
    height: "medium",
  },
  {
    id: 8,
    type: "reel",
    src: "https://res.cloudinary.com/dhysr3yfi/video/upload/v1781464754/O_Meri_Jaan_with_adnan_ahmad_rnzb09.mp4",
    title: "O Meri Jaan",
    height: "tall",
  },
  {
    id: 9,
    type: "photo",
    src: "https://res.cloudinary.com/dhysr3yfi/image/upload/f_auto,q_auto/v1781465005/Had_a_great_gig_at_studioxodehradun_..._abhinavdhimanlive_studioxo_livemusic_3_ssvudz.jpg",
    title: "Live at Studio XO Dehradun",
    height: "tall",
  },
  {
    id: 10,
    type: "photo",
    src: "https://res.cloudinary.com/dhysr3yfi/image/upload/f_auto,q_auto/v1781465005/Had_a_great_gig_at_studioxodehradun_..._abhinavdhimanlive_studioxo_livemusic_2_nyat8k.jpg",
    title: "Studio XO Performance",
    height: "medium",
  },
  {
    id: 11,
    type: "photo",
    src: "https://res.cloudinary.com/dhysr3yfi/image/upload/f_auto,q_auto/v1781465005/Had_a_great_gig_at_studioxodehradun_..._abhinavdhimanlive_studioxo_livemusic_mumega.jpg",
    title: "On Stage at Studio XO",
    height: "short",
  },
  {
    id: 12,
    type: "photo",
    src: "https://res.cloudinary.com/dhysr3yfi/image/upload/f_auto,q_auto/v1781465005/Had_a_great_gig_at_studioxodehradun_..._abhinavdhimanlive_studioxo_livemusic_4_w69ngh.jpg",
    title: "Abhinav Dhiman Live",
    height: "medium",
  },
];
const ASPECT_MAP = {
  tall: "aspect-[9/16]",
  medium: "aspect-[4/5]",
  short: "aspect-[4/5]",
};

type FilterTab = "all" | MediaType;
const TABS: { label: string; value: FilterTab }[] = [
  { label: "All", value: "all" },
  { label: "Reels", value: "reel" },
  { label: "YouTube", value: "youtube" },
  { label: "Photos", value: "photo" },
];

// REEL CARD
const ReelCard = ({ item, index, onClick }: { item: MediaItem; index: number; onClick: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: "-10%" });
  const [hovered, setHovered] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (hovered && isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [hovered, isInView]);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className={`relative overflow-hidden rounded-xl cursor-pointer group bg-secondary ${ASPECT_MAP[item.height]}`}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      onClick={onClick}
      style={{ willChange: "transform" }}
      whileHover={{ scale: isMobile ? 1 : 1.02, transition: { duration: 0.3 } }}
    >
      <video
        ref={videoRef}
        src={item.src}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      {/* Play icon — always visible on mobile, hover on desktop */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${hovered || isMobile ? "opacity-100" : "opacity-0"}`}>
        <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <Play className="w-6 h-6 text-white fill-white ml-1" />
        </div>
      </div>
      <div className={`absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-200 ${hovered || isMobile ? "opacity-100" : "opacity-0"}`}>
        <p className="font-manrope text-sm text-white font-medium leading-snug">{item.title}</p>
        <span className="text-xs text-white/50 font-manrope uppercase tracking-widest mt-1 block">Reel</span>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); setMuted(!muted); }}
        className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors ${hovered || isMobile ? "opacity-100" : "opacity-0"}`}
      >
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </motion.div>
  );
};
// PHOTO CARD
const PhotoCard = ({ item, index, onClick }: { item: MediaItem; index: number; onClick: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: "-10%" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className={`relative overflow-hidden rounded-xl cursor-pointer group bg-secondary ${ASPECT_MAP[item.height]}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
    >
      <img
        src={item.src}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.25 }}
        className="absolute bottom-0 left-0 right-0 p-4"
      >
        <p className="font-manrope text-sm text-white font-medium leading-snug">{item.title}</p>
        <span className="text-xs text-white/50 font-manrope uppercase tracking-widest mt-1 block">Photo</span>
      </motion.div>
    </motion.div>
  );
};
// YOUTUBE CARD
const YoutubeCard = ({ item, index, onClick }: { item: MediaItem; index: number; onClick: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: "-10%" });
  const [hovered, setHovered] = useState(false);
  const [thumbSrc, setThumbSrc] = useState(
    `https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`
  );
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className={`relative overflow-hidden rounded-xl cursor-pointer group bg-secondary ${ASPECT_MAP[item.height]}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
    >
      <img
        src={thumbSrc}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        onError={() => setThumbSrc(`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1">
        <svg className="w-3.5 h-3.5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
        <span className="text-white text-[10px] font-manrope font-semibold uppercase tracking-wider">YouTube</span>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={hovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-16 h-16 rounded-full bg-red-600/90 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-red-900/40">
          <Play className="w-7 h-7 text-white fill-white ml-1" />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.25 }}
        className="absolute bottom-0 left-0 right-0 p-4"
      >
        <p className="font-manrope text-sm text-white font-medium leading-snug">{item.title}</p>
      </motion.div>
    </motion.div>
  );
};

// LIGHTBOX
const Lightbox = ({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  items: MediaItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) => {
  const item = items[currentIndex];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
      >
        <X className="w-5 h-5" />
      </button>
      {currentIndex > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 md:left-8 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      {currentIndex < items.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 md:right-8 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
      <motion.div
        key={item.id}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full max-w-[min(90vw,480px)] md:max-w-[min(85vw,540px)]"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "youtube" ? (
          <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl">
            <iframe
              src={`${item.src}&autoplay=1`}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        ) : item.type === "photo" ? (
          <div className="w-full rounded-xl overflow-hidden shadow-2xl">
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-auto object-contain max-h-[80vh]"
            />
          </div>
        ) : (
          <div className="aspect-[9/16] w-full max-h-[85vh] rounded-xl overflow-hidden shadow-2xl">
            <video
              key={item.src}
              src={item.src}
              controls
              playsInline
              muted={false}
              className="w-full h-full object-cover"
              ref={(el) => {
                if (el) {
                  el.muted = false;
                  const playPromise = el.play();
                  if (playPromise !== undefined) {
                    playPromise.catch(() => {});
                  }
                }
              }}
            />
          </div>
        )}
        <div className="mt-4 px-1">
          <p className="font-cinzel text-white text-base md:text-lg">{item.title}</p>
          <p className="font-manrope text-white/40 text-xs uppercase tracking-widest mt-1">
            {item.type === "youtube" ? "YouTube" : "Reel"} · {currentIndex + 1} / {items.length}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// MAIN GALLERY PAGE
const Gallery = () => {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = MEDIA.filter((m) => activeTab === "all" || m.type === activeTab);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevItem = useCallback(() => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const nextItem = useCallback(() => setLightboxIndex((i) => (i !== null && i < filtered.length - 1 ? i + 1 : i)), [filtered.length]);

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: false });

  return (
    <div className="min-h-screen bg-primary pt-24 pb-20">
      {/* Page Header */}
      <div ref={headerRef} className="text-center mb-14 px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5 }}
          className="font-manrope text-accent text-xs uppercase tracking-[0.3em] mb-4"
        >
          Live Performances &amp; Reels
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-cinzel text-cream text-4xl md:text-6xl font-bold tracking-wide"
        >
          Gallery
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={headerInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-16 h-px bg-accent mx-auto mt-6"
        />
      </div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center justify-center gap-2 mb-12 px-6 flex-wrap"
      >
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`relative px-6 py-2.5 font-manrope text-sm font-medium tracking-widest uppercase transition-colors duration-300 rounded-full border ${
              activeTab === tab.value
                ? "border-accent text-cream bg-accent/10"
                : "border-white/10 text-muted hover:border-white/30 hover:text-cream"
            }`}
          >
            {activeTab === tab.value && (
              <motion.span
                layoutId="tab-indicator"
                className="absolute inset-0 rounded-full bg-accent/10 border border-accent"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </motion.div>
{/* Masonry Grid */}
      {(activeTab !== "photo" || filtered.length > 0) && (
        <div className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
            >
              {filtered.map((item, index) => (
                <div key={item.id} className="break-inside-avoid mb-4">
                  {item.type === "reel" ? (
                    <ReelCard item={item} index={index} onClick={() => openLightbox(index)} />
                  ) : item.type === "youtube" ? (
                    <YoutubeCard item={item} index={index} onClick={() => openLightbox(index)} />
                  ) : (
                    <PhotoCard item={item} index={index} onClick={() => openLightbox(index)} />
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Instagram CTA */}
      {activeTab !== "photo" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mt-16"
        >
          <a
            href="https://instagram.com/abhinavdhimanmusic"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 hover:border-white/30 transition-all duration-300 hover:bg-white/5"
          >
            <svg className="w-4 h-4 text-muted group-hover:text-cream transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
            <span className="font-manrope text-sm text-muted group-hover:text-cream transition-colors duration-300 tracking-widest uppercase">
              Follow on Instagram
            </span>
            <svg className="w-3.5 h-3.5 text-muted group-hover:text-cream transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={filtered}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevItem}
            onNext={nextItem}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;