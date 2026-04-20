import {
  Beef,
  Wheat,
  Tractor,
  Sprout,
  Milk,
  Egg,
  Fish,
  Apple,
  Leaf,
} from 'lucide-react';

// Each icon card floats independently with a staggered delay
const ICONS = [
  { icon: Tractor, delay: '0s',    duration: '3.2s', size: 22 },
  { icon: Wheat,   delay: '0.4s',  duration: '2.8s', size: 22 },
  { icon: Beef,    delay: '0.8s',  duration: '3.6s', size: 22 },
  { icon: Sprout,  delay: '1.2s',  duration: '3.0s', size: 22 },
  { icon: Leaf,    delay: '0s',    duration: '4.0s', size: 28 }, // centre — larger
  { icon: Milk,    delay: '1.6s',  duration: '2.6s', size: 22 },
  { icon: Egg,     delay: '0.6s',  duration: '3.4s', size: 22 },
  { icon: Fish,    delay: '1.0s',  duration: '2.9s', size: 22 },
  { icon: Apple,   delay: '1.4s',  duration: '3.8s', size: 22 },
];

export default function HeroAnimation() {
  return (
    <div className="relative flex items-center justify-center w-full h-72 md:h-full md:min-h-[420px]">

      {/* Faint concentric rings for depth */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 rounded-full border border-white/5" />
        <div className="absolute w-44 h-44 rounded-full border border-white/8" />
        <div className="absolute w-24 h-24 rounded-full border border-white/10" />
      </div>

      {/* 3×3 floating icon grid, rotated 15° for visual interest */}
      <div
        className="grid grid-cols-3 gap-4"
        style={{ transform: 'rotate(15deg)' }}
      >
        {ICONS.map(({ icon: Icon, delay, duration, size }, i) => {
          const isCentre = i === 4;
          return (
            <div
              key={i}
              className={`flex items-center justify-center rounded-2xl border ${
                isCentre
                  ? 'w-16 h-16 bg-[#00401A] border-white/20'
                  : 'w-12 h-12 bg-[#111111] border-white/10'
              }`}
              style={{
                animation: `heroFloat ${duration} ease-in-out infinite`,
                animationDelay: delay,
              }}
            >
              <Icon size={size} className="text-white" />
            </div>
          );
        })}
      </div>

    </div>
  );
}
