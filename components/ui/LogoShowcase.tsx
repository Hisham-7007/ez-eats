// components/Logo1.tsx
export const Logo1 = () => (
  <div className="relative text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
    LETSEATS
    <span className="absolute -top-2 -right-10 text-xl animate-bounce">🧁</span>
  </div>
);

// components/Logo2.tsx
export const Logo2 = () => (
  <div className="relative w-[80px] h-[80px] rounded-full border-4 border-[#ff6b6b] text-[#ff6b6b] flex items-center justify-center text-3xl font-bold bg-white shadow-[0_5px_15px_rgba(255,107,107,0.3)]">
    EATS
    <div className="absolute w-[30px] h-[30px] rounded-full bg-gradient-to-r from-[#ffd93d] to-[#ff6b6b] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1]" />
  </div>
);

// components/Logo3.tsx
export const Logo3 = () => (
  <div className="relative text-4xl font-bold bg-gradient-to-b from-[#ff9a9e] via-[#fecfef] to-[#fecfef] bg-clip-text text-transparent">
    EATS
    <span className="absolute -top-4 -left-12 text-xl animate-[sway_3s_ease-in-out_infinite]">
      🍦
    </span>
  </div>
);

// components/Logo4.tsx
export const Logo4 = () => (
  <div className="relative text-3xl font-bold text-[#8b4513] bg-gradient-to-r from-[#ffd93d] to-[#ff6b6b] p-5 rounded-2xl shadow-[0_8px_20px_rgba(139,69,19,0.3)]">
    EATS
    <span className="absolute -bottom-2 -right-2 text-sm animate-spin">🍰</span>
  </div>
);

// components/Logo5.tsx
export const Logo5 = () => (
  <div className="relative text-3xl font-bold text-[#ffffff] bg-gradient-to-b from-[#fa7b82] via-[#db8a2d] to-[#c7ba0b]  border-[3px] border-dashed border-[#ff6b6b] rounded-md p-2 px-8">
    LETSEATS
    <span className="absolute -top-5 -left-5 text-base animate-pulse">🍪</span>
    <span className="absolute -bottom-5 -right-5 text-sm animate-pulse delay-1000">
      🍪
    </span>
  </div>
);

// tailwind.config.js additions:
// Add this to the keyframes section in extend:
// sway: {
//   '0%, 100%': { transform: 'rotate(-5deg)' },
//   '50%': { transform: 'rotate(5deg)' },
// }
