export default function Footer() {
  return (
    <footer className="mt-16 mb-8 px-4 md:px-8 lg:px-12 z-100">
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <div className="flex gap-8 mb-4 md:mb-0">
          <button className="hover:text-white transition-colors duration-150">Work</button>
          <button className="hover:text-white transition-colors duration-150">About</button>
          <button className="hover:text-white transition-colors duration-150">Careers</button>
        </div>
        
        <div className="flex gap-4">
          <span>Connect, explore and tap into your curiosity</span>
        </div>
      </div>
    </footer>
  );
} 