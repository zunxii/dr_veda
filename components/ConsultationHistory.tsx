'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Mic,
  FileText,
  Calendar,
  Clock,
  ChevronRight,
  Share2,
  Download,
  Baby,
  BadgePlus
} from 'lucide-react';
import { ConsultationHistoryProps, ConsultationData, PrescriptionItem } from '../types';

const ConsultationHistory: React.FC<ConsultationHistoryProps> = ({
  consultations,
  showFullHistory = false,
  onViewAll
}) => {
  const router = useRouter();

  const handleCardClick = (id: string) => {
    router.push(`/reports/${id}`);
  };

  return (
    <div className="space-y-6 mb-10">
      {consultations.map((consultation: ConsultationData) => (
        <div
          key={consultation.id}
          onClick={() => handleCardClick(consultation.id)}
          className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-100 shadow hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-4 sm:space-y-0">
            <div className="flex items-start space-x-4">
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${
                  consultation.type === 'voice' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                }`}
              >
                {consultation.type === 'voice' ? (
                  <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </div>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-semibold text-slate-800 flex items-center gap-2">
                  {consultation.formData?.name || 'Unknown Name'}
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
                  <span className="flex items-center">
                    <Baby className="w-4 h-4 mr-1" />
                    {consultation.formData?.age ? `${consultation.formData.age} yrs` : 'N/A'}
                  </span>
                  <span className="flex items-center">
                    <BadgePlus className="w-4 h-4 mr-1" />
                    {consultation.formData?.gender || 'N/A'}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(consultation.createdAt).toLocaleDateString()}
                  </span>
                  {consultation.duration !== undefined && (
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {Math.floor(consultation.duration / 60)}m {consultation.duration % 60}s
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-2">Symptoms</h4>
              <div className="flex flex-wrap gap-2">
                {consultation.formData?.symptoms?.trim() ? (
                  consultation.formData.symptoms
                    .split(',')
                    .map((symptom: string) => symptom.trim())
                    .filter((symptom: string) => symptom.length > 0)
                    .map((symptom: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                      >
                        {symptom}
                      </span>
                    ))
                ) : (
                  <p className="text-slate-500 text-sm">No symptoms provided.</p>
                )}
              </div>
            </div>

            {consultation.analysis?.ayurvedic_diagnosis && (
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-2">Dosha Imbalance Summary</h4>
                  <p className="text-slate-600 text-sm bg-yellow-50 p-3 rounded-xl border border-yellow-100">
                    {consultation.analysis.ayurvedic_diagnosis.dosha_imbalance_summary || 'Not available'}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-2">Possible Ayurvedic Condition</h4>
                  <p className="text-slate-600 text-sm bg-pink-50 p-3 rounded-xl border border-pink-100">
                    {consultation.analysis.ayurvedic_diagnosis.possible_ayurvedic_condition || 'Not mentioned'}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-2">Sample Treatments</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {(consultation.analysis.ayurvedic_diagnosis.personalized_prescription || []).slice(0, 2).map(
                      (item: PrescriptionItem, idx: number) => (
                        <li key={idx} className="text-sm text-slate-600">
                          <strong>{item.treatment}</strong>: {item.dosage} — {item.frequency}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {!showFullHistory && onViewAll && consultations.length > 0 && (
        <div className="text-center">
          <button
            onClick={onViewAll}
            className="inline-flex items-center px-6 py-3 bg-emerald-50 text-emerald-700 rounded-xl font-medium hover:bg-emerald-100 transition-colors"
          >
            View All Consultations
            <ChevronRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ConsultationHistory;
