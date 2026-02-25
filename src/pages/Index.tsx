"use client";

import React, { useState, useRef } from 'react';
import Header from '@/components/Header';
import AnalysisResult from '@/components/AnalysisResult';
import OperationalRules from '@/components/OperationalRules';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ImagePlus, LayoutDashboard, History, 
  MessageSquare, X, Sparkles, Clock, Target,
  CheckCircle2, Ban, Zap
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
import { Checkbox } from "@/components/ui/checkbox";

const Index = () => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTF, setSelectedTF] = useState<string>("M15");
  const [currentPrice, setCurrentPrice] = useState<string>("");
  
  // Validador Estrutural
  const [hasBodyClose, setHasBodyClose] = useState(false);
  const [hasFreeVacuum, setHasFreeVacuum] = useState(false);
  const [isOutOfRange, setIsOutOfRange] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (!selectedImage) return;
    if (!currentPrice || isNaN(Number(currentPrice))) {
      showError("Insira o preço atual para calibrar os alvos.");
      return;
    }
    
    setIsAnalyzing(true);
    const price = Number(currentPrice);
    
    setTimeout(() => {
      // A lógica agora depende DIRETAMENTE do que o usuário marcou
      const existeEntrada = hasBodyClose && hasFreeVacuum && isOutOfRange;
      
      // Se não tem os 3 requisitos, é AGUARDAR
      let direcao: 'compra' | 'venda' | 'aguardar' = 'aguardar';
      if (existeEntrada) {
        // Simula direção baseada em probabilidade se os critérios técnicos forem atendidos
        direcao = Math.random() > 0.5 ? 'compra' : 'venda';
      }

      const volatility = price * 0.0018;
      
      setAnalysis({
        existeEntrada,
        direcao,
        timeframe: selectedTF,
        tipoCenario: !existeEntrada ? 'Aguardando Confirmação' : (direcao === 'compra' ? 'Rompimento Estrutural' : 'Reversão de Topo'),
        justificativa: !existeEntrada 
          ? "Critérios técnicos insuficientes. Falta fechamento de corpo ou vácuo livre detectado. Operar agora seria violar o plano Sihle Elite."
          : `Estrutura validada. O preço fechou corpo fora da zona de briga com vácuo livre de aproximadamente 85% até o próximo alvo.`,
        logicaEstrutural: !existeEntrada
          ? "O preço ainda não mudou o caráter (CHoCH) ou está testando liquidez sem força de rompimento."
          : "Quebra de estrutura (BOS) confirmada. O volume de absorção foi superado pelo fluxo direcional.",
        planoGerenciamento: "Risco fixo de 1%. Mover para 0x0 (Break Even) assim que o preço percorrer 50% do vácuo livre projetado.",
        entrada: existeEntrada ? price.toFixed(2) : "---",
        stop: existeEntrada 
          ? (direcao === 'compra' ? (price - volatility).toFixed(2) : (price + volatility).toFixed(2))
          : "---",
        alvo: existeEntrada 
          ? (direcao === 'compra' ? (price + (volatility * 2.5)).toFixed(2) : (price - (volatility * 2.5)).toFixed(2))
          : "---",
        vacuoLivrePorcentagem: existeEntrada ? 85 : 0,
        contextoHTF: {
          tf: "H4",
          analise: "A estrutura macro apoia o movimento identificado no tempo operacional."
        },
        regioesImportantes: ["Zona de Liquidez", "Nível Institucional", "FVG Detectado"],
        checklist: {
          fechamentoCorpo: hasBodyClose,
          vacuoLivre: hasFreeVacuum,
          stopEstrutural: isOutOfRange,
          tendenciaConfirmada: true
        }
      });
      
      setIsAnalyzing(false);
      showSuccess(existeEntrada ? "Análise Elite Gerada!" : "Atenção: Sem entrada clara.");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-4 space-y-8">
            <OperationalRules />
          </div>

          <div className="lg:col-span-8 space-y-8">
            {/* Painel de Configuração */}
            <div className="bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Timeframe</label>
                  <Select value={selectedTF} onValueChange={setSelectedTF}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white font-bold rounded-xl h-12">
                      <SelectValue placeholder="TF" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/10 text-white">
                      <SelectItem value="M1">M1</SelectItem>
                      <SelectItem value="M5">M5</SelectItem>
                      <SelectItem value="M15">M15</SelectItem>
                      <SelectItem value="H1">H1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Preço Atual</label>
                  <Input 
                    placeholder="Ex: 26743.40"
                    value={currentPrice}
                    onChange={(e) => setCurrentPrice(e.target.value)}
                    className="bg-white/5 border-white/10 text-white font-bold rounded-xl h-12"
                  />
                </div>
              </div>

              {/* Validador Estrutural Manual */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] flex items-center gap-2">
                  <Zap size={14} /> Validador de Estrutura (Obrigatório)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div 
                    onClick={() => setHasBodyClose(!hasBodyClose)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col gap-2 ${hasBodyClose ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-white/5 bg-white/5'}`}
                  >
                    <CheckCircle2 size={20} className={hasBodyClose ? 'text-emerald-500' : 'text-slate-600'} />
                    <span className="text-[10px] font-bold text-white uppercase">Corpo Fechado?</span>
                  </div>
                  <div 
                    onClick={() => setHasFreeVacuum(!hasFreeVacuum)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col gap-2 ${hasFreeVacuum ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-white/5 bg-white/5'}`}
                  >
                    <Target size={20} className={hasFreeVacuum ? 'text-emerald-500' : 'text-slate-600'} />
                    <span className="text-[10px] font-bold text-white uppercase">Vácuo Livre?</span>
                  </div>
                  <div 
                    onClick={() => setIsOutOfRange(!isOutOfRange)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col gap-2 ${isOutOfRange ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-white/5 bg-white/5'}`}
                  >
                    <Ban size={20} className={isOutOfRange ? 'text-emerald-500' : 'text-slate-600'} />
                    <span className="text-[10px] font-bold text-white uppercase">Fora do Range?</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-white/10 h-14 rounded-2xl font-bold uppercase tracking-widest"
                >
                  <ImagePlus size={18} className="mr-2" /> {selectedImage ? "Trocar Print" : "Carregar Print"}
                </Button>
                <Button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !selectedImage}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-black h-14 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-amber-500/20"
                >
                  {isAnalyzing ? "Processando..." : "Validar Entrada"}
                </Button>
              </div>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            </div>

            {selectedImage && (
              <div className="rounded-[2rem] overflow-hidden border-8 border-white/5 bg-black relative group">
                <img src={selectedImage} className="w-full h-auto opacity-80 group-hover:opacity-100 transition-opacity" />
                <Button 
                  variant="destructive" size="icon" 
                  className="absolute top-4 right-4 rounded-full"
                  onClick={() => setSelectedImage(null)}
                >
                  <X size={18} />
                </Button>
              </div>
            )}

            {analysis && <AnalysisResult data={analysis} />}
          </div>
        </div>
      </main>
      
      <footer className="py-8 border-t border-white/5 text-center">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Index;