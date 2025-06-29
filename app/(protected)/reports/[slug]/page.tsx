import { db } from '@/firebase/admin';
import { notFound } from 'next/navigation';
import {
  Baby,
  BadgePlus,
  Calendar,
  Clock,
  Mic,
  FileText
} from 'lucide-react';
import React from 'react';

interface Params {
  params: Promise<{ slug: string }>;
}

export const runtime = 'nodejs';

export default async function ConsultationDetailPage({ params }: Params) {
  const { slug } = await params;

  const docRef = db.collection('reports').doc(slug);
  const docSnap = await docRef.get();

  if (!docSnap.exists) return notFound();

  const data = docSnap.data() as {
    formData?: {
      name?: string;
      age?: string;
      gender?: string;
      symptoms?: string;
    };
    transcript?: { role: string; content: string }[];
    analysis?: {
      ayurvedic_diagnosis: {
        dosha_imbalance_summary: string;
        possible_ayurvedic_condition: string;
        personalized_prescription: {
          treatment: string;
          dosage: string;
          frequency: string;
        }[];
        precautionary_advice: string[];
        note: string;
      };
    };
    createdAt?: string;
    duration?: number;
    type?: 'voice' | 'text';
  };

  const {
    formData = {},
    transcript = [],
    analysis = null,
    createdAt = '',
    duration = null,
    type = 'text'
  } = data;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100 space-y-6">
        <div className="flex items-center space-x-4">
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${type === 'voice' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
            {type === 'voice' ? <Mic className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{formData.name || 'Unknown Patient'}</h2>
            <div className="flex gap-4 text-sm text-slate-600 mt-1">
              <span className="flex items-center"><Baby className="w-4 h-4 mr-1" />{formData.age ? `${formData.age} yrs` : 'N/A'}</span>
              <span className="flex items-center"><BadgePlus className="w-4 h-4 mr-1" />{formData.gender || 'N/A'}</span>
              <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" />{new Date(createdAt || '').toLocaleDateString()}</span>
              {duration && <span className="flex items-center"><Clock className="w-4 h-4 mr-1" />{Math.floor(duration / 60)}m {duration % 60}s</span>}
            </div>
          </div>
        </div>

        <section>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">Reported Symptoms</h3>
          <div className="flex flex-wrap gap-2">
            {formData.symptoms?.trim() ? (
              formData.symptoms.split(',').map((s: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">{s.trim()}</span>
              ))
            ) : (
              <p className="text-slate-500 text-sm">No symptoms provided.</p>
            )}
          </div>
        </section>

        {analysis ? (
          <section className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">Dosha Imbalance Summary</h3>
              <p className="bg-yellow-50 border border-yellow-100 text-sm text-slate-700 p-4 rounded-xl">
                {analysis.ayurvedic_diagnosis.dosha_imbalance_summary}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">Possible Ayurvedic Condition</h3>
              <p className="bg-pink-50 border border-pink-100 text-sm text-slate-700 p-4 rounded-xl">
                {analysis.ayurvedic_diagnosis.possible_ayurvedic_condition}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">Prescription</h3>
              <div className="space-y-4">
                {analysis.ayurvedic_diagnosis.personalized_prescription?.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                    <p className="text-sm text-slate-700"><strong>Treatment:</strong> {item.treatment}</p>
                    <p className="text-sm text-slate-700"><strong>Dosage:</strong> {item.dosage}</p>
                    <p className="text-sm text-slate-700"><strong>Frequency:</strong> {item.frequency}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">Precautionary Advice</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                {analysis.ayurvedic_diagnosis.precautionary_advice?.map((p: string, i: number) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">Doctor's Note</h3>
              <p className="text-slate-600 text-sm italic bg-white border border-slate-200 p-4 rounded-xl">
                {analysis.ayurvedic_diagnosis.note}
              </p>
            </div>
          </section>
        ) : (
          <p className="text-slate-500 text-sm">No analysis available for this report yet.</p>
        )}

        {transcript.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">Transcript</h3>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2 text-sm text-slate-700 max-h-96 overflow-y-auto">
              {transcript.map((msg, idx) => (
                <p key={idx}><strong>{msg.role}:</strong> {msg.content}</p>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}