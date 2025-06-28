'use client';

import React, { useState, useCallback } from 'react';
import VoiceConsultation from '@/components/VoiceConsultation';
import PersonalForm from '@/components/PersonalForm';
import { VoiceSession, UploadedReport } from '@/types';

export default function ConsultationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [voiceSession, setVoiceSession] = useState<VoiceSession>({
    isActive: false,
    transcript: '',
    duration: 0,
    isProcessing: false
  });

  const [uploadedReport, setUploadedReport] = useState<UploadedReport | null>(null);
  const [personalInfo, setPersonalInfo] = useState<any>(null);

  const handleToggleVoice = useCallback(async () => {
    setIsLoading(true);
    if (voiceSession.isActive) {
      setVoiceSession(prev => ({ ...prev, isActive: false, isProcessing: false }));
    } else {
      setVoiceSession(prev => ({ ...prev, isActive: true, isProcessing: true }));
      await new Promise(resolve => setTimeout(resolve, 1000));
      setVoiceSession(prev => ({ ...prev, isProcessing: false }));
    }
    setIsLoading(false);
  }, [voiceSession.isActive]);

  const handleEndVoiceSession = useCallback(async () => {
    setIsLoading(true);
    setVoiceSession({
      isActive: false,
      transcript: '',
      duration: 0,
      isProcessing: false
    });
    setIsLoading(false);
  }, []);

  const handleReportUpload = useCallback(async (file: File) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockReport: UploadedReport = {
      id: Date.now().toString(),
      fileName: file.name,
      uploadDate: new Date().toISOString(),
      analysisStatus: 'completed',
      extractedData: {
        bloodPressure: '120/80 mmHg',
        heartRate: '72 bpm',
        bloodSugar: '95 mg/dL',
        cholesterol: '185 mg/dL'
      },
      aiInsights: [
        'Blood pressure is within normal range',
        'Heart rate indicates good cardiovascular health'
      ]
    };
    setUploadedReport(mockReport);
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 py-8 sm:py-12">
      <div className="w-full max-w-3xl space-y-6 sm:space-y-10">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
            Start Your Consultation
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Follow the steps to begin your AI-assisted Ayurvedic consultation
          </p>
        </div>

        <div className="w-full">
          {!personalInfo ? (
            <PersonalForm
              onSubmit={(data) => {
                setPersonalInfo(data);
                if (data.uploadedReport) {
                  setUploadedReport(data.uploadedReport);
                }
              }}
              onUpload={handleReportUpload}
              uploadedReport={uploadedReport}
              isLoading={isLoading}
              inlineUpload
            />
          ) : (
            <VoiceConsultation
              voiceSession={voiceSession}
              onToggleVoice={handleToggleVoice}
              onEndSession={handleEndVoiceSession}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
