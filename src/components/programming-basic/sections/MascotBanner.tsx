import React from 'react';
import { LevelConfig } from '../../../utils/types';

interface MascotBannerProps {
  level: LevelConfig;
  collectedStar: boolean;
  success: boolean | null;
}

export function MascotBanner({ level, collectedStar, success }: MascotBannerProps) {
  return (
    <div className="w-full bg-white border border-slate-100 shadow-md rounded-2xl p-3 flex gap-3 items-center mb-2 select-none">
      <div className="w-11 h-11 bg-linear-to-tr from-amber-400 to-yellow-300 rounded-xl flex items-center justify-center shadow-md shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/lumis-wayfing.png"
          alt="Lumi"
          className="w-8 h-8 object-contain"
          style={{ filter: 'url(#chroma-white)' }}
        />
      </div>
      <div className="grow">
        <h2 className="text-xs font-extrabold text-slate-800 mb-0.5">{level.subtitle}</h2>
        <p className="text-[10px] text-slate-500 leading-snug">{level.instructions}</p>
      </div>
      <div className="flex flex-col items-center p-2 bg-slate-50 border border-slate-100 rounded-xl shrink-0 min-w-15">
        {level.starPos ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/star.png" alt="Star" className="w-5 h-5 object-contain animate-bounce" />
            <span className="text-[9px] font-black text-slate-500 mt-1">{collectedStar ? '1/1' : '0/1'}</span>
          </>
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/red-flag.webp" alt="Flag" className="w-5 h-5 object-contain" />
            <span className="text-[9px] font-black text-slate-500 mt-1">{success === true ? '1/1' : '0/1'}</span>
          </>
        )}
      </div>
    </div>
  );
}
