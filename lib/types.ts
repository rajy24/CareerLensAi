export type RoleCategory = 'frontend' | 'backend' | 'fullstack' | 'data' | 'general';

export type PriorityLevel = 'high' | 'medium' | 'low' | 'supplementary';

export type ApplicationStatus = 'Wishlist' | 'Applied' | 'Interviewing' | 'Offer' | 'Rejected';

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  headline?: string;
  bio?: string;
  skills: string[];
  target_role?: string;
  created_at: string;
  updated_at: string;
}

export interface ResumeData {
  id: string;
  user_id: string;
  file_name: string;
  file_path?: string;
  file_size?: number;
  extracted_text: string;
  detected_skills: string[];
  education?: string[];
  experience_years?: number;
  created_at: string;
  updated_at: string;
}

export interface JobAnalysisResult {
  id: string;
  user_id?: string;
  job_title: string;
  company_name: string;
  job_text: string;
  detected_jd_skills: string[];
  matched_skills: string[];
  missing_skills: string[];
  required_skills: string[];
  preferred_skills: string[];
  match_percentage: number | null;
  readiness_level: string;
  readiness_badge_class: string;
  readiness_headline: string;
  readiness_description: string;
  math_explanation: {
    total_jd_count: number;
    matched_count: number;
    missing_count: number;
    percentage: number | null;
    formula_str: string;
    calculation_str: string;
  };
  created_at: string;
}

export interface LearningPlanItem {
  id: string;
  user_id?: string;
  skill_name: string;
  priority: PriorityLevel;
  timeframe: string;
  concepts: string[];
  mini_project: string;
  resources: Array<{ name: string; url: string }>;
  completed: boolean;
  target_deadline?: string;
  created_at: string;
}

export interface InterviewQuestion {
  id: string;
  role: RoleCategory;
  category: 'technical' | 'coding' | 'hr';
  difficulty: 'easy' | 'medium' | 'hard';
  title: string;
  answer: string;
  keyPoints?: string[];
  codeSnippet?: string;
  practiced?: boolean;
}

export interface JobApplication {
  id: string;
  user_id?: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  date_applied?: string;
  job_url?: string;
  skills?: string;
  notes?: string;
  follow_up_date?: string;
  salary_range?: string;
  is_sample?: boolean;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsSummary {
  total_applications: number;
  active_applications: number;
  offers_count: number;
  interviews_count: number;
  skills_in_profile: number;
  identified_gaps: number;
  skills_completed: number;
  practiced_questions_count: number;
  latest_match_percentage: number | null;
}
