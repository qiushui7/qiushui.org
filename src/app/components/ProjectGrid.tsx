'use client';

import Image from "next/image";
import { motion } from "framer-motion";

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  year: string;
  tags: string[];
  size: 'small' | 'medium' | 'large';
}

interface ProjectGridProps {
  projects: Project[];
  isClient: boolean;
}

export default function ProjectGrid({ projects, isClient }: ProjectGridProps) {
  if (!isClient) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[200px]">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          className={`project-card group relative overflow-hidden bg-gray-900 hover:bg-gray-800 transition-all duration-200 cursor-pointer ${
            project.size === 'large' 
              ? 'md:col-span-2 md:row-span-2' 
              : project.size === 'medium'
                ? 'md:row-span-2'
                : 'row-span-1'
          }`}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.4, 
            delay: 1.4 + index * 0.04, 
            ease: "easeOut" 
          }}
          whileHover={{ 
            y: -8, 
            scale: 1.02,
            transition: { duration: 0.15, ease: "easeOut" }
          }}
        >
          {/* 背景图片 */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-200"
            />
          </div>

          {/* 内容叠加层 */}
          <div className="relative h-full p-6 flex flex-col justify-between">
            {/* 顶部信息 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400 uppercase tracking-wide">
                  {project.category}
                </span>
                <span className="text-xs text-gray-500">
                  {project.year}
                </span>
              </div>
              
              <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors duration-150">
                {project.title}
              </h3>
              
              <p className="text-sm text-gray-400 mb-4">
                {project.description}
              </p>
            </div>

            {/* 底部标签 */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="text-xs px-2 py-1 bg-black/50 text-gray-300 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* 悬停效果 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>

          {/* 点击效果 */}
          <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
        </motion.div>
      ))}
    </div>
  );
} 