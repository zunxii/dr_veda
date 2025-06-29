import React from 'react';
import {
  Mic,
  FileText,
  Calendar,
  Clock,
  ChevronRight,
  Share2,
  Download,
  CheckCircle,
  User,
  Baby,
  BadgePlus
} from 'lucide-react';
import { ConsultationHistoryProps } from '../types';

const ConsultationHistory: React.FC<ConsultationHistoryProps> = ({
  consultations,
  showFullHistory = false,
  onViewAll
}) => {
  return (
    <div className="space-y-6">
      {consultations.map((consultation) => (
        <div
          key={consultation.id}
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${consultation.type === 'voice'
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-blue-100 text-blue-600'
                  }`}
              >
                {consultation.type === 'voice' ? (
                  <Mic className="w-6 h-6" />
                ) : (
                  <FileText className="w-6 h-6" />
                )}
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  {consultation.formData.name || 'Unknown Name'}
                </h3>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <span className="flex items-center">
                    <Baby className="w-4 h-4 mr-1" />
                    {consultation.formData.age ? `${consultation.formData.age} yrs` : 'N/A'}
                  </span>
                  <span className="flex items-center">
                    <BadgePlus className="w-4 h-4 mr-1" />
                    {consultation.formData.gender || 'N/A'}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(consultation.createdAt).toLocaleDateString()}
                  </span>
                  {consultation.duration && (
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
                {consultation.formData.symptoms?.trim() ? (
                  consultation.formData.symptoms
                    .split(',')
                    .map(symptom => symptom.trim())
                    .filter(symptom => symptom.length > 0)
                    .map((symptom, index) => (
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

            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-2">Diagnosis</h4>
              <p className="text-slate-600 text-sm bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                {consultation.diagnosis || 'No diagnosis available.'}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-2">Recommendations</h4>
              {consultation.recommendations && consultation.recommendations.length > 0 ? (
                <div className="space-y-2">
                  {consultation.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-slate-600">{rec}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm">No recommendations provided.</p>
              )}
            </div>
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
