'use client';

import React, { useState, useRef } from 'react';
import { PersonalFormProps } from '@/types';
import { Upload, FileText, CheckCircle, Download } from 'lucide-react';
import { UploadedReport } from '@/types';

const PersonalForm: React.FC<PersonalFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    symptoms: ''
  });

  const [uploadedReport, setUploadedReport] = useState<UploadedReport | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileSelect = async (file: File) => {
    // Mocked upload logic (replace with actual OCR integration)
    await new Promise(res => setTimeout(res, 1000));
    setUploadedReport({
      id: Date.now().toString(),
      fileName: file.name,
      uploadDate: new Date().toISOString(),
      analysisStatus: 'completed',
      extractedData: {
        bloodPressure: '120/80 mmHg',
        heartRate: '72 bpm',
        bloodSugar: '95 mg/dL',
        cholesterol: '185 mg/dL',
      },
      aiInsights: [
        'Blood pressure is within normal range',
        'Heart rate indicates good cardiovascular health',
      ],
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.gender) return;
    onSubmit({
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender,
      symptoms: formData.symptoms,
      uploadedReport,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-3xl shadow-xl border border-emerald-100 space-y-8"
    >
      <div className="text-center">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Patient Information</h3>
        <p className="text-slate-600 text-sm max-w-md mx-auto">
          Enter your details and upload medical report (optional)
        </p>
      </div>

      {/* Patient Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="name"
          placeholder="Full Name *"
          value={formData.name}
          onChange={handleChange}
          className="px-4 py-3 rounded-xl border border-emerald-200 bg-white focus:ring-2 focus:ring-emerald-300 outline-none"
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age *"
          value={formData.age}
          onChange={handleChange}
          className="px-4 py-3 rounded-xl border border-emerald-200 bg-white focus:ring-2 focus:ring-emerald-300 outline-none"
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="px-4 py-3 rounded-xl border border-emerald-200 bg-white focus:ring-2 focus:ring-emerald-300 outline-none"
          required
        >
          <option value="">Select Gender *</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          name="symptoms"
          placeholder="Symptoms (optional)"
          value={formData.symptoms}
          onChange={handleChange}
          className="px-4 py-3 rounded-xl border border-emerald-200 bg-white focus:ring-2 focus:ring-emerald-300 outline-none col-span-full"
        />
      </div>

      {/* Report Upload */}
      <div>
        <h4 className="text-lg font-semibold text-slate-700 mb-3">Upload Report (optional)</h4>

        {!uploadedReport ? (
          <div
            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 ${
              dragOver
                ? 'border-emerald-400 bg-emerald-50'
                : 'border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50/30'
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
          >
            <Upload className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <p className="text-sm text-slate-600">Drop a file here or click below to browse</p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl font-medium transition"
            >
              Choose File
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={(e) =>
                e.target.files?.[0] && handleFileSelect(e.target.files[0])
              }
            />
          </div>
        ) : (
          <div className="bg-white/80 rounded-xl p-4 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-slate-700 font-medium">{uploadedReport.fileName}</span>
              </div>
              <Download className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-sm text-slate-600">
              {uploadedReport.aiInsights?.map((line, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 mt-1 text-emerald-500" />
                  <p>{line}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="text-center pt-4">
        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition"
        >
          Continue to Voice Consultation
        </button>
      </div>
    </form>
  );
};

export default PersonalForm;
