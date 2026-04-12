import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '/assets/images/logo.png';
import { Eye, EyeOff, LogIn } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    if (email === 'admin@moodj.fr' && password === 'moodj2024') {
      localStorage.setItem('moodj_admin', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Identifiants incorrects. Vérifiez votre email et mot de passe.');
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: '#0a0a0a' }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <img src={Logo} alt="Logo" className="w-32" />
          </div>
          <h1 className="font-display text-4xl text-white tracking-widest">ADMINISTRATION</h1>
          <p className="font-body text-sm mt-2" style={{ color: '#aaaaaa' }}>
            Connectez-vous pour gérer votre restaurant
          </p>
        </div>

        <div
          className="rounded-2xl p-8"
          style={{ background: '#111111', border: '1px solid #1f1f1f' }}
        >
          <div className="h-1 w-full rounded-full mb-8" style={{ background: 'linear-gradient(90deg, #e91e8c, #c0176f)' }} />

          {error && (
            <div
              className="mb-6 px-4 py-3 rounded-xl font-body text-sm"
              style={{ background: 'rgba(233,30,140,0.1)', border: '1px solid rgba(233,30,140,0.3)', color: '#e91e8c' }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-body text-xs uppercase tracking-widest mb-2" style={{ color: '#aaaaaa' }}>
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl font-body text-sm text-white outline-none transition-all duration-200"
                style={{ background: '#161616', border: '1px solid #1f1f1f' }}
                onFocus={e => { e.target.style.borderColor = '#e91e8c'; e.target.style.boxShadow = '0 0 12px rgba(233,30,140,0.2)'; }}
                onBlur={e => { e.target.style.borderColor = '#1f1f1f'; e.target.style.boxShadow = 'none'; }}
                placeholder="admin@moodj.fr"
              />
            </div>
            <div>
              <label className="block font-body text-xs uppercase tracking-widest mb-2" style={{ color: '#aaaaaa' }}>
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl font-body text-sm text-white outline-none transition-all duration-200"
                  style={{ background: '#161616', border: '1px solid #1f1f1f' }}
                  onFocus={e => { e.target.style.borderColor = '#e91e8c'; e.target.style.boxShadow = '0 0 12px rgba(233,30,140,0.2)'; }}
                  onBlur={e => { e.target.style.borderColor = '#1f1f1f'; e.target.style.boxShadow = 'none'; }}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: '#555' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#e91e8c'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#555'; }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 font-body font-semibold text-sm uppercase tracking-widest py-4 rounded-full transition-all duration-200 mt-2"
              style={{
                background: loading ? '#c0176f' : '#e91e8c',
                color: '#fff',
                opacity: loading ? 0.8 : 1,
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = '#ff4db8'; e.currentTarget.style.boxShadow = '0 0 24px rgba(233,30,140,0.5)'; } }}
              onMouseLeave={e => { e.currentTarget.style.background = loading ? '#c0176f' : '#e91e8c'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <LogIn size={16} />
              )}
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
