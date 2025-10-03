'use client';

import Link from 'next/link';

interface MobileMenuProps {
  isMenuOpen: boolean,
  setIsMenuOpenAction: (isOpen: boolean) => void,
  menuItems: Array<{ href: string, label: string }>
}

export default function MobileMenu({ isMenuOpen, setIsMenuOpenAction, menuItems }: MobileMenuProps) {
  // 处理联系按钮点击
  const handleContactClick = () => {
    window.location.assign('mailto:qiushui030716@gamil.com');
    setIsMenuOpenAction(false); // 关闭菜单
  };

  return (
    <div className="md:hidden">
      {/* Mobile Menu Button */}
      <button
        type="button"
        className="text-white p-2"
        onClick={() => setIsMenuOpenAction(!isMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        <div className={`w-6 h-6 flex flex-col justify-center items-center transition-all duration-300 ${isMenuOpen ? 'rotate-45' : ''}`}>
          <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-90 translate-y-0' : '-translate-y-1'}`} />
          <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-90 -translate-y-0' : 'translate-y-1'}`} />
        </div>
      </button>

      {/* Mobile Menu */}
      <div className={`absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/10 transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 py-4 space-y-6">
          {menuItems.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setIsMenuOpenAction(false)}>
              <div className="block text-lg text-white transition-colors duration-300 uppercase tracking-wide">
                {label}
              </div>
            </Link>
          ))}

          <div className="pt-4 border-t border-white/10">
            <button
              type="button"
              className="w-full border border-white/30 text-white py-3 text-sm uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-300"
              onClick={handleContactClick}
            >
              CONTACT ME
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
