import { useEffect, useRef, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  User,
  Search,
  ShoppingBag,
  Menu,
  X,
  Pause,
  Play,
} from 'lucide-react'
import { heroImage, heroVideos, navLinks } from '../data'
import { useInView } from '../hooks/useInView'

const SLIDE_INTERVAL = 5000

function AnnouncementBar() {
  return (
    <div className="absolute top-0 left-0 right-0 z-30 bg-[#F9F4F0] text-black py-2.5 sm:py-3">
      <div className="flex items-center justify-center gap-3 px-4 text-xs sm:text-sm">
        <ChevronLeft size={16} />
        <span>free shipping for orders over 50€</span>
        <ChevronRight size={16} />
      </div>
    </div>
  )
}

function Navigation({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean
  setMenuOpen: (v: boolean) => void
}) {
  return (
    <nav className="absolute left-0 right-0 top-[38px] sm:top-[38px] md:top-[42px] z-30 text-white">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-4">
        <span className="text-lg sm:text-xl font-bold tracking-[0.2em] uppercase">
          STRETCH
        </span>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link} href="#" className="group relative text-sm">
              {link}
              <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5">
            <div className="flex w-6 h-4 overflow-hidden rounded-[1px]">
              <div className="w-1/3 bg-blue-700" />
              <div className="w-1/3 bg-white" />
              <div className="w-1/3 bg-red-600" />
            </div>
            <span className="text-sm">eur €</span>
            <ChevronDown size={14} />
          </div>

          <div className="hidden sm:block w-px h-5 bg-white/30 mx-2" />

          <User size={20} className="hidden sm:block" />
          <Search size={20} />
          <ShoppingBag size={20} />

          <button
            className="md:hidden"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </nav>
  )
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity duration-500 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link}
            href="#"
            onClick={onClose}
            className="text-3xl font-light text-white"
          >
            {link}
          </a>
        ))}
      </div>
    </div>
  )
}

function HeroLeft() {
  const { ref, isVisible } = useInView<HTMLDivElement>()

  return (
    <div className="relative w-full lg:w-1/2 min-h-[60vh] lg:min-h-0 overflow-hidden">
      <img
        src={heroImage}
        alt="Ethical beauty"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />

      <div
        ref={ref}
        className={`relative z-10 h-full flex flex-col justify-end px-6 sm:px-8 lg:px-12 pb-16 sm:pb-20 lg:pb-24 pt-32 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[clamp(3.5rem,5vw,6rem)] font-light leading-[1.05] mb-6 text-white">
          ethical beauty,
          <br />
          <span className="relative inline-block">
            sustainable impact.
            <svg
              className="absolute -bottom-1 left-0 w-full h-4"
              viewBox="0 0 300 20"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 10 Q 37.5 2, 75 10 T 150 10 T 225 10 T 300 10"
                stroke="#C8A45C"
                strokeWidth="2"
              />
              <path
                d="M0 14 Q 37.5 8, 75 14 T 150 14 T 225 14 T 300 14"
                stroke="#C8A45C"
                strokeWidth="1.5"
              />
              <path
                d="M0 17 Q 37.5 13, 75 17 T 150 17 T 225 17 T 300 17"
                stroke="#C8A45C"
                strokeWidth="1"
              />
            </svg>
          </span>
        </h1>

        <p className="text-sm md:text-base text-white/80 mb-10 max-w-md">
          Committed to sustainable beauty and minimize our impact on the planet.
        </p>

        <button className="btn-primary self-start px-10 py-4 bg-white text-black rounded-full text-sm">
          about us
        </button>
      </div>
    </div>
  )
}

function HeroRight() {
  const [slide, setSlide] = useState(0)
  const [playing, setPlaying] = useState(true)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!playing) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(() => {
      setSlide((s) => (s + 1) % heroVideos.length)
    }, SLIDE_INTERVAL)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [playing])

  return (
    <div className="relative w-full lg:w-1/2 min-h-[40vh] lg:min-h-0 overflow-hidden bg-black">
      {heroVideos.map((src, i) => (
        <video
          key={src}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            i === slide ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
        <div className="flex items-center gap-2">
          {heroVideos.map((_, i) => (
            <button
              key={i}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setSlide(i)}
              className={`h-2 w-2 rounded-full transition-transform ${
                i === slide ? 'bg-white scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
        <button
          aria-label={playing ? 'Pause' : 'Play'}
          onClick={() => setPlaying((p) => !p)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 text-white"
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </button>
      </div>
    </div>
  )
}

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <section className="relative min-h-screen">
      <AnnouncementBar />
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flex flex-col lg:flex-row min-h-screen">
        <HeroLeft />
        <HeroRight />
      </div>
    </section>
  )
}
