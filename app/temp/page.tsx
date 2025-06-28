'use client';

import { useState } from 'react';
import { uploadForOCR } from '@/lib/ocr';

export default function OCRUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    setText('');
    setError('');
    setFile(selected || null);
  };

  const handleUploadClick = async () => {
    if (!file) return setError('Please select a file first.');

    setLoading(true);
    setError('');
    try {
      const extracted = await uploadForOCR(file);
      setText(extracted);
    } catch (err: any) {
      setError(err.message || 'Failed to extract text');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto p-6 bg-white rounded-xl shadow">
      <div>
        <label className="block font-medium text-slate-700 mb-1">Upload a report</label>
        <input type="file" accept="image/*,.pdf" onChange={handleFileChange} />
      </div>

      <button
        onClick={handleUploadClick}
        disabled={loading || !file}
        className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 disabled:opacity-50"
      >
        {loading ? 'Extracting...' : 'Start OCR'}
      </button>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 p-2 rounded">
          ❌ {error}
        </p>
      )}

      {text && (
        <div className="bg-gray-100 p-4 rounded-lg whitespace-pre-wrap">
          <h3 className="font-semibold mb-2 text-slate-700">Extracted Text:</h3>
          <pre className="text-slate-800 text-sm">{text}</pre>
        </div>
      )}
    </div>
  );
}
