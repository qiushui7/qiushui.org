'use client';

import { motion } from 'framer-motion';

interface CategoryFilterProps {
  categories: string[],
  selectedCategory: string,
  onCategoryChangeAction: (category: string) => void,
  isClient: boolean
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChangeAction,
  isClient
}: CategoryFilterProps) {
  if (!isClient) return null;

  return (
    <motion.div
      className="mb-8 flex flex-wrap gap-4 justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 1.2, ease: 'easeOut' }}
    >
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => onCategoryChangeAction(category)}
          className={`filter-button px-4 py-2 text-sm uppercase tracking-wide border transition-all duration-300 ${
            selectedCategory === category
              ? 'bg-white text-black border-white'
              : 'bg-transparent text-white border-gray-600 hover:border-white'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.1, ease: 'easeOut' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  );
}
