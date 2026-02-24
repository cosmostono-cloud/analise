"use client";

import React, { useState, useRef } from 'react';
import Header from '@/components/Header';
import AnalysisResult from '@/components/AnalysisResult';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImagePlus, LayoutDashboard, History, Settings, MessageSquare, X } from 'lucide-react';
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
        setAnalysis(null); // Limpa análise anterior ao carregar nova imagem
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
    
    // Simulação de processamento estrutural
    setTimeout(() => {
      setAnalysis({
        existeEntrada: true,
        tipoCenario: 'rompimento',
        justificativa: 'O preço apresentou um fechamento nítido acima da zona de resistência anterior. O candle de rompimento possui corpo expressivo e pouco pavio superior, indicando pressão compradora. Existe vácuo livre significativo até o próximo nível de oferta.',
        entrada: 'Nível de fechamento do candle de rompimento',
        stop: 'Abaixo do último fundo ascendente (Stop Estrutural)',
        alvo: '75% da projeção do vácuo livre até a próxima barreira',
        contexto: 'Transição de lateralidade para tendência de alta confirmada por pivô.'
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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar */}
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
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl shadow-lg shadow-blue-200 transition-all hover:scale-[1.02]"
                >
                  <span className="flex items-center gap-2">
                    <ImagePlus size={20} /> Carregar Gráfico
                  </span>
                </Button>
              ) : (
                <Button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 rounded-xl shadow-lg shadow-emerald-200 transition-all hover:scale-[1.02]"
                >
                  {isAnalyzing ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processando Estrutura...
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
              <div className="relative group">
                <div className="absolute -top-3 -right-3 z-10">
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="rounded-full w-8 h-8 shadow-lg"
                    onClick={clearImage}
                  >
                    <X size={16} />
                  </Button>
                </div>
                <div className="rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-white">
                  <img 
                    src={selectedImage} 
                    alt="Gráfico para análise" 
                    className="w-full h-auto max-h-[500px] object-contain"
                  />
                </div>
              </div>
            )}

            {analysis ? (
              <AnalysisResult data={analysis} />
            ) : !selectedImage && (
              <div 
                onClick={triggerFileInput}
                className="border-2 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center text-center bg-white/50 cursor-pointer hover:bg-white hover:border-blue-300 transition-all"
              >
                <div className="bg-slate-100 p-6 rounded-full mb-4">
                  <ImagePlus size={48} className="text-slate-300" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Aguardando Gráfico</h3>
                <p className="text-slate-500 max-w-xs mx-auto">
                  Clique aqui ou no botão acima para enviar uma imagem e receber a análise técnica.
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