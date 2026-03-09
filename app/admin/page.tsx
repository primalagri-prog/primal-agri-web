'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import AdminDashboard from './Dashboard';

export default function AdminPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Check admin flag on profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', data.session!.user.id)
      .single();

    if (!profile?.is_admin) {
      await supabase.auth.signOut();
      setError('Access denied. Admin only.');
      setLoading(false);
      return;
    }

    setSession(data.session);
    setIsAdmin(true);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setIsAdmin(false);
  };

  if (session && isAdmin) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return (
    <main className="min-h-screen bg-[#00401A] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Admin Login</h1>
        <p className="text-gray-500 text-sm mb-6">Primal Agri Dashboard</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00401A]"
              placeholder="admin@primalagri.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00401A]"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00401A] text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-green-900 transition disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  );
}
