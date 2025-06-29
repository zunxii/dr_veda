'use client';

import React, { useState } from 'react';

type PersonalFormProps = {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  inlineUpload?: boolean; // can be kept for compatibility, but unused now
};

const PersonalForm: React.FC<PersonalFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white shadow-lg rounded-2xl p-6 sm:p-8"
    >
      <div className="text-lg font-semibold text-slate-700">Personal Information</div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="age">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            required
            value={formData.age}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="gender">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            required
            value={formData.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-teal-500 focus:outline-none"
          >
            <option value="">Select gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md transition duration-200"
      >
        {isLoading ? 'Submitting...' : 'Continue to Report Upload'}
      </button>
    </form>
  );
};

export default PersonalForm;
