import { useState } from 'react';
import { X, Calendar, Tag } from 'lucide-react';
import { useData } from '../context/DataContext';

const TAGS = ['Tous', 'Promo', 'Événement', 'Nouveauté'];

const TAG_COLORS = {
  Promo: { bg: 'rgba(233,30,140,0.1)', border: 'rgba(233,30,140,0.4)', text: '#e91e8c' },
  Événement: { bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.4)', text: '#60a5fa' },
  Nouveauté: { bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.4)', text: '#4ade80' },
};

function TagBadge({ tag, size = 'sm' }) {
  const colors = TAG_COLORS[tag] || TAG_COLORS['Nouveauté'];
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-body font-semibold uppercase tracking-wider rounded-full ${
        size === 'sm' ? 'text-xs px-3 py-1' : 'text-sm px-4 py-1.5'
      }`}
      style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
    >
      <Tag size={10} />
      {tag}
    </span>
  );
}

function NewsCard({ post, onClick }) {
  const formatted = new Date(post.date).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div
      className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col"
      style={{ background: '#111111', border: '1px solid #1f1f1f' }}
      onClick={() => onClick(post)}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#e91e8c';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(233,30,140,0.2)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#1f1f1f';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div
        className="h-44 flex items-center justify-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a0a10 0%, rgba(233,30,140,0.15) 50%, #0a0a0a 100%)',
        }}
      >
        <span className="font-display text-8xl" style={{ color: 'rgba(233,30,140,0.1)' }}>MOOD'J</span>
        <div className="absolute top-4 left-4">
          <TagBadge tag={post.tag} />
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-body font-bold text-white text-lg leading-tight mb-3">{post.titre}</h3>
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={14} color="#555" />
          <span className="font-body text-xs" style={{ color: '#555' }}>{formatted}</span>
        </div>
        <p className="font-body text-sm flex-1" style={{ color: '#888', lineHeight: '1.6' }}>
          {post.extrait}
        </p>
        <button
          className="mt-5 font-body text-sm font-semibold uppercase tracking-widest transition-colors"
          style={{ color: '#e91e8c' }}
        >
          Lire plus →
        </button>
      </div>
    </div>
  );
}

function Modal({ post, onClose }) {
  if (!post) return null;
  const formatted = new Date(post.date).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden max-h-[90vh] flex flex-col"
        style={{ background: '#111111', border: '1px solid #1f1f1f' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="h-2 w-full" style={{ background: 'linear-gradient(90deg, #e91e8c, #c0176f)' }} />
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex items-start justify-between gap-4 mb-4">
            <TagBadge tag={post.tag} size="md" />
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
              style={{ background: '#161616', color: '#aaa' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#e91e8c'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#161616'; e.currentTarget.style.color = '#aaa'; }}
            >
              <X size={16} />
            </button>
          </div>
          <h2 className="font-body font-bold text-2xl text-white mb-3 leading-tight">{post.titre}</h2>
          <div className="flex items-center gap-2 mb-6">
            <Calendar size={14} color="#555" />
            <span className="font-body text-sm" style={{ color: '#555' }}>{formatted}</span>
          </div>
          <p className="font-body text-base leading-relaxed" style={{ color: '#aaaaaa' }}>
            {post.contenu}
          </p>
        </div>
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="font-body font-semibold text-sm uppercase tracking-widest px-8 py-3 rounded-full transition-all duration-200"
            style={{ background: '#e91e8c', color: '#fff' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#ff4db8'; e.currentTarget.style.boxShadow = '0 0 20px rgba(233,30,140,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#e91e8c'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

export default function News() {
  const { state } = useData();
  const [activeTag, setActiveTag] = useState('Tous');
  const [selectedPost, setSelectedPost] = useState(null);

  const filtered = activeTag === 'Tous'
    ? state.news
    : state.news.filter(p => p.tag === activeTag);

  return (
    <div className="font-body min-h-screen pt-24 pb-20 px-6" style={{ background: '#0a0a0a', color: '#fff' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-body text-sm uppercase tracking-[0.4em] mb-3" style={{ color: '#e91e8c' }}>
            Restez connectés
          </p>
          <h1 className="font-display text-7xl sm:text-8xl text-white">ACTUALITÉS</h1>
        </div>

        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className="font-body font-semibold text-sm uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-200"
              style={
                activeTag === tag
                  ? { background: '#e91e8c', color: '#fff', boxShadow: '0 0 16px rgba(233,30,140,0.4)' }
                  : { background: '#111', color: '#aaa', border: '1px solid #1f1f1f' }
              }
            >
              {tag}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display text-5xl" style={{ color: '#222' }}>AUCUNE ACTU</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => (
              <NewsCard key={post.id} post={post} onClick={setSelectedPost} />
            ))}
          </div>
        )}
      </div>

      <Modal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </div>
  );
}
