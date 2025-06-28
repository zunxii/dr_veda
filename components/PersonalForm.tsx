'use client';
import { PersonalFormProps } from '@/types';
import React, { useState } from 'react';

const PersonalForm: React.FC<PersonalFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    symptoms: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.gender) return;
    onSubmit({ 
      name: formData.name, 
      age: parseInt(formData.age), 
      gender: formData.gender,
      symptoms: formData.symptoms
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-3xl shadow-xl border border-rose-100">
      <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center">Patient Information</h3>
      <div className="grid gap-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-300"
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-300"
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-300"
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <textarea
          name="symptoms"
          placeholder="Describe current symptoms or health concerns"
          value={formData.symptoms}
          onChange={handleChange}
          rows={4}
          className="px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-300"
        ></textarea>
        <button
          type="submit"
          className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
        >
          Save & Continue
        </button>
      </div>
    </form>
  );
};

export default PersonalForm;
