import Link from 'next/link';
import NavBar from '@/components/NavBar';
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

      {/* Hero — Dark Forest radial gradient, pt-20 offsets the fixed nav
          TODO: Second gradient stop colour and direction not specified.
          Using dark forest centre fading to near-black edge as a reasonable default. */}
      <section
        id="hero"
        className="px-6 pt-36 pb-24 text-center"
        style={{ background: 'radial-gradient(ellipse at center, #004d20 0%, #001a0c 100%)' }}
      >
        <p className="text-[#E3D5CA]/70 text-lg mb-3 font-medium urdu">پاکستان کی زرعی منڈی</p>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-[#E3D5CA]">
          Pakistan&apos;s Agriculture,<br />Digitally Empowered.
        </h1>
        <p className="text-[#E3D5CA]/70 text-lg max-w-xl mx-auto mb-10">
          The premier marketplace for verified livestock, high-quality seeds, and agricultural produce. Built by farmers, for farmers.
        </p>
        <a
          href="https://play.google.com/store/apps"
          className="bg-[#8B4513] text-[#E3D5CA] px-8 rounded-full font-bold text-lg hover:bg-[#a0522d] transition shadow-lg inline-flex items-center min-h-[48px]"
        >
          Download on Google Play
        </a>
        <p className="text-[#E3D5CA]/50 text-sm mt-6">Free · No commission · Direct contact</p>
      </section>

      {/* About Section
          TODO: No background or layout specified in Refactor.md.
          Using Forest background to flow naturally from the hero. */}
      <section id="about" className="py-16 px-6 bg-[#00401A]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#E3D5CA] mb-6">About Us</h2>
          <p className="text-[#E3D5CA]/80 text-lg leading-relaxed">
            Primal Agri is a homegrown initiative bridging the gap between traditional farming and modern tech.
            Based in Pakistan, we empower sole proprietors to trade with transparency.
          </p>
        </div>
      </section>

      {/* Categories — Leather icons (spec: "Leather: Category icons") */}
      <section id="categories" className="py-16 px-6 bg-[#002d12]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#E3D5CA] mb-2">18 Categories</h2>
          <p className="text-center text-[#E3D5CA]/60 mb-10">Everything in agriculture, all in one place</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                className="bg-[#00401A] border border-[#E3D5CA]/20 rounded-2xl p-4 text-center hover:border-[#E3D5CA]/60 transition"
              >
                <div className="flex justify-center mb-2">
                  <cat.icon size={28} className="text-[#8B4513]" />
                </div>
                <div className="text-xs font-semibold text-[#E3D5CA]">{cat.name}</div>
                <div className="text-xs text-[#E3D5CA]/50 mt-1 urdu">{cat.ur}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works — Sand background, Leather "stamped" step icons */}
      <section id="how-it-works" className="py-16 px-6 bg-[#E3D5CA]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#00401A] mb-2">How It Works</h2>
          <p className="text-center text-[#00401A]/60 mb-12">Simple, fast, and free</p>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#8B4513] text-[#E3D5CA] flex items-center justify-center mx-auto mb-4">
                  <s.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#00401A] mb-2">{s.title}</h3>
                <p className="text-[#00401A]/60 text-sm mb-1">{s.desc}</p>
                <p className="text-[#00401A]/80 text-sm font-medium urdu">{s.ur}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Primal Agri — White background, Forest headings, Sand border cards */}
      <section id="why-us" className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#00401A] mb-10">Why Primal Agri?</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white border border-[#E3D5CA] rounded-2xl p-6 text-center shadow-sm">
                <div className="flex justify-center mb-3">
                  <f.icon size={36} className="text-[#00401A]" />
                </div>
                <div className="font-bold text-lg mb-1 text-[#00401A]">{f.title}</div>
                <div className="text-gray-600 text-sm">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Start — Navy background, Sand text */}
      <section id="download" className="py-16 px-6 text-center bg-[#001D3D]">
        <h2 className="text-3xl font-bold text-[#E3D5CA] mb-4">Ready to start?</h2>
        <p className="text-[#E3D5CA]/70 mb-8">
          Join thousands of farmers and dealers on Pakistan&apos;s agri marketplace
        </p>
        <a
          href="https://play.google.com/store/apps"
          className="bg-[#8B4513] text-[#E3D5CA] px-10 rounded-full font-bold text-lg hover:bg-[#a0522d] transition shadow-lg inline-flex items-center min-h-[48px]"
        >
          Download Free App
        </a>
      </section>

      {/* Footer — Navy background, sole proprietorship notice */}
      <footer className="bg-[#001D3D] border-t border-[#E3D5CA]/20 px-6 py-8 text-center text-sm text-[#E3D5CA]/60">
        <p className="text-[#E3D5CA] font-semibold text-lg mb-2">Primal Agri</p>
        <p className="mb-2">Pakistan&apos;s Agricultural Marketplace</p>
        <p className="mb-4 text-[#E3D5CA]/50 text-xs">
          Primal Agri is a registered sole proprietorship based in Pakistan.
        </p>
        <div className="flex justify-center gap-6 mb-4">
          <Link href="/privacy" className="hover:text-[#E3D5CA] transition">Privacy Policy</Link>
          <a href="mailto:info@primalagri.com" className="hover:text-[#E3D5CA] transition">Contact</a>
        </div>
        <p>© {new Date().getFullYear()} Primal Agri. All rights reserved.</p>
      </footer>

    </main>
  );
}
