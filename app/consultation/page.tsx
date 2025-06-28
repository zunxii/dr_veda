'use client';

import React, { useState, useCallback } from 'react';
import VoiceConsultation from '@/components/VoiceConsultation';
import ReportUpload from '@/components/ReportUpload';
import { VoiceSession, UploadedReport, ConsultationData } from '@/types';

export default function ConsultationPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [voiceSession, setVoiceSession] = useState<VoiceSession>({
    isActive: false,
    transcript: '',
    duration: 0,
    isProcessing: false
  });
  const [uploadedReport, setUploadedReport] = useState<UploadedReport | null>(null);

  const handleToggleVoice = useCallback(async () => {
    try {
      setIsLoading(true);
      
      if (voiceSession.isActive) {
        setVoiceSession(prev => ({ ...prev, isActive: false, isProcessing: false }));
      } else {
        setVoiceSession(prev => ({ ...prev, isActive: true, isProcessing: true }));
        await new Promise(resolve => setTimeout(resolve, 1000));
        setVoiceSession(prev => ({ ...prev, isProcessing: false }));
      }
    } catch (err) {
      console.error('Voice consultation error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [voiceSession.isActive]);

  const handleEndVoiceSession = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Process and save consultation results here
      // You could save to localStorage, API, etc.
      
      setVoiceSession({
        isActive: false,
        transcript: '',
        duration: 0,
        isProcessing: false
      });
      
    } catch (err) {
      console.error('End session error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [voiceSession.duration]);

  const handleReportUpload = useCallback(async (file: File) => {
    try {
      setIsLoading(true);
      
      // Validate and process file
      if (!file.type.includes('pdf') && !file.type.includes('image')) {
        throw new Error('Please upload a PDF or image file');
      }
      
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
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
      
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">
          Start Your Consultation
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Choose how you'd like to consult with our AI Ayurvedic doctor
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <VoiceConsultation
          voiceSession={voiceSession}
          onToggleVoice={handleToggleVoice}
          onEndSession={handleEndVoiceSession}
          isLoading={isLoading}
        />
        
        <ReportUpload
          onUpload={handleReportUpload}
          uploadedReport={uploadedReport}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}