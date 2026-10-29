import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', showSubtitle = true }) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Turkish Flag Crescent & Star Emblem with Authentic Red & White */}
      <div
        className={`relative flex items-center justify-center shrink-0 rounded-full bg-[#E30A17] shadow-md border border-white/20 overflow-hidden ${
          isSm ? 'w-8 h-8' : isLg ? 'w-12 h-12' : 'w-10 h-10'
        }`}
      >
        {/* Subtle inner ring border */}
        <div className="absolute inset-[1px] rounded-full border border-white/10 pointer-events-none" />

        {/* Turkish Crescent and Star (Hilal ve Yıldız) in Pure White (#FFFFFF) matching Turkish Flag */}
        <svg
          viewBox="0 0 100 100"
          className={isSm ? 'w-5 h-5' : isLg ? 'w-8 h-8' : 'w-6 h-6'}
          aria-hidden="true"
        >
          {/* Crescent Moon (Hilal) */}
          <path
            d="M 61.7 35 A 28 28 0 1 0 61.7 65 A 22.4 22.4 0 1 1 61.7 35 Z"
            fill="#FFFFFF"
          />

          {/* Five-pointed Star (Yıldız) with one tip pointing directly to the crescent center */}
          <polygon
            points="60,50 68.3,47.3 68.3,38.6 73.4,45.6 81.7,43 76.6,50 81.7,57 73.4,54.4 68.3,61.4 68.3,52.7"
            fill="#FFFFFF"
          />
        </svg>
      </div>

      {/* Brand Name: AHD in Shiny Metallic Gold + Turkish & Arabic Subtitle */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-baseline gap-1.5">
          <span
            className={`font-extrabold tracking-wider text-gold-metallic drop-shadow-sm font-serif ${
              isSm ? 'text-lg' : isLg ? 'text-2xl' : 'text-xl'
            }`}
            style={{
              fontFamily: "'Cinzel', serif",
              textShadow: '0 1px 3px rgba(0,0,0,0.4)',
            }}
          >
            AHD
          </span>
          <span
            className={`font-semibold tracking-tight text-white dark:text-white ${
              isSm ? 'text-xs' : isLg ? 'text-base' : 'text-sm'
            }`}
          >
            İktisadi Sözlük
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[10px] text-amber-300/80 dark:text-amber-400/80 font-medium tracking-tight font-arabic">
            معجم المصطلحات الاقتصادية (TR ⇄ AR)
          </span>
        )}
      </div>
    </div>
  );
};
