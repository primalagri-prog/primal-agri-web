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
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-[#00401A] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold tracking-tight">Primal Agri</span>
          <span className="text-sm text-green-300 font-medium">پرائمل ایگری</span>
        </div>
        <a
          href="https://play.google.com/store/apps"
          className="bg-white text-[#00401A] px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-50 transition"
        >
          Download App
        </a>
      </nav>

      {/* Hero */}
      <section className="bg-[#00401A] text-white px-6 py-24 text-center">
        <p className="text-green-300 text-lg mb-3 font-medium">پاکستان کی زرعی منڈی</p>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          Pakistan&apos;s Agricultural<br />Marketplace
        </h1>
        <p className="text-green-200 text-lg max-w-xl mx-auto mb-10">
          Buy and sell livestock, machinery, land, crops and more — directly between farmers and dealers.
        </p>
        <a
          href="https://play.google.com/store/apps"
          className="bg-white text-[#00401A] px-8 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition shadow-lg inline-block"
        >
          Download on Google Play
        </a>
        <p className="text-green-400 text-sm mt-6">Free · No commission · Direct contact</p>
      </section>

      {/* Categories */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">18 Categories</h2>
          <p className="text-center text-gray-500 mb-10">Everything in agriculture, all in one place</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                className="bg-white rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-center mb-2">
                  <cat.icon size={28} className="text-[#00401A]" />
                </div>
                <div className="text-xs font-semibold text-gray-700">{cat.name}</div>
                <div className="text-xs text-gray-400 mt-1">{cat.ur}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">How It Works</h2>
          <p className="text-center text-gray-500 mb-12">Simple, fast, and free</p>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#00401A] text-white flex items-center justify-center mx-auto mb-4">
                  <s.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm mb-1">{s.desc}</p>
                <p className="text-[#00401A] text-sm font-medium">{s.ur}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-[#00401A] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Why Primal Agri?</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white/10 rounded-2xl p-6 text-center">
                <div className="flex justify-center mb-3">
                  <f.icon size={36} className="text-green-300" />
                </div>
                <div className="font-bold text-lg mb-1">{f.title}</div>
                <div className="text-green-200 text-sm">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to start?</h2>
        <p className="text-gray-500 mb-8">Join thousands of farmers and dealers on Pakistan&apos;s agri marketplace</p>
        <a
          href="https://play.google.com/store/apps"
          className="bg-[#00401A] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-green-900 transition shadow-lg inline-block"
        >
          Download Free App
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 px-6 py-8 text-center text-sm">
        <p className="text-white font-semibold text-lg mb-2">Primal Agri</p>
        <p className="mb-4">Pakistan&apos;s Agricultural Marketplace</p>
        <div className="flex justify-center gap-6 mb-4">
          <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
          <a href="mailto:info@primalagri.com" className="hover:text-white transition">Contact</a>
        </div>
        <p>© {new Date().getFullYear()} Primal Agri. All rights reserved.</p>
      </footer>
    </main>
  );
}
