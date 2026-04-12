import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';
import Logo from '/assets/images/logo.png';

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.27 8.27 0 004.84 1.55V6.85a4.85 4.85 0 01-1.07-.16z" />
    </svg>
  );
}

const socials = [
  { icon: <Instagram size={20} />, label: 'Instagram', href: 'https://www.instagram.com/moodjsmash/' },
  { icon: <Facebook size={20} />, label: 'Facebook', href: 'https://www.facebook.com/people/MOOD-j/100095449980569/' },
  { icon: <TikTokIcon />, label: 'TikTok', href: 'https://www.tiktok.com/@moodjsmash' },
];

const navLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'Actualités', to: '/actualites' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#0a0a0a', borderTop: '1px solid #1f1f1f' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <img src={Logo} alt="Logo" className="h-12" />
            <p className="font-body text-sm mt-4" style={{ color: '#aaaaaa' }}>
              Le spot fast-food incontournable<br />de Barbezieux-Saint-Hilaire.
            </p>
            <div className="flex gap-4 mt-6">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:text-pink"
                  style={{ color: '#aaaaaa', border: '1px solid #1f1f1f' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#e91e8c';
                    e.currentTarget.style.boxShadow = '0 0 12px rgba(233,30,140,0.4)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#1f1f1f';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl tracking-widest text-white mb-6">NAVIGATION</h3>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-body text-sm transition-colors duration-200 hover:text-pink"
                    style={{ color: '#aaaaaa' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xl tracking-widest text-white mb-6">NOUS TROUVER</h3>
            <address className="not-italic font-body text-sm space-y-2" style={{ color: '#aaaaaa' }}>
              <p>33 Av. Pierre Mendès France</p>
              <p>16300, Barbezieux-Saint-Hilaire</p>
              <p className="pt-2">
                <span className="text-white font-medium">Lun – Jeu :</span> 11h30 – 13h30 / 18h30 – 21h00
                <br />
                <span className="text-white font-mediuem">Ven – Sam :</span> 11h30 – 14h00 / 18h30 - 21h30
                <br />
                <span className="text-white font-mediuem">Dimanche :</span> 18h00 - 21h00
              </p>
            </address>
            <p className="font-body text-sm mt-4" style={{ color: '#aaaaaa' }}>
              <a href="tel:0545781717"> <span className="text-white font-medium">Tel :</span> 05 45 78 17 17</a>
            </p>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4"
          style={{ borderTop: '1px solid #1f1f1f' }}
        >
          <p className="font-body text-xs" style={{ color: '#555' }}>
            © 2024 MOOD'J — Tous droits réservés
          </p>
          <p className="font-body text-xs" style={{ color: '#555' }}>
            Barbezieux-Saint-Hilaire, 16 — Fait avec passion
          </p>
        </div>
      </div>
    </footer>
  );
}
