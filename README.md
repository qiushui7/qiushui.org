# qiushui.org

个人博客网站，基于 Next.js 15 和 React 19 构建。

## 技术栈

- **Next.js 15.3.4** with App Router
- **React 19** with React Compiler
- **TypeScript 5**
- **Tailwind CSS 4**
- **Framer Motion** for animations
- **MDX** for blog posts
- **pnpm** for package management

## 开始使用

首先安装 pnpm（如果还没有安装）：

```bash
npm install -g pnpm
```

然后安装依赖并启动开发服务器：

```bash
pnpm install
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 可用脚本

```bash
pnpm dev          # 启动开发服务器（使用 Turbopack）
pnpm build        # 构建生产版本
pnpm start        # 启动生产服务器
pnpm lint         # 运行 ESLint
pnpm clean        # 清理缓存文件
pnpm type-check   # TypeScript 类型检查
```

## 项目特性

- 🎨 现代化的深色主题设计
- ✨ 流畅的动画效果（Framer Motion）
- 📝 基于 MDX 的博客系统
- 🏷️ 分类和标签支持
- 📱 响应式设计
- 🚀 使用 Turbopack 的快速开发体验

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
