'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  LayoutDashboard, ShoppingBag, Users, ShieldAlert, Truck,
  BarChart3, Settings, Leaf, Search, Bell, TrendingUp,
  TrendingDown, CheckCircle, XCircle, Clock, MapPin,
  Activity, Server, MessageSquare, Image, ChevronRight,
  RefreshCw, AlertTriangle, Eye, Menu, X,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

// ─── Types ────────────────────────────────────────────────────────────────────

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
  images?: string[];
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
  listingsBySubCategory: Record<string, Record<string, number>>;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = {
  'machinery': 'Machinery', 'agri-inputs': 'Agri Inputs',
  'agri-implements': 'Agri Implements', 'big-animals': 'Big Animals',
  'small-animals': 'Small Animals', 'horses': 'Horses',
  'livestock': 'Livestock', 'plants': 'Plants', 'poultry': 'Poultry',
  'aquaculture': 'Aquaculture', 'land': 'Land', 'vet-services': 'Veterinary',
  'fruit-plants': 'Fruit Plants', 'timber': 'Timber & Forest',
  'feed-fodder': 'Feed & Fodder', 'grains-crops': 'Grains & Crops',
  'dairy': 'Dairy Products', 'vegetables': 'Vegetables', 'fruits': 'Fruits',
};

const formatCategory = (cat: string) =>
  CATEGORY_LABELS[cat] ?? cat.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const resolveTitle = (title: any): string => {
  if (typeof title === 'string') return title;
  if (typeof title === 'object' && title !== null) return title.en || title.ur || 'Untitled';
  return 'Untitled';
};

type SidebarView = 'overview' | 'marketplace' | 'users' | 'moderation' | 'analytics' | 'settings';

const NAV_ITEMS: { key: SidebarView; label: string; icon: any }[] = [
  { key: 'overview',    label: 'Overview',          icon: LayoutDashboard },
  { key: 'marketplace', label: 'Marketplace',        icon: ShoppingBag },
  { key: 'users',       label: 'User Management',    icon: Users },
  { key: 'moderation',  label: 'Moderation Queue',   icon: ShieldAlert },
  { key: 'analytics',   label: 'Analytics',          icon: BarChart3 },
  { key: 'settings',    label: 'Settings',           icon: Settings },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function KpiCard({ title, value, delta, deltaUp, color, icon: Icon }: {
  title: string; value: string | number; delta: string; deltaUp: boolean; color: string; icon: any;
}) {
  return (
    <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-slate-400 text-xs font-medium uppercase tracking-widest">{title}</span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
          <Icon size={16} className="text-white" />
        </div>
      </div>
      <div className="text-3xl font-bold text-white">{value}</div>
      <div className={`flex items-center gap-1 text-xs font-semibold ${deltaUp ? 'text-emerald-400' : 'text-orange-400'}`}>
        {deltaUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {delta} vs last month
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active:   'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    expired:  'bg-orange-500/20 text-orange-400 border border-orange-500/30',
    inactive: 'bg-slate-600/40 text-slate-400 border border-slate-600/30',
    sold:     'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${map[status] ?? map.inactive}`}>
      {status}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [view, setView] = useState<SidebarView>('overview');
  const [stats, setStats] = useState<Stats | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    const [listingsRes, profilesRes] = await Promise.all([
      supabase.from('listings').select('*').order('created_at', { ascending: false }).limit(200),
      supabase.from('profiles').select('id, full_name, phone, district, created_at').order('created_at', { ascending: false }).limit(200),
    ]);

    const allListings: Listing[] = listingsRes.data || [];
    const allUsers: Profile[] = profilesRes.data || [];

    const byCategory: Record<string, number> = Object.fromEntries(
      Object.keys(CATEGORY_LABELS).map((k) => [k, 0])
    );
    const bySubCategory: Record<string, Record<string, number>> = {};

    allListings.forEach((l) => {
      byCategory[l.category] = (byCategory[l.category] || 0) + 1;
      if (l.sub_category) {
        if (!bySubCategory[l.category]) bySubCategory[l.category] = {};
        bySubCategory[l.category][l.sub_category] = (bySubCategory[l.category][l.sub_category] || 0) + 1;
      }
    });

    setStats({
      totalListings: allListings.length,
      activeListings: allListings.filter((l) => l.status === 'active').length,
      expiredListings: allListings.filter((l) => l.status === 'expired').length,
      totalUsers: allUsers.length,
      listingsByCategory: byCategory,
      listingsBySubCategory: bySubCategory,
    });

    setListings(allListings);
    setUsers(allUsers);
    setLastRefresh(new Date());
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const deleteListing = async (id: string) => {
    if (!confirm('Permanently delete this listing?')) return;
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

  const filteredListings = listings.filter((l) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return resolveTitle(l.title).toLowerCase().includes(q)
      || l.category?.toLowerCase().includes(q)
      || l.district?.toLowerCase().includes(q);
  });

  // ── Sidebar ──────────────────────────────────────────────────────────────────
  const Sidebar = () => (
    <aside className={`${sidebarOpen ? 'w-56' : 'w-16'} transition-all duration-300 bg-slate-900/80 backdrop-blur-xl border-r border-slate-700/50 flex flex-col h-screen sticky top-0`}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-700/50">
        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
          <Leaf size={16} className="text-emerald-400" />
        </div>
        {sidebarOpen && <span className="text-white font-bold text-sm tracking-tight">Primal Agri</span>}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setView(key)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              view === key
                ? 'bg-emerald-500/15 text-emerald-400 border-l-2 border-emerald-500'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Icon size={17} className="shrink-0" />
            {sidebarOpen && <span>{label}</span>}
          </button>
        ))}
      </nav>

      {/* Sign out */}
      <div className="px-2 pb-4">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition"
        >
          <X size={17} className="shrink-0" />
          {sidebarOpen && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );

  // ── Header ───────────────────────────────────────────────────────────────────
  const Header = () => (
    <header className="sticky top-0 z-10 bg-slate-900/60 backdrop-blur-xl border-b border-slate-700/50 px-6 py-3 flex items-center gap-4">
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-400 hover:text-white transition">
        <Menu size={20} />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search listings, users, categories..."
          className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
        />
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <span className="text-slate-500 text-xs hidden md:block">
          Refreshed {lastRefresh.toLocaleTimeString()}
        </span>
        <button
          onClick={loadData}
          className="flex items-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-medium transition"
        >
          <RefreshCw size={13} />
          <span className="hidden sm:block">Refresh</span>
        </button>
        <button className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white transition">
          <Bell size={16} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
        </button>
      </div>
    </header>
  );

  // ── Overview ─────────────────────────────────────────────────────────────────
  const OverviewView = () => (
    <div className="space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Active Listings"   value={stats?.activeListings ?? 0}  delta="+12%" deltaUp={true}  color="bg-blue-500"    icon={ShoppingBag} />
        <KpiCard title="Total Users"       value={stats?.totalUsers ?? 0}      delta="+8%"  deltaUp={true}  color="bg-emerald-500" icon={Users} />
        <KpiCard title="Expired Listings"  value={stats?.expiredListings ?? 0} delta="+3%"  deltaUp={false} color="bg-amber-500"   icon={AlertTriangle} />
        <KpiCard title="Total Listings"    value={stats?.totalListings ?? 0}   delta="+15%" deltaUp={true}  color="bg-purple-500"  icon={BarChart3} />
      </div>

      {/* New Listings Feed */}
      {(() => {
        const today = new Date().toDateString();
        const recent = listings.filter((l) => new Date(l.created_at).toDateString() === today);
        const last48h = listings.filter((l) => Date.now() - new Date(l.created_at).getTime() < 48 * 60 * 60 * 1000);
        const displayed = recent.length > 0 ? recent : last48h.slice(0, 10);
        const label = recent.length > 0 ? `${recent.length} new today` : `${displayed.length} in last 48 h`;
        return (
          <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock size={15} className="text-emerald-400" />
                <h3 className="text-white font-semibold text-sm">New Listings</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30">{label}</span>
              </div>
            </div>
            {displayed.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-4">No new listings yet today</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 max-h-56 overflow-y-auto pr-1">
                {displayed.map((l) => {
                  const seller = users.find((u) => u.id === l.user_id);
                  return (
                    <div key={l.id} className="bg-slate-700/30 border border-slate-700/50 rounded-xl p-3 flex flex-col gap-2">
                      {l.images?.[0] ? (
                        <img src={l.images[0]} alt="" className="w-full h-20 object-cover rounded-lg border border-slate-700/50" />
                      ) : (
                        <div className="w-full h-20 rounded-lg bg-slate-700/50 flex items-center justify-center border border-slate-700/50">
                          <Image size={20} className="text-slate-600" />
                        </div>
                      )}
                      <div>
                        <div className="text-slate-200 text-xs font-medium truncate">{resolveTitle(l.title)}</div>
                        <div className="text-emerald-400 text-xs font-semibold">Rs {l.price?.toLocaleString()}</div>
                        <div className="text-slate-500 text-xs truncate">{formatCategory(l.category)}</div>
                        {seller && <div className="text-slate-500 text-xs truncate">{seller.full_name}</div>}
                      </div>
                      <StatusBadge status={l.status} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })()}

      {/* Main content row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Category breakdown — 2/3 width */}
        <div className="lg:col-span-2 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-white font-semibold">Listings by Category</h3>
            <span className="text-slate-500 text-xs">{stats?.totalListings} total</span>
          </div>
          <div className="space-y-1 max-h-96 overflow-y-auto pr-1">
            {stats && Object.entries(stats.listingsByCategory)
              .sort(([, a], [, b]) => b - a)
              .map(([cat, count]) => {
                const subCats = stats.listingsBySubCategory[cat];
                const hasSubCats = subCats && Object.keys(subCats).length > 0;
                const isExpanded = expandedCategories.has(cat);
                const pct = stats.totalListings ? (count / stats.totalListings) * 100 : 0;
                return (
                  <div key={cat}>
                    <div
                      className={`flex items-center gap-3 py-2 px-2 rounded-xl ${hasSubCats ? 'cursor-pointer hover:bg-slate-700/30' : ''}`}
                      onClick={() => hasSubCats && toggleCategory(cat)}
                    >
                      <span className="text-slate-300 text-xs w-36 flex items-center gap-1.5 shrink-0">
                        {hasSubCats && (
                          <ChevronRight size={12} className={`text-slate-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        )}
                        {!hasSubCats && <span className="w-3" />}
                        {formatCategory(cat)}
                      </span>
                      <div className="flex-1 bg-slate-700/50 rounded-full h-1.5">
                        <div className="bg-emerald-500 h-1.5 rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-slate-300 text-xs font-semibold w-7 text-right shrink-0">{count}</span>
                    </div>
                    {isExpanded && subCats && (
                      <div className="ml-10 mb-1 space-y-1">
                        {Object.entries(subCats).sort(([, a], [, b]) => b - a).map(([sub, subCount]) => (
                          <div key={sub} className="flex items-center gap-3 py-1 px-2">
                            <span className="text-slate-500 text-xs w-32 shrink-0">{formatCategory(sub)}</span>
                            <div className="flex-1 bg-slate-700/30 rounded-full h-1">
                              <div className="bg-emerald-400/60 h-1 rounded-full" style={{ width: count ? `${(subCount / count) * 100}%` : '0%' }} />
                            </div>
                            <span className="text-slate-500 text-xs w-7 text-right shrink-0">{subCount}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>

        {/* Side widgets — 1/3 width */}
        <div className="space-y-4">
          {/* Network Health */}
          <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Activity size={15} className="text-emerald-400" />
              <h3 className="text-white font-semibold text-sm">System Health</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Supabase API',  pct: 98, color: 'bg-emerald-500' },
                { label: 'SMS Gateway',   pct: 91, color: 'bg-emerald-500' },
                { label: 'Image Server',  pct: 87, color: 'bg-amber-500'   },
              ].map(({ label, pct, color }) => (
                <div key={label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-400 text-xs">{label}</span>
                    <span className={`text-xs font-semibold ${pct > 90 ? 'text-emerald-400' : 'text-amber-400'}`}>{pct}%</span>
                  </div>
                  <div className="bg-slate-700/50 rounded-full h-1.5">
                    <div className={`${color} h-1.5 rounded-full`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Geo Distribution */}
          <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={15} className="text-orange-400" />
              <h3 className="text-white font-semibold text-sm">Peak Activity</h3>
            </div>
            <div className="space-y-2">
              {[
                { city: 'Sargodha',  pct: 34 },
                { city: 'Multan',    pct: 22 },
                { city: 'Lahore',    pct: 18 },
                { city: 'Faisalabad', pct: 14 },
                { city: 'Others',    pct: 12 },
              ].map(({ city, pct }) => (
                <div key={city} className="flex items-center gap-2">
                  <span className="text-slate-400 text-xs w-24 shrink-0">{city}</span>
                  <div className="flex-1 bg-slate-700/50 rounded-full h-1.5">
                    <div className="bg-orange-500/70 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-slate-500 text-xs w-8 text-right">{pct}%</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-slate-700/50">
              <span className="text-xs text-orange-400/80 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse inline-block" />
                Sargodha · Multan corridor hotspot
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ── Moderation Queue ──────────────────────────────────────────────────────────
  const ModerationView = () => (
    <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-700/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert size={16} className="text-orange-400" />
          <h3 className="text-white font-semibold">Moderation Queue</h3>
          <span className="ml-2 px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-semibold border border-orange-500/30">
            {listings.filter(l => l.status === 'active').length} active
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700/50">
              {['Listing', 'Seller', 'Category', 'Price', 'Location', 'Status', 'Date', 'Actions'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-slate-500 text-xs font-medium uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {(searchQuery ? filteredListings : listings).map((l) => {
              const seller = users.find((u) => u.id === l.user_id);
              return (
                <tr key={l.id} className="hover:bg-slate-700/20 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {l.images?.[0] ? (
                        <img src={l.images[0]} alt="" className="w-9 h-9 rounded-lg object-cover border border-slate-700/50 shrink-0" />
                      ) : (
                        <div className="w-9 h-9 rounded-lg bg-slate-700/50 border border-slate-700/50 flex items-center justify-center shrink-0">
                          <Image size={14} className="text-slate-500" />
                        </div>
                      )}
                      <span className="text-slate-200 font-medium max-w-[160px] truncate">{resolveTitle(l.title)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <span className="text-emerald-400 text-xs font-bold">{(seller?.full_name || '?')[0].toUpperCase()}</span>
                      </div>
                      <div>
                        <div className="text-slate-300 text-xs font-medium">{seller?.full_name || '—'}</div>
                        <div className="text-slate-500 text-xs">{seller?.phone || ''}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-slate-400 text-xs">{formatCategory(l.category)}</span>
                  </td>
                  <td className="px-4 py-3 text-emerald-400 font-semibold">Rs {l.price?.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-400 text-xs">{l.district || l.province || '—'}</td>
                  <td className="px-4 py-3"><StatusBadge status={l.status} /></td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{new Date(l.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {l.status === 'active' ? (
                        <button
                          onClick={() => updateListingStatus(l.id, 'inactive')}
                          disabled={actionLoading === l.id}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-500/15 hover:bg-orange-500/25 text-orange-400 text-xs font-medium transition disabled:opacity-40 border border-orange-500/20"
                        >
                          <XCircle size={11} /> Deactivate
                        </button>
                      ) : (
                        <button
                          onClick={() => updateListingStatus(l.id, 'active')}
                          disabled={actionLoading === l.id}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 text-xs font-medium transition disabled:opacity-40 border border-emerald-500/20"
                        >
                          <CheckCircle size={11} /> Activate
                        </button>
                      )}
                      <button
                        onClick={() => deleteListing(l.id)}
                        disabled={actionLoading === l.id}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition disabled:opacity-40 border border-red-500/20"
                      >
                        <XCircle size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ── Users ─────────────────────────────────────────────────────────────────────
  const UsersView = () => (
    <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-700/50 flex items-center gap-2">
        <Users size={16} className="text-emerald-400" />
        <h3 className="text-white font-semibold">User Management</h3>
        <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30">{users.length} users</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700/50">
              {['Name', 'Phone', 'District', 'Joined'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-slate-500 text-xs font-medium uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-700/20 transition">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <span className="text-emerald-400 text-xs font-bold">{(u.full_name || '?')[0].toUpperCase()}</span>
                    </div>
                    <span className="text-slate-200 font-medium">{u.full_name || '—'}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-400">{u.phone || '—'}</td>
                <td className="px-4 py-3 text-slate-400">{u.district || '—'}</td>
                <td className="px-4 py-3 text-slate-500 text-xs">{new Date(u.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ── Analytics ─────────────────────────────────────────────────────────────────
  const AnalyticsView = () => (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Top categories */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><BarChart3 size={15} className="text-emerald-400" /> Top Categories</h3>
        <div className="space-y-3">
          {stats && Object.entries(stats.listingsByCategory)
            .sort(([, a], [, b]) => b - a).slice(0, 8)
            .map(([cat, count]) => (
              <div key={cat} className="flex items-center gap-3">
                <span className="text-slate-400 text-xs w-32 shrink-0">{formatCategory(cat)}</span>
                <div className="flex-1 bg-slate-700/50 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: stats.totalListings ? `${(count / stats.totalListings) * 100}%` : '0%' }} />
                </div>
                <span className="text-emerald-400 text-xs font-bold w-7 text-right">{count}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Status breakdown */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><Activity size={15} className="text-emerald-400" /> Listing Status Breakdown</h3>
        <div className="space-y-4">
          {[
            { label: 'Active',   value: stats?.activeListings ?? 0,   color: 'bg-emerald-500', text: 'text-emerald-400' },
            { label: 'Expired',  value: stats?.expiredListings ?? 0,  color: 'bg-orange-500',  text: 'text-orange-400' },
            { label: 'Other',    value: (stats?.totalListings ?? 0) - (stats?.activeListings ?? 0) - (stats?.expiredListings ?? 0), color: 'bg-slate-500', text: 'text-slate-400' },
          ].map(({ label, value, color, text }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="text-slate-400 text-xs w-16 shrink-0">{label}</span>
              <div className="flex-1 bg-slate-700/50 rounded-full h-2.5">
                <div className={`${color} h-2.5 rounded-full`} style={{ width: stats?.totalListings ? `${(value / stats.totalListings) * 100}%` : '0%' }} />
              </div>
              <span className={`${text} text-xs font-bold w-7 text-right`}>{value}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-700/50 grid grid-cols-3 gap-3">
          {[
            { label: 'Active Rate', value: stats ? `${Math.round((stats.activeListings / stats.totalListings) * 100)}%` : '—', color: 'text-emerald-400' },
            { label: 'Avg Price',   value: listings.length ? `Rs ${Math.round(listings.reduce((s, l) => s + (l.price || 0), 0) / listings.length).toLocaleString()}` : '—', color: 'text-blue-400' },
            { label: 'New Today',   value: listings.filter(l => new Date(l.created_at).toDateString() === new Date().toDateString()).length, color: 'text-purple-400' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-slate-700/30 rounded-xl p-3 text-center">
              <div className={`text-lg font-bold ${color}`}>{value}</div>
              <div className="text-slate-500 text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── Marketplace ────────────────────────────────────────────────────────────────
  const MarketplaceView = () => <ModerationView />;

  // ── Settings ──────────────────────────────────────────────────────────────────
  const SettingsView = () => (
    <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 max-w-lg">
      <h3 className="text-white font-semibold mb-6 flex items-center gap-2"><Settings size={15} className="text-slate-400" /> Settings</h3>
      <div className="space-y-4">
        {[
          { label: 'Admin Email',    value: 'primalagri@gmail.com' },
          { label: 'Platform',       value: 'Primal Agri v1.0' },
          { label: 'DB Region',      value: 'Supabase · ap-south-1' },
          { label: 'Listing Expiry', value: '30 days' },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between py-3 border-b border-slate-700/50">
            <span className="text-slate-400 text-sm">{label}</span>
            <span className="text-slate-200 text-sm font-medium">{value}</span>
          </div>
        ))}
      </div>
      <button
        onClick={onLogout}
        className="mt-6 w-full py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium transition border border-red-500/20"
      >
        Sign Out
      </button>
    </div>
  );

  const VIEW_MAP: Record<SidebarView, React.ReactNode> = {
    overview:    <OverviewView />,
    marketplace: <MarketplaceView />,
    users:       <UsersView />,
    moderation:  <ModerationView />,
    analytics:   <AnalyticsView />,
    settings:    <SettingsView />,
  };

  // ── Root ──────────────────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64 gap-3">
              <RefreshCw size={20} className="text-emerald-400 animate-spin" />
              <span className="text-slate-400">Loading dashboard...</span>
            </div>
          ) : (
            VIEW_MAP[view]
          )}
        </main>
      </div>
    </div>
  );
}
