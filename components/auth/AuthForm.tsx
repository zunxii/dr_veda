'use client';
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ChevronRight, Shield, Brain } from 'lucide-react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/client';
import { signIn, signUp } from '@/lib/actions/auth.action';
import { useRouter } from 'next/navigation';

interface AuthFormProps {
  type: 'sign-in' | 'sign-up';
  onSubmit?: (data: any) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
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
    try {
          if(type==='sign-up'){
      const { name, email, password } = formData;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
    
    const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password,
        });
    router.push("/sign-in");
  }else{
    const {email, password} = formData;

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    const idToken = await userCredential.user.getIdToken();

    await signIn({
          email,
          idToken,
        });
    router.push("/");
  }
    } catch (error) {
     console.log(error); 
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
    <div className="min-h-screen bg-gradient-to-tr from-emerald-50 to-teal-50 flex items-center justify-center px-4 py-6">
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
              : 'Sign in to continue your wellness journey'
            }
          </p>
        </div>

        {/* Form Card */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-teal-500/10 rounded-2xl blur-xl"></div>
          <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-5 border border-emerald-100 shadow-xl">
            <div className="space-y-4">
              {/* Form Fields */}
              <div className="space-y-3">
                {/* Name Field (Sign Up Only) */}
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

                {/* Email Field */}
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

                {/* Password Field */}
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

              {/* Remember Me / Forgot Password / Terms */}
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

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full group bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg font-medium shadow-md transition-all transform hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span className="flex items-center justify-center">
                    {isSignUp ? 'Create Account' : 'Sign In'}
                    <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative pt-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white text-slate-500">or continue with</span>
                </div>
              </div>

              {/* Google Sign In */}
              <div className="pt-2">
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-3 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="ml-2 text-sm font-medium text-slate-700">Continue with Google</span>
                </button>
              </div>
            </div>

            {/* Footer */}
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

            {/* Security Badge */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-bit SSL encryption • HIPAA compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;