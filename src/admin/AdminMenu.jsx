import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { useData } from '../context/DataContext';

const CATEGORIES = ['Burgers', 'Tacos', 'Sandwichs', 'Salades', 'Frites', 'Petites Faim', 'Menu Enfant'];

const emptyForm = {
  category: 'Burgers',
  name: '',
  description: '',
  prixSeul: '',
  prixMenu: '',
};

function Modal({ mode, item, onSave, onClose, loading }) {
  const [form, setForm] = useState(
    item
      ? { ...item, prixSeul: item.prixSeul.toString(), prixMenu: item.prixMenu ? item.prixMenu.toString() : '' }
      : { ...emptyForm }
  );

  const handleSubmit = e => {
    e.preventDefault();
    onSave({
      ...form,
      prixSeul: parseFloat(form.prixSeul),
      prixMenu: form.prixMenu ? parseFloat(form.prixMenu) : null,
      id: item ? item.id : undefined,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl overflow-hidden"
        style={{ background: '#111111', border: '1px solid #1f1f1f' }}
        onClick={e => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ background: '#e91e8c' }}
        >
          <h2 className="font-display text-2xl tracking-widest text-white">
            {mode === 'add' ? 'AJOUTER UN PLAT' : 'MODIFIER LE PLAT'}
          </h2>
          <button onClick={onClose} className="text-white hover:opacity-70 transition-opacity">
            <X size={22} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block font-body text-xs uppercase tracking-widest mb-2" style={{ color: '#aaaaaa' }}>
              Catégorie *
            </label>
            <select
              required
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-3 rounded-xl font-body text-sm text-white outline-none"
              style={{ background: '#161616', border: '1px solid #1f1f1f' }}
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-body text-xs uppercase tracking-widest mb-2" style={{ color: '#aaaaaa' }}>
              Nom *
            </label>
            <input
              required
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl font-body text-sm text-white outline-none"
              style={{ background: '#161616', border: '1px solid #1f1f1f' }}
              placeholder="Nom du plat"
            />
          </div>
          <div>
            <label className="block font-body text-xs uppercase tracking-widest mb-2" style={{ color: '#aaaaaa' }}>
              Description *
            </label>
            <input
              required
              type="text"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl font-body text-sm text-white outline-none"
              style={{ background: '#161616', border: '1px solid #1f1f1f' }}
              placeholder="Description courte"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-xs uppercase tracking-widest mb-2" style={{ color: '#aaaaaa' }}>
                Prix Seul (€) *
              </label>
              <input
                required
                type="number"
                step="0.01"
                min="0"
                value={form.prixSeul}
                onChange={e => setForm({ ...form, prixSeul: e.target.value })}
                className="w-full px-4 py-3 rounded-xl font-body text-sm text-white outline-none"
                style={{ background: '#161616', border: '1px solid #1f1f1f' }}
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block font-body text-xs uppercase tracking-widest mb-2" style={{ color: '#aaaaaa' }}>
                Prix Menu (€)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.prixMenu}
                onChange={e => setForm({ ...form, prixMenu: e.target.value })}
                className="w-full px-4 py-3 rounded-xl font-body text-sm text-white outline-none"
                style={{ background: '#161616', border: '1px solid #1f1f1f' }}
                placeholder="Optionnel"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 font-body font-medium text-sm uppercase tracking-widest py-3 rounded-full transition-all duration-200"
              style={{ border: '1px solid #1f1f1f', color: '#aaaaaa' }}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 font-body font-semibold text-sm uppercase tracking-widest py-3 rounded-full transition-all duration-200"
              style={{ background: '#e91e8c', color: '#fff' }}
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Check size={16} />
              )}
              {mode === 'add' ? 'Ajouter' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteConfirm({ item, onConfirm, onClose }) {
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
          Êtes-vous sûr de vouloir supprimer <strong className="text-white">"{item.name}"</strong> ? Cette action est irréversible.
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
            onClick={() => onConfirm(item.id)}
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

export default function AdminMenu() {
  const { state, dispatch } = useData();
  const [modal, setModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [filterCat, setFilterCat] = useState('Tous');
  const [loading, setLoading] = useState(false);

  const filtered = filterCat === 'Tous'
    ? state.menu
    : state.menu.filter(item => item.category === filterCat);

  const handleSave = async form => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    if (modal.mode === 'add') {
      dispatch({ type: 'ADD_MENU_ITEM', payload: form });
    } else {
      dispatch({ type: 'UPDATE_MENU_ITEM', payload: form });
    }
    setLoading(false);
    setModal(null);
  };

  const handleDelete = id => {
    dispatch({ type: 'DELETE_MENU_ITEM', payload: id });
    setDeleteTarget(null);
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <p className="font-body text-xs uppercase tracking-[0.3em] mb-1" style={{ color: '#e91e8c' }}>Administration</p>
          <h1 className="font-display text-4xl text-white tracking-wider">GÉRER LA CARTE</h1>
          <p className="font-body text-sm mt-1" style={{ color: '#555' }}>{state.menu.length} plats au total</p>
        </div>
        <button
          onClick={() => setModal({ mode: 'add', item: null })}
          className="flex items-center gap-2 font-body font-semibold text-sm uppercase tracking-widest px-6 py-3 rounded-full transition-all duration-200"
          style={{ background: '#e91e8c', color: '#fff' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#ff4db8'; e.currentTarget.style.boxShadow = '0 0 20px rgba(233,30,140,0.4)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#e91e8c'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          <Plus size={16} /> Ajouter un plat
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {['Tous', ...CATEGORIES].map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            className="font-body text-xs font-medium uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-200"
            style={
              filterCat === cat
                ? { background: '#e91e8c', color: '#fff' }
                : { background: '#111', color: '#aaa', border: '1px solid #1f1f1f' }
            }
          >
            {cat}
          </button>
        ))}
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: '1px solid #1f1f1f' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#111111', borderBottom: '1px solid #1f1f1f' }}>
                {['Catégorie', 'Nom', 'Description', 'Prix Seul', 'Prix Menu', 'Actions'].map(col => (
                  <th
                    key={col}
                    className="text-left px-5 py-4 font-body text-xs uppercase tracking-widest"
                    style={{ color: '#555' }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <tr
                  key={item.id}
                  className="transition-colors"
                  style={{
                    background: i % 2 === 0 ? '#0d0d0d' : '#111111',
                    borderBottom: '1px solid #1f1f1f',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#161616'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = i % 2 === 0 ? '#0d0d0d' : '#111111'; }}
                >
                  <td className="px-5 py-4">
                    <span
                      className="font-body text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(233,30,140,0.1)', color: '#e91e8c' }}
                    >
                      {item.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-body font-medium text-sm text-white">{item.name}</td>
                  <td className="px-5 py-4 font-body text-sm max-w-xs" style={{ color: '#aaaaaa' }}>
                    <span className="line-clamp-1">{item.description}</span>
                  </td>
                  <td className="px-5 py-4 font-display text-xl" style={{ color: '#e91e8c' }}>
                    {item.prixSeul.toFixed(2).replace('.', ',')}€
                  </td>
                  <td className="px-5 py-4 font-display text-lg" style={{ color: '#aaaaaa' }}>
                    {item.prixMenu ? `${item.prixMenu.toFixed(2).replace('.', ',')}€` : '—'}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setModal({ mode: 'edit', item })}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                        style={{ background: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.2)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.1)'; }}
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(item)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                        style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-16 font-display text-3xl" style={{ color: '#222' }}>
                    AUCUN PLAT
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <Modal
          mode={modal.mode}
          item={modal.item}
          onSave={handleSave}
          onClose={() => setModal(null)}
          loading={loading}
        />
      )}
      {deleteTarget && (
        <DeleteConfirm
          item={deleteTarget}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
