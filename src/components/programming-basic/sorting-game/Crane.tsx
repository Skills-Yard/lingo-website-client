'use client';
import React from 'react';

interface CraneProps {
  craneX: number;
  clawGrabbing: boolean;
  wireLength: number;
  clawTop: number;
}

/**
 * Gantry crane carriage: slides along the rail, extends a telescoping
 * piston, and opens/closes its claw arms to grab blocks.
 * Uses slow, silky cubic-bezier easing matching Cube.tsx.
 */
export function Crane({ craneX, clawGrabbing, wireLength, clawTop }: CraneProps) {
  return (
    <div
      className="absolute w-11 h-6.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border border-slate-950 rounded-xs shadow-lg z-40"
      style={{
        left: `${craneX}%`,
        top: '16px',
        transform: 'translate3d(-50%, -50%, 0px)',
        transition: 'left 1.1s cubic-bezier(0.45, 0, 0.55, 1), transform 0.35s ease-out',
         willChange: 'left',
      }}
    >
      {/* Wheel/Roller details on top of carriage */}
      <div className="absolute top-[-3px] left-1 w-2.5 h-1.5 bg-slate-950 rounded-t-xs border-t border-slate-800" />
      <div className="absolute top-[-3px] left-4 w-2.5 h-1.5 bg-slate-950 rounded-t-xs border-t border-slate-800" />
      <div className="absolute top-[-3px] right-4 w-2.5 h-1.5 bg-slate-950 rounded-t-xs border-t border-slate-800" />
      <div className="absolute top-[-3px] right-1 w-2.5 h-1.5 bg-slate-950 rounded-t-xs border-t border-slate-800" />

      {/* Glowing LED indicator light in front center */}
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-400 border border-amber-300 shadow-[0_0_8px_#f59e0b]" />

      {/* Telescoping Metal Piston Cylinder */}
      <div
        className="absolute left-1/2 w-2.5 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-800 border-l border-r border-slate-950 shadow-md"
        style={{
          top: '24px',
          height: `${wireLength}px`,
          transform: 'translateX(-50%)',
          transition: 'height 0.4s cubic-bezier(0.34, 1, 0.36, 1)',
        }}
      />

      {/* Claw Head Grabbing Mechanism */}
      <div
        className="absolute left-1/2 w-14 h-2.5 bg-gradient-to-b from-slate-700 to-slate-800 border border-slate-900 rounded-xs shadow-md"
        style={{
          top: `${clawTop}px`,
          transform: 'translateX(-50%)',
          transition: 'top 0.4s cubic-bezier(0.34, 1, 0.36, 1)',
        }}
      >
        {/* Glowing yellow LED strip under claw horizontal bar */}
        <div className="absolute bottom-0 inset-x-0.5 h-0.5 bg-amber-400 shadow-[0_1px_4px_#f59e0b] z-10" />

        {/* Sensor/Plunger protruding from center bottom */}
        <div className="absolute bottom-[-3px] left-1/2 -translate-x-1/2 w-1.5 h-1 bg-slate-400 rounded-b-xs border-l border-r border-slate-500 z-10" />

        {/* Left Clamping Joint and Arm */}
        <div className="absolute top-[2px] left-[2px] w-[6px] h-[6px] rounded-full bg-slate-950 border border-slate-600 z-20" />
        <div
          className="absolute top-[1px] left-[1.5px] w-1.5 h-7 bg-gradient-to-b from-slate-600 to-slate-800 border border-slate-700 rounded-sm origin-top z-10"
          style={{
            transform: clawGrabbing ? 'rotate(-22deg)' : 'rotate(-8deg)',
            transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        />

        {/* Right Clamping Joint and Arm */}
        <div className="absolute top-[2px] right-[2px] w-[6px] h-[6px] rounded-full bg-slate-950 border border-slate-600 z-20" />
        <div
          className="absolute top-[1px] right-[1.5px] w-1.5 h-7 bg-gradient-to-b from-slate-600 to-slate-800 border border-slate-700 rounded-sm origin-top z-10"
          style={{
            transform: clawGrabbing ? 'rotate(22deg)' : 'rotate(8deg)',
            transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        />
      </div>
    </div>
  );
}
