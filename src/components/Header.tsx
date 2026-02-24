"use client";

import React from 'react';
import { TrendingUp, ShieldCheck } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <TrendingUp className="text-white" size={20} />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-slate-900">SIHLE <span className="text-blue-600">PRO</span></h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Análise Estrutural</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full border border-slate-200">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span className="text-xs font-medium text-slate-600">Operacional Validado</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;