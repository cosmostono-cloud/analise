"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, Zap, Target, Ban } from 'lucide-react';

const OperationalRules = () => {
  const rules = [
    { icon: <Ban className="text-red-500" />, text: "Range é pique-esconde: Não entre.", color: "border-red-500/20 bg-red-500/5" },
    { icon: <CheckCircle2 className="text-emerald-500" />, text: "Pavio não é fechamento. Espere o corpo.", color: "border-emerald-500/20 bg-emerald-500/5" },
    { icon: <Zap className="text-amber-500" />, text: "Sem vácuo livre, não existe trade.", color: "border-amber-500/20 bg-amber-500/5" },
    { icon: <Target className="text-blue-500" />, text: "Alvo é 70-80% do vácuo. Não seja ganancioso.", color: "border-blue-500/20 bg-blue-500/5" },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] px-1">Checklist de Sobrevivência</h3>
      <div className="grid grid-cols-1 gap-3">
        {rules.map((rule, index) => (
          <div key={index} className={`flex items-center gap-3 p-4 rounded-xl border ${rule.color} transition-all hover:scale-[1.02]`}>
            {rule.icon}
            <span className="text-sm font-medium text-slate-200">{rule.text}</span>
          </div>
        ))}
      </div>
      
      <Card className="bg-gradient-to-br from-slate-900 to-black border-white/5 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-amber-500 shrink-0" size={20} />
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Alerta de Mindset</h4>
              <p className="text-xs text-slate-400 leading-relaxed italic">
                "O mercado não tem pressa, você também não deve ter. Se a estrutura está confusa, o melhor trade é não operar."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OperationalRules;