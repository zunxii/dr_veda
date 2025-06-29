import { Heart, Users, Sparkles, Award, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const Community: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const communityHighlights = [
    {
      icon: <Users className="w-6 h-6" />,
      number: "15,000+",
      label: "Wellness Journeys",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      number: "98%",
      label: "Satisfaction Rate",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: <Award className="w-6 h-6" />,
      number: "24/7",
      label: "AI Guidance",
      color: "from-purple-500 to-violet-600"
    }
  ];

  return (
    <section className="relative py-32 bg-gradient-to-b from-white via-slate-50/30 to-white overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-100/15 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20 space-y-8">
          <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span className="text-emerald-700 font-medium text-sm">Trusted Community</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-light text-slate-800 leading-tight max-w-4xl mx-auto">
            Where ancient wisdom meets
            <span className="block font-medium bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              modern wellness
            </span>
          </h2>

          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-light">
            Join thousands in their journey toward holistic health through personalized Ayurvedic guidance powered by intelligent technology.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {communityHighlights.map((item, index) => (
            <div 
              key={index}
              className="group relative bg-white/60 backdrop-blur-sm border border-slate-100 rounded-2xl p-8 text-center hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-500 hover:-translate-y-1"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center text-white mx-auto mb-6 transition-transform duration-300 ${hoveredCard === index ? 'scale-110' : ''}`}>
                {item.icon}
              </div>
              
              <div className="text-3xl font-light text-slate-800 mb-2">
                {item.number}
              </div>
              
              <div className="text-slate-600 font-medium">
                {item.label}
              </div>
            </div>
          ))}
        </div>
        <div className="relative">
          <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-3xl p-16 text-center text-white shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
            
            <div className="relative z-10 space-y-8">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-white" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-light">
                  Begin your wellness journey
                </h3>
                
                <p className="text-emerald-100 text-lg max-w-2xl mx-auto leading-relaxed font-light">
                  Experience personalized Ayurvedic consultations designed for your unique constitution and health goals.
                </p>
              </div>  
              <div className="pt-4">
                <Link href='/consultation'>
                <button className="group inline-flex items-center gap-3 bg-white text-emerald-700 px-8 py-4 rounded-2xl font-medium hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                  <Zap className="w-5 h-5 group-hover:text-emerald-600 transition-colors" />
                  Start Free Consultation
                </button>
                </Link>
              </div>
              <div className="flex justify-center items-center gap-12 pt-8 mt-8 border-t border-white/20">
                <div className="text-center">
                  <div className="text-lg font-medium">SSL Secured</div>
                  <div className="text-emerald-200 text-sm font-light">256-bit encryption</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-medium">HIPAA Compliant</div>
                  <div className="text-emerald-200 text-sm font-light">Privacy protected</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-medium">24/7 Support</div>
                  <div className="text-emerald-200 text-sm font-light">Always available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};