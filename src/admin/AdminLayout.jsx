import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, UtensilsCrossed, Newspaper, LogOut, Menu, X } from 'lucide-react';
import Logo from '/assets/images/logo.png';

const navItems = [
  { icon: <LayoutDashboard size={18} />, label: 'Dashboard', to: '/admin/dashboard' },
  { icon: <UtensilsCrossed size={18} />, label: 'Gérer la carte', to: '/admin/menu' },
  { icon: <Newspaper size={18} />, label: 'Gérer les actus', to: '/admin/news' },
];

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('moodj_admin');
    navigate('/admin/login');
  };

  const SidebarContent = () => (
    <>
      <div className="p-6 mb-4" style={{ borderBottom: '1px solid #1f1f1f' }}>
        <img src={Logo} alt="Logo" className="w-32" />
        <p className="font-body text-xs uppercase tracking-widest mt-3" style={{ color: '#555' }}>
          Espace Admin
        </p>
      </div>
      <nav className="flex-1 px-3">
        {navItems.map(item => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl mb-1 font-body text-sm font-medium transition-all duration-200"
              style={
                isActive
                  ? { background: 'rgba(233,30,140,0.15)', color: '#e91e8c', border: '1px solid rgba(233,30,140,0.3)' }
                  : { color: '#aaaaaa', border: '1px solid transparent' }
              }
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = '#161616'; } }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = '#aaaaaa'; e.currentTarget.style.background = 'transparent'; } }}
            >
              {item.icon}
              {item.label}
              {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: '#e91e8c' }} />}
            </Link>
          );
        })}
      </nav>
      <div className="p-4" style={{ borderTop: '1px solid #1f1f1f' }}>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl w-full font-body text-sm font-medium transition-all duration-200"
          style={{ color: '#555' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#e91e8c'; e.currentTarget.style.background = 'rgba(233,30,140,0.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#555'; e.currentTarget.style.background = 'transparent'; }}
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen font-body" style={{ background: '#0a0a0a' }}>
      <aside
        className="hidden lg:flex flex-col w-64 sticky top-0 h-screen"
        style={{ background: '#0d0d0d', borderRight: '1px solid #1f1f1f' }}
      >
        <SidebarContent />
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.8)' }}
          onClick={() => setSidebarOpen(false)}
        >
          <aside
            className="flex flex-col w-72 h-full"
            style={{ background: '#0d0d0d', borderRight: '1px solid #1f1f1f' }}
            onClick={e => e.stopPropagation()}
          >
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header
          className="lg:hidden flex items-center gap-4 px-4 py-4 sticky top-0 z-40"
          style={{ background: '#0d0d0d', borderBottom: '1px solid #1f1f1f' }}
        >
          <button onClick={() => setSidebarOpen(true)} style={{ color: '#fff' }}>
            <Menu size={24} />
          </button>
          <img src={Logo} alt="Logo" className="h-24" />
        </header>
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
