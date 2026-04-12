import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '/assets/images/logo.png';

const navLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'Actualités', to: '/actualites' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'
          }`}
        style={{
          background: scrolled
            ? 'rgba(10,10,10,0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid #1f1f1f' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <img src={Logo} alt="Logo" className="h-24" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-body font-medium text-sm tracking-widest uppercase transition-colors duration-200 ${location.pathname === link.to
                  ? 'text-pink'
                  : 'text-white hover:text-pink'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <button
              className="font-body font-semibold text-sm uppercase tracking-widest px-6 py-3 rounded-full bg-pink text-white transition-all duration-200 hover:bg-pink-light"
              style={{ boxShadow: '0 0 20px rgba(233,30,140,0.4)' }}
            >
              Commander
            </button>
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col"
          style={{ background: '#e91e8c' }}
        >
          <div className="flex items-center justify-between px-6 py-6">
            <img src={Logo} alt="Logo" className="h-24" />
            <button
              onClick={() => setMobileOpen(false)}
              className="text-white"
              aria-label="Fermer le menu"
            >
              <X size={32} />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 gap-10">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="font-display text-6xl text-white tracking-widest uppercase hover:opacity-80 transition-opacity"
              >
                {link.label}
              </Link>
            ))}
            <button className="mt-6 font-body font-semibold text-base uppercase tracking-widest px-10 py-4 rounded-full bg-black text-white border-2 border-black hover:bg-transparent hover:text-black transition-all duration-200">
              Commander
            </button>
          </div>
        </div>
      )}
    </>
  );
}
