import React from 'react';
import { Sparkles, Users, MessageCircleHeart, Instagram, Twitter, Mail, Leaf, Heart, Award, Shield, Quote, Star } from 'lucide-react';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Anjali Sharma",
      location: "Chandigarh, India",
      rating: 5,
      text: "Dr. Veda helped me understand my body and mind better than any other consultation I've had. The personalized remedies are simple yet incredibly effective.",
      avatar: "AS",
      condition: "Digestive Health",
      timeframe: "3 months"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Mumbai, India", 
      rating: 5,
      text: "The AI consultation felt so natural and insightful. My energy levels have improved dramatically following the dosha-based recommendations.",
      avatar: "RK",
      condition: "Energy & Vitality",
      timeframe: "2 months"
    },
    {
      id: 3,
      name: "Priya Mehta",
      location: "Bangalore, India",
      rating: 5,
      text: "Finally found a holistic approach that works! The combination of traditional wisdom and modern AI is truly revolutionary for wellness.",
      avatar: "PM",
      condition: "Stress Management",
      timeframe: "4 months"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-emerald-50 via-white to-teal-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 space-y-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
              <MessageCircleHeart className="w-6 h-6 text-white" />
            </div>
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          </div>
          
          <h2 className="text-4xl sm:text-6xl font-light text-slate-900 tracking-tight">
            What Our
            <span className="block font-medium text-emerald-600 mt-2">
              Patients Say
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-slate-600 font-light max-w-3xl mx-auto leading-relaxed">
            Real stories from users who've transformed their wellness journey with Dr. Veda's personalized guidance.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 hover:border-emerald-200 hover:-translate-y-2"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-6 pt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-slate-700 text-base leading-relaxed mb-8 font-light">
                "{testimonial.text}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900 text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-slate-500 mb-1">
                    {testimonial.location}
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                      {testimonial.condition}
                    </span>
                    <span className="text-slate-400">
                      {testimonial.timeframe}
                    </span>
                  </div>
                </div>
              </div>

              {/* Hover Effect Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 pt-12 border-t border-emerald-100">
          <div className="flex items-center gap-3 text-slate-600">
            <Shield className="w-5 h-5 text-emerald-600" />
            <span className="font-medium">Verified Reviews</span>
          </div>
          <div className="flex items-center gap-3 text-slate-600">
            <Award className="w-5 h-5 text-emerald-600" />
            <span className="font-medium">98% Satisfaction Rate</span>
          </div>
          <div className="flex items-center gap-3 text-slate-600">
            <Heart className="w-5 h-5 text-emerald-600" />
            <span className="font-medium">15,000+ Happy Patients</span>
          </div>
        </div>
      </div>
    </section>
  );
};