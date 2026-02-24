"use client";

import React, { useState, useRef } from 'react';
import Header from '@/components/Header';
import AnalysisResult from '@/components/AnalysisResult';
import OperationalRules from '@/components/OperationalRules';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ImagePlus, LayoutDashboard, History, 
  MessageSquare, X, Sparkles, Clock, Target
} from 'lucide-react';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { showSuccess, showError } from '@/utils/toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Index = () => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTF, setSelectedTF] = useState<string>("M15");
  const [currentPrice, setCurrentPrice] = useState<string>("");
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
    if (!currentPrice || isNaN(Number(currentPrice))) {
      showError("Por favor, insira o preço atual do ativo para calibrar a análise.");
      return;
    }
    
    setIsAnalyzing(true);
    const price = Number(currentPrice);
    
    // Simulação de análise estrutural mais variada
    setTimeout(() => {
      const randomFactor = Math.random();
      let existeEntrada = true;
      let direcao: 'compra' | 'venda' | 'aguardar' = 'compra';
      
      // 30% de chance de ser "Aguardar" (Sem entrada/Range)
      if (randomFactor < 0.3) {
        existeEntrada = false;
        direcao = 'aguardar';
      } else if (randomFactor < 0.65) {
        direcao = 'venda';
      } else {
        direcao = 'compra';
      }
      
      const volatility = price * 0.0015; // Ajuste de volatilidade para HK50
      
      setAnalysis({
        existeEntrada,
        direcao,
        timeframe: selectedTF,
        tipoCenario: !existeEntrada ? 'nenhum' : (direcao === 'compra' ? 'rompimento' : 'reversão'),
        justificativa: !existeEntrada 
          ? "O preço está preso em uma zona de briga (Range). Não há vácuo livre suficiente para uma operação segura. Lembre-se: Range é pique-esconde."
          : direcao === 'compra'
            ? `Identificado fechamento de corpo acima da região de valor em ${selectedTF}. Vácuo livre detectado até o próximo nível institucional.`
            : `Exaustão de movimento detectada. O preço falhou em romper o topo anterior e apresenta gatilho de venda para buscar a liquidez inferior.`,
        entrada: existeEntrada ? price.toFixed(2) : "---",
        stop: existeEntrada 
          ? (direcao === 'compra' ? (price - volatility).toFixed(2) : (price + volatility).toFixed(2))
          : "---",
        alvo: existeEntrada 
          ? (direcao === 'compra' ? (price + (volatility * 2.2)).toFixed(2) : (price - (volatility * 2.2)).toFixed(2))
          : "---",
        contexto: !existeEntrada ? "Mercado Lateral / Sem Tendência Clara" : `Estrutura de ${direcao === 'compra' ? 'Alta' : 'Baixa'} em ${selectedTF}.`,
        regioesImportantes: [
          `Suporte: ${(price - volatility * 2).toFixed(2)}`,
          `Resistência: ${(price + volatility * 2).toFixed(2)}`,
          'Zona de Liquidez Detectada',
          'Pavio de Exaustão Identificado'
        ],
        contextoHTF: {
          tf: "H4 / Diário",
          analise: direcao === 'venda' 
            ? 'Tendência macro de baixa, favorecendo operações de venda na exaustão.'
            : 'Tendência macro de alta, buscando correções para novas entradas.'
        },
        checklist: {
          fechamentoCorpo: existeEntrada,
          vacuoLivre: existeEntrada,
          stopEstrutural: existeEntrada,
          tendenciaConfirmada: randomFactor > 0.5
        }
      });
      
      setIsAnalyzing(false);
      if (existeEntrada) {
        showSuccess(`Análise concluída: Sinal de ${direcao.toUpperCase()} detectado.`);
      } else {
        showSuccess("Análise concluída: Sem entrada clara no momento.");
      }
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
              <div className="space-y-4 flex-1">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-amber-500">
                    <Sparkles size={16} />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Leitura de Preços MT4/MT5</span>
                  </div>
                  <h2 className="text-4xl font-black text-white tracking-tight">Nova Leitura</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Timeframe</label>
                    <Select value={selectedTF} onValueChange={setSelectedTF}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white font-bold rounded-xl h-12">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-amber-500" />
                          <SelectValue placeholder="Timeframe" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-white/10 text-white">
                        <SelectItem value="M1">M1 (1 Minuto)</SelectItem>
                        <SelectItem value="M2">M2 (2 Minutos)</SelectItem>
                        <SelectItem value="M3">M3 (3 Minutos)</SelectItem>
                        <SelectItem value="M5">M5 (5 Minutos)</SelectItem>
                        <SelectItem value="M15">M15 (15 Minutos)</SelectItem>
                        <SelectItem value="M30">M30 (30 Minutos)</SelectItem>
                        <SelectItem value="H1">H1 (1 Hora)</SelectItem>
                        <SelectItem value="H4">H4 (4 Horas)</SelectItem>
                        <SelectItem value="D1">D1 (Diário)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Preço Atual (Calibração)</label>
                    <div className="relative">
                      <Target className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500" size={16} />
                      <Input 
                        type="text"
                        placeholder="Ex: 26743.40"
                        value={currentPrice}
                        onChange={(e) => setCurrentPrice(e.target.value)}
                        className="bg-white/5 border-white/10 text-white font-bold rounded-xl h-12 pl-10 focus:ring-amber-500/50"
                      />
                    </div>
                  </div>
                </div>
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
                      Analisando Estrutura...
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

            {analysis && <AnalysisResult data={analysis} />}
            
            {!analysis && !selectedImage && (
              <div 
                onClick={triggerFileInput}
                className="group border-2 border-dashed border-white/10 rounded-[2.5rem] p-20 flex flex-col items-center justify-center text-center bg-white/[0.02] cursor-pointer hover:bg-white/[0.04] hover:border-amber-500/30 transition-all duration-500"
              >
                <div className="bg-white/5 p-8 rounded-3xl mb-6 group-hover:scale-110 transition-transform duration-500">
                  <ImagePlus size={56} className="text-slate-600 group-hover:text-amber-500 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Aguardando MetaTrader</h3>
                <p className="text-slate-500 max-w-xs mx-auto font-medium">
                  Insira o preço atual e envie o print para uma análise estrutural calibrada.
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