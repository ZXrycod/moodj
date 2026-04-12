import { Link } from 'react-router-dom';
import { UtensilsCrossed, Newspaper, Tag, ArrowRight, TrendingUp } from 'lucide-react';
import { useData } from '../context/DataContext';

function StatCard({ icon, label, value, color }) {
  return (
    <div
      className="rounded-2xl p-6 flex items-center gap-5"
      style={{ background: '#111111', border: '1px solid #1f1f1f' }}
    >
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}18`, border: `1px solid ${color}40` }}
      >
        <span style={{ color }}>{icon}</span>
      </div>
      <div>
        <p className="font-body text-xs uppercase tracking-widest mb-1" style={{ color: '#555' }}>
          {label}
        </p>
        <p className="font-display text-5xl" style={{ color }}>{value}</p>
      </div>
    </div>
  );
}

function QuickAction({ icon, label, to, description }) {
  return (
    <Link
      to={to}
      className="rounded-2xl p-6 flex items-center justify-between gap-4 transition-all duration-300 group"
      style={{ background: '#111111', border: '1px solid #1f1f1f' }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#e91e8c';
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(233,30,140,0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#1f1f1f';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(233,30,140,0.1)', color: '#e91e8c' }}
        >
          {icon}
        </div>
        <div>
          <p className="font-body font-semibold text-white text-sm">{label}</p>
          <p className="font-body text-xs mt-0.5" style={{ color: '#555' }}>{description}</p>
        </div>
      </div>
      <ArrowRight size={18} color="#555" className="group-hover:text-pink transition-colors" />
    </Link>
  );
}

export default function AdminDashboard() {
  const { state } = useData();

  const categories = [...new Set(state.menu.map(item => item.category))].length;

  return (
    <div>
      <div className="mb-10">
        <p className="font-body text-sm uppercase tracking-[0.3em] mb-2" style={{ color: '#e91e8c' }}>
          Bienvenue
        </p>
        <h1 className="font-display text-5xl text-white tracking-wider">DASHBOARD</h1>
        <p className="font-body text-sm mt-2" style={{ color: '#555' }}>
          Vue d'ensemble de votre restaurant
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        <StatCard
          icon={<UtensilsCrossed size={24} />}
          label="Plats au menu"
          value={state.menu.length}
          color="#e91e8c"
        />
        <StatCard
          icon={<Newspaper size={24} />}
          label="Actualités"
          value={state.news.length}
          color="#60a5fa"
        />
        <StatCard
          icon={<Tag size={24} />}
          label="Catégories"
          value={categories}
          color="#4ade80"
        />
      </div>

      <div className="mb-6">
        <h2 className="font-display text-2xl text-white tracking-widest mb-4">ACCÈS RAPIDES</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <QuickAction
            icon={<UtensilsCrossed size={18} />}
            label="Gérer la carte"
            to="/admin/menu"
            description="Ajouter, modifier ou supprimer des plats"
          />
          <QuickAction
            icon={<Newspaper size={18} />}
            label="Gérer les actualités"
            to="/admin/news"
            description="Publier et gérer vos actualités"
          />
        </div>
      </div>

      <div
        className="rounded-2xl p-6"
        style={{ background: '#111111', border: '1px solid #1f1f1f' }}
      >
        <h2 className="font-display text-2xl text-white tracking-widest mb-5">DERNIÈRES ACTUS</h2>
        <div className="space-y-3">
          {state.news.slice(0, 3).map(post => (
            <div
              key={post.id}
              className="flex items-center justify-between gap-4 py-3"
              style={{ borderBottom: '1px solid #1f1f1f' }}
            >
              <div>
                <p className="font-body font-medium text-sm text-white">{post.titre}</p>
                <p className="font-body text-xs mt-0.5" style={{ color: '#555' }}>
                  {new Date(post.date).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <span
                className="font-body text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0"
                style={{ background: 'rgba(233,30,140,0.1)', color: '#e91e8c', border: '1px solid rgba(233,30,140,0.3)' }}
              >
                {post.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
