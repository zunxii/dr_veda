export interface ConsultationData {
  analysis: any;
  id: string;
  createdAt: string;
  symptoms: string;
  formData: PersonalFormData;
  diagnosis: string;
  recommendations: string[];
  type: 'voice' | 'report';
  duration?: number;
  reportData?: UploadedReport;
}

export interface CreateReportParams{
  userId : string;
  formData : PersonalFormData;
  transcript: { role: string; content: string }[];
  reportId: string;
}

export interface DoshaResult {
  type: 'vata' | 'pitta' | 'kapha';
  percentage: number;
  description: string;
}

export interface PersonalFormData {
    name: string;
    age: number;
    gender: string;
    symptoms: string;
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
export interface HeroSectionProps {
  onStartConsultation: () => void;
}

export interface PrescriptionItem {
  treatment: string;
  dosage: string;
  frequency: string;
}

export interface AyurvedicDiagnosis {
  dosha_imbalance_summary: string;
  possible_ayurvedic_condition: string;
  personalized_prescription: PrescriptionItem[];
  precautionary_advice: string[];
  note: string;
}
export interface ConsultationHistoryProps {
  consultations: ConsultationData[];
  showFullHistory?: boolean;
  onViewAll?: () => void;
}

export interface VoiceConsultationProps {
  voiceSession: VoiceSession;
  onToggleVoice: () => void;
  onEndSession: () => void;
  isLoading: boolean;
  reportId : string
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

export interface SignUpParams {
  uid: string;
  name: string;
  email: string;
  password: string;
}

export interface SignInParams {
  email: string;
  idToken: string;
}
export interface User {
  name: string;
  email: string;
  id: string;
}