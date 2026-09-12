import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export function AuthLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="grid min-h-screen place-items-center px-6 py-12">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl shadow-slate-200/60">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          FinanceFlow
        </Link>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">{title}</h1>
        {children}
      </section>
    </main>
  );
}
