import { useState, type FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthField } from '../components/AuthField';
import { AuthLayout } from '../components/AuthLayout';
import { useAuth } from '../context/auth-context';
import { supabase } from '../lib/supabase';

export function SignupPage() {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setNotice('');
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    setSubmitting(false);
    if (signUpError) return setError(signUpError.message);
    if (!data.session) setNotice('Check your email to confirm your account.');
  }

  return (
    <AuthLayout title="Create your account">
      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <AuthField label="Name" type="text" value={name} onChange={setName} />
        <AuthField label="Email" type="email" value={email} onChange={setEmail} />
        <AuthField
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          minLength={8}
        />
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {notice && (
          <p className="text-sm text-emerald-700" role="status">
            {notice}
          </p>
        )}
        <button
          disabled={submitting}
          className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {submitting ? 'Creating account…' : 'Sign up'}
        </button>
      </form>
      <p className="mt-6 text-sm text-slate-600">
        Already have an account?{' '}
        <Link className="font-medium text-indigo-600" to="/login">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
