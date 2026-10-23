'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { 
  UserProfile, 
  ResumeData, 
  JobAnalysisResult, 
  LearningPlanItem, 
  JobApplication, 
  AnalyticsSummary 
} from './types';
import { extractSkills, analyzeJobCompatibility } from './analyzer';
import { SKILL_ROADMAPS } from './roadmaps-data';
import { SAMPLE_JDS } from './sample-jds';
import { createClient, isSupabaseConfigured } from './supabase/client';

interface CareerLensContextType {
  // Authentication & Mode
  user: any | null;
  isSupabaseActive: boolean;
  isDemoMode: boolean;
  isLoading: boolean;
  
  // Data
  profile: UserProfile;
  resumes: ResumeData[];
  currentResume: ResumeData | null;
  analyses: JobAnalysisResult[];
  latestAnalysis: JobAnalysisResult | null;
  learningPlan: LearningPlanItem[];
  practicedQuestions: Set<string>;
  applications: JobApplication[];
  analytics: AnalyticsSummary;

  // Actions
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  addSkills: (skillsStr: string) => Promise<void>;
  removeSkill: (skill: string) => Promise<void>;
  processResumeText: (fileName: string, extractedText: string) => Promise<ResumeData>;
  runAnalysis: (jdText: string, title?: string, company?: string) => Promise<JobAnalysisResult>;
  toggleLearningPlanItem: (id: string) => Promise<void>;
  deleteLearningPlanItem: (id: string) => Promise<void>;
  addCustomLearningPlanItem: (item: Omit<LearningPlanItem, 'id' | 'created_at'>) => Promise<void>;
  generatePlanFromMissing: (missingSkills: string[]) => Promise<void>;
  toggleQuestionPracticed: (questionId: string) => Promise<void>;
  saveApplication: (appData: Omit<JobApplication, 'id' | 'created_at' | 'updated_at'>, existingId?: string) => Promise<void>;
  deleteApplication: (id: string) => Promise<void>;
  updateApplicationStatus: (id: string, newStatus: JobApplication['status']) => Promise<void>;
  loadSampleData: () => void;
  resetAllData: () => void;
  signOutUser: () => Promise<void>;
}

const defaultProfile: UserProfile = {
  id: 'guest-user',
  email: 'user@careerlens.local',
  full_name: 'Alex Mercer',
  headline: 'Junior Software Engineer & Computer Science Graduate',
  bio: 'Passionate about frontend architecture, accessible UX, and resilient backend APIs.',
  skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
  target_role: 'Frontend Engineer',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const CareerLensContext = createContext<CareerLensContextType | undefined>(undefined);

export function CareerLensProvider({ children }: { children: React.ReactNode }) {
  const [supabaseClient] = useState(() => (typeof window !== 'undefined' ? createClient() : null));
  const isSupabaseActive = isSupabaseConfigured();

  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [analyses, setAnalyses] = useState<JobAnalysisResult[]>([]);
  const [learningPlan, setLearningPlan] = useState<LearningPlanItem[]>([]);
  const [practicedQuestions, setPracticedQuestions] = useState<Set<string>>(new Set());
  const [applications, setApplications] = useState<JobApplication[]>([]);

  // 1. Initial Load from Supabase or localStorage
  useEffect(() => {
    async function init() {
      setIsLoading(true);
      try {
        if (isSupabaseActive && supabaseClient) {
          const { data: { session } } = await supabaseClient.auth.getSession();
          if (session?.user) {
            setUser(session.user);
            await fetchSupabaseUserData(session.user.id);
            setIsLoading(false);
            return;
          }
        }

        // LocalStorage fallback for demo/guest mode
        loadFromLocalStorage();
      } catch (err) {
        console.warn('[CareerLens] Init error, falling back to local storage:', err);
        loadFromLocalStorage();
      } finally {
        setIsLoading(false);
      }
    }

    init();

    // Listen for auth state changes if Supabase is active
    if (isSupabaseActive && supabaseClient) {
      const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          await fetchSupabaseUserData(session.user.id);
        } else {
          setUser(null);
          loadFromLocalStorage();
        }
      });
      return () => subscription.unsubscribe();
    }
  }, [isSupabaseActive, supabaseClient]);

  function loadFromLocalStorage() {
    try {
      const savedProfile = localStorage.getItem('careerlens_profile');
      if (savedProfile) setProfile(JSON.parse(savedProfile));

      const savedResumes = localStorage.getItem('careerlens_resumes');
      if (savedResumes) setResumes(JSON.parse(savedResumes));

      const savedAnalyses = localStorage.getItem('careerlens_analyses');
      if (savedAnalyses) setAnalyses(JSON.parse(savedAnalyses));

      const savedPlan = localStorage.getItem('careerlens_learning_plan');
      if (savedPlan) setLearningPlan(JSON.parse(savedPlan));

      const savedPracticed = localStorage.getItem('careerlens_practiced');
      if (savedPracticed) setPracticedQuestions(new Set(JSON.parse(savedPracticed)));

      const savedApps = localStorage.getItem('careerlens_applications');
      if (savedApps) setApplications(JSON.parse(savedApps));
    } catch (e) {
      console.warn('Failed to parse local storage records', e);
    }
  }

  async function fetchSupabaseUserData(userId: string) {
    if (!supabaseClient) return;

    try {
      // 1. Profile
      const { data: profileData } = await supabaseClient
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (profileData) setProfile(profileData);

      // 2. Resumes
      const { data: resumeData } = await supabaseClient
        .from('resumes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (resumeData) setResumes(resumeData);

      // 3. Analyses
      const { data: analysisData } = await supabaseClient
        .from('job_analyses')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (analysisData) setAnalyses(analysisData);

      // 4. Learning Plans
      const { data: planData } = await supabaseClient
        .from('learning_plans')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (planData) setLearningPlan(planData);

      // 5. Practiced Questions
      const { data: practicedData } = await supabaseClient
        .from('interview_sessions')
        .select('question_id')
        .eq('user_id', userId)
        .eq('practiced', true);
      if (practicedData) {
        setPracticedQuestions(new Set(practicedData.map((d: any) => d.question_id)));
      }

      // 6. Applications
      const { data: appData } = await supabaseClient
        .from('job_applications')
        .select('*')
        .eq('user_id', userId)
        .order('date_applied', { ascending: false });
      if (appData) setApplications(appData);
    } catch (e) {
      console.error('Error fetching Supabase user data:', e);
    }
  }

  // 2. State Actions

  const updateProfile = async (data: Partial<UserProfile>) => {
    const updated = { ...profile, ...data, updated_at: new Date().toISOString() };
    setProfile(updated);
    localStorage.setItem('careerlens_profile', JSON.stringify(updated));

    if (isSupabaseActive && supabaseClient && user) {
      await supabaseClient.from('profiles').upsert({ ...updated, id: user.id });
    }
  };

  const addSkills = async (skillsStr: string) => {
    const tokens = skillsStr.split(',').map(s => s.trim()).filter(Boolean);
    const existing = new Set(profile.skills.map(s => s.toLowerCase()));
    const toAdd: string[] = [];

    tokens.forEach(tok => {
      if (!existing.has(tok.toLowerCase())) {
        toAdd.push(tok);
        existing.add(tok.toLowerCase());
      }
    });

    if (toAdd.length > 0) {
      const newSkills = [...profile.skills, ...toAdd];
      await updateProfile({ skills: newSkills });
    }
  };

  const removeSkill = async (skillToRemove: string) => {
    const newSkills = profile.skills.filter(s => s.toLowerCase() !== skillToRemove.toLowerCase());
    await updateProfile({ skills: newSkills });
  };

  const processResumeText = async (fileName: string, extractedText: string): Promise<ResumeData> => {
    const detected = extractSkills(extractedText);
    
    // Automatically add newly detected skills to user profile if not present
    const profileSet = new Set(profile.skills.map(s => s.toLowerCase()));
    const newProfileSkills = [...profile.skills];
    detected.forEach(skill => {
      if (!profileSet.has(skill.toLowerCase())) {
        newProfileSkills.push(skill);
        profileSet.add(skill.toLowerCase());
      }
    });

    const newResume: ResumeData = {
      id: `resume-${Date.now()}`,
      user_id: user?.id || 'guest-user',
      file_name: fileName,
      file_size: extractedText.length,
      extracted_text: extractedText,
      detected_skills: detected,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const updatedResumes = [newResume, ...resumes];
    setResumes(updatedResumes);
    localStorage.setItem('careerlens_resumes', JSON.stringify(updatedResumes));

    await updateProfile({ skills: newProfileSkills });

    if (isSupabaseActive && supabaseClient && user) {
      await supabaseClient.from('resumes').insert({
        user_id: user.id,
        file_name: fileName,
        extracted_text: extractedText,
        detected_skills: detected,
      });
    }

    return newResume;
  };

  const runAnalysis = async (
    jdText: string, 
    title: string = 'Target Position', 
    company: string = 'Hiring Company'
  ): Promise<JobAnalysisResult> => {
    const result = analyzeJobCompatibility(profile.skills, jdText, title, company);
    const updated = [result, ...analyses];
    setAnalyses(updated);
    localStorage.setItem('careerlens_analyses', JSON.stringify(updated));

    if (result.missing_skills.length > 0) {
      await generatePlanFromMissing(result.missing_skills);
    }

    if (isSupabaseActive && supabaseClient && user) {
      await supabaseClient.from('job_analyses').insert({
        user_id: user.id,
        job_title: title,
        company_name: company,
        job_text: jdText,
        detected_jd_skills: result.detected_jd_skills,
        matched_skills: result.matched_skills,
        missing_skills: result.missing_skills,
        required_skills: result.required_skills,
        preferred_skills: result.preferred_skills,
        match_percentage: result.match_percentage,
        readiness_level: result.readiness_level,
        math_explanation: result.math_explanation,
      });
    }

    return result;
  };

  const generatePlanFromMissing = async (missingSkills: string[]) => {
    const existingSkills = new Set(learningPlan.map(p => p.skill_name.toLowerCase()));
    const newItems: LearningPlanItem[] = [];

    missingSkills.forEach(skill => {
      const lower = skill.toLowerCase();
      if (!existingSkills.has(lower)) {
        const roadmapDef = SKILL_ROADMAPS[lower] || {
          priority: 'medium',
          timeframe: 'Week 1–2 (6–8 hrs)',
          concepts: ['Core fundamentals', 'Standard patterns', 'Error debugging', 'Project integration'],
          miniProject: `Build a focused prototype demonstrating ${skill}.`,
          resources: [{ name: 'Official Guides & Docs', url: `https://www.google.com/search?q=${encodeURIComponent(skill + ' documentation')}` }]
        };

        newItems.push({
          id: `plan-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          user_id: user?.id || 'guest-user',
          skill_name: skill,
          priority: roadmapDef.priority,
          timeframe: roadmapDef.timeframe,
          concepts: roadmapDef.concepts,
          mini_project: roadmapDef.miniProject,
          resources: roadmapDef.resources,
          completed: false,
          created_at: new Date().toISOString(),
        });
      }
    });

    if (newItems.length > 0) {
      const updated = [...newItems, ...learningPlan];
      setLearningPlan(updated);
      localStorage.setItem('careerlens_learning_plan', JSON.stringify(updated));

      if (isSupabaseActive && supabaseClient && user) {
        await supabaseClient.from('learning_plans').insert(
          newItems.map(item => ({
            user_id: user.id,
            skill_name: item.skill_name,
            priority: item.priority,
            timeframe: item.timeframe,
            concepts: item.concepts,
            mini_project: item.mini_project,
            resources: item.resources,
            completed: false,
          }))
        );
      }
    }
  };

  const toggleLearningPlanItem = async (id: string) => {
    const updated = learningPlan.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setLearningPlan(updated);
    localStorage.setItem('careerlens_learning_plan', JSON.stringify(updated));

    if (isSupabaseActive && supabaseClient && user) {
      const target = updated.find(i => i.id === id);
      if (target) {
        await supabaseClient
          .from('learning_plans')
          .update({ completed: target.completed })
          .eq('id', id);
      }
    }
  };

  const deleteLearningPlanItem = async (id: string) => {
    const updated = learningPlan.filter(item => item.id !== id);
    setLearningPlan(updated);
    localStorage.setItem('careerlens_learning_plan', JSON.stringify(updated));

    if (isSupabaseActive && supabaseClient && user) {
      await supabaseClient.from('learning_plans').delete().eq('id', id);
    }
  };

  const addCustomLearningPlanItem = async (item: Omit<LearningPlanItem, 'id' | 'created_at'>) => {
    const newItem: LearningPlanItem = {
      ...item,
      id: `plan-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      created_at: new Date().toISOString(),
    };
    const updated = [newItem, ...learningPlan];
    setLearningPlan(updated);
    localStorage.setItem('careerlens_learning_plan', JSON.stringify(updated));

    if (isSupabaseActive && supabaseClient && user) {
      await supabaseClient.from('learning_plans').insert({
        user_id: user.id,
        skill_name: item.skill_name,
        priority: item.priority,
        timeframe: item.timeframe,
        concepts: item.concepts,
        mini_project: item.mini_project,
        resources: item.resources,
        completed: item.completed || false,
      });
    }
  };

  const toggleQuestionPracticed = async (questionId: string) => {
    const updated = new Set(practicedQuestions);
    const isNowPracticed = !updated.has(questionId);
    
    if (isNowPracticed) {
      updated.add(questionId);
    } else {
      updated.delete(questionId);
    }

    setPracticedQuestions(updated);
    localStorage.setItem('careerlens_practiced', JSON.stringify(Array.from(updated)));

    if (isSupabaseActive && supabaseClient && user) {
      if (isNowPracticed) {
        await supabaseClient.from('interview_sessions').insert({
          user_id: user.id,
          question_id: questionId,
          practiced: true,
        });
      } else {
        await supabaseClient
          .from('interview_sessions')
          .delete()
          .eq('user_id', user.id)
          .eq('question_id', questionId);
      }
    }
  };

  const saveApplication = async (
    appData: Omit<JobApplication, 'id' | 'created_at' | 'updated_at'>, 
    existingId?: string
  ) => {
    let updated: JobApplication[];

    if (existingId) {
      updated = applications.map(a => 
        a.id === existingId 
          ? { ...a, ...appData, updated_at: new Date().toISOString() } 
          : a
      );
    } else {
      const newApp: JobApplication = {
        ...appData,
        id: `app-${Date.now()}`,
        user_id: user?.id || 'guest-user',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      updated = [newApp, ...applications];
    }

    setApplications(updated);
    localStorage.setItem('careerlens_applications', JSON.stringify(updated));

    if (isSupabaseActive && supabaseClient && user) {
      if (existingId) {
        await supabaseClient
          .from('job_applications')
          .update({
            company: appData.company,
            role: appData.role,
            status: appData.status,
            date_applied: appData.date_applied,
            job_url: appData.job_url,
            skills: appData.skills,
            notes: appData.notes,
            follow_up_date: appData.follow_up_date,
            salary_range: appData.salary_range,
          })
          .eq('id', existingId);
      } else {
        await supabaseClient.from('job_applications').insert({
          user_id: user.id,
          ...appData,
        });
      }
    }
  };

  const deleteApplication = async (id: string) => {
    const updated = applications.filter(a => a.id !== id);
    setApplications(updated);
    localStorage.setItem('careerlens_applications', JSON.stringify(updated));

    if (isSupabaseActive && supabaseClient && user) {
      await supabaseClient.from('job_applications').delete().eq('id', id);
    }
  };

  const updateApplicationStatus = async (id: string, newStatus: JobApplication['status']) => {
    const target = applications.find(a => a.id === id);
    if (!target) return;
    await saveApplication({ ...target, status: newStatus }, id);
  };

  const loadSampleData = () => {
    setIsDemoMode(true);
    const demoProfile: UserProfile = {
      ...defaultProfile,
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Git'],
    };
    setProfile(demoProfile);
    localStorage.setItem('careerlens_profile', JSON.stringify(demoProfile));

    // Sample JD Analysis
    const sampleAnalysis = analyzeJobCompatibility(
      demoProfile.skills,
      SAMPLE_JDS.frontend.text,
      'Junior Frontend Developer',
      'Stripe'
    );
    setAnalyses([sampleAnalysis]);
    localStorage.setItem('careerlens_analyses', JSON.stringify([sampleAnalysis]));

    // Sample Applications
    const sampleApps: JobApplication[] = [
      {
        id: 'sample-app-1',
        company: 'Stripe',
        role: 'Frontend Engineer (Sample)',
        status: 'Interviewing',
        date_applied: new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0],
        job_url: 'https://stripe.com/jobs',
        skills: 'React, TypeScript, CSS',
        notes: 'Round 1 technical screen completed. Scheduled for architecture review.',
        follow_up_date: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
        is_sample: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'sample-app-2',
        company: 'Linear',
        role: 'Junior Product Engineer (Sample)',
        status: 'Applied',
        date_applied: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
        job_url: 'https://linear.app/careers',
        skills: 'React, TypeScript, GraphQL',
        notes: 'Submitted resume and portfolio. Follow up next Monday.',
        follow_up_date: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
        is_sample: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'sample-app-3',
        company: 'Vercel',
        role: 'Solutions Engineer Intern (Sample)',
        status: 'Offer',
        date_applied: new Date(Date.now() - 20 * 86400000).toISOString().split('T')[0],
        job_url: 'https://vercel.com/careers',
        skills: 'Next.js, React, Node.js',
        notes: 'Offer letter received! Reviewing benefits and onboarding timeline.',
        is_sample: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'sample-app-4',
        company: 'Figma',
        role: 'Software Engineer New Grad (Sample)',
        status: 'Wishlist',
        date_applied: '',
        job_url: 'https://figma.com/careers',
        skills: 'TypeScript, WebGL, C++',
        notes: 'Target application opening in November. Refine graphics portfolio.',
        is_sample: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    ];

    setApplications(sampleApps);
    localStorage.setItem('careerlens_applications', JSON.stringify(sampleApps));

    // Sample Practiced Question
    const practiced = new Set(['q-tech-1']);
    setPracticedQuestions(practiced);
    localStorage.setItem('careerlens_practiced', JSON.stringify(Array.from(practiced)));

    // Generate initial sample roadmap
    generatePlanFromMissing(sampleAnalysis.missing_skills);
  };

  const resetAllData = () => {
    setIsDemoMode(false);
    setProfile(defaultProfile);
    setResumes([]);
    setAnalyses([]);
    setLearningPlan([]);
    setPracticedQuestions(new Set());
    setApplications([]);

    localStorage.removeItem('careerlens_profile');
    localStorage.removeItem('careerlens_resumes');
    localStorage.removeItem('careerlens_analyses');
    localStorage.removeItem('careerlens_learning_plan');
    localStorage.removeItem('careerlens_practiced');
    localStorage.removeItem('careerlens_applications');
  };

  const signOutUser = async () => {
    if (isSupabaseActive && supabaseClient) {
      await supabaseClient.auth.signOut();
    }
    setUser(null);
    resetAllData();
  };

  // Analytics derivation
  const analytics: AnalyticsSummary = useMemo(() => {
    const total_applications = applications.length;
    const active_applications = applications.filter(a => a.status === 'Applied' || a.status === 'Interviewing').length;
    const offers_count = applications.filter(a => a.status === 'Offer').length;
    const interviews_count = applications.filter(a => a.status === 'Interviewing').length;
    const skills_in_profile = profile.skills.length;
    const latestAnalysis = analyses[0] || null;
    const identified_gaps = latestAnalysis ? latestAnalysis.missing_skills.length : 0;
    const skills_completed = learningPlan.filter(i => i.completed).length;
    const practiced_questions_count = practicedQuestions.size;
    const latest_match_percentage = latestAnalysis ? latestAnalysis.match_percentage : null;

    return {
      total_applications,
      active_applications,
      offers_count,
      interviews_count,
      skills_in_profile,
      identified_gaps,
      skills_completed,
      practiced_questions_count,
      latest_match_percentage,
    };
  }, [applications, profile.skills, analyses, learningPlan, practicedQuestions]);

  const latestAnalysis = analyses[0] || null;
  const currentResume = resumes[0] || null;

  return (
    <CareerLensContext.Provider
      value={{
        user,
        isSupabaseActive,
        isDemoMode,
        isLoading,
        profile,
        resumes,
        currentResume,
        analyses,
        latestAnalysis,
        learningPlan,
        practicedQuestions,
        applications,
        analytics,
        updateProfile,
        addSkills,
        removeSkill,
        processResumeText,
        runAnalysis,
        toggleLearningPlanItem,
        deleteLearningPlanItem,
        addCustomLearningPlanItem,
        generatePlanFromMissing,
        toggleQuestionPracticed,
        saveApplication,
        deleteApplication,
        updateApplicationStatus,
        loadSampleData,
        resetAllData,
        signOutUser,
      }}
    >
      {children}
    </CareerLensContext.Provider>
  );
}

export function useCareerLens() {
  const context = useContext(CareerLensContext);
  if (!context) {
    throw new Error('useCareerLens must be used within a CareerLensProvider');
  }
  return context;
}
