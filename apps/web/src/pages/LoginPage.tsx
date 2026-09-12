import { useState, type FormEvent } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthField } from '../components/AuthField';
import { AuthLayout } from '../components/AuthLayout';
import { useAuth } from '../context/auth-context';
import { supabase } from '../lib/supabase';

export function LoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);
    if (signInError) return setError(signInError.message);
    const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;
    navigate(from ?? '/dashboard', { replace: true });
  }

  return (
    <AuthLayout title="Welcome back">
      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <AuthField label="Email" type="email" value={email} onChange={setEmail} />
        <AuthField label="Password" type="password" value={password} onChange={setPassword} />
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        <button
          disabled={submitting}
          className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <p className="mt-6 text-sm text-slate-600">
        New to FinanceFlow?{' '}
        <Link className="font-medium text-indigo-600" to="/signup">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
