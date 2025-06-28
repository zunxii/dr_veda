'use client';
import React from 'react';
import { ChevronRight, Play, Shield, Brain } from 'lucide-react';

const HeroSection: React.FC<{ onStartConsultation: () => void }> = ({ onStartConsultation }) => {
  return (
    <section className="relative overflow-hidden bg-white pb-24 pt-28">
      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-emerald-50 to-teal-50"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Text Content */}
          <div className="space-y-10">
            <div>
              <h1 className="text-6xl font-extrabold tracking-tight leading-tight text-slate-800">
                Your AI-Powered<br />
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  Ayurvedic Doctor
                </span>
              </h1>
              <p className="mt-6 text-lg text-slate-600 max-w-xl leading-relaxed">
                Dr. Veda brings together the wisdom of Ayurveda and the intelligence of AI.
                Get instant dosha analysis, personalized remedies, and health guidance — all in your voice.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={onStartConsultation}
                className="group bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all"
              >
                <span className="flex items-center justify-center">
                  Start Consultation
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button className="flex items-center px-8 py-4 border border-emerald-300 text-emerald-700 rounded-xl font-semibold text-lg hover:bg-emerald-50 transition">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </button>
            </div>

            <div className="flex items-center space-x-6 pt-4 text-slate-600 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></div>
                Real-Time AI Analysis
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                HIPAA Compliant
              </div>
            </div>
          </div>

          {/* Right Side Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-teal-500/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-emerald-100 shadow-2xl">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Dosha Analysis</h3>
                      <p className="text-sm text-slate-500">Live health insights</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-600">87%</div>
                    <div className="text-xs text-slate-500">Accuracy</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { name: 'Vata', value: 45, color: 'from-blue-400 to-blue-600' },
                    { name: 'Pitta', value: 35, color: 'from-orange-400 to-red-500' },
                    { name: 'Kapha', value: 20, color: 'from-green-400 to-emerald-600' },
                  ].map((dosha) => (
                    <div key={dosha.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-slate-700">{dosha.name}</span>
                        <span className="text-slate-500">{dosha.value}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${dosha.color}`}
                          style={{ width: `${dosha.value}%` }}
                        />
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
