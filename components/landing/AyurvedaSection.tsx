import { Heart, Leaf, Shield, Sparkles } from "lucide-react";

export const AyurvedaSection = () => {
  const features = [
    {
      title: 'Dosha-Based Diagnosis',
      description: 'Personalized assessment of your unique constitution',
      icon: <Leaf className="w-6 h-6" />
    },
    {
      title: 'Herbal Medicine Plans',
      description: 'Carefully curated remedies for your specific needs',
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      title: 'Preventive Insights',
      description: 'Early detection and prevention strategies',
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: 'Mind-Body Balance',
      description: 'Holistic approach to mental and physical wellness',
      icon: <Heart className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 space-y-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <Leaf className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl sm:text-6xl font-light text-white tracking-tight">
            Ayurveda in the
            <span className="block font-medium text-emerald-400 mt-3">
              Digital Age
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-slate-300 font-light max-w-4xl mx-auto leading-relaxed">
            As modern healthcare evolves, the world rediscovers Ayurveda — a 5000-year-old holistic system that treats the root, not just symptoms. Dr. Veda fuses this ancient wisdom with cutting-edge AI to make personalized healing accessible to everyone.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-emerald-400/30 transition-all duration-500 hover:bg-white/10 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-white text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-300 text-sm font-light leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-8 pt-16 border-t border-white/10">
          <div className="text-center space-y-2">
            <div className="text-4xl font-light text-emerald-400">5000+</div>
            <div className="text-slate-300 font-light">Years of Wisdom</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-light text-emerald-400">15,000+</div>
            <div className="text-slate-300 font-light">Lives Transformed</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-light text-emerald-400">98%</div>
            <div className="text-slate-300 font-light">Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};