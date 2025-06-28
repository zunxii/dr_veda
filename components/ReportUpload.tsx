import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, Download } from 'lucide-react';
import { ReportUploadProps } from '../types';

const ReportUpload: React.FC<ReportUploadProps> = ({ 
  onUpload, 
  uploadedReport, 
  isLoading 
}) => {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    onUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100 shadow-xl">
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-2xl mb-6">
          <FileText className="w-12 h-12 text-white" />
        </div>
        
        <h3 className="text-2xl font-bold text-slate-800 mb-2">
          Upload Medical Report
        </h3>
        <p className="text-slate-600 max-w-sm mx-auto">
          Upload your medical reports for AI-powered analysis and insights
        </p>
      </div>
      
      {!uploadedReport ? (
        <div
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
            dragOver 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-blue-200 hover:border-blue-300 hover:bg-blue-25'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
        >
          <Upload className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <p className="text-slate-700 font-medium mb-2">
            Drop your report here or click to browse
          </p>
          <p className="text-sm text-slate-500 mb-4">
            Supports PDF, JPG, PNG up to 10MB
          </p>
          
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Choose File'}
          </button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            className="hidden"
          />
        </div>
      ) : (
        <div className="bg-white/80 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <h4 className="font-semibold text-slate-800">{uploadedReport.fileName}</h4>
                <p className="text-sm text-slate-600">Analysis completed</p>
              </div>
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600">
              <Download className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-3">
            <h5 className="font-medium text-slate-800">Key Findings:</h5>
            {uploadedReport.aiInsights?.map((insight, index) => (
              <div key={index} className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-600">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportUpload;