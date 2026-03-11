import Link from 'next/link';
import {
  Tractor,
  Sprout,
  Wrench,
  Beef,
  Rabbit,
  Footprints,
  Leaf,
  Egg,
  Fish,
  MapPin,
  Stethoscope,
  TreeDeciduous,
  Trees,
  Wheat,
  ShoppingBasket,
  Milk,
  Vegan,
  Apple,
  Search,
  Phone,
  Handshake,
  Banknote,
  MessageCircle,
  LocateFixed,
} from 'lucide-react';

const CATEGORIES = [
  { icon: Tractor,        name: 'Machinery',       ur: 'مشینری' },
  { icon: Sprout,         name: 'Agri Inputs',     ur: 'زرعی اجزاء' },
  { icon: Wrench,         name: 'Agri Implements', ur: 'زرعی آلات' },
  { icon: Beef,           name: 'Big Animals',     ur: 'بڑے جانور' },
  { icon: Rabbit,         name: 'Small Animals',   ur: 'چھوٹے جانور' },
  { icon: Footprints,     name: 'Horses',          ur: 'گھوڑے' },
  { icon: Leaf,           name: 'Plants',          ur: 'پودے' },
  { icon: Egg,            name: 'Poultry',         ur: 'پولٹری' },
  { icon: Fish,           name: 'Aquaculture',     ur: 'مچھلی منڈی' },
  { icon: MapPin,         name: 'Land',            ur: 'زمین' },
  { icon: Stethoscope,    name: 'Veterinary',      ur: 'ویٹرنری خدمات' },
  { icon: TreeDeciduous,  name: 'Fruit Plants',    ur: 'پھل دار پودے' },
  { icon: Trees,          name: 'Timber & Forest', ur: 'ٹمبر اور جنگلات' },
  { icon: Wheat,          name: 'Feed & Fodder',   ur: 'چارہ اور خوراک' },
  { icon: ShoppingBasket, name: 'Grains & Crops',  ur: 'اناج اور فصلیں' },
  { icon: Milk,           name: 'Dairy Products',  ur: 'ڈیری مصنوعات' },
  { icon: Vegan,          name: 'Vegetables',      ur: 'سبزیاں' },
  { icon: Apple,          name: 'Fruits',          ur: 'پھل' },
];

const STEPS = [
  { step: '1', icon: Search,      title: 'Browse',         desc: 'Explore thousands of listings across 18 categories', ur: 'تلاش کریں' },
  { step: '2', icon: Phone,       title: 'Contact Seller', desc: 'Call or WhatsApp the seller directly — no middleman', ur: 'بیچنے والے سے بات کریں' },
  { step: '3', icon: Handshake,   title: 'Deal Done',      desc: 'Agree on price and complete your transaction', ur: 'سودا طے کریں' },
];

const FEATURES = [
  { icon: Banknote,     title: 'Free to Use',    desc: 'No listing fees, no commission' },
  { icon: MessageCircle, title: 'Direct Contact', desc: 'Call or WhatsApp sellers instantly' },
  { icon: Search,       title: 'Urdu Search',    desc: 'Search in Urdu or English' },
  { icon: LocateFixed,  title: 'Location Based', desc: 'Find listings near your district' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#00401A] text-[#EF9B0F]">
      {/* Navbar */}
      <nav className="bg-[#002d12] px-6 py-4 flex items-center justify-between border-b border-[#EF9B0F]/20">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold tracking-tight text-[#EF9B0F]">Primal Agri</span>
          <span className="text-sm text-[#EF9B0F]/70 font-medium">پرائمل ایگری</span>
        </div>
        <a
          href="https://play.google.com/store/apps"
          className="bg-[#EF9B0F] text-[#00401A] px-4 py-2 rounded-full text-sm font-semibold hover:bg-yellow-300 transition"
        >
          Download App
        </a>
      </nav>

      {/* Hero */}
      <section className="px-6 py-24 text-center">
        <p className="text-[#EF9B0F]/70 text-lg mb-3 font-medium">پاکستان کی زرعی منڈی</p>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-[#EF9B0F]">
          Pakistan&apos;s Agricultural<br />Marketplace
        </h1>
        <p className="text-[#EF9B0F]/70 text-lg max-w-xl mx-auto mb-10">
          Buy and sell livestock, machinery, land, crops and more — directly between farmers and dealers.
        </p>
        <a
          href="https://play.google.com/store/apps"
          className="bg-[#EF9B0F] text-[#00401A] px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition shadow-lg inline-block"
        >
          Download on Google Play
        </a>
        <p className="text-[#EF9B0F]/50 text-sm mt-6">Free · No commission · Direct contact</p>
      </section>

      {/* Categories */}
      <section className="py-16 px-6 bg-[#002d12]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#EF9B0F] mb-2">18 Categories</h2>
          <p className="text-center text-[#EF9B0F]/60 mb-10">Everything in agriculture, all in one place</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                className="bg-[#00401A] border border-[#EF9B0F]/20 rounded-2xl p-4 text-center hover:border-[#EF9B0F]/60 transition"
              >
                <div className="flex justify-center mb-2">
                  <cat.icon size={28} className="text-[#EF9B0F]" />
                </div>
                <div className="text-xs font-semibold text-[#EF9B0F]">{cat.name}</div>
                <div className="text-xs text-[#EF9B0F]/50 mt-1">{cat.ur}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#EF9B0F] mb-2">How It Works</h2>
          <p className="text-center text-[#EF9B0F]/60 mb-12">Simple, fast, and free</p>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#EF9B0F] text-[#00401A] flex items-center justify-center mx-auto mb-4">
                  <s.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#EF9B0F] mb-2">{s.title}</h3>
                <p className="text-[#EF9B0F]/60 text-sm mb-1">{s.desc}</p>
                <p className="text-[#EF9B0F]/80 text-sm font-medium">{s.ur}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-[#002d12]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#EF9B0F] mb-10">Why Primal Agri?</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-[#00401A] border border-[#EF9B0F]/20 rounded-2xl p-6 text-center">
                <div className="flex justify-center mb-3">
                  <f.icon size={36} className="text-[#EF9B0F]" />
                </div>
                <div className="font-bold text-lg mb-1 text-[#EF9B0F]">{f.title}</div>
                <div className="text-[#EF9B0F]/60 text-sm">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-[#EF9B0F] mb-4">Ready to start?</h2>
        <p className="text-[#EF9B0F]/60 mb-8">Join thousands of farmers and dealers on Pakistan&apos;s agri marketplace</p>
        <a
          href="https://play.google.com/store/apps"
          className="bg-[#EF9B0F] text-[#00401A] px-10 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition shadow-lg inline-block"
        >
          Download Free App
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-[#002d12] border-t border-[#EF9B0F]/20 px-6 py-8 text-center text-sm text-[#EF9B0F]/60">
        <p className="text-[#EF9B0F] font-semibold text-lg mb-2">Primal Agri</p>
        <p className="mb-4">Pakistan&apos;s Agricultural Marketplace</p>
        <div className="flex justify-center gap-6 mb-4">
          <Link href="/privacy" className="hover:text-[#EF9B0F] transition">Privacy Policy</Link>
          <a href="mailto:info@primalagri.com" className="hover:text-[#EF9B0F] transition">Contact</a>
        </div>
        <p>© {new Date().getFullYear()} Primal Agri. All rights reserved.</p>
      </footer>
    </main>
  );
}
