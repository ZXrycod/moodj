import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { useData } from '../context/DataContext';

const TAGS = ['Promo', 'Événement', 'Nouveauté'];

const TAG_COLORS = {
  Promo: { bg: 'rgba(233,30,140,0.1)', color: '#e91e8c' },
  Événement: { bg: 'rgba(59,130,246,0.1)', color: '#60a5fa' },
  Nouveauté: { bg: 'rgba(34,197,94,0.1)', color: '#4ade80' },
};

const emptyForm = {
  titre: '',
  date: new Date().toISOString().split('T')[0],
  extrait: '',
  contenu: '',
  tag: 'Nouveauté',
};

const inputStyle = {
  background: '#161616',
  border: '1px solid #1f1f1f',
};

function Modal({ mode, post, onSave, onClose, loading }) {
  const [form, setForm] = useState(post ? { ...post } : { ...emptyForm });

  const handleSubmit = e => {
    e.preventDefault();
    onSave({ ...form, id: post ? post.id : undefined });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl overflow-hidden max-h-[90vh] flex flex-col"
        style={{ background: '#111111', border: '1px solid #1f1f1f' }}
        onClick={e => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ background: '#e91e8c' }}
        >
          <h2 className="font-display text-2xl tracking-widest text-white">
            {mode === 'add' ? 'NOUVELLE ACTU' : 'MODIFIER L\'ACTU'}
          </h2>
          <button onClick={onClose} className="text-white hover:opacity-70">
            <X size={22} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
          <div>
            <label className="block font-body text-xs uppercase tracking-widest mb-2" style={{ color: '#aaaaaa' }}>
              Titre *
            </label>
            <input
              required
              type="text"
              value={form.titre}
              onChange={e => setForm({ ...form, titre: e.target.value })}
              className="w-full px-4 py-3 rounded-xl font-body text-sm text-white outline-none"
              style={inputStyle}
              placeholder="Titre de l'actualité"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-xs uppercase tracking-widest mb-2" style={{ color: '#aaaaaa' }}>
                Date *
              </label>
              <input
                required
                type="date"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                className="w-full px-4 py-3 rounded-xl font-body text-sm text-white outline-none"
                style={inputStyle}
              />
            </div>
            <div>
              <label className="block font-body text-xs uppercase tracking-widest mb-2" style={{ color: '#aaaaaa' }}>
                Tag *
              </label>
              <select
                required
                value={form.tag}
                onChange={e => setForm({ ...form, tag: e.target.value })}
                className="w-full px-4 py-3 rounded-xl font-body text-sm text-white outline-none"
                style={inputStyle}
              >
                {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block font-body text-xs uppercase tracking-widest mb-2" style={{ color: '#aaaaaa' }}>
              Extrait *
            </label>
            <input
              required
              type="text"
              value={form.extrait}
              onChange={e => setForm({ ...form, extrait: e.target.value })}
              className="w-full px-4 py-3 rounded-xl font-body text-sm text-white outline-none"
              style={inputStyle}
              placeholder="Court résumé affiché sur la carte"
            />
          </div>
          <div>
            <label className="block font-body text-xs uppercase tracking-widest mb-2" style={{ color: '#aaaaaa' }}>
              Contenu complet *
            </label>
            <textarea
              required
              rows={5}
              value={form.contenu}
              onChange={e => setForm({ ...form, contenu: e.target.value })}
              className="w-full px-4 py-3 rounded-xl font-body text-sm text-white outline-none resize-none"
              style={inputStyle}
              placeholder="Texte complet de l'actualité..."
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 font-body font-medium text-sm uppercase tracking-widest py-3 rounded-full"
              style={{ border: '1px solid #1f1f1f', color: '#aaaaaa' }}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 font-body font-semibold text-sm uppercase tracking-widest py-3 rounded-full"
              style={{ background: '#e91e8c', color: '#fff' }}
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Check size={16} />
              )}
              {mode === 'add' ? 'Publier' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteConfirm({ post, onConfirm, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-6"
        style={{ background: '#111111', border: '1px solid rgba(233,30,140,0.3)' }}
        onClick={e => e.stopPropagation()}
      >
        <h3 className="font-display text-2xl text-white tracking-wider mb-3">SUPPRIMER</h3>
        <p className="font-body text-sm mb-6" style={{ color: '#aaaaaa' }}>
          Supprimer <strong className="text-white">"{post.titre}"</strong> ? Cette action est irréversible.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 font-body font-medium text-sm uppercase tracking-widest py-3 rounded-full"
            style={{ border: '1px solid #1f1f1f', color: '#aaaaaa' }}
          >
            Annuler
          </button>
          <button
            onClick={() => onConfirm(post.id)}
            className="flex-1 font-body font-semibold text-sm uppercase tracking-widest py-3 rounded-full"
            style={{ background: '#e91e8c', color: '#fff' }}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminNews() {
  const { state, dispatch } = useData();
  const [modal, setModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async form => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    if (modal.mode === 'add') {
      dispatch({ type: 'ADD_NEWS', payload: form });
    } else {
      dispatch({ type: 'UPDATE_NEWS', payload: form });
    }
    setLoading(false);
    setModal(null);
  };

  const handleDelete = id => {
    dispatch({ type: 'DELETE_NEWS', payload: id });
    setDeleteTarget(null);
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <p className="font-body text-xs uppercase tracking-[0.3em] mb-1" style={{ color: '#e91e8c' }}>Administration</p>
          <h1 className="font-display text-4xl text-white tracking-wider">GÉRER LES ACTUS</h1>
          <p className="font-body text-sm mt-1" style={{ color: '#555' }}>{state.news.length} actualités publiées</p>
        </div>
        <button
          onClick={() => setModal({ mode: 'add', post: null })}
          className="flex items-center gap-2 font-body font-semibold text-sm uppercase tracking-widest px-6 py-3 rounded-full transition-all duration-200"
          style={{ background: '#e91e8c', color: '#fff' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#ff4db8'; e.currentTarget.style.boxShadow = '0 0 20px rgba(233,30,140,0.4)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#e91e8c'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          <Plus size={16} /> Nouvelle actu
        </button>
      </div>

      <div className="space-y-4">
        {state.news.map(post => {
          const colors = TAG_COLORS[post.tag] || TAG_COLORS['Nouveauté'];
          return (
            <div
              key={post.id}
              className="rounded-2xl p-5 flex items-start justify-between gap-4 transition-colors"
              style={{ background: '#111111', border: '1px solid #1f1f1f' }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span
                    className="font-body text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: colors.bg, color: colors.color }}
                  >
                    {post.tag}
                  </span>
                  <span className="font-body text-xs" style={{ color: '#555' }}>
                    {new Date(post.date).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <h3 className="font-body font-bold text-white text-base mb-1">{post.titre}</h3>
                <p className="font-body text-sm line-clamp-1" style={{ color: '#555' }}>{post.extrait}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setModal({ mode: 'edit', post })}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{ background: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.1)'; }}
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => setDeleteTarget(post)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          );
        })}
        {state.news.length === 0 && (
          <div className="text-center py-20">
            <p className="font-display text-4xl" style={{ color: '#222' }}>AUCUNE ACTU</p>
          </div>
        )}
      </div>

      {modal && (
        <Modal
          mode={modal.mode}
          post={modal.post}
          onSave={handleSave}
          onClose={() => setModal(null)}
          loading={loading}
        />
      )}
      {deleteTarget && (
        <DeleteConfirm
          post={deleteTarget}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
