import { Instagram, Mail, Twitter } from "lucide-react";

export const Footer = () => (
  <footer className="bg-slate-900 text-slate-300 py-12">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
      <div>
        <h3 className="text-white font-semibold text-xl mb-4">Dr. Veda</h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          Your AI-powered Ayurvedic companion for personalized wellness, dosha diagnosis,
          and holistic healing.
        </p>
      </div>

      <div className="space-y-3">
        <h4 className="text-white font-semibold text-lg">Quick Links</h4>
        <ul className="text-slate-400 text-sm space-y-2">
          <li><a href="/consultation" className="hover:text-white">Start Consultation</a></li>
          <li><a href="/reports" className="hover:text-white">Reports</a></li>
          <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
        </ul>
      </div>

      <div className="space-y-3">
        <h4 className="text-white font-semibold text-lg">Connect With Us</h4>
        <div className="flex space-x-4">
          <a href="#" className="text-slate-400 hover:text-white">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="text-slate-400 hover:text-white">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="mailto:support@drveda.ai" className="text-slate-400 hover:text-white">
            <Mail className="w-5 h-5" />
          </a>
        </div>
        <p className="text-xs text-slate-500 pt-6">© {new Date().getFullYear()} Dr. Veda. All rights reserved.</p>
      </div>
    </div>
  </footer>
);