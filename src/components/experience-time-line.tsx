import { motion } from 'framer-motion';

interface Experience {
  title: string,
  company: string,
  period: string,
  description: string,
  technologies?: string[]
}

const experiences: Experience[] = [
  {
    title: 'Software Engineer',
    company: 'Cloudpilot',
    period: '2025.6 - Present',
    description: 'Took on my first remote role, independently responsible for developing various enterprise web applications using React, TypeScript, and Next.js.',
    technologies: ['React', 'TypeScript', 'Next.js', 'SWR', 'Rechart']
  },
  {
    title: 'Frontend Intern',
    company: 'ByteDance',
    period: '2024.1 - 2024.5',
    description: 'Developed B2B products using technologies such as Vue, React, and micro-frontend architecture, while also driving the team’s engineering efforts toward a Monorepo-based project structure.',
    technologies: ['Vue', 'React', 'TypeScript', 'MircoFrontend', 'Monorepo']
  },
  {
    title: 'Frontend Intern',
    company: 'Baidu',
    period: '2023.9 - 2023.12',
    description: 'Began my web development career by working on consumer-facing products using Vue and server-side rendering (SSR) technologies. Through this experience, I gained valuable insights into enterprise-level development workflows and A/B testing for traffic analysis.',
    technologies: ['Vue', 'JavaScript', 'SSR', 'Webpack']
  }
];

function ExperienceTimeline() {
  return (
    <div className="h-full flex flex-col">
      {/* 标题 - 固定高度 */}
      <motion.div
        className="flex-shrink-0 mb-8 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col">
          <div className="flex items-center space-x-3 mb-2">
            <span className="w-12 h-px bg-white/30" />
            <span className="text-sm text-gray-400 uppercase tracking-widest">Experience</span>
          </div>
          <div className="flex">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Professional Journey
            </h2>
          </div>
        </div>
      </motion.div>

      {/* 时间线容器 - 自适应高度 */}
      <div className="flex-1 relative overflow-x-hidden overflow-y-auto pr-3 show-scrollbar">
        {/* 经历项目 */}
        <div className="space-y-12 pt-2 pb-8 relative">
          {/* 主时间线 - 放在内容容器内以覆盖全部内容高度 */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/30" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title + exp.company}
              className="relative pl-16"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: 'easeOut'
              }}
            >
              {/* 时间点 */}
              <motion.div
                className="absolute left-4 top-3 w-4 h-4 bg-white rounded-full border-2 border-black shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.15 + 0.3,
                  type: 'spring',
                  stiffness: 200
                }}
              />

              {/* 连接线到卡片 */}
              <div className="absolute left-10 top-4 w-6 h-px bg-white/20" />

              {/* 内容卡片 */}
              <motion.div
                className="group relative bg-gradient-to-br from-gray-900/60 to-gray-800/40 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:border-white/20 transition-all duration-300"
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                }}
                transition={{ duration: 0.2 }}
              >
                {/* 悬停时的光泽效果 */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

                <div className="relative">
                  {/* 标题和时间 */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
                    <div>
                      <h3 className="font-semibold text-white text-lg leading-tight">
                        {exp.title}
                      </h3>
                      <p className="text-gray-300 font-medium mt-1">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>

                  {/* 描述 */}
                  <p className="text-gray-400 leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* 技术标签 */}
                  {exp.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          className="text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full border border-white/10 hover:bg-white/15 transition-colors"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.15 + techIndex * 0.05 + 0.5
                          }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* 时间线底部装饰
        <motion.div
          className="absolute left-5 w-2 h-2 bg-gradient-to-br from-white/50 to-gray-400/50 rounded-full"
          style={{ top: `calc(100% - 2rem)` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: experiences.length * 0.15 + 0.5
          }}
        /> */}
      </div>

      {/* 底部引用 - 固定高度 */}
      <motion.div
        className="flex-shrink-0 pt-8 border-t border-white/10 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: experiences.length * 0.15 + 0.8
        }}
      >
        <blockquote className="text-gray-400 italic text-center">
          &ldquo;The best way to predict the future is to create it.&rdquo;
        </blockquote>
      </motion.div>
    </div>
  );
}

export default ExperienceTimeline;
