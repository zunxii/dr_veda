import React from 'react';
import { Wind, Sun, Moon, Leaf, Sparkles } from 'lucide-react';
import { DoshaAnalysisProps } from '../types';

const DoshaAnalysis: React.FC<DoshaAnalysisProps> = ({ results }) => {
  const getDoshaColor = (type: string) => {
    switch (type) {
      case 'vata': return 'from-blue-400 to-blue-600';
      case 'pitta': return 'from-orange-400 to-red-500';
      case 'kapha': return 'from-green-400 to-emerald-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getDoshaIcon = (type: string) => {
    switch (type) {
      case 'vata': return <Wind className="w-8 h-8 text-white" />;
      case 'pitta': return <Sun className="w-8 h-8 text-white" />;
      case 'kapha': return <Moon className="w-8 h-8 text-white" />;
      default: return <Leaf className="w-8 h-8 text-white" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Your Dosha Analysis
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Based on your consultation, here's your personalized Ayurvedic constitution analysis
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {results.map((dosha) => (
          <div key={dosha.type} className="relative">
            <div className={`bg-gradient-to-br ${getDoshaColor(dosha.type)} rounded-2xl p-6 text-white shadow-xl`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    {getDoshaIcon(dosha.type)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold capitalize">{dosha.type}</h3>
                    <p className="text-white/80 text-sm">Constitution</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{dosha.percentage}%</div>
                </div>
              </div>
              
              <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-4">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${dosha.percentage}%` }}
                ></div>
              </div>
              
              <p className="text-white/90 text-sm leading-relaxed">
                {dosha.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-slate-800 mb-2">
              Personalized Recommendations
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Based on your dosha analysis, we recommend focusing on balancing your dominant constitution 
              through targeted lifestyle changes, dietary modifications, and specific yoga practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoshaAnalysis;