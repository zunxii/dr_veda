'use client';

import React, { useState, useEffect } from 'react';
import ConsultationHistory from '@/components/ConsultationHistory';
import { ConsultationData } from '@/types';

export default function ReportsPage() {
  const [consultationHistory, setConsultationHistory] = useState<ConsultationData[]>([]);

  useEffect(() => {
    // Load consultation history from localStorage or API
    const loadConsultationHistory = () => {
      try {
       
        const saved = localStorage.getItem('consultationHistory');
        if (saved) {
          setConsultationHistory(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Failed to load consultation history:', error);
      }
    };

    loadConsultationHistory();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-15">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">
          Consultation History
        </h1>
        <p className="text-slate-600">
          View all your past consultations and reports
        </p>
      </div>
      
      {consultationHistory.length > 0 ? (
        <ConsultationHistory 
          consultations={consultationHistory}
          showFullHistory={true}
        />
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-500">No consultation history yet.</p>
        </div>
      )}
    </div>
  );
}