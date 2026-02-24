"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, XCircle, Target, ShieldAlert, 
  ArrowRightCircle, Info, ChevronRight, 
  TrendingUp, TrendingDown, AlertCircle,
  CheckSquare, Square, Hash
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
      {/* Card de Direção Principal */}
      <div className={`p-6 rounded-3xl border border-white/10 ${dir.bg} backdrop-blur-md flex items-center justify-between shadow-2xl`}>
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-2xl bg-black/40 ${dir.color}`}>
            {dir.icon}
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Direção da Operação</p>
            <h2 className={`text-4xl font-black tracking-tighter ${dir.color}`}>{dir.label}</h2>
          </div>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Confirmação</p>
          <p className="text-2xl font-black text-white">ESTRUTURAL</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna de Dados Técnicos */}
        <Card className="lg:col-span-2 border-white/5 bg-slate-900/40 backdrop-blur-md overflow-hidden">
          <CardHeader className="border-b border-white/5 p-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
                <Hash size={18} className="text-amber-500" /> Níveis de Preço (MT4/MT5)
              </CardTitle>
              <Badge variant="outline" className="border-amber-500/30 text-amber-500 uppercase font-black px-4">
                {data.tipoCenario}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <section>
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Análise da Estrutura</h3>
                  <p className="text-sm text-slate-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                    {data.justificativa}
                  </p>
                </section>
                <section className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                  <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Contexto</h3>
                  <p className="text-sm font-bold text-white">{data.contexto}</p>
                </section>
              </div>

              <div className="space-y-3">
                <div className="bg-black/60 p-5 rounded-2xl border border-white/10 shadow-xl group hover:border-blue-500/50 transition-all">
                  <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Preço de Entrada</h3>
                  <p className="text-3xl font-black text-white tracking-tighter">{data.entrada}</p>
                </div>
                <div className="bg-black/60 p-5 rounded-2xl border border-red-500/20 shadow-xl group hover:border-red-500/50 transition-all">
                  <h3 className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">Stop Loss (Saída de Risco)</h3>
                  <p className="text-3xl font-black text-white tracking-tighter">{data.stop}</p>
                </div>
                <div className="bg-black/60 p-5 rounded-2xl border border-emerald-500/20 shadow-xl group hover:border-emerald-500/50 transition-all">
                  <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Take Profit (Saída de Lucro)</h3>
                  <p className="text-3xl font-black text-white tracking-tighter">{data.alvo}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Coluna de Checklist Sihle */}
        <Card className="border-white/5 bg-black/40 backdrop-blur-md">
          <CardHeader className="border-b border-white/5 p-6">
            <CardTitle className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
              <CheckSquare size={18} className="text-emerald-500" /> Checklist Sihle
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {[
              { label: "Fechamento de Corpo", status: data.checklist.fechamentoCorpo },
              { label: "Vácuo Livre Confirmado", status: data.checklist.vacuoLivre },
              { label: "Stop em Fundo/Topo", status: data.checklist.stopEstrutural },
              { label: "Tendência Alinhada", status: data.checklist.tendenciaConfirmada },
            ].map((item, i) => (
              <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${item.status ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-white/5 bg-white/5'}`}>
                <span className={`text-xs font-bold ${item.status ? 'text-emerald-400' : 'text-slate-500'}`}>{item.label}</span>
                {item.status ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Square size={16} className="text-slate-700" />}
              </div>
            ))}
            
            <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest text-center leading-tight">
                "O preço não mente. Se a escala lateral estiver visível, a precisão é máxima."
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalysisResult;