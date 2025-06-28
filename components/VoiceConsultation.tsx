// components/VoiceConsultation.tsx
import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { VoiceConsultationProps } from '../types';

const VoiceConsultation: React.FC<VoiceConsultationProps> = ({ 
  voiceSession, 
  onToggleVoice, 
  onEndSession, 
  isLoading 
}) => {
  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border border-emerald-100 shadow-xl">
      <div className="text-center mb-8">
        <div className="relative inline-flex">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
            voiceSession.isActive 
              ? 'bg-gradient-to-br from-emerald-500 to-teal-600 animate-pulse' 
              : 'bg-gradient-to-br from-slate-200 to-slate-300'
          }`}>
            {voiceSession.isActive ? (
              <Mic className="w-12 h-12 text-white" />
            ) : (
              <MicOff className="w-12 h-12 text-slate-600" />
            )}
          </div>
          {voiceSession.isActive && (
            <div className="absolute -inset-4 rounded-full border-4 border-emerald-400/30 animate-ping"></div>
          )}
        </div>
        
        <h3 className="text-2xl font-bold text-slate-800 mt-6 mb-2">
          Voice Consultation
        </h3>
        <p className="text-slate-600 max-w-sm mx-auto">
          Speak naturally with our AI doctor about your symptoms and concerns
        </p>
      </div>
      
      {voiceSession.isActive && (
        <div className="bg-white/80 rounded-2xl p-6 mb-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-700">Recording...</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-600">
                {Math.floor(voiceSession.duration / 60)}:{(voiceSession.duration % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>
          
          <div className="min-h-[100px] p-4 bg-slate-50 rounded-xl">
            <p className="text-slate-700 italic">
              {voiceSession.transcript || "Start speaking... I'm listening to your concerns."}
            </p>
          </div>
        </div>
      )}
      
      <div className="flex gap-4">
        <button
          onClick={onToggleVoice}
          disabled={isLoading}
          className={`flex-1 py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 ${
            voiceSession.isActive
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          } disabled:opacity-50`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Processing...
            </div>
          ) : voiceSession.isActive ? (
            'Stop Recording'
          ) : (
            'Start Consultation'
          )}
        </button>
        
        {voiceSession.isActive && (
          <button
            onClick={onEndSession}
            className="px-6 py-4 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-2xl font-semibold transition-colors"
          >
            End Session
          </button>
        )}
      </div>
    </div>
  );
};

export default VoiceConsultation;