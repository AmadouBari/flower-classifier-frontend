import Image from 'next/image';
import { motion } from 'framer-motion';

const exampleFlowers = [
  {
    name: 'Rose',
    image: '/examples/rose.jpg',
    description: 'A classic symbol of love and beauty'
  },
  {
    name: 'Sunflower',
    image: '/examples/sunflower.jpg',
    description: 'Known for following the sun across the sky'
  },
  {
    name: 'Tulip',
    image: '/examples/tulip.jpg',
    description: 'Spring\'s most iconic flower'
  }
];

export default function ExampleSection() {
  return (
    <section className="my-12 px-4"> {/* Added horizontal padding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-100">Example Flowers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Improved grid responsiveness */}
          {exampleFlowers.map((flower, index) => (
            <motion.div
              key={flower.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700 relative" 
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={flower.image}
                  alt={flower.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="rounded-t-lg object-contain p-2"
                  priority
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2 text-gray-100">{flower.name}</h3>
                <p className="text-gray-400 line-clamp-3"> {/* Limit description lines on smaller screens */}
                  {flower.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}