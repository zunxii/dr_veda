import React from 'react';
import { ChevronRight, Play, Shield, Brain } from 'lucide-react';
import { HeroSectionProps } from '../types';

const HeroSection: React.FC<HeroSectionProps> = ({ onStartConsultation }) => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 rounded-3xl"></div>
      <div className="relative max-w-6xl mx-auto px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 leading-tight mb-6">
                Your Personal
                <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  AI Ayurvedic
                </span>
                <span className="block">Doctor</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                Experience ancient wisdom enhanced by modern AI. Get personalized Ayurvedic consultations, 
                dosha analysis, and holistic health guidance.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onStartConsultation}
                className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span className="flex items-center justify-center">
                  Start Consultation
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button className="flex items-center justify-center px-8 py-4 border-2 border-emerald-200 text-emerald-700 rounded-2xl font-semibold text-lg hover:bg-emerald-50 transition-colors">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </button>
            </div>
            
            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-600 font-medium">AI-Powered Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-slate-600 font-medium">HIPAA Compliant</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/60 backdrop-blur-lg rounded-3xl p-8 border border-emerald-100 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Dosha Analysis</h3>
                      <p className="text-sm text-slate-600">Real-time assessment</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-600">87%</div>
                    <div className="text-xs text-slate-500">Accuracy</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[
                    { name: 'Vata', value: 45, color: 'from-blue-400 to-blue-600' },
                    { name: 'Pitta', value: 35, color: 'from-orange-400 to-red-500' },
                    { name: 'Kapha', value: 20, color: 'from-green-400 to-emerald-600' }
                  ].map((dosha) => (
                    <div key={dosha.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-slate-700">{dosha.name}</span>
                        <span className="text-slate-600">{dosha.value}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${dosha.color} rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${dosha.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;