"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, Target, ShieldAlert, 
  Info, TrendingUp, TrendingDown, AlertCircle,
  CheckSquare, Square, Hash, ArrowDown, ArrowUp,
  Clock, Map, Layers
} from 'lucide-react';

interface AnalysisProps {
  data: {
    existeEntrada: boolean;
    direcao: 'compra' | 'venda' | 'aguardar';
    tipoCenario: 'rompimento' | 'reversão' | 'pullback' | 'nenhum';
    justificativa: string;
    entrada: string;
    stop: string;
    alvo: string;
    contexto: string;
    timeframe: string;
    regioesImportantes: string[];
    contextoHTF: {
      tf: string;
      analise: string;
    };
    checklist: {
      fechamentoCorpo: boolean;
      vacuoLivre: boolean;
      stopEstrutural: boolean;
      tendenciaConfirmada: boolean;
    };
  } | null;
}

const AnalysisResult = ({ data }: AnalysisProps) => {
  if (!data) return null;

  const getDirectionStyles = () => {
    switch (data.direcao) {
      case 'compra': return { label: 'COMPRA', color: 'text-emerald-400', bg: 'bg-emerald-500/20', icon: <TrendingUp size={24} /> };
      case 'venda': return { label: 'VENDA', color: 'text-red-400', bg: 'bg-red-500/20', icon: <TrendingDown size={24} /> };
      default: return { label: 'AGUARDAR', color: 'text-amber-400', bg: 'bg-amber-500/20', icon: <AlertCircle size={24} /> };
    }
  };

  const dir = getDirectionStyles();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header de Direção e Timeframe */}
      <div className={`p-6 rounded-3xl border border-white/10 ${dir.bg} backdrop-blur-md flex items-center justify-between shadow-2xl`}>
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-2xl bg-black/40 ${dir.color}`}>
            {dir.icon}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Clock size={12} className="text-slate-400" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">TF Detectado: {data.timeframe}</span>
            </div>
            <h2 className={`text-4xl font-black tracking-tighter ${dir.color}`}>{dir.label}</h2>
          </div>
        </div>
        <div className="text-right">
          <Badge variant="outline" className="border-amber-500/30 text-amber-500 uppercase font-black px-4 py-1 mb-1">
            {data.tipoCenario}
          </Badge>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Cenário Identificado</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Coluna Principal */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Análise de Tempos Maiores (HTF) */}
          <Card className="border-blue-500/20 bg-blue-500/5 backdrop-blur-md overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500/20 p-3 rounded-xl">
                  <Layers className="text-blue-400" size={20} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Visão de Tempo Maior ({data.contextoHTF.tf})</h3>
                  <p className="text-sm text-slate-200 font-medium leading-relaxed">
                    {data.contextoHTF.analise}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/5 bg-slate-900/40 backdrop-blur-md overflow-hidden">
            <CardContent className="p-8 space-y-8">
              <section>
                <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
                  <ShieldAlert size={14} /> Justificativa do Operacional
                </h3>
                <p className="text-base text-slate-200 leading-relaxed font-medium">
                  {data.justificativa}
                </p>
              </section>

              {/* Regiões Importantes */}
              <section className="pt-6 border-t border-white/5">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Map size={14} /> Regiões de Valor Identificadas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.regioesImportantes.map((regiao, i) => (
                    <div key={i} className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[11px] font-bold text-slate-300">
                      {regiao}
                    </div>
                  ))}
                </div>
              </section>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
                <section>
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Checklist de Validação</h3>
                  <div className="space-y-2">
                    {[
                      { label: "Fechamento de Corpo", status: data.checklist.fechamentoCorpo },
                      { label: "Vácuo Livre", status: data.checklist.vacuoLivre },
                      { label: "Stop Estrutural", status: data.checklist.stopEstrutural },
                      { label: "Tendência H1/M15", status: data.checklist.tendenciaConfirmada },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        {item.status ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Square size={14} className="text-slate-700" />}
                        <span className={`text-xs font-bold ${item.status ? 'text-slate-200' : 'text-slate-500'}`}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </section>
                <section className="bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/10">
                  <h3 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">Contexto Atual</h3>
                  <p className="text-sm font-bold text-white leading-tight">{data.contexto}</p>
                </section>
              </div>
            </CardContent>
          </Card>

          <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-center gap-3">
            <Info size={18} className="text-amber-500 shrink-0" />
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
              Nota: A análise de tempos maiores é baseada na estrutura visível. Sempre confirme o TF no canto superior esquerdo do seu MetaTrader.
            </p>
          </div>
        </div>

        {/* Coluna de Preços Vertical */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="flex-1 bg-black/60 rounded-[2rem] border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            
            <div className="space-y-1 group">
              <div className="flex items-center justify-between text-emerald-500">
                <span className="text-[10px] font-black uppercase tracking-widest">Take Profit</span>
                <ArrowUp size={14} />
              </div>
              <p className="text-3xl font-black text-white tracking-tighter group-hover:text-emerald-400 transition-colors">{data.alvo}</p>
              <div className="h-[1px] w-full bg-emerald-500/20" />
            </div>

            <div className="space-y-1 group py-8">
              <div className="flex items-center justify-between text-blue-400">
                <span className="text-[10px] font-black uppercase tracking-widest">Entrada</span>
                <Hash size={14} />
              </div>
              <p className="text-3xl font-black text-white tracking-tighter group-hover:text-blue-400 transition-colors">{data.entrada}</p>
              <div className="h-[1px] w-full bg-blue-500/20" />
            </div>

            <div className="space-y-1 group">
              <div className="flex items-center justify-between text-red-500">
                <span className="text-[10px] font-black uppercase tracking-widest">Stop Loss</span>
                <ArrowDown size={14} />
              </div>
              <p className="text-3xl font-black text-white tracking-tighter group-hover:text-red-400 transition-colors">{data.stop}</p>
              <div className="h-[1px] w-full bg-red-500/20" />
            </div>
          </div>
          
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/5 text-center">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Escala Lateral MT4/MT5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;