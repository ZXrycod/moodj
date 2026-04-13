import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import { useData } from '../context/DataContext';
import { IMAGES } from '../data/initialMenu';


const TAG_COLORS = {
  Promo: { bg: '#1a0a10', border: '#e91e8c', text: '#e91e8c' },
  Événement: { bg: '#0a1020', border: '#3b82f6', text: '#60a5fa' },
  Nouveauté: { bg: '#0a1a0a', border: '#22c55e', text: '#4ade80' },
};

function BestSellerCard({ name, description, prixSeul, prixMenu, category, image }) {

  const imageSrc = image || null;

  return (
    <div
      className="relative rounded-2xl overflow-hidden flex flex-col transition-all duration-300 group cursor-pointer"
      style={{
        background: '#111111',
        border: '1px solid #1f1f1f',
        borderTop: '3px solid #e91e8c',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 8px 40px rgba(233,30,140,0.25)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >

      {/* IMAGE */}
      {imageSrc && (
        <div className="h-40 w-full overflow-hidden">
          <img
            src={imageSrc}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      )}

      {/* CONTENU */}
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span
            className="font-body text-xs uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: '#1a0a10', color: '#e91e8c', border: '1px solid #e91e8c' }}
          >
            {category}
          </span>
          <Flame size={18} color="#e91e8c" />
        </div>

        <h3 className="font-script text-2xl text-white">{name}</h3>

        <p className="font-body text-sm flex-1" style={{ color: '#aaaaaa' }}>
          {description}
        </p>

        <div className="flex items-end gap-3 mt-2">
          <span className="font-display text-3xl" style={{ color: '#e91e8c' }}>
            {prixSeul.toFixed(2).replace('.', ',')}€
          </span>

          {prixMenu && (
            <span className="font-body text-xs pb-1" style={{ color: '#aaaaaa' }}>
              En menu : {prixMenu.toFixed(2).replace('.', ',')}€
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function NewsCard({ titre, date, extrait, tag }) {
  const colors = TAG_COLORS[tag] || TAG_COLORS['Nouveauté'];
  const formatted = new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div
      className="flex-shrink-0 w-72 sm:w-80 rounded-2xl overflow-hidden transition-all duration-300"
      style={{ background: '#111111', border: '1px solid #1f1f1f' }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#e91e8c';
        e.currentTarget.style.boxShadow = '0 0 24px rgba(233,30,140,0.2)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#1f1f1f';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div
        className="h-40 flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #1a0a10 0%, #e91e8c22 50%, #0a0a0a 100%)',
        }}
      >
        <span className="font-display text-6xl" style={{ color: '#e91e8c22' }}>Photo</span>
      </div>
      <div className="p-5">
        <span
          className="inline-block font-body text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
          style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
        >
          {tag}
        </span>
        <h4 className="font-body font-bold text-white text-base mb-2 leading-tight">{titre}</h4>
        <p className="font-body text-xs mb-3" style={{ color: '#aaaaaa' }}>{formatted}</p>
        <p className="font-body text-sm line-clamp-2" style={{ color: '#888' }}>{extrait}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const { state } = useData();

  const bestSellers = [
    state.menu.find(m => m.name === 'Classic Burger'),
    state.menu.find(m => m.name === 'Big Moodj'),
    state.menu.find(m => m.name === 'BBB'),
  ].filter(Boolean);

  const latestNews = state.news.slice(0, 3);

  return (
    <div className="font-body" style={{ background: '#0a0a0a', color: '#ffffff' }}>
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: '#0a0a0a' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            opacity: 0.04,
            mixBlendMode: 'overlay',
          }}
        />
        <div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(233,30,140,0.15) 0%, transparent 70%)',
            animation: 'pulse 4s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(233,30,140,0.08) 0%, transparent 70%)',
            animation: 'pulse 6s ease-in-out infinite reverse',
          }}
        />

        <style>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.15); opacity: 0.7; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .fade-in { animation: fadeIn 0.8s ease forwards; }
          .fade-in-delay-1 { animation: fadeIn 0.8s ease 0.2s both; }
          .fade-in-delay-2 { animation: fadeIn 0.8s ease 0.4s both; }
          .fade-in-delay-3 { animation: fadeIn 0.8s ease 0.6s both; }
          .clip-diagonal::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            right: 0;
            height: 80px;
            background: #0a0a0a;
            clip-path: polygon(0 100%, 100% 0, 100% 100%);
          }
        `}</style>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <p
            className="font-body text-sm uppercase tracking-[0.4em] mb-6 fade-in"
            style={{ color: '#e91e8c' }}
          >
            Barbezieux-Saint-Hilaire — Charente
          </p>
          <h1 className="font-display leading-none mb-2">
            <span className="block text-8xl sm:text-9xl text-white fade-in-delay-1">
              FAST FOOD
            </span>
            <span
              className="block text-9xl sm:text-[11rem] text-outline-pink fade-in-delay-2"
            >
              MOOD'J SMASH
            </span>
          </h1>
          <p
            className="font-body text-lg mt-6 mb-10 fade-in-delay-2"
            style={{ color: '#ffffff' }}
          >
            Smash Burgers maison · Tacos généreux · Snacks &amp; vibes 100% Mood'J
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 fade-in-delay-3">
            <Link
              to="/menu"
              className="flex items-center gap-2 font-body font-semibold text-sm uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-200"
              style={{
                background: '#e91e8c',
                color: '#ffffff',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#ff4db8';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(233,30,140,0.6)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#e91e8c';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Voir le menu <ArrowRight size={16} />
            </Link>
            <Link
              to="/actualites"
              className="font-body font-semibold text-sm uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-200"
              style={{
                background: 'transparent',
                color: '#e91e8c',
                border: '2px solid #e91e8c',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(233,30,140,0.1)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(233,30,140,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Nos actus
            </Link>
          </div>
        </div>

        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 text-8xl select-none hidden lg:block"
          style={{ animation: 'float 3s ease-in-out infinite', filter: 'drop-shadow(0 0 30px rgba(233,30,140,0.5))' }}
        >
          🍔
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, #0a0a0a)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            clipPath: 'polygon(0 100%, 100% 0, 100% 100%)',
            background: '#111111',
          }}
        />
      </section>

      <section className="py-24 px-6" style={{ background: '#111111' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-sm uppercase tracking-[0.4em] mb-3" style={{ color: '#ffffff' }}>
              Les classiques
            </p>
            <h2 className="font-display text-6xl sm:text-7xl text-outline-pink">
              NOS INCONTOURNABLES
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bestSellers.map(item => (
              <BestSellerCard key={item.id} {...item} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 font-body font-semibold text-sm uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-200"
              style={{ border: '2px solid #e91e8c', color: '#e91e8c' }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#e91e8c';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(233,30,140,0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#e91e8c';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Voir toute la carte <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6" style={{ background: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>
            <p
              className="font-body text-sm uppercase tracking-[0.4em] mb-4"
              style={{ color: '#ffffff' }}
            >
              Notre ADN
            </p>

            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-none mb-8 text-outline-pink">
              SMASH BURGERS<br />
              <span style={{ color: '#e91e8c' }}>FAITS MAISON.</span><br />
              TACOS<br />
              GÉNÉREUX.<br />
              <span style={{ color: '#e91e8c' }}>VIBES 100% MOOD'J.</span>
            </h2>

            <p
              className="font-body text-base leading-relaxed"
              style={{ color: '#ffffff' }}
            >
              Chez MOOD'J, chaque burger est smasher à la commande, chaque sauce est préparée maison.
              Pas de compromis, que du goût.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative square-appear">

              {/* Carré fond */}
              <div
                className="w-72 h-72 rounded-3xl rotate-12 square-hover"
                style={{ background: 'linear-gradient(135deg, #e91e8c 0%, #c0176f 100%)' }}
              />

              {/* Carré contenu */}
              <div
                className="absolute inset-4 rounded-2xl -rotate-6 flex items-center justify-center square-hover"
                style={{ background: '#0a0a0a', border: '2px solid #1f1f1f' }}
              >
                <div className="text-center rotate-6">
                  <div
                    className="font-display text-7xl"
                    style={{ color: '#e91e8c' }}
                  >
                    100%
                  </div>

                  <div className="font-display text-2xl tracking-widest text-white">
                    MAISON
                  </div>

                  <div
                    className="font-body text-xs mt-2 tracking-[0.3em]"
                    style={{ color: '#aaaaaa' }}
                  >
                    DEPUIS BARBEZIEUX
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Animations */}
        <style>{`
    @keyframes squareFadeIn {
      from {
        opacity: 0;
        transform: translateY(40px) scale(0.9) rotate(6deg);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1) rotate(0deg);
      }
    }

    .square-appear {
      animation: squareFadeIn 0.8s ease forwards;
    }

    .square-hover {
      transition: all 0.4s ease;
    }

    .square-hover:hover {
      transform: rotate(6deg) scale(1.05);
      box-shadow: 0 0 40px rgba(233,30,140,0.5);
    }
  `}</style>
      </section>

      <section className="py-24 px-6" style={{ background: '#111111' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="font-body text-sm uppercase tracking-[0.4em] mb-3" style={{ color: '#ffffff' }}>
                On reste actifs
              </p>
              <h2 className="font-display text-5xl sm:text-6xl text-outline-pink">
                ACTUS DU MOMENT
              </h2>
            </div>
            <Link
              to="/actualites"
              className="hidden sm:flex items-center gap-2 font-body text-sm font-medium transition-colors"
              style={{ color: '#e91e8c' }}
            >
              Tout voir <ArrowRight size={16} />
            </Link>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 sm:grid sm:grid-cols-3 sm:overflow-visible sm:mx-0 sm:px-0">
            {latestNews.map(post => (
              <NewsCard key={post.id} {...post} />
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link
              to="/actualites"
              className="inline-flex items-center gap-2 font-body text-sm font-medium"
              style={{ color: '#e91e8c' }}
            >
              Voir toutes les actus <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6" style={{ background: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p
              className="font-body text-sm uppercase tracking-[0.4em] mb-3"
              style={{ color: '#ffffff' }}
            >
              Nous trouver
            </p>
            <h2 className="font-display text-5xl sm:text-6xl text-outline-pink">
              NOTRE ADRESSE
            </h2>
            <p className="font-body text-sm mt-4" style={{ color: '#ffffff' }}>
              33 Av. Pierre Mendès France, 16300 Barbezieux-Saint-Hilaire
            </p>
          </div>


          <div
            className="w-full h-[400px] rounded-2xl overflow-hidden border border-[#1f1f1f] transition-all duration-300"
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(233,30,140,0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <iframe
              title="Google Maps"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=33+Av.+Pierre+Mendès+France,+16300+Barbezieux-Saint-Hilaire&output=embed"
            ></iframe>
          </div>

          <div className="text-center">
  <a
    href="/contact"
    rel="noopener noreferrer"
    className="inline-block mt-6 px-6 py-3 rounded-full font-body text-sm uppercase tracking-widest transition-all duration-200"
    style={{ background: '#e91e8c', color: '#fff' }}
    onMouseEnter={e => {
      e.currentTarget.style.background = '#ff4db8';
      e.currentTarget.style.boxShadow = '0 0 20px rgba(233,30,140,0.4)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = '#e91e8c';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    Nous contacter
  </a>
</div>

        </div>
      </section>


    </div>
  );
}
