import { useRef, useState, useEffect } from 'react'
import { products } from '../data'
import { useInView } from '../hooks/useInView'

export default function BestSellers() {
  const { ref, isVisible } = useInView<HTMLElement>()
  const [tab, setTab] = useState<'best' | 'sets'>('best')
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const node = scrollRef.current
    if (!node) return

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        node.scrollLeft += e.deltaY
      }
    }

    const onScroll = () => {
      const max = node.scrollWidth - node.clientWidth
      setScrollProgress(max > 0 ? node.scrollLeft / max : 0)
    }

    node.addEventListener('wheel', onWheel, { passive: false })
    node.addEventListener('scroll', onScroll)
    return () => {
      node.removeEventListener('wheel', onWheel)
      node.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section
      ref={ref}
      className={`bg-[#F9F4F0] text-black py-12 sm:py-16 px-4 sm:px-6 lg:px-10 transition-all duration-800 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <div className="flex items-center gap-8 sm:gap-12 mb-8 sm:mb-10">
        <button
          onClick={() => setTab('best')}
          className={`flex items-center gap-2 text-2xl sm:text-4xl md:text-5xl font-medium transition-colors ${
            tab === 'best' ? 'text-[#1a1a1a]' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          best sellers
          {tab === 'best' && (
            <span
              key="best-dot"
              className="animate-scale-in h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-[#1a1a1a]"
            />
          )}
        </button>
        <button
          onClick={() => setTab('sets')}
          className={`flex items-center gap-2 text-2xl sm:text-4xl md:text-5xl font-medium transition-colors ${
            tab === 'sets' ? 'text-[#1a1a1a]' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          sets
          {tab === 'sets' && (
            <span
              key="sets-dot"
              className="animate-scale-in h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-[#1a1a1a]"
            />
          )}
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide"
      >
        {products.map((product, index) => (
          <div
            key={product.name}
            className={`group -ml-[1px] first:ml-0 w-[260px] sm:w-[280px] md:w-[300px] lg:w-[calc(25%-1px)] flex-shrink-0 border border-gray-200 transition-all duration-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            }`}
            style={{ transitionDelay: `${200 + index * 80}ms` }}
          >
            <div className="flex h-12 flex-col justify-center px-4">
              <span className="text-xs font-medium tracking-wider uppercase">
                {product.category}
              </span>
              {product.subcategory && (
                <span className="mt-0.5 text-xs uppercase text-gray-500">
                  {product.subcategory}
                </span>
              )}
            </div>

            <div className="mx-4 aspect-[3/4] overflow-hidden rounded-lg bg-[#F9F4F0]">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-col items-center gap-1 px-4 py-4">
              <span className="text-center text-sm">{product.name}</span>
              <div className="flex items-center gap-2">
                {product.oldPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {product.oldPrice}
                  </span>
                )}
                <span className="text-sm">{product.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative mx-auto mt-8 h-[2px] w-full max-w-[280px] rounded-full bg-gray-300 sm:mt-10">
        <div
          className="absolute left-0 top-0 h-[2px] rounded-full bg-[#1a1a1a]"
          style={{
            width: '30%',
            transform: `translateX(${scrollProgress * (100 / 0.3)}%)`,
          }}
        />
      </div>
    </section>
  )
}
