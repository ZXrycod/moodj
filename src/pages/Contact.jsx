import { useState } from 'react';
import { MapPin, Clock, Send } from 'lucide-react';

const hours = [
  { day: 'Lundi', hours: '11h30 – 13h30 / 18h30 – 21h00' },
  { day: 'Mardi', hours: '11h30 – 13h30 / 18h30 – 21h00' },
  { day: 'Mercredi', hours: '11h30 – 13h30 / 18h30 – 21h00' },
  { day: 'Jeudi', hours: '11h30 – 13h30 / 18h30 – 21h00' },
  { day: 'Vendredi', hours: '11h30 – 14h00 / 18h30 – 21h30' },
  { day: 'Samedi', hours: '11h30 – 14h00 / 18h30 - 21h30' },
  { day: 'Dimanche', hours: '18h00 - 21h00' },
];

export default function Contact() {
  const [form, setForm] = useState({ nom: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
    setForm({ nom: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;

  return (
    <div className="font-body min-h-screen pt-24 pb-20 px-6" style={{ background: '#0a0a0a', color: '#fff' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-body text-sm uppercase tracking-[0.4em] mb-3" style={{ color: '#e91e8c' }}>
            Venir nous voir
          </p>
          <h1 className="font-display text-7xl sm:text-8xl text-white">CONTACT</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '2px solid #e91e8c', background: '#111111' }}
          >
            <div
              className="h-56 flex items-center justify-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #1a0a10 0%, #2a0a18 50%, #0a0a0a 100%)',
              }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: 0.08 }}
              >
                <span className="font-display text-9xl text-pink">MAP</span>
              </div>
              <div className="relative z-10 text-center">
                <MapPin size={40} color="#e91e8c" className="mx-auto mb-3" />
                <p className="font-body font-semibold text-white text-lg">33 Av. Pierre Mendès France,</p>
                <p className="font-body text-sm" style={{ color: '#aaaaaa' }}>16300, Barbezieux-Saint-Hilaire, France</p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <MapPin size={20} color="#e91e8c" className="mt-1 flex-shrink-0" />
                <div>
                  <p className="font-body font-semibold text-white">Adresse</p>
                  <p className="font-body text-sm mt-1" style={{ color: '#aaaaaa' }}>
                    33 Av. Pierre Mendès France,<br />16300, Barbezieux-Saint-Hilaire<br />France
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid #1f1f1f', background: '#111111' }}
          >
            <div
              className="flex items-center gap-3 px-6 py-4"
              style={{ borderBottom: '1px solid #1f1f1f' }}
            >
              <Clock size={20} color="#e91e8c" />
              <h2 className="font-display text-2xl tracking-widest text-white">HORAIRES</h2>
            </div>
            <div className="p-4">
              {hours.map((row, i) => (
                <div
                  key={row.day}
                  className="flex items-center justify-between px-4 py-3 rounded-xl transition-all"
                  style={{
                    background: i === todayIndex ? 'rgba(233,30,140,0.1)' : 'transparent',
                    border: i === todayIndex ? '1px solid rgba(233,30,140,0.3)' : '1px solid transparent',
                    marginBottom: '4px',
                  }}
                >
                  <span
                    className="font-body font-medium text-sm"
                    style={{ color: i === todayIndex ? '#e91e8c' : '#fff' }}
                  >
                    {row.day}
                    {i === todayIndex && (
                      <span
                        className="ml-2 text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: '#e91e8c', color: '#fff' }}
                      >
                        Aujourd'hui
                      </span>
                    )}
                  </span>
                  <span
                    className="font-body text-sm"
                    style={{ color: row.closed ? '#555' : '#aaaaaa' }}
                  >
                    {row.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="rounded-2xl p-8"
          style={{ background: '#111111', border: '1px solid #1f1f1f' }}
        >
          <h2 className="font-display text-4xl tracking-widest text-white mb-8">NOUS CONTACTER</h2>
          {sent ? (
            <div
              className="text-center py-12 rounded-xl"
              style={{ background: 'rgba(233,30,140,0.1)', border: '1px solid rgba(233,30,140,0.3)' }}
            >
              <Send size={40} color="#e91e8c" className="mx-auto mb-4" />
              <p className="font-display text-3xl text-white mb-2">MESSAGE ENVOYÉ !</p>
              <p className="font-body text-sm" style={{ color: '#aaaaaa' }}>
                Nous vous répondrons dans les plus brefs délais.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-body text-xs uppercase tracking-widest mb-2" style={{ color: '#aaaaaa' }}>
                  Nom *
                </label>
                <input
                  required
                  type="text"
                  value={form.nom}
                  onChange={e => setForm({ ...form, nom: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl font-body text-sm text-white outline-none transition-all duration-200"
                  style={{
                    background: '#161616',
                    border: '1px solid #1f1f1f',
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = '#e91e8c';
                    e.target.style.boxShadow = '0 0 12px rgba(233,30,140,0.2)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = '#1f1f1f';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="block font-body text-xs uppercase tracking-widest mb-2" style={{ color: '#aaaaaa' }}>
                  Email *
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl font-body text-sm text-white outline-none transition-all duration-200"
                  style={{ background: '#161616', border: '1px solid #1f1f1f' }}
                  onFocus={e => {
                    e.target.style.borderColor = '#e91e8c';
                    e.target.style.boxShadow = '0 0 12px rgba(233,30,140,0.2)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = '#1f1f1f';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="votre@email.fr"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block font-body text-xs uppercase tracking-widest mb-2" style={{ color: '#aaaaaa' }}>
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl font-body text-sm text-white outline-none transition-all duration-200 resize-none"
                  style={{ background: '#161616', border: '1px solid #1f1f1f' }}
                  onFocus={e => {
                    e.target.style.borderColor = '#e91e8c';
                    e.target.style.boxShadow = '0 0 12px rgba(233,30,140,0.2)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = '#1f1f1f';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="Votre message..."
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 font-body font-semibold text-sm uppercase tracking-widest px-10 py-4 rounded-full transition-all duration-200"
                  style={{ background: '#e91e8c', color: '#fff' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#ff4db8';
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(233,30,140,0.5)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#e91e8c';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Send size={16} /> Envoyer le message
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
