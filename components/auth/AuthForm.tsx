'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ChevronRight, Shield, Brain } from 'lucide-react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/client';
import { signIn, signUp } from '@/lib/actions/auth.action';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface AuthFormProps {
  type: 'sign-in' | 'sign-up';
  onSubmit?: (data: any) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeToTerms: false
  });

  const isSignUp = type === 'sign-up';

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    setIsLoading(true);

    try {
      if (type === 'sign-up') {
        const { name, email, password } = formData;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password,
        });

        router.push('/sign-in');
      } else {
        const { email, password } = formData;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user.getIdToken();

        await signIn({
          email,
          idToken,
        });

        router.push('/consultation');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirect = () => {
    if (isSignUp) {
      window.location.href = '/sign-in';
    } else {
      window.location.href = '/sign-up';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-emerald-50 to-teal-50 flex items-center justify-center px-4 py-6 relative">
      {isLoading && (
        <div className="absolute inset-0 z-50 bg-white/70 backdrop-blur-sm flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-slate-800 mb-1">
            {isSignUp ? 'Join Dr. Veda' : 'Welcome Back'}
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            {isSignUp
              ? 'Create your account to start your Ayurvedic journey'
              : 'Sign in to continue your wellness journey'}
          </p>
        </div>

        {/* Form Card */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-teal-500/10 rounded-2xl blur-xl"></div>
          <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-5 border border-emerald-100 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                {isSignUp && (
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-700">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="w-full pl-9 pr-9 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms or Remember Me */}
              <div className="pt-1">
                {!isSignUp ? (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-3.5 h-3.5 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                      />
                      <span className="ml-2 text-xs text-slate-600">Remember me</span>
                    </label>
                    <button
                      type="button"
                      className="text-xs text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                ) : (
                  <label className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                      className="w-3.5 h-3.5 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 mt-0.5 flex-shrink-0"
                      required
                    />
                    <span className="text-xs text-slate-600 leading-relaxed">
                      I agree to the <button type="button" className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">Terms of Service</button> and <button type="button" className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">Privacy Policy</button>
                    </span>
                  </label>
                )}
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full group bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg font-medium shadow-md transition-all transform hover:scale-[1.01] active:scale-[0.99]"
                  disabled={isLoading}
                >
                  <span className="flex items-center justify-center">
                    {isSignUp ? 'Create Account' : 'Sign In'}
                    <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </button>
              </div>
              <div className="mt-5 text-center">
                <p className="text-sm text-slate-600">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button
                    onClick={handleRedirect}
                    className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                  >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </button>
                </p>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-bit SSL encryption • HIPAA compliant</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
