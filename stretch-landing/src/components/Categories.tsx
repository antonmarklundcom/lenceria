import { categories } from '../data'
import { useInView } from '../hooks/useInView'

function CategoryCard({ name, video }: { name: string; video: string }) {
  return (
    <div className="group relative min-h-[400px] sm:min-h-[500px] md:min-h-[750px] overflow-hidden p-6 sm:p-8 md:p-12">
      <video
        src={video}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20" />

      <div className="relative z-10 flex h-full flex-col items-start justify-between">
        <span
          className="text-5xl font-medium text-white transition-transform duration-500 group-hover:-translate-y-0.5 sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
        >
          {name}
        </span>

        <button className="btn-primary rounded-full bg-white px-8 py-3 text-sm text-black">
          shop {name}
        </button>
      </div>
    </div>
  )
}

export default function Categories() {
  const { ref, isVisible } = useInView<HTMLElement>()

  return (
    <section
      ref={ref}
      className={`grid grid-cols-1 bg-black text-white transition-all duration-1000 md:grid-cols-3 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
    >
      {categories.map((category) => (
        <CategoryCard key={category.name} {...category} />
      ))}
    </section>
  )
}
