const navLinks = ['Details', 'Resources', 'About', 'Submit']

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-6">
      <button className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
          <polygon points="3,1 13,7 3,13" />
        </svg>
      </button>

      <nav className="flex items-center gap-6">
        {navLinks.map((link) => (
          <a
            key={link}
            href="#"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
          >
            {link}
            <span className="text-gray-300">—</span>
          </a>
        ))}
      </nav>
    </header>
  )
}
