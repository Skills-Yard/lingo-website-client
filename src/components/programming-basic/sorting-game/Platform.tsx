'use client';
import React from 'react';

/** 3D platform base that the blocks rest on. */
export function Platform() {
  return (
    <div
      className="platform-3d absolute left-[4%] right-[4%] h-4 z-10 pointer-events-none"
      style={{ bottom: '30px' }}
    >
      <div className="absolute inset-x-0 h-10 bg-emerald-500/10 rounded-lg blur-[8px] -bottom-3 translate-z-[-20px]" />

      {/* Top Face */}
      <div className="platform-face-top absolute inset-0 border border-slate-500 rounded-sm shadow-inner" />

      {/* Front Face */}
      <div className="platform-face-front absolute inset-x-0 border-t border-slate-500" />

      {/* Left Face */}
      <div className="platform-face-left absolute h-[16px] border border-slate-600" />

      {/* Right Face */}
      <div className="platform-face-right absolute h-[16px] border border-slate-600" />
    </div>
  );
}
