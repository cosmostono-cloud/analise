"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, Target, ShieldAlert, 
  TrendingUp, TrendingDown, AlertCircle,
  ArrowDown, ArrowUp, Clock, Map, Layers,
  Zap, ShieldCheck, BarChart3, Info
} from 'lucide-react';

interface AnalysisProps {
  data: {
    existeEntrada: boolean;
    direcao: 'compra' | 'venda' | 'aguardar';
    tipoCenario: string;
    justificativa: string;
    logicaEstrutural: string;
    planoGerenciamento: string;
    entrada: string;
    stop: string;
    alvo: string;
    contexto: string;
    timeframe: string;
    regioesImportantes: string[];
    vacuoLivrePorcentagem: number;
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
      {/* Header de Status Elite */}
      <div className={`p-8 rounded-[2.5rem] border border-white/10 ${dir.bg} backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden`}>
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Zap size={120} className={dir.color} />
        </div>
        
        <div className="flex items-center gap-6 z-10">
          <div className={`p-5 rounded-2xl bg-black/60 border border-white/10 ${dir.color} shadow-inner`}>
            {dir.icon}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Clock size={14} className="text-slate-400" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Timeframe: {data.timeframe}</span>
            </div>
            <h2 className={`text-5xl font-black tracking-tighter ${dir.color}`}>{dir.label}</h2>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2 z-10">
          <Badge className="bg-white text-black hover:bg-white font-black px-6 py-2 rounded-full text-xs uppercase tracking-widest">
            {data.tipoCenario}
          </Badge>
          <div className="flex items-center gap-2">
            <div className="h-2 w-24 bg-white/10 rounded-full overflow-hidden">
              <div 
                className={`h-full ${data.direcao === 'aguardar' ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                style={{ width: `${data.existeEntrada ? 100 : 30}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Confirmação</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Coluna de Detalhes Técnicos */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Lógica de Vácuo Livre */}
          <Card className="border-white/5 bg-slate-900/60 backdrop-blur-md overflow-hidden rounded-[2rem]">
            <CardContent className="p-8 space-y-8">
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[11px] font-black text-amber-500 uppercase tracking-[0.3em] flex items-center gap-2">
                    <Zap size={16} /> Por que entrar (ou não)?
                  </h3>
                  {data.existeEntrada && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                      <span className="text-[10px] font-bold text-emerald-500 uppercase">Vácuo: {data.vacuoLivrePorcentagem}%</span>
                    </div>
                  )}
                </div>
                <p className="text-lg text-slate-100 leading-relaxed font-semibold italic">
                  "{data.justificativa}"
                </p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                <section className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <BarChart3 size={14} /> Lógica Estrutural
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {data.logicaEstrutural}
                  </p>
                </section>
                <section className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck size={14} /> Plano de Gestão
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {data.planoGerenciamento}
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>

          {/* Contexto Macro */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-blue-500/20 bg-blue-500/5 backdrop-blur-md rounded-3xl">
              <CardContent className="p-6 flex items-start gap-4">
                <Layers className="text-blue-400 shrink-0" size={20} />
                <div>
                  <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Visão Macro ({data.contextoHTF.tf})</h4>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">{data.contextoHTF.analise}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-white/5 bg-white/5 backdrop-blur-md rounded-3xl">
              <CardContent className="p-6">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Map size={14} /> Regiões de Valor
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.regioesImportantes.map((reg, i) => (
                    <span key={i} className="text-[10px] font-bold px-2 py-1 bg-black/40 rounded-md border border-white/5 text-slate-400">
                      {reg}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Coluna de Execução */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-black/80 rounded-[2.5rem] border border-white/10 p-8 flex flex-col gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-emerald-500">
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Take Profit</span>
                <ArrowUp size={16} />
              </div>
              <div className="text-4xl font-black text-white tracking-tighter tabular-nums">{data.alvo}</div>
              <p className="text-[9px] text-slate-500 font-bold uppercase">Alvo em 80% do vácuo</p>
            </div>

            <div className="space-y-2 py-4 border-y border-white/5">
              <div className="flex items-center justify-between text-blue-400">
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Entrada</span>
                <Target size={16} />
              </div>
              <div className="text-4xl font-black text-white tracking-tighter tabular-nums">{data.entrada}</div>
              <p className="text-[9px] text-slate-500 font-bold uppercase">Aguardar fechamento de corpo</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-red-500">
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Stop Loss</span>
                <ArrowDown size={16} />
              </div>
              <div className="text-4xl font-black text-white tracking-tighter tabular-nums">{data.stop}</div>
              <p className="text-[9px] text-slate-500 font-bold uppercase">Abaixo da estrutura anterior</p>
            </div>
          </div>

          {/* Checklist de Validação */}
          <Card className="bg-slate-900/40 border-white/5 rounded-[2rem]">
            <CardContent className="p-6 space-y-4">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Checklist de Validação</h4>
              <div className="space-y-3">
                {[
                  { label: "Corpo Fechado", status: data.checklist.fechamentoCorpo },
                  { label: "Vácuo Livre > 50%", status: data.checklist.vacuoLivre },
                  { label: "Stop Estrutural", status: data.checklist.stopEstrutural },
                  { label: "Tendência H1/M15", status: data.checklist.tendenciaConfirmada },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-black/20 border border-white/5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{item.label}</span>
                    {item.status ? <CheckCircle2 size={14} className="text-emerald-500" /> : <AlertCircle size={14} className="text-red-500" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-center gap-3">
        <Info size={18} className="text-amber-500 shrink-0" />
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider leading-relaxed">
          Lembre-se: O mercado é soberano. Se o preço retornar para dentro da zona de briga após a entrada, o cenário de vácuo livre é invalidado. Proteja seu capital.
        </p>
      </div>
    </div>
  );
};

export default AnalysisResult;