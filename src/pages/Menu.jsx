import { useState, useRef } from 'react';
import { useData } from '../context/DataContext';

const CATEGORIES = ['Burgers', 'Tacos', 'Sandwichs', 'Salades', 'Frites', 'Petites Faim', 'Menu Enfant'];

function formatPrice(price) {
  return price.toFixed(2).replace('.', ',') + '€';
}

function MenuCard({ item }) {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300"
      style={{ background: '#111111', border: '1px solid #1f1f1f' }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#e91e8c';
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(233,30,140,0.2)';
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#1f1f1f';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-script text-xl text-white leading-tight">{item.name}</h3>
        {item.prixMenu && (
          <span
            className="flex-shrink-0 font-body text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
            style={{ background: 'rgba(233,30,140,0.15)', color: '#e91e8c', border: '1px solid rgba(233,30,140,0.4)' }}
          >
            En Menu
          </span>
        )}
      </div>
      <p className="font-body text-sm flex-1" style={{ color: '#888' }}>{item.description}</p>
      <div className="flex items-center gap-4 pt-2" style={{ borderTop: '1px solid #1f1f1f' }}>
        <div>
          <p className="font-body text-xs uppercase tracking-widest mb-1" style={{ color: '#555' }}>
            Seul
          </p>
          <p className="font-display text-3xl" style={{ color: '#e91e8c' }}>
            {formatPrice(item.prixSeul)}
          </p>
        </div>
        {item.prixMenu && (
          <>
            <div className="w-px h-10" style={{ background: '#1f1f1f' }} />
            <div>
              <p className="font-body text-xs uppercase tracking-widest mb-1" style={{ color: '#555' }}>
                En Menu
              </p>
              <p className="font-display text-3xl" style={{ color: '#aaaaaa' }}>
                {formatPrice(item.prixMenu)}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Menu() {
  const { state } = useData();
  const [active, setActive] = useState('Burgers');
  const tabsRef = useRef(null);

  const filteredItems = state.menu.filter(item => item.category === active);
  const activeIndex = CATEGORIES.indexOf(active);

  return (
    <div className="font-body min-h-screen pt-20" style={{ background: '#0a0a0a', color: '#fff' }}>
      <style>{`
        .tab-indicator {
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), width 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .menu-fade {
          animation: menuFadeIn 0.3s ease forwards;
        }
        @keyframes menuFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="text-center py-16 px-6" style={{ background: '#0a0a0a' }}>
        <p className="font-body text-sm uppercase tracking-[0.4em] mb-3" style={{ color: '#e91e8c' }}>
          Nos saveurs
        </p>
        <h1 className="font-display text-7xl sm:text-8xl text-white">LA CARTE</h1>
      </div>

      <div
        className="sticky top-0 z-40"
        style={{ background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #1f1f1f' }}
        ref={tabsRef}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-0 scrollbar-hide">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="relative flex-shrink-0 font-body font-medium text-sm uppercase tracking-wider px-5 py-5 transition-colors duration-200"
                style={{ color: active === cat ? '#e91e8c' : '#aaaaaa' }}
              >
                {cat}
                {active === cat && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ background: '#e91e8c', boxShadow: '0 0 8px rgba(233,30,140,0.8)' }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-baseline gap-4 mb-8">
          <h2 className="font-script text-4xl" style={{ color: '#e91e8c' }}>{active}</h2>
          <span className="font-body text-sm" style={{ color: '#555' }}>
            {filteredItems.length} article{filteredItems.length > 1 ? 's' : ''}
          </span>
        </div>
        <div
          key={active}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 menu-fade"
        >
          {filteredItems.map(item => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="font-display text-4xl" style={{ color: '#333' }}>AUCUN ARTICLE</p>
          </div>
        )}
      </div>
    </div>
  );
}
