import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '/assets/images/logo.png';

const navLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'Actualités', to: '/actualites' },
  { label: 'Contact / Info', to: '/contact' },
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
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
        style={{
          background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid #1f1f1f' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex-shrink-0">
            <img src={Logo} alt="Logo" className="h-20 sm:h-24" />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-body font-medium text-sm tracking-widest uppercase transition-colors duration-200 ${
                  location.pathname === link.to
                    ? 'text-pink'
                    : 'text-white hover:text-pink'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* DESKTOP BUTTON */}
          <div className="hidden md:flex items-center">
            <Link
              to="/admin/dashboard"
              className="font-body font-semibold text-sm uppercase tracking-widest px-6 py-3 rounded-full bg-pink text-white hover:bg-pink-light transition-all duration-200"
              style={{ boxShadow: '0 0 20px rgba(233,30,140,0.4)' }}
            >
              Tableau de bord
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu size={28} />
          </button>

        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#000000",
            zIndex: 99999,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* HEADER MOBILE */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px"
          }}>
            <img src={Logo} style={{ height: 60 }} />

            <button
              onClick={() => setMobileOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer"
              }}
            >
              <X size={30} />
            </button>
          </div>

          {/* LINKS MOBILE */}
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px"
          }}>
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontSize: "38px",
                  fontWeight: "bold",
                  color: "white",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  letterSpacing: "2px"
                }}
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/admin/dashboard"
              onClick={() => setMobileOpen(false)}
              style={{
                marginTop: "20px",
                padding: "12px 25px",
                background: "black",
                color: "white",
                borderRadius: "30px",
                textDecoration: "none",
                fontWeight: "bold",
                textTransform: "uppercase"
              }}
            >
              Tableau de bord
            </Link>
          </div>
        </div>
      )}
    </>
  );
}