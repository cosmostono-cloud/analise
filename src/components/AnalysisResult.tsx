"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Target, ShieldAlert, ArrowRightCircle, Info, ChevronRight } from 'lucide-react';

interface AnalysisProps {
  data: {
    existeEntrada: boolean;
    tipoCenario: 'rompimento' | 'reversão' | 'pullback' | 'nenhum';
    justificativa: string;
    entrada: string;
    stop: string;
    alvo: string;
    contexto: string;
  } | null;
}

const AnalysisResult = ({ data }: AnalysisProps) => {
  if (!data) return null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Card className="border-white/5 bg-slate-900/40 backdrop-blur-md shadow-2xl overflow-hidden">
        <CardHeader className={`${data.existeEntrada ? 'bg-emerald-500/10 border-b-emerald-500/20' : 'bg-red-500/10 border-b-red-500/20'} border-b p-8`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${data.existeEntrada ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
                {data.existeEntrada ? <CheckCircle2 size={32} /> : <XCircle size={32} />}
              </div>
              <div>
                <CardTitle className="text-2xl font-black text-white tracking-tight">
                  1) Existe entrada agora?
                </CardTitle>
                <p className={`text-xl font-black uppercase tracking-widest ${data.existeEntrada ? 'text-emerald-400' : 'text-red-400'}`}>
                  → {data.existeEntrada ? 'SIM, OPERAÇÃO VÁLIDA' : 'NÃO, AGUARDE FORA'}
                </p>
              </div>
            </div>
            <Badge variant="outline" className="px-6 py-2 text-sm uppercase font-black tracking-[0.2em] border-white/10 bg-white/5 text-amber-500">
              {data.tipoCenario}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
            <div className="p-8 space-y-8">
              <section className="space-y-3">
                <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] flex items-center gap-2">
                  <Info size={14} /> 2) Tipo de Cenário
                </h3>
                <p className="text-lg text-slate-200 font-bold capitalize flex items-center gap-2">
                  <ChevronRight size={18} className="text-amber-500" /> {data.tipoCenario}
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] flex items-center gap-2">
                  <ShieldAlert size={14} /> 3) Justificativa Técnica
                </h3>
                <p className="text-slate-300 leading-relaxed font-medium bg-white/5 p-4 rounded-xl border border-white/5">
                  {data.justificativa}
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] flex items-center gap-2">
                  <ArrowRightCircle size={14} /> 7) Leitura Geral
                </h3>
                <p className="text-slate-200 font-bold text-lg">→ {data.contexto}</p>
              </section>
            </div>

            <div className={`p-8 space-y-6 ${data.existeEntrada ? 'bg-emerald-500/5' : 'bg-red-500/5'}`}>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-black/40 p-6 rounded-2xl border border-white/5 shadow-inner group hover:border-blue-500/30 transition-colors">
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">4) Entrada Ideal</h3>
                  <p className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">{data.entrada}</p>
                </div>

                <div className="bg-black/40 p-6 rounded-2xl border border-white/5 shadow-inner group hover:border-red-500/30 transition-colors">
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">5) Stop Estrutural</h3>
                  <p className="text-2xl font-black text-white group-hover:text-red-400 transition-colors">{data.stop}</p>
                </div>

                <div className="bg-black/40 p-6 rounded-2xl border border-white/5 shadow-inner group hover:border-emerald-500/30 transition-colors">
                  <h3 className="text-[10px] font-black text-emerald-500/70 uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                    <Target size={14} /> 6) Alvo Provável
                  </h3>
                  <p className="text-2xl font-black text-white group-hover:text-emerald-400 transition-colors">{data.alvo}</p>
                </div>
              </div>
              
              <div className="pt-4">
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest text-center">
                    Lembre-se: O alvo é baseado no vácuo livre.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {!data.existeEntrada && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-2xl text-center font-black tracking-[0.3em] uppercase text-sm shadow-lg">
          NÃO HÁ TRADE VÁLIDO NO MOMENTO. PRESERVE SEU CAPITAL.
        </div>
      )}
    </div>
  );
};

export default AnalysisResult;