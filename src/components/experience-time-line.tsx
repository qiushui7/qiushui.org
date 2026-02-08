import { motion } from 'framer-motion';

export interface Experience {
  title: string,
  company: string,
  period: string,
  description: string,
  technologies?: string[]
}

export default function ExperienceCard({ exp }: { exp: Experience }) {
  return (
    <motion.div
      className="group relative bg-gradient-to-br from-gray-900/60 to-gray-800/40 border border-white/10 rounded-xl p-5 backdrop-blur-sm hover:border-white/20 transition-all duration-300"
      whileHover={{
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Hover shine */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

      <div className="relative">
        {/* Period */}
        <span className="text-xs text-gray-400 bg-white/5 px-3 py-1 rounded-full">
          {exp.period}
        </span>

        {/* Title and company */}
        <div className="mt-3 mb-2">
          <h3 className="font-semibold text-white text-base leading-tight">
            {exp.title}
          </h3>
          <p className="text-gray-300 text-sm font-medium mt-1">
            {exp.company}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-3">
          {exp.description}
        </p>

        {/* Tech tags */}
        {exp.technologies && (
          <div className="flex flex-wrap gap-1.5">
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs bg-white/10 text-gray-300 px-2.5 py-0.5 rounded-full border border-white/10 hover:bg-white/15 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
