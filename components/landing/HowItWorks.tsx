import {
  FilePlus,
  Bot,
  ClipboardList,
  Leaf,
  CheckCircle,
} from "lucide-react";
import React from "react";

const steps = [
  {
    step: "01",
    title: "Submit Medical History",
    description:
      "Upload previous reports (PDFs/images) and fill a brief health form including age, gender, lifestyle habits, and medical conditions.",
    icon: <FilePlus className="w-8 h-8" />,
    features: ["OCR Report Parsing", "Health Form Intake", "Secure Upload"],
  },
  {
    step: "02",
    title: "Talk to Dr. Veda (AI)",
    description:
      "Have a natural voice conversation with our AI Ayurvedic doctor trained on clinical knowledge and traditional texts.",
    icon: <Bot className="w-8 h-8" />,
    features: ["Voice Consultation", "Dosha-Based Diagnosis", "Symptom Mapping"],
  },
  {
    step: "03",
    title: "Receive Your Analysis Report",
    description:
      "Get a structured health report that analyzes your current state, dosha imbalances, red flags, and wellness goals.",
    icon: <ClipboardList className="w-8 h-8" />,
    features: ["Dosha Assessment", "Red Flag Detection", "Progress Charting"],
  },
  {
    step: "04",
    title: "Personalized Ayurvedic Remedies",
    description:
      "Receive AI-recommended herbs, diet charts, yoga/meditation tips, and home remedies tailored to your constitution.",
    icon: <Leaf className="w-8 h-8" />,
    features: ["Herbal Recommendations", "Diet & Lifestyle Plan", "Home Remedies"],
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-4xl sm:text-5xl font-light text-slate-900 tracking-tight">
            How Dr. Veda
            <span className="block font-medium text-emerald-600 mt-2">
              Works
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 font-light max-w-3xl mx-auto leading-relaxed">
            A seamless 4-step consultation process blending advanced AI with
            traditional Ayurvedic wisdom.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1 h-full w-px bg-gradient-to-b from-emerald-200 via-emerald-300 to-emerald-200"></div>

          <div className="space-y-24">
            {steps.map((item, index) => (
              <div
                key={index}
                className={`relative flex flex-col lg:flex-row ${
                  index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                } items-start lg:items-center gap-12`}
              >
                {/* Left Column */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                      {item.icon}
                    </div>
                    <div className="text-5xl font-light text-emerald-100">
                      {item.step}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    {item.features.map((feature, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Center dot (only for desktop) */}
                <div className="hidden lg:flex w-16 h-16 bg-white border-4 border-emerald-200 rounded-full items-center justify-center shadow-sm z-10">
                  <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                </div>

                {/* Right spacing filler for timeline layout */}
                <div className="hidden lg:block flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
