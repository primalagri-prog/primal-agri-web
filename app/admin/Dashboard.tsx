'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

interface Listing {
  id: string;
  title: any;
  category: string;
  sub_category: string;
  price: number;
  district: string;
  province: string;
  status: string;
  created_at: string;
  user_id: string;
}

interface Profile {
  id: string;
  full_name: string;
  phone: string;
  district: string;
  created_at: string;
}

interface Stats {
  totalListings: number;
  activeListings: number;
  expiredListings: number;
  totalUsers: number;
  listingsByCategory: Record<string, number>;
}

type Tab = 'overview' | 'listings' | 'users';

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>('overview');
  const [stats, setStats] = useState<Stats | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const resolveTitle = (title: any): string => {
    if (typeof title === 'string') return title;
    if (typeof title === 'object' && title !== null) return title.en || title.ur || 'Untitled';
    return 'Untitled';
  };

  const loadData = useCallback(async () => {
    setLoading(true);

    const [listingsRes, profilesRes] = await Promise.all([
      supabase.from('listings').select('*').order('created_at', { ascending: false }).limit(200),
      supabase.from('profiles').select('id, full_name, phone, district, created_at').order('created_at', { ascending: false }).limit(200),
    ]);

    const allListings: Listing[] = listingsRes.data || [];
    const allUsers: Profile[] = profilesRes.data || [];

    // Compute stats
    const byCategory: Record<string, number> = {};
    allListings.forEach((l) => {
      byCategory[l.category] = (byCategory[l.category] || 0) + 1;
    });

    setStats({
      totalListings: allListings.length,
      activeListings: allListings.filter((l) => l.status === 'active').length,
      expiredListings: allListings.filter((l) => l.status === 'expired').length,
      totalUsers: allUsers.length,
      listingsByCategory: byCategory,
    });

    setListings(allListings);
    setUsers(allUsers);
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const deleteListing = async (id: string) => {
    if (!confirm('Delete this listing?')) return;
    setActionLoading(id);
    await supabase.from('listings').delete().eq('id', id);
    setListings((prev) => prev.filter((l) => l.id !== id));
    setActionLoading(null);
  };

  const updateListingStatus = async (id: string, status: string) => {
    setActionLoading(id);
    await supabase.from('listings').update({ status }).eq('id', id);
    setListings((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
    setActionLoading(null);
  };

  const TABS: { key: Tab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'listings', label: `Listings (${listings.length})` },
    { key: 'users', label: `Users (${users.length})` },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#00401A] text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Primal Agri Admin</h1>
          <p className="text-green-300 text-xs">Dashboard</p>
        </div>
        <button
          onClick={onLogout}
          className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition"
        >
          Sign Out
        </button>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-6">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`py-4 text-sm font-medium border-b-2 transition ${
                tab === t.key
                  ? 'border-[#00401A] text-[#00401A]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-6">
        {loading ? (
          <div className="text-center text-gray-400 py-20">Loading...</div>
        ) : (
          <>
            {/* Overview Tab */}
            {tab === 'overview' && stats && (
              <div className="space-y-6">
                {/* Stat Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Listings', value: stats.totalListings, color: 'text-blue-600' },
                    { label: 'Active Listings', value: stats.activeListings, color: 'text-green-600' },
                    { label: 'Expired Listings', value: stats.expiredListings, color: 'text-orange-500' },
                    { label: 'Total Users', value: stats.totalUsers, color: 'text-purple-600' },
                  ].map((s) => (
                    <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm">
                      <p className="text-gray-500 text-xs mb-1">{s.label}</p>
                      <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
                    </div>
                  ))}
                </div>

                {/* Listings by Category */}
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <h3 className="font-semibold text-gray-800 mb-4">Listings by Category</h3>
                  <div className="space-y-2">
                    {Object.entries(stats.listingsByCategory)
                      .sort(([, a], [, b]) => b - a)
                      .map(([cat, count]) => (
                        <div key={cat} className="flex items-center gap-3">
                          <span className="text-sm text-gray-600 w-36 capitalize">{cat.replace(/-/g, ' ')}</span>
                          <div className="flex-1 bg-gray-100 rounded-full h-2">
                            <div
                              className="bg-[#00401A] h-2 rounded-full"
                              style={{ width: `${(count / stats.totalListings) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-700 w-8 text-right">{count}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* Listings Tab */}
            {tab === 'listings' && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-3 text-gray-600 font-medium">Title</th>
                      <th className="text-left px-4 py-3 text-gray-600 font-medium">Category</th>
                      <th className="text-left px-4 py-3 text-gray-600 font-medium">Price</th>
                      <th className="text-left px-4 py-3 text-gray-600 font-medium">Location</th>
                      <th className="text-left px-4 py-3 text-gray-600 font-medium">Status</th>
                      <th className="text-left px-4 py-3 text-gray-600 font-medium">Date</th>
                      <th className="text-left px-4 py-3 text-gray-600 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {listings.map((l) => (
                      <tr key={l.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-800 max-w-[200px] truncate">
                          {resolveTitle(l.title)}
                        </td>
                        <td className="px-4 py-3 text-gray-600 capitalize">{l.category}</td>
                        <td className="px-4 py-3 text-gray-800">Rs {l.price?.toLocaleString()}</td>
                        <td className="px-4 py-3 text-gray-600">{l.district || l.province || '—'}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            l.status === 'active' ? 'bg-green-100 text-green-700' :
                            l.status === 'expired' ? 'bg-orange-100 text-orange-700' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {l.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-500">
                          {new Date(l.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            {l.status === 'active' ? (
                              <button
                                onClick={() => updateListingStatus(l.id, 'inactive')}
                                disabled={actionLoading === l.id}
                                className="text-xs text-orange-600 hover:underline disabled:opacity-50"
                              >
                                Deactivate
                              </button>
                            ) : (
                              <button
                                onClick={() => updateListingStatus(l.id, 'active')}
                                disabled={actionLoading === l.id}
                                className="text-xs text-green-600 hover:underline disabled:opacity-50"
                              >
                                Activate
                              </button>
                            )}
                            <button
                              onClick={() => deleteListing(l.id)}
                              disabled={actionLoading === l.id}
                              className="text-xs text-red-600 hover:underline disabled:opacity-50"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Users Tab */}
            {tab === 'users' && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-3 text-gray-600 font-medium">Name</th>
                      <th className="text-left px-4 py-3 text-gray-600 font-medium">Phone</th>
                      <th className="text-left px-4 py-3 text-gray-600 font-medium">District</th>
                      <th className="text-left px-4 py-3 text-gray-600 font-medium">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-800">{u.full_name || '—'}</td>
                        <td className="px-4 py-3 text-gray-600">{u.phone || '—'}</td>
                        <td className="px-4 py-3 text-gray-600">{u.district || '—'}</td>
                        <td className="px-4 py-3 text-gray-500">
                          {new Date(u.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
