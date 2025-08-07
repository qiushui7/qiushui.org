'use client';

import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import CategoryFilter from "./components/CategoryFilter";
import ProjectGrid from "./components/ProjectGrid";
import TurbulenceBackground from "./components/TurbulenceBackground";
import { projects } from "./data/projects";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 获取所有分类
  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category.toLowerCase())))];

  // 过滤项目
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category.toLowerCase() === selectedCategory);

  // Handle category change with animation
  const handleCategoryChange = (category: string) => {
    if (category === selectedCategory) return;
    setSelectedCategory(category);
  };

  if (!isClient) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* 背景湍流动效 */}
      <TurbulenceBackground isClient={isClient} />
      
      {/* 主内容区域 */}
      <main className="relative z-10 px-4 md:px-8 lg:px-12">
        {/* Hero Section */}
        <Hero isClient={isClient} />

        {/* 分类筛选 */}
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          isClient={isClient}
        />

        {/* 项目网格 */}
        <ProjectGrid 
          projects={filteredProjects}
          isClient={isClient}
        />
      </main>
    </div>
  );
}
