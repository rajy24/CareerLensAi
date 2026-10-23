const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SLIDES_DIR = path.join(__dirname, '..', 'report_assets', 'slides');
const DIAGRAMS_DIR = path.join(__dirname, '..', 'report_assets', 'diagrams');
const SCREENSHOTS_DIR = path.join(__dirname, '..', 'report_assets', 'screenshots');

if (!fs.existsSync(SLIDES_DIR)) {
  fs.mkdirSync(SLIDES_DIR, { recursive: true });
}

function getBase64Image(filePath) {
  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath).slice(1);
    const mime = ext === 'png' ? 'image/png' : 'image/jpeg';
    return `data:${mime};base64,${fs.readFileSync(filePath).toString('base64')}`;
  }
  return '';
}

const slides = [
  {
    num: 1,
    title: 'CareerLens AI',
    subtitle: 'A Career Planning and Job-Matching Web Application',
    isCover: true,
    content: `
      <div style="margin-top: 40px; border-left: 4px solid #1e3a8a; padding-left: 24px;">
        <p style="font-size: 24px; color: #334155; margin-bottom: 24px;">Field Project Presentation — Semester V (Academic Year 2026–2027)</p>
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 24px; max-width: 800px;">
          <p style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 6px 0;">Submitted by: Raj Ramnivas Yadav</p>
          <p style="font-size: 18px; color: #334155; margin: 6px 0;">Roll No: <strong>TE2208</strong> | Class: <strong>TYBCA - Division E2</strong></p>
          <p style="font-size: 18px; color: #334155; margin: 6px 0;">Degree: <strong>Bachelor of Computer Applications (BCA)</strong></p>
          <p style="font-size: 18px; color: #334155; margin: 6px 0;">Institution: <strong>MAEER's MIT Arts, Commerce and Science College, Alandi, Pune</strong></p>
          <p style="font-size: 18px; color: #334155; margin: 6px 0;">Project Guide: <strong>Prof. Prakash Nikam Sir</strong> | HOD: <strong>Prof. Amit Tale</strong></p>
          <p style="font-size: 18px; color: #1e3a8a; margin: 6px 0; font-weight: 600;">AICTE–EduSkills Virtual Internship: Data Structures and Algorithms in C + Project</p>
        </div>
      </div>
    `
  },
  {
    num: 2,
    title: 'Introduction & Project Motivation',
    subtitle: 'Bridging the Divide Between Academic Knowledge and Industry Hiring',
    content: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 24px;">
          <h3 style="font-size: 22px; color: #0f172a; margin-top: 0; border-bottom: 2px solid #0f172a; padding-bottom: 8px;">The Placement Problem</h3>
          <ul style="font-size: 18px; line-height: 1.6; color: #334155; padding-left: 20px;">
            <li><strong>Curriculum vs Industry Gap:</strong> Students learn core theory but job postings specify complex framework ecosystems.</li>
            <li><strong>Opaque ATS Filtering:</strong> Commercial applicant tracking systems reject candidates without transparent feedback.</li>
            <li><strong>Qualification Confusion:</strong> Candidates struggle to identify mandatory requirements versus optional preferred skills.</li>
            <li><strong>Siloed Preparation:</strong> Résumé review, roadmaps, interview drills, and application tracking are scattered across disconnected tools.</li>
          </ul>
        </div>
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 24px;">
          <h3 style="font-size: 22px; color: #0f172a; margin-top: 0; border-bottom: 2px solid #0f172a; padding-bottom: 8px;">The CareerLens AI Solution</h3>
          <ul style="font-size: 18px; line-height: 1.6; color: #334155; padding-left: 20px;">
            <li><strong>Unified Workspace:</strong> Single platform covering self-assessment, gap roadmaps, interview drills, and pipeline tracking.</li>
            <li><strong>Deterministic Matching:</strong> 100% transparent keyword matching with zero black-box hallucinations.</li>
            <li><strong>Segmented Scoring:</strong> 70% weight for required core skills + 30% for preferred bonus competencies.</li>
            <li><strong>Client-Side Privacy:</strong> Complete offline operation via encrypted localStorage, with optional Supabase cloud sync.</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    num: 3,
    title: 'Problem Statement & Analysis',
    subtitle: 'Core Deficiencies Identified in Existing Career Preparation Workflows',
    content: `
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px;">
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 20px;">
          <h4 style="font-size: 20px; color: #0f172a; margin-top: 0;">1. Opaque Scoring</h4>
          <p style="font-size: 16px; color: #475569; line-height: 1.5;">Commercial scanners give arbitrary match scores without explaining mathematical calculations, causing candidate mistrust.</p>
          <ul style="font-size: 15px; color: #334155; padding-left: 18px; line-height: 1.5;">
            <li>Concealed calculation logic</li>
            <li>No formula disclosure</li>
            <li>Vague optimization tips</li>
          </ul>
        </div>
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 20px;">
          <h4 style="font-size: 20px; color: #0f172a; margin-top: 0;">2. Keyword Collisions</h4>
          <p style="font-size: 16px; color: #475569; line-height: 1.5;">Naive text searches falsely match short language tokens inside unrelated words, skewing compatibility results.</p>
          <ul style="font-size: 15px; color: #334155; padding-left: 18px; line-height: 1.5;">
            <li>'C' falsely matches 'CSS'</li>
            <li>'Java' falsely matches 'JavaScript'</li>
            <li>Synonyms like 'React.js' missed</li>
          </ul>
        </div>
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 20px;">
          <h4 style="font-size: 20px; color: #0f172a; margin-top: 0;">3. Unprioritized Gaps</h4>
          <p style="font-size: 16px; color: #475569; line-height: 1.5;">Candidates lack guidance on which missing skills to study first, leading to tutorial paralysis without tangible projects.</p>
          <ul style="font-size: 15px; color: #334155; padding-left: 18px; line-height: 1.5;">
            <li>No tiering (Core vs Bonus)</li>
            <li>Missing milestone roadmaps</li>
            <li>Absence of mini-project deliverables</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    num: 4,
    title: 'Project Objectives & Functional Scope',
    subtitle: 'System Goals and Operational Boundaries of CareerLens AI',
    content: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 24px;">
          <h3 style="font-size: 22px; color: #0f172a; margin-top: 0; border-bottom: 2px solid #0f172a; padding-bottom: 8px;">Key Objectives</h3>
          <ol style="font-size: 17px; line-height: 1.6; color: #334155; padding-left: 20px;">
            <li>Build an accessible, responsive web workspace using Next.js 14 and Tailwind CSS.</li>
            <li>Implement token-boundary regex matching across 150+ canonical tech aliases.</li>
            <li>Engineer a 70/30 segmented qualification weighting algorithm.</li>
            <li>Implement a Zero-Denominator Guard preventing division-by-zero crashes.</li>
            <li>Generate prioritized 3-tier learning roadmaps with mini-projects.</li>
            <li>Provide role-specific technical and STAR interview drills with rubric evaluation.</li>
            <li>Deliver a full CRUD job application tracker with offline JSON export.</li>
          </ol>
        </div>
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 24px;">
          <h3 style="font-size: 22px; color: #0f172a; margin-top: 0; border-bottom: 2px solid #0f172a; padding-bottom: 8px;">Functional Scope</h3>
          <ul style="font-size: 17px; line-height: 1.6; color: #334155; padding-left: 20px;">
            <li><strong>Candidate Dashboard:</strong> Readiness overview, verified skills, and pipeline metrics.</li>
            <li><strong>Résumé Review:</strong> Plain-text skill extraction with bidirectional profile sync.</li>
            <li><strong>Job Analysis:</strong> Segmented match scoring with mathematical formula disclosure.</li>
            <li><strong>Learning Roadmaps:</strong> High/Medium/Supplementary milestones and documentation links.</li>
            <li><strong>Interview Prep:</strong> Role-specific question bank and instant answer rubric feedback.</li>
            <li><strong>Application Pipeline:</strong> Status Kanban/table, follow-up deadlines, and export.</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    num: 5,
    title: 'System Comparison Matrix',
    subtitle: 'Comparing Traditional Portals, Commercial Scanners, and CareerLens AI',
    content: `
      <table style="width: 100%; border-collapse: collapse; font-size: 16px; margin-top: 10px;">
        <thead>
          <tr style="background: #f1f5f9; border-bottom: 2px solid #0f172a;">
            <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Feature / Dimension</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Traditional Job Portals</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Commercial ATS Scanners</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1; background: #e2e8f0; font-weight: bold;">CareerLens AI (Proposed)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: 600;">Scoring Transparency</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1;">Hidden recruiter filter</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1;">Proprietary black-box score</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1; background: #f8fafc; font-weight: bold; color: #1e3a8a;">100% open deterministic formula with math modal</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: 600;">Token Collision Safety</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1;">Prone to substring errors</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1;">Inconsistent token matching</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1; background: #f8fafc; font-weight: bold; color: #1e3a8a;">Token-boundary regex prevents false matches</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: 600;">Requirement Weighting</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1;">No distinction</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1;">Uniform keyword frequency</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1; background: #f8fafc; font-weight: bold; color: #1e3a8a;">70% Required minimums + 30% Preferred skills</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: 600;">Zero-Denominator Safety</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1;">Displays false 0%</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1;">Confusing 0% or crash</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1; background: #f8fafc; font-weight: bold; color: #1e3a8a;">Safety guard prompts user; never shows false 0%</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: 600;">Actionable Roadmaps</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1;">None</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1;">Generic advice only</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1; background: #f8fafc; font-weight: bold; color: #1e3a8a;">3-tier prioritized roadmaps with mini-projects</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: 600;">Data Privacy & Cost</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1;">User tracking / Ads</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1;">$20–$50/month paywall</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1; background: #f8fafc; font-weight: bold; color: #1e3a8a;">100% Free, offline localStorage, zero paid APIs</td>
          </tr>
        </tbody>
      </table>
    `
  },
  {
    num: 6,
    title: 'System Architecture',
    subtitle: 'Three-Tier Dual-Engine Architecture Design',
    hasDiagram: true,
    diagramPath: path.join(DIAGRAMS_DIR, 'fig_6_5_architecture.png'),
    caption: 'Figure 6.5: Next.js Presentation Tier, Serverless API Route Handlers, and Dual-Engine Persistence'
  },
  {
    num: 7,
    title: 'Data Flow Diagrams (DFD Level 0 & Level 1)',
    subtitle: 'System Context and Functional Decomposition',
    isDoubleDiagram: true,
    diag1: path.join(DIAGRAMS_DIR, 'fig_6_1_dfd_level_0.png'),
    cap1: 'Figure 6.1: Context Level Diagram (DFD Level 0)',
    diag2: path.join(DIAGRAMS_DIR, 'fig_6_2_dfd_level_1.png'),
    cap2: 'Figure 6.2: Functional Decomposition (DFD Level 1)'
  },
  {
    num: 8,
    title: 'System Workflows: Use-Case & Activity',
    subtitle: 'UML Models for Actor Interactions and Procedural Execution',
    isDoubleDiagram: true,
    diag1: path.join(DIAGRAMS_DIR, 'fig_6_3_use_case.png'),
    cap1: 'Figure 6.3: UML Use-Case Diagram',
    diag2: path.join(DIAGRAMS_DIR, 'fig_6_4_activity.png'),
    cap2: 'Figure 6.4: UML Activity Diagram (Zero-Denominator Guard)'
  },
  {
    num: 9,
    title: 'Database Schema & Relational Model',
    subtitle: 'Entity-Relationship Diagram for Cloud & Local Persistence',
    hasDiagram: true,
    diagramPath: path.join(DIAGRAMS_DIR, 'fig_6_6_er_diagram.png'),
    caption: 'Figure 6.6: Relational Entity-Relationship Diagram (Profiles, Resumes, Analyses, Roadmaps, Applications)'
  },
  {
    num: 10,
    title: 'Technology Stack & Engineering Architecture',
    subtitle: 'Production Technologies Implemented in the Codebase',
    content: `
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 20px;">
          <h4 style="font-size: 19px; color: #0f172a; margin-top: 0; border-bottom: 2px solid #0f172a; padding-bottom: 6px;">Frontend Tier</h4>
          <ul style="font-size: 15px; color: #334155; padding-left: 18px; line-height: 1.6;">
            <li><strong>Next.js 14.2:</strong> App Router with server-rendered layouts and static export.</li>
            <li><strong>React 18 & TypeScript:</strong> Type-safe state management and UI components.</li>
            <li><strong>Tailwind CSS 3.4:</strong> Custom editorial palette with dark/light themes.</li>
            <li><strong>Lucide Icons:</strong> Consistent, accessible line iconography.</li>
          </ul>
        </div>
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 20px;">
          <h4 style="font-size: 19px; color: #0f172a; margin-top: 0; border-bottom: 2px solid #0f172a; padding-bottom: 6px;">Logic & API Tier</h4>
          <ul style="font-size: 15px; color: #334155; padding-left: 18px; line-height: 1.6;">
            <li><strong>Edge Route Handlers:</strong> Modular endpoints for analysis and roadmaps.</li>
            <li><strong>Deterministic Engine:</strong> Token-boundary regex parsing in lib/analyzer.ts.</li>
            <li><strong>Zero-Denominator Guard:</strong> Boundary check preventing divide-by-zero crashes.</li>
            <li><strong>STAR Rubric Engine:</strong> Keypoint coverage and answer length feedback.</li>
          </ul>
        </div>
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 20px;">
          <h4 style="font-size: 19px; color: #0f172a; margin-top: 0; border-bottom: 2px solid #0f172a; padding-bottom: 6px;">Persistence Tier</h4>
          <ul style="font-size: 15px; color: #334155; padding-left: 18px; line-height: 1.6;">
            <li><strong>Engine A (Active):</strong> HTML5 LocalStorage with zero external dependencies.</li>
            <li><strong>Engine B (Ready):</strong> Supabase Cloud PostgreSQL with Row-Level Security (RLS).</li>
            <li><strong>Portability:</strong> Complete JSON archive import/export feature.</li>
            <li><strong>Deployment:</strong> Vercel Edge hosting (Production verified).</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    num: 11,
    title: 'Deterministic Competency Matching Engine',
    subtitle: 'Mathematical Formulation and Algorithmic Execution',
    content: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 22px;">
          <h3 style="font-size: 20px; color: #0f172a; margin-top: 0;">Mathematical Formulation</h3>
          <p style="font-size: 16px; color: #334155; line-height: 1.5;">The engine splits job qualifications into <strong>Required</strong> and <strong>Preferred</strong> competencies:</p>
          <div style="background: #ffffff; border: 1px solid #94a3b8; border-radius: 6px; padding: 14px; font-family: monospace; font-size: 14px; color: #0f172a; margin: 12px 0;">
            Score = (Req_Matched / Req_Total × 70%)<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ (Pref_Matched / Pref_Total × 30%)<br/><br/>
            if (Total_JD_Skills == 0) {<br/>
            &nbsp;&nbsp;Match_Score = null; // Zero-Denominator Guard<br/>
            }
          </div>
          <ul style="font-size: 15px; color: #334155; padding-left: 18px; line-height: 1.5;">
            <li>Guarantees core qualifications outweigh secondary skills.</li>
            <li>Displays complete calculation breakdown in on-screen modal.</li>
          </ul>
        </div>
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 22px;">
          <h3 style="font-size: 20px; color: #0f172a; margin-top: 0;">Collision-Free Skill Tokenization</h3>
          <p style="font-size: 16px; color: #334155; line-height: 1.5;">To prevent false matches (e.g., 'C' matching 'CSS'), the engine uses strict boundary regex:</p>
          <div style="background: #ffffff; border: 1px solid #94a3b8; border-radius: 6px; padding: 14px; font-family: monospace; font-size: 13px; color: #0f172a; margin: 12px 0;">
            const regex = new RegExp(<br/>
            &nbsp;&nbsp;'(^|[^a-zA-Z0-9_#+])' + escaped + '([^a-zA-Z0-9_#+]|$)',<br/>
            &nbsp;&nbsp;'i'<br/>
            );
          </div>
          <ul style="font-size: 15px; color: #334155; padding-left: 18px; line-height: 1.5;">
            <li>Maps aliases: 'react.js' &rarr; 'React', 'ts' &rarr; 'TypeScript'.</li>
            <li>Covers 150+ standard software engineering technologies.</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    num: 12,
    title: 'Application Interface: Landing Page & Dashboard',
    subtitle: 'User Experience and Real-Time Readiness Telemetry',
    isDoubleScreenshot: true,
    img1: path.join(SCREENSHOTS_DIR, '01_landing_page.png'),
    cap1: 'Figure 7.1: Public Landing Page (Editorial SaaS Hero & Transparency Notice)',
    img2: path.join(SCREENSHOTS_DIR, '02_dashboard.png'),
    cap2: 'Figure 7.2: Candidate Dashboard (Readiness Metrics & Pipeline Overview)'
  },
  {
    num: 13,
    title: 'Application Interface: Job Analysis & Roadmaps',
    subtitle: 'Transparent Competency Gap Detection and Milestone Progression',
    isDoubleScreenshot: true,
    img1: path.join(SCREENSHOTS_DIR, '04_job_analysis_results.png'),
    cap1: 'Figure 7.5: Job Analysis Results (Segmented Match Score & Missing Skills)',
    img2: path.join(SCREENSHOTS_DIR, '06_learning_roadmaps.png'),
    cap2: 'Figure 7.7: Prioritized Learning Roadmaps (High/Medium/Supplementary Tiers)'
  },
  {
    num: 14,
    title: 'Application Interface: Interview Prep & Tracker',
    subtitle: 'Role-Specific Practice Drills and Pipeline Management',
    isDoubleScreenshot: true,
    img1: path.join(SCREENSHOTS_DIR, '08_interview_practice.png'),
    cap1: 'Figure 7.9: Role-Specific Interview Workbench with Rubric Feedback',
    img2: path.join(SCREENSHOTS_DIR, '10_application_tracker.png'),
    cap2: 'Figure 7.10: Job Application Pipeline Tracker with Stage Filters'
  },
  {
    num: 15,
    title: 'System Verification & Test Results',
    subtitle: 'Summary of 12 Test Cases Executed Across Application Modules',
    content: `
      <table style="width: 100%; border-collapse: collapse; font-size: 15px; margin-top: 10px;">
        <thead>
          <tr style="background: #f1f5f9; border-bottom: 2px solid #0f172a;">
            <th style="padding: 10px; text-align: left; border: 1px solid #cbd5e1;">Test ID</th>
            <th style="padding: 10px; text-align: left; border: 1px solid #cbd5e1;">Module</th>
            <th style="padding: 10px; text-align: left; border: 1px solid #cbd5e1;">Input / Action</th>
            <th style="padding: 10px; text-align: left; border: 1px solid #cbd5e1;">Expected Outcome</th>
            <th style="padding: 10px; text-align: center; border: 1px solid #cbd5e1;">Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">TC-01</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Profile Skills</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Add 'Docker' tag and save</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Tag persists in localStorage state</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold; color: #166534;">PASS</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">TC-02</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Résumé Review</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Paste sample plain text résumé</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Extracts detected skills and syncs profile</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold; color: #166534;">PASS</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">TC-03</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Job Analyzer</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Load Frontend JD sample & analyze</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Computes 70% weighted match score</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold; color: #166534;">PASS</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">TC-04</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Safety Guard</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Paste non-technical text</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Zero-Denominator Guard triggers safely</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold; color: #166534;">PASS</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">TC-05</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Roadmaps</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Port gaps to learning roadmap</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Generates prioritized cards with doc links</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold; color: #166534;">PASS</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">TC-06</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Interview Prep</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Draft answer and submit for rubric</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Returns keypoint coverage & feedback</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold; color: #166534;">PASS</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">TC-07</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Job Tracker</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Add application & update status</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Pipeline metrics update and persist</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold; color: #166534;">PASS</td>
          </tr>
        </tbody>
      </table>
    `
  },
  {
    num: 16,
    title: 'Part B: AICTE–EduSkills Virtual Internship',
    subtitle: 'Data Structures and Algorithms in C + Capstone Project',
    content: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 22px;">
          <h3 style="font-size: 20px; color: #0f172a; margin-top: 0; border-bottom: 2px solid #0f172a; padding-bottom: 6px;">Internship Overview</h3>
          <ul style="font-size: 16px; color: #334155; padding-left: 20px; line-height: 1.6;">
            <li><strong>Program:</strong> AICTE–EduSkills Virtual Internship Program</li>
            <li><strong>Domain:</strong> Data Structures and Algorithms in C + Project</li>
            <li><strong>Duration:</strong> 8 Weeks (October 2026 – December 2026)</li>
            <li><strong>Status:</strong> Currently in progress (Active enrollment)</li>
            <li><strong>Student Name:</strong> Raj Ramnivas Yadav</li>
            <li><strong>Student ID:</strong> STU6810fb64da87c1745943396</li>
            <li><strong>Offer Ref No:</strong> C19Y2026M101591617</li>
          </ul>
        </div>
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 22px;">
          <h3 style="font-size: 20px; color: #0f172a; margin-top: 0; border-bottom: 2px solid #0f172a; padding-bottom: 6px;">8-Week Curriculum Highlights</h3>
          <ul style="font-size: 15px; color: #334155; padding-left: 20px; line-height: 1.5;">
            <li><strong>Week 1:</strong> Algorithmic Thinking & Asymptotic Complexity (Big-O).</li>
            <li><strong>Week 2:</strong> Pointers & Linear Structures (Dynamic Arrays, Linked Lists).</li>
            <li><strong>Week 3:</strong> Stacks, Queues & Call-Stack Recursion Mechanics.</li>
            <li><strong>Week 4:</strong> Non-Linear Hierarchies & Binary Search Trees (BST).</li>
            <li><strong>Week 5:</strong> Heaps, Priority Queues, Hash Tables & Graph Traversals.</li>
            <li><strong>Week 6:</strong> Efficient Sorting (Quick/Merge) & Binary Search.</li>
            <li><strong>Week 7:</strong> Advanced Structures (Tries, AVL) & Greedy Paradigms.</li>
            <li><strong>Week 8:</strong> Capstone: Real-Time Event Scheduler in C.</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    num: 17,
    title: 'Synthesis: How DSA Informed CareerLens AI',
    subtitle: 'Connecting Foundational Systems Concepts to Modern Web Architecture',
    content: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 22px;">
          <h3 style="font-size: 20px; color: #0f172a; margin-top: 0;">1. Hash-Set Skill Lookups</h3>
          <p style="font-size: 16px; color: #334155; line-height: 1.5;">Inspired by hash table principles studied in Week 5, the skill analyzer stores canonical technologies in O(1) hash sets, executing fast single-pass string parsing under 50ms.</p>
          <h3 style="font-size: 20px; color: #0f172a; margin-top: 16px;">2. Priority Queue Roadmap Scheduling</h3>
          <p style="font-size: 16px; color: #334155; line-height: 1.5;">The three-tier roadmap generator applies priority queue heuristics, ensuring foundational prerequisites are mastered before secondary frameworks.</p>
        </div>
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 22px;">
          <h3 style="font-size: 20px; color: #0f172a; margin-top: 0;">3. Defensive Boundary Validation</h3>
          <p style="font-size: 16px; color: #334155; line-height: 1.5;">The strict boundary validation learned during manual C pointer debugging directly influenced the Zero-Denominator Guard, eliminating division-by-zero runtime exceptions.</p>
          <h3 style="font-size: 20px; color: #0f172a; margin-top: 16px;">4. Memory & Resource Optimization</h3>
          <p style="font-size: 16px; color: #334155; line-height: 1.5;">Understanding algorithmic memory constraints guided the choice of lightweight client-side localStorage caching, eliminating costly database queries for offline students.</p>
        </div>
      </div>
    `
  },
  {
    num: 18,
    title: 'Conclusion & Viva Summary',
    subtitle: 'Project Achievements, Deployed System Links, and Viva Discussion',
    isCover: false,
    content: `
      <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 30px;">
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 24px;">
          <h3 style="font-size: 22px; color: #0f172a; margin-top: 0; border-bottom: 2px solid #0f172a; padding-bottom: 8px;">Key Contributions</h3>
          <ul style="font-size: 17px; line-height: 1.6; color: #334155; padding-left: 20px;">
            <li>Built an end-to-end, submission-ready web platform addressing graduate placement anxiety.</li>
            <li>Eliminated black-box scoring through a transparent, mathematically verifiable formula.</li>
            <li>Created an integrated pipeline linking résumé review, roadmaps, interview drills, and tracking.</li>
            <li>Zero operational cost using Next.js 14, Tailwind CSS, and client-side persistence.</li>
          </ul>
        </div>
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 24px;">
          <h3 style="font-size: 22px; color: #0f172a; margin-top: 0; border-bottom: 2px solid #0f172a; padding-bottom: 8px;">Student & System Verification</h3>
          <p style="font-size: 17px; color: #0f172a; margin: 6px 0;"><strong>Candidate:</strong> Raj Ramnivas Yadav</p>
          <p style="font-size: 17px; color: #334155; margin: 6px 0;"><strong>Roll No:</strong> TE2208 | Class: TYBCA - E2</p>
          <p style="font-size: 17px; color: #334155; margin: 6px 0;"><strong>College:</strong> MIT ACSC, Alandi, Pune</p>
          <p style="font-size: 16px; color: #1e3a8a; margin: 12px 0 6px 0;"><strong>Deployed App:</strong><br/>https://careerlensai-seven.vercel.app/</p>
          <p style="font-size: 16px; color: #1e3a8a; margin: 6px 0;"><strong>GitHub Source:</strong><br/>https://github.com/rajy24/CareerLensAi</p>
          <div style="margin-top: 16px; font-weight: bold; color: #0f172a; font-size: 18px;">Thank You! Questions & Discussion</div>
        </div>
      </div>
    `
  }
];

function generateSlideHtml(s) {
  let innerBody = '';

  if (s.isCover) {
    innerBody = `
      <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; padding: 60px 80px; box-sizing: border-box;">
        <div style="font-size: 18px; font-weight: 700; color: #2563eb; letter-spacing: 1px; text-transform: uppercase;">CareerLens AI — Field Project Presentation</div>
        <h1 style="font-size: 56px; font-weight: 800; color: #0f172a; margin: 12px 0 8px 0;">${s.title}</h1>
        <h2 style="font-size: 28px; font-weight: 500; color: #475569; margin: 0 0 24px 0;">${s.subtitle}</h2>
        ${s.content}
      </div>
    `;
  } else if (s.hasDiagram) {
    const b64 = getBase64Image(s.diagramPath);
    innerBody = `
      <div style="height: 100%; display: flex; flex-direction: column; padding: 40px 60px; box-sizing: border-box;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 20px;">
          <div>
            <h2 style="font-size: 32px; font-weight: 800; color: #0f172a; margin: 0;">${s.title}</h2>
            <p style="font-size: 18px; color: #475569; margin: 4px 0 0 0;">${s.subtitle}</p>
          </div>
          <span style="font-size: 16px; font-weight: 600; color: #64748b;">Slide ${s.num}</span>
        </div>
        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <img src="${b64}" style="max-height: 480px; max-width: 95%; object-fit: contain; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px; background: #ffffff;" />
          <p style="font-size: 15px; color: #334155; font-weight: 600; margin-top: 10px;">${s.caption}</p>
        </div>
        <div style="font-size: 13px; color: #94a3b8; text-align: center; margin-top: 8px;">MAEER's MIT Arts, Commerce and Science College, Alandi | Raj Ramnivas Yadav (TYBCA)</div>
      </div>
    `;
  } else if (s.isDoubleDiagram) {
    const b64_1 = getBase64Image(s.diag1);
    const b64_2 = getBase64Image(s.diag2);
    innerBody = `
      <div style="height: 100%; display: flex; flex-direction: column; padding: 40px 60px; box-sizing: border-box;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 20px;">
          <div>
            <h2 style="font-size: 32px; font-weight: 800; color: #0f172a; margin: 0;">${s.title}</h2>
            <p style="font-size: 18px; color: #475569; margin: 4px 0 0 0;">${s.subtitle}</p>
          </div>
          <span style="font-size: 16px; font-weight: 600; color: #64748b;">Slide ${s.num}</span>
        </div>
        <div style="flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: center;">
          <div style="display: flex; flex-direction: column; align-items: center;">
            <img src="${b64_1}" style="max-height: 440px; max-width: 100%; object-fit: contain; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px; background: #ffffff;" />
            <p style="font-size: 14px; color: #334155; font-weight: 600; margin-top: 8px;">${s.cap1}</p>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center;">
            <img src="${b64_2}" style="max-height: 440px; max-width: 100%; object-fit: contain; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px; background: #ffffff;" />
            <p style="font-size: 14px; color: #334155; font-weight: 600; margin-top: 8px;">${s.cap2}</p>
          </div>
        </div>
        <div style="font-size: 13px; color: #94a3b8; text-align: center; margin-top: 8px;">MAEER's MIT Arts, Commerce and Science College, Alandi | Raj Ramnivas Yadav (TYBCA)</div>
      </div>
    `;
  } else if (s.isDoubleScreenshot) {
    const b64_1 = getBase64Image(s.img1);
    const b64_2 = getBase64Image(s.img2);
    innerBody = `
      <div style="height: 100%; display: flex; flex-direction: column; padding: 40px 60px; box-sizing: border-box;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 20px;">
          <div>
            <h2 style="font-size: 32px; font-weight: 800; color: #0f172a; margin: 0;">${s.title}</h2>
            <p style="font-size: 18px; color: #475569; margin: 4px 0 0 0;">${s.subtitle}</p>
          </div>
          <span style="font-size: 16px; font-weight: 600; color: #64748b;">Slide ${s.num}</span>
        </div>
        <div style="flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: center;">
          <div style="display: flex; flex-direction: column; align-items: center;">
            <img src="${b64_1}" style="max-height: 440px; max-width: 100%; object-fit: contain; border: 1px solid #cbd5e1; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);" />
            <p style="font-size: 14px; color: #334155; font-weight: 600; margin-top: 8px;">${s.cap1}</p>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center;">
            <img src="${b64_2}" style="max-height: 440px; max-width: 100%; object-fit: contain; border: 1px solid #cbd5e1; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);" />
            <p style="font-size: 14px; color: #334155; font-weight: 600; margin-top: 8px;">${s.cap2}</p>
          </div>
        </div>
        <div style="font-size: 13px; color: #94a3b8; text-align: center; margin-top: 8px;">MAEER's MIT Arts, Commerce and Science College, Alandi | Raj Ramnivas Yadav (TYBCA)</div>
      </div>
    `;
  } else {
    innerBody = `
      <div style="height: 100%; display: flex; flex-direction: column; padding: 40px 60px; box-sizing: border-box;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 20px;">
          <div>
            <h2 style="font-size: 32px; font-weight: 800; color: #0f172a; margin: 0;">${s.title}</h2>
            <p style="font-size: 18px; color: #475569; margin: 4px 0 0 0;">${s.subtitle}</p>
          </div>
          <span style="font-size: 16px; font-weight: 600; color: #64748b;">Slide ${s.num}</span>
        </div>
        <div style="flex: 1;">
          ${s.content}
        </div>
        <div style="font-size: 13px; color: #94a3b8; text-align: center; margin-top: 8px;">MAEER's MIT Arts, Commerce and Science College, Alandi | Raj Ramnivas Yadav (TYBCA)</div>
      </div>
    `;
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <style>
        * { box-sizing: border-box; }
        body {
          margin: 0;
          padding: 0;
          width: 1920px;
          height: 1080px;
          font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
          background: #ffffff;
          color: #0f172a;
          overflow: hidden;
        }
      </style>
    </head>
    <body>
      ${innerBody}
    </body>
    </html>
  `;
}

async function renderAllSlides() {
  console.log('Launching Chrome to render 18 clean slide previews...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  for (const s of slides) {
    const html = generateSlideHtml(s);
    await page.setContent(html, { waitUntil: 'load' });
    const outPath = path.join(SLIDES_DIR, `slide_${String(s.num).padStart(2, '0')}.png`);
    await page.screenshot({ path: outPath, type: 'png' });
    console.log(`[OK] Rendered Slide ${String(s.num).padStart(2, '0')} -> ${outPath}`);
  }

  await browser.close();
  console.log('[DONE] All 18 slide previews rendered with 100% precision!');
}

renderAllSlides();
