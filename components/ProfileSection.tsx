import { Activity, FileText, Heart, Leaf, Mic, Shield, User, Zap } from 'lucide-react';
import React from 'react'

const ProfileSection: React.FC = () => {
  return (
    <div className="max-w-4xl mt-13 mx-auto space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">
          Your Health Profile
        </h1>
        <p className="text-slate-600">
          Manage your personal information and health preferences
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                <User className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">John Doe</h2>
              <p className="text-slate-600">Member since Jan 2024</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-600">Age</span>
                <span className="font-medium text-slate-800">32 years</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-600">Consultations</span>
                <span className="font-medium text-slate-800">12</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-600">Primary Dosha</span>
                <span className="font-medium text-slate-800">Vata</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Health Overview</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-sm text-slate-600">Blood Pressure</p>
                    <p className="font-semibold text-slate-800">120/80 mmHg</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Activity className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="text-sm text-slate-600">Heart Rate</p>
                    <p className="font-semibold text-slate-800">72 bpm</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-slate-600">Blood Sugar</p>
                    <p className="font-semibold text-slate-800">95 mg/dL</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-slate-600">Overall Health</p>
                    <p className="font-semibold text-emerald-600">Excellent</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h3>
            
            <div className="space-y-4">
              {[
                { action: 'Voice consultation completed', time: '2 hours ago', icon: Mic },
                { action: 'Blood report uploaded', time: '1 day ago', icon: FileText },
                { action: 'Dosha analysis updated', time: '3 days ago', icon: Leaf }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <activity.icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                    <p className="text-xs text-slate-600">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection
