export type ScreenType = 'home' | 'consultation' | 'reports' | 'profile';

export interface ConsultationData {
  id: string;
  date: string;
  symptoms: string[];
  diagnosis: string;
  recommendations: string[];
  type: 'voice' | 'report';
  duration?: number;
  reportData?: UploadedReport;
}

export interface DoshaResult {
  type: 'vata' | 'pitta' | 'kapha';
  percentage: number;
  description: string;
}

export interface PersonalFormProps {
  onSubmit: (data: {
    name: string;
    age: number;
    gender: string;
    symptoms: string;
    uploadedReport: UploadedReport | null;
  }) => void;
  onUpload: (file: File) => Promise<void>;
  uploadedReport: UploadedReport | null;
  isLoading: boolean;
  inlineUpload?: boolean;
}

export interface VoiceSession {
  isActive: boolean;
  transcript: string;
  duration: number;
  isProcessing: boolean;
}

export interface UploadedReport {
  id: string;
  fileName: string;
  uploadDate: string;
  analysisStatus: 'processing' | 'completed' | 'failed';
  extractedData?: {
    bloodPressure?: string;
    heartRate?: string;
    bloodSugar?: string;
    cholesterol?: string;
  };
  aiInsights?: string[];
}

export interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export interface HeroSectionProps {
  onStartConsultation: () => void;
}

export interface VoiceConsultationProps {
  voiceSession: VoiceSession;
  onToggleVoice: () => void;
  onEndSession: () => void;
  isLoading: boolean;
}

export interface ReportUploadProps {
  onUpload: (file: File) => void;
  uploadedReport: UploadedReport | null;
  isLoading: boolean;
}

export interface DoshaAnalysisProps {
  results: DoshaResult[];
}

export interface ConsultationHistoryProps {
  consultations: ConsultationData[];
  showFullHistory?: boolean;
  onViewAll?: () => void;
}