import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { supabase } from '../lib/supabase';

const navigation = [
  { label: 'Chat', path: 'chat', description: 'Your AI finance assistant will live here.' },
  {
    label: 'Design',
    path: 'design',
    description: 'Financial document design tools are coming soon.',
  },
  { label: 'Leads', path: 'leads', description: 'Lead tracking and insights are coming soon.' },
];

export function DashboardPage() {
  const { user } = useAuth();
  const previewEmail =
    import.meta.env.DEV && import.meta.env.VITE_BYPASS_AUTH === 'true'
      ? 'preview@financeflow.local'
      : user?.email;
  return (
    <div className="flex min-h-screen">
      <aside className="flex w-64 flex-col bg-slate-950 p-6 text-white">
        <div className="text-xl font-bold">FinanceFlow</div>
        <nav className="mt-10 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block rounded-lg px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto border-t border-slate-800 pt-5">
          <p className="truncate text-xs text-slate-400">{previewEmail}</p>
          <button
            onClick={() => void supabase.auth.signOut()}
            className="mt-3 text-sm font-medium text-slate-300 hover:text-white"
          >
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-10">
        <Routes>
          <Route index element={<Navigate to="chat" replace />} />
          {navigation.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={<Placeholder title={item.label} description={item.description} />}
            />
          ))}
        </Routes>
      </main>
    </div>
  );
}

function Placeholder({ title, description }: { title: string; description: string }) {
  return (
    <section>
      <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Dashboard</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">{title}</h1>
      <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">
        {description}
      </div>
    </section>
  );
}
