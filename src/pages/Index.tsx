"use client";

import React, { useState, useRef } from 'react';
import Header from '@/components/Header';
import AnalysisResult from '@/components/AnalysisResult';
import OperationalRules from '@/components/OperationalRules';
import { Button } from "@/components/ui/button";
import { ImagePlus, LayoutDashboard, History, MessageSquare, X, Sparkles } from 'lucide-react';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { showSuccess, showError } from '@/utils/toast';

const Index = () => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showError("Por favor, selecione apenas arquivos de imagem.");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyze = () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    setTimeout(() => {
      setAnalysis({
        existeEntrada: true,
        direcao: 'compra',
        tipoCenario: 'rompimento',
        justificativa: 'O preço apresentou um fechamento nítido acima da zona de resistência anterior. O candle de rompimento possui corpo expressivo e pouco pavio superior, indicando pressão compradora. Existe vácuo livre significativo até o próximo nível de oferta.',
        entrada: 'Nível de fechamento do candle de rompimento',
        stop: 'Abaixo do último fundo ascendente (Stop Estrutural)',
        alvo: '75% da projeção do vácuo livre até a próxima barreira',
        contexto: 'Transição de lateralidade para tendência de alta confirmada por pivô.',
        checklist: {
          fechamentoCorpo: true,
          vacuoLivre: true,
          stopEstrutural: true,
          tendenciaConfirmada: true
        }
      });
      setIsAnalyzing(false);
      showSuccess("Análise estrutural concluída com sucesso!");
    }, 2000);
  };

  const clearImage = () => {
    setSelectedImage(null);
    setAnalysis(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sidebar Esquerda */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-white tracking-tighter">OPERACIONAL</h2>
              <p className="text-slate-500 text-sm font-medium">Domine a estrutura, domine o mercado.</p>
            </div>
            
            <OperationalRules />

            <nav className="space-y-2 pt-4">
              <Button variant="ghost" className="w-full justify-start gap-3 text-amber-500 bg-amber-500/5 border border-amber-500/10 hover:bg-amber-500/10">
                <LayoutDashboard size={18} /> Terminal de Análise
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-white/5">
                <History size={18} /> Histórico de Trades
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-white/5">
                <MessageSquare size={18} /> Mentoria Direta
              </Button>
            </nav>
          </div>

          {/* Área Principal */}
          <div className="lg:col-span-8 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-amber-500">
                  <Sparkles size={16} />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Inteligência Estrutural</span>
                </div>
                <h2 className="text-4xl font-black text-white tracking-tight">Nova Leitura</h2>
                <p className="text-slate-500 font-medium">O preço fala. Eu apenas traduzo a estrutura.</p>
              </div>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />

              {!selectedImage ? (
                <Button 
                  onClick={triggerFileInput}
                  className="bg-white text-black hover:bg-slate-200 px-10 py-7 rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-white/5 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ImagePlus size={20} className="mr-2" /> Carregar Print
                </Button>
              ) : (
                <Button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="bg-emerald-500 hover:bg-emerald-600 text-black px-10 py-7 rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-emerald-500/20 transition-all hover:scale-[1.02]"
                >
                  {isAnalyzing ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Processando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <LayoutDashboard size={20} /> Iniciar Análise
                    </span>
                  )}
                </Button>
              )}
            </div>

            {selectedImage && (
              <div className="relative group animate-in zoom-in-95 duration-500">
                <div className="absolute -top-4 -right-4 z-20">
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="rounded-full w-10 h-10 shadow-2xl border-2 border-black"
                    onClick={clearImage}
                  >
                    <X size={20} />
                  </Button>
                </div>
                <div className="rounded-[2rem] overflow-hidden border-8 border-white/5 shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)] bg-black">
                  <img 
                    src={selectedImage} 
                    alt="Gráfico para análise" 
                    className="w-full h-auto max-h-[600px] object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            )}

            {analysis ? (
              <AnalysisResult data={analysis} />
            ) : !selectedImage && (
              <div 
                onClick={triggerFileInput}
                className="group border-2 border-dashed border-white/10 rounded-[2.5rem] p-20 flex flex-col items-center justify-center text-center bg-white/[0.02] cursor-pointer hover:bg-white/[0.04] hover:border-amber-500/30 transition-all duration-500"
              >
                <div className="bg-white/5 p-8 rounded-3xl mb-6 group-hover:scale-110 transition-transform duration-500">
                  <ImagePlus size={56} className="text-slate-600 group-hover:text-amber-500 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Aguardando Estrutura</h3>
                <p className="text-slate-500 max-w-xs mx-auto font-medium">
                  Arraste o print do gráfico ou clique para iniciar a leitura profissional.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-white/5 bg-black/40">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">© 2024 Sihle Elite Analysis</p>
            <p className="text-[10px] text-slate-600 italic">"O sucesso é a soma de pequenos fechamentos diários."</p>
          </div>
          <MadeWithDyad />
        </div>
      </footer>
    </div>
  );
};

export default Index;