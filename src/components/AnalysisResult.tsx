"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Target, ShieldAlert, ArrowRightCircle, Info } from 'lucide-react';

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
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="border-2 border-slate-200 shadow-xl overflow-hidden">
        <CardHeader className={`${data.existeEntrada ? 'bg-emerald-50 border-b-emerald-100' : 'bg-slate-50 border-b-slate-100'} border-b p-6`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {data.existeEntrada ? (
                <CheckCircle2 className="text-emerald-600" size={28} />
              ) : (
                <XCircle className="text-slate-400" size={28} />
              )}
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">
                  1) Existe entrada agora?
                </CardTitle>
                <p className={`text-lg font-black uppercase ${data.existeEntrada ? 'text-emerald-600' : 'text-slate-500'}`}>
                  → {data.existeEntrada ? 'SIM' : 'NÃO'}
                </p>
              </div>
            </div>
            <Badge variant={data.existeEntrada ? "default" : "secondary"} className="px-4 py-1 text-sm uppercase tracking-wider">
              {data.tipoCenario}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="p-6 space-y-6">
              <section>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Info size={14} /> 2) Tipo de Cenário
                </h3>
                <p className="text-slate-700 font-medium capitalize">→ {data.tipoCenario}</p>
              </section>

              <section>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <ShieldAlert size={14} /> 3) Justificativa Técnica
                </h3>
                <p className="text-slate-700 leading-relaxed">→ {data.justificativa}</p>
              </section>

              <section>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <ArrowRightCircle size={14} /> 7) Leitura Geral
                </h3>
                <p className="text-slate-700 font-medium">→ {data.contexto}</p>
              </section>
            </div>

            <div className={`p-6 space-y-6 ${data.existeEntrada ? 'bg-emerald-50/30' : 'bg-slate-50/30'}`}>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">4) Entrada Ideal</h3>
                  <p className="text-lg font-bold text-slate-900">{data.entrada}</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm">
                  <h3 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-1">5) Stop Estrutural</h3>
                  <p className="text-lg font-bold text-slate-900">{data.stop}</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                  <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                    <Target size={14} /> 6) Alvo Provável
                  </h3>
                  <p className="text-lg font-bold text-slate-900">{data.alvo}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {!data.existeEntrada && (
        <div className="bg-slate-900 text-white p-4 rounded-lg text-center font-bold tracking-widest uppercase text-sm">
          NÃO HÁ TRADE VÁLIDO NO MOMENTO.
        </div>
      )}
    </div>
  );
};

export default AnalysisResult;