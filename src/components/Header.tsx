"use client";

import React from 'react';
import { TrendingUp, ShieldCheck, Crown } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2 rounded-xl shadow-lg shadow-amber-900/20">
            <TrendingUp className="text-black" size={22} />
          </div>
          <div>
            <h1 className="font-black text-xl tracking-tighter text-white flex items-center gap-2">
              SIHLE <span className="text-amber-500">ELITE</span>
              <Crown size={16} className="text-amber-500" />
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">Structural Intelligence</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Mindset</span>
              <span className="text-xs text-amber-200/70 italic">"Pavio não é fechamento"</span>
            </div>
            <div className="h-8 w-[1px] bg-white/10" />
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Operacional Ativo</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;