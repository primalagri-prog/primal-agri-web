import Link from 'next/link';
import NavBar from '@/components/NavBar';
import HeroAnimation from '@/components/HeroAnimation';
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
  { step: '1', icon: Search,    title: 'Browse',         desc: 'Explore thousands of listings across 18 categories', ur: 'تلاش کریں' },
  { step: '2', icon: Phone,     title: 'Contact Seller', desc: 'Call or WhatsApp the seller directly — no middleman', ur: 'بیچنے والے سے بات کریں' },
  { step: '3', icon: Handshake, title: 'Deal Done',      desc: 'Agree on price and complete your transaction', ur: 'سودا طے کریں' },
];

const FEATURES = [
  { icon: Banknote,      title: 'Free to Use',    desc: 'No listing fees, no commission' },
  { icon: MessageCircle, title: 'Direct Contact', desc: 'Call or WhatsApp sellers instantly' },
  { icon: Search,        title: 'Urdu Search',    desc: 'Search in Urdu or English' },
  { icon: LocateFixed,   title: 'Location Based', desc: 'Find listings near your district' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">

      <NavBar />

      {/* Hero — Forest radial gradient, split 50/50 */}
      <section
        id="hero"
        className="min-h-screen flex items-center px-6 pt-20"
        style={{ background: 'radial-gradient(ellipse at center, #005c25 0%, #00401A 60%, #002610 100%)' }}
      >
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 py-16">

          {/* Left — text */}
          <div className="flex-1 text-left">
            <p className="text-white/50 text-lg mb-3 font-medium urdu">پاکستان کی زرعی منڈی</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-white">
              Pakistan&apos;s Agriculture,<br />Digitally Empowered.
            </h1>
            <p className="text-white/60 text-lg max-w-md mb-10">
              The premier marketplace for verified livestock, high-quality seeds, and agricultural produce. Built by farmers, for farmers.
            </p>
            <a
              href="https://play.google.com/store/apps"
              className="bg-[#111111] text-white px-8 rounded-full font-bold text-lg hover:bg-black transition shadow-lg inline-flex items-center min-h-[48px]"
            >
              Download on Google Play
            </a>
            <p className="text-white/30 text-sm mt-6">Free · No commission · Direct contact</p>
          </div>

          {/* Right — animation */}
          <div className="flex-1 w-full">
            <HeroAnimation />
          </div>

        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 px-6 bg-[#111111]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">About Us</h2>
          <p className="text-white/60 text-lg leading-relaxed">
            Primal Agri is a homegrown initiative bridging the gap between traditional farming and modern tech.
            Based in Pakistan, we empower sole proprietors to trade with transparency.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-16 px-6 bg-[#00401A]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-2">18 Categories</h2>
          <p className="text-center text-white/50 mb-10">Everything in agriculture, all in one place</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                className="bg-[#111111] border border-white/10 rounded-2xl p-4 text-center hover:border-white/30 transition"
              >
                <div className="flex justify-center mb-2">
                  <cat.icon size={28} className="text-white" />
                </div>
                <div className="text-xs font-semibold text-white">{cat.name}</div>
                <div className="text-xs text-white/40 mt-1 urdu">{cat.ur}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-6 bg-[#111111]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-2">How It Works</h2>
          <p className="text-center text-white/50 mb-12">Simple, fast, and free</p>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#00401A] text-white flex items-center justify-center mx-auto mb-4">
                  <s.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-white/50 text-sm mb-1">{s.desc}</p>
                <p className="text-white/40 text-sm font-medium urdu">{s.ur}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Primal Agri */}
      <section id="why-us" className="py-16 px-6 bg-[#00401A]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-10">Why Primal Agri?</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-[#111111] border border-white/10 rounded-2xl p-6 text-center">
                <div className="flex justify-center mb-3">
                  <f.icon size={36} className="text-white" />
                </div>
                <div className="font-bold text-lg mb-1 text-white">{f.title}</div>
                <div className="text-white/50 text-sm">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Start */}
      <section id="download" className="py-16 px-6 text-center bg-[#111111]">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to start?</h2>
        <p className="text-white/50 mb-8">
          Join thousands of farmers and dealers on Pakistan&apos;s agri marketplace
        </p>
        <a
          href="https://play.google.com/store/apps"
          className="bg-[#00401A] text-white px-10 rounded-full font-bold text-lg hover:bg-[#005c25] transition shadow-lg inline-flex items-center min-h-[48px]"
        >
          Download Free App
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-[#111111] border-t border-white/10 px-6 py-8 text-center text-sm text-white/40">
        <p className="text-white font-semibold text-lg mb-2">Primal Agri</p>
        <p className="mb-2">Pakistan&apos;s Agricultural Marketplace</p>
        <p className="mb-4 text-white/30 text-xs">
          Primal Agri is a registered sole proprietorship based in Pakistan.
        </p>
        <div className="flex justify-center gap-6 mb-4">
          <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
          <a href="mailto:info@primalagri.com" className="hover:text-white transition">Contact</a>
        </div>
        <p>© {new Date().getFullYear()} Primal Agri. All rights reserved.</p>
      </footer>

    </main>
  );
}
