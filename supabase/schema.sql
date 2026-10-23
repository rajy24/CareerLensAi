-- ===================================================================
-- CareerLens AI — Supabase Database Schema & Row Level Security (RLS)
-- Run this in your Supabase Project -> SQL Editor
-- ===================================================================

-- 1. Profiles Table (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  headline TEXT DEFAULT 'Early-Career Technologist',
  bio TEXT,
  skills TEXT[] DEFAULT '{}',
  target_role TEXT DEFAULT 'Software Engineer',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Resumes Table
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT,
  file_size INTEGER,
  extracted_text TEXT DEFAULT '',
  detected_skills TEXT[] DEFAULT '{}',
  education TEXT[] DEFAULT '{}',
  experience_years NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Job Analyses Table
CREATE TABLE IF NOT EXISTS public.job_analyses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  job_title TEXT NOT NULL DEFAULT 'Target Role',
  company_name TEXT NOT NULL DEFAULT 'Target Company',
  job_text TEXT NOT NULL,
  detected_jd_skills TEXT[] DEFAULT '{}',
  matched_skills TEXT[] DEFAULT '{}',
  missing_skills TEXT[] DEFAULT '{}',
  required_skills TEXT[] DEFAULT '{}',
  preferred_skills TEXT[] DEFAULT '{}',
  match_percentage INTEGER,
  readiness_level TEXT,
  math_explanation JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Learning Plans Table
CREATE TABLE IF NOT EXISTS public.learning_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  skill_name TEXT NOT NULL,
  priority TEXT CHECK (priority IN ('high', 'medium', 'low')) DEFAULT 'medium',
  timeframe TEXT,
  concepts TEXT[] DEFAULT '{}',
  mini_project TEXT,
  resources JSONB DEFAULT '[]'::jsonb,
  completed BOOLEAN DEFAULT FALSE,
  target_deadline DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Interview Sessions Table
CREATE TABLE IF NOT EXISTS public.interview_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  question_id TEXT NOT NULL,
  role TEXT DEFAULT 'general',
  category TEXT DEFAULT 'technical',
  practiced BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Job Applications Table
CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  status TEXT CHECK (status IN ('Wishlist', 'Applied', 'Interviewing', 'Offer', 'Rejected')) DEFAULT 'Applied',
  date_applied DATE DEFAULT CURRENT_DATE,
  job_url TEXT,
  skills TEXT,
  notes TEXT,
  follow_up_date DATE,
  salary_range TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Ensures users can ONLY view, insert, update, and delete their own data.
-- ===================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Resumes Policies
CREATE POLICY "Users can view own resumes" ON public.resumes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own resumes" ON public.resumes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own resumes" ON public.resumes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own resumes" ON public.resumes FOR DELETE USING (auth.uid() = user_id);

-- Job Analyses Policies
CREATE POLICY "Users can view own analyses" ON public.job_analyses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own analyses" ON public.job_analyses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own analyses" ON public.job_analyses FOR DELETE USING (auth.uid() = user_id);

-- Learning Plans Policies
CREATE POLICY "Users can view own learning plans" ON public.learning_plans FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own learning plans" ON public.learning_plans FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own learning plans" ON public.learning_plans FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own learning plans" ON public.learning_plans FOR DELETE USING (auth.uid() = user_id);

-- Interview Sessions Policies
CREATE POLICY "Users can view own interview sessions" ON public.interview_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own interview sessions" ON public.interview_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own interview sessions" ON public.interview_sessions FOR UPDATE USING (auth.uid() = user_id);

-- Job Applications Policies
CREATE POLICY "Users can view own job applications" ON public.job_applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own job applications" ON public.job_applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own job applications" ON public.job_applications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own job applications" ON public.job_applications FOR DELETE USING (auth.uid() = user_id);

-- Profile trigger on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
