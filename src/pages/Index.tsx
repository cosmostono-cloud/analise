"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import AnalysisResult from '@/components/AnalysisResult';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImagePlus, LayoutDashboard, History, Settings, MessageSquare } from 'lucide-react';
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Simulação de análise para demonstrar o formato
  const handleSimulateAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysis(null);
    
    setTimeout(() => {
      setAnalysis({
        existeEntrada: true,
        tipoCenario: 'rompimento',
        justificativa: 'Preço rompeu resistência relevante com candle de força e fechamento fora da zona. Existe vácuo livre até o próximo topo do H1. O stop estrutural está posicionado abaixo do fundo anterior, mantendo uma relação risco/retorno favorável.',
        entrada: '1.08450',
        stop: '1.08210',
        alvo: '1.08920 (80% do vácuo)',
        contexto: 'Tendência de alta confirmada após rompimento de range lateral.'
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar de Navegação */}
          <div className="lg:col-span-3 space-y-4">
            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start gap-3 text-blue-600 bg-blue-50">
                <LayoutDashboard size={18} /> Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 text-slate-600">
                <History size={18} /> Histórico
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 text-slate-600">
                <MessageSquare size={18} /> Suporte Técnico
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 text-slate-600">
                <Settings size={18} /> Configurações
              </Button>
            </nav>

            <Card className="bg-slate-900 text-white border-none">
              <CardContent className="p-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Status do Mercado</h4>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-medium">Sistemas Operacionais</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Área Principal */}
          <div className="lg:col-span-9 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Nova Análise</h2>
                <p className="text-slate-500">Envie o print do gráfico para processamento estrutural.</p>
              </div>
              <Button 
                onClick={handleSimulateAnalysis}
                disabled={isAnalyzing}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl shadow-lg shadow-blue-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {isAnalyzing ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analisando Estrutura...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <ImagePlus size={20} /> Carregar Gráfico
                  </span>
                )}
              </Button>
            </div>

            {analysis ? (
              <AnalysisResult data={analysis} />
            ) : (
              <div className="border-2 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center text-center bg-white/50">
                <div className="bg-slate-100 p-6 rounded-full mb-4">
                  <ImagePlus size={48} className="text-slate-300" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Aguardando Gráfico</h3>
                <p className="text-slate-500 max-w-xs mx-auto">
                  Clique no botão acima para enviar uma imagem e receber a análise técnica baseada no operacional Sihle.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="py-8 border-t bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© 2024 Sihle Pro Analysis. Todos os direitos reservados.</p>
          <MadeWithDyad />
        </div>
      </footer>
    </div>
  );
};

export default Index;