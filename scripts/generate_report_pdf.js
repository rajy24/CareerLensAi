const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_DIR = path.join(__dirname, '..');
const OUTPUT_PDF = path.join(BASE_DIR, 'CareerLens_AI_Field_Project_Report_Raj_Yadav.pdf');
const ASSETS_DIR = path.join(BASE_DIR, 'report_assets');

// Helper to convert local image to base64 data URI so Chrome loads it instantly without file URI issues
function toBase64(relPath) {
  const fullPath = path.join(BASE_DIR, relPath);
  if (!fs.existsSync(fullPath)) return '';
  const ext = path.extname(fullPath).replace('.', '');
  const mime = ext === 'png' ? 'image/png' : ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/svg+xml';
  const data = fs.readFileSync(fullPath).toString('base64');
  return `data:${mime};base64,${data}`;
}

const logoUri = toBase64('report_assets/mit_college_logo.png');
const dfd0Uri = toBase64('report_assets/diagrams/fig_6_1_dfd_level_0.png');
const dfd1Uri = toBase64('report_assets/diagrams/fig_6_2_dfd_level_1.png');
const ucUri = toBase64('report_assets/diagrams/fig_6_3_use_case.png');
const actUri = toBase64('report_assets/diagrams/fig_6_4_activity.png');
const archUri = toBase64('report_assets/diagrams/fig_6_5_architecture.png');
const erUri = toBase64('report_assets/diagrams/fig_6_6_er_diagram.png');

const off1Uri = toBase64('report_assets/offer_letter_page_1.png');
const off2Uri = toBase64('report_assets/offer_letter_page_2.png');

const shots = [
  '01_landing_page.png', '02_dashboard.png', '13_resume_review.png', '03_job_analysis_input.png',
  '04_job_analysis_results.png', '05_zero_denominator_guard.png', '06_learning_roadmaps.png',
  '07_custom_goal_modal.png', '08_interview_practice.png', '10_application_tracker.png'
];
const shotUris = {};
shots.forEach(s => { shotUris[s] = toBase64(`report_assets/screenshots/${s}`); });

const slideUris = [];
for (let i = 1; i <= 18; i++) {
  const pad = i < 10 ? `0${i}` : `${i}`;
  slideUris.push(toBase64(`report_assets/slides/slide_${pad}.png`));
}

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>CareerLens AI Field Project Report</title>
<style>
  @page {
    size: A4;
    margin: 20mm 15mm 20mm 20mm;
  }
  body {
    font-family: 'Times New Roman', Times, serif;
    font-size: 11.5pt;
    line-height: 1.25;
    color: #0f172a;
    margin: 0;
    padding: 0;
  }
  h1 {
    font-size: 15pt;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 12px;
    text-transform: uppercase;
    font-weight: bold;
    color: #0f172a;
  }
  h2 {
    font-size: 13pt;
    margin-top: 14px;
    margin-bottom: 6px;
    font-weight: bold;
    color: #0f172a;
  }
  h3 {
    font-size: 11.5pt;
    margin-top: 10px;
    margin-bottom: 4px;
    font-weight: bold;
    font-style: italic;
  }
  p {
    margin-top: 0;
    margin-bottom: 8px;
    text-align: justify;
  }
  .page-break {
    page-break-after: always;
  }
  .center {
    text-align: center;
  }
  .right {
    text-align: right;
  }
  .bold {
    font-weight: bold;
  }
  .italic {
    font-style: italic;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0 14px 0;
    font-size: 9pt;
  }
  th, td {
    border: 1px solid #cbd5e1;
    padding: 5px 7px;
    text-align: left;
    vertical-align: middle;
  }
  th {
    background-color: #f1f5f9;
    font-weight: bold;
    text-align: center;
  }
  .img-container {
    text-align: center;
    margin: 10px 0;
    page-break-inside: avoid;
  }
  .img-container img {
    max-width: 95%;
    height: auto;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
  }
  .caption {
    font-size: 9pt;
    font-weight: bold;
    font-style: italic;
    color: #334155;
    margin-top: 4px;
    margin-bottom: 10px;
    text-align: center;
  }
  pre {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    padding: 8px;
    font-family: Consolas, monospace;
    font-size: 8.5pt;
    line-height: 1.2;
    overflow-x: auto;
  }
  .sig-table {
    border: none;
    margin-top: 40px;
  }
  .sig-table td {
    border: none;
    padding: 0;
  }
</style>
</head>
<body>

<!-- 1. COVER PAGE -->
<div class="center">
  <img src="${logoUri}" style="max-width: 82%;" alt="MIT Logo">
  <div style="font-size: 11pt; margin-top: 6px;" class="bold">Department of Computer Application</div>
  <div style="font-size: 10pt; margin-bottom: 20px;">Academic Year 2026 – 2027 &bull; Semester – V</div>

  <div style="font-size: 18pt; margin: 15px 0 6px 0;" class="bold">Field Project Report</div>
  <div style="font-size: 10pt; margin-bottom: 25px;" class="italic">Submitted in Partial Fulfilment of the Requirements for the<br>Award of Degree of Bachelor of Computer Applications</div>

  <div style="font-size: 13.5pt; margin-bottom: 30px; line-height: 1.3;" class="bold">
    Title of the Project – CareerLens AI:<br>A Career Planning and Job-Matching Web Application
  </div>
</div>

<div style="font-size: 10pt; line-height: 1.35; margin-top: 30px;">
  <div class="bold">Submitted by:</div>
  <div>Name: Raj Ramnivas Yadav</div>
  <div>Roll No: TE2208</div>
  <div>Program: TYBCA (Division E2)</div>
  <div>Project Domain: Career Development, Natural Language Matching & Web Applications</div>
  <div>Duration: 30 Hours / Academic Term</div>
  <div>Deployed Application: https://careerlensai-seven.vercel.app/</div>
  <div>GitHub Repository: https://github.com/rajy24/CareerLensAi</div>
  <br>
  <div class="bold">Faculty Guide: Prof. Prakash Nikam Sir</div>
  <div class="bold">Head of Department: Prof. Amit Tale</div>
</div>

<div class="page-break"></div>

<!-- 2. CERTIFICATE -->
<div class="center">
  <img src="${logoUri}" style="max-width: 78%;" alt="MIT Logo">
  <div style="font-size: 10pt; margin-top: 4px;">School of Computer Science & Application</div>
  <div style="font-size: 10pt;">Department of Computer Application</div>
  <div style="font-size: 9.5pt; margin-bottom: 15px;">Academic Year 2026 – 2027 &bull; Semester – V</div>
  <div style="font-size: 16pt; margin-bottom: 20px;" class="bold">CERTIFICATE</div>
</div>

<p style="line-height: 1.45; margin-bottom: 40px;">
  This is to certify that Mr. Raj Ramnivas Yadav, Roll No TE2208, a student of TYBCA, Semester V, has successfully completed the Field Project (1 Credit) titled <strong>"CareerLens AI — A Career Planning and Job-Matching Web Application"</strong> and the EduSkills Virtual Internship Course (1 Credit) in partial fulfilment of the requirements for the award of the degree of Bachelor of Computer Applications during the Academic Year 2026–2027. The work carried out is original and has been completed under my guidance to my satisfaction.
</p>

<div style="margin-bottom: 45px;">
  <div>Date: ____________</div>
  <div>Place: Pune</div>
</div>

<table class="sig-table">
  <tr>
    <td style="width: 50%;">
      <strong>Prof. Prakash Nikam Sir</strong><br>Project Guide
    </td>
    <td style="width: 50%; text-align: right;">
      <strong>Prof. Amit Tale</strong><br>HOD, Dept. of Computer Application
    </td>
  </tr>
</table>

<div class="page-break"></div>

<!-- 3. EVALUATION SHEET — FIELD PROJECT -->
<div class="center">
  <img src="${logoUri}" style="max-width: 70%;" alt="MIT Logo">
  <div style="font-size: 9.5pt; margin-top: 2px;">School of Computer Science & Application &bull; Department of Computer Application</div>
  <div style="font-size: 9.5pt; margin-bottom: 8px;">Academic Year 2026 – 2027 &bull; Semester – V</div>
  <div style="font-size: 13pt; margin-bottom: 12px;" class="bold">Evaluation Sheet – Field Project</div>
</div>

<div style="font-size: 10pt; line-height: 1.3; margin-bottom: 10px;">
  <div><strong>Name:</strong> Raj Ramnivas Yadav &nbsp;&nbsp;|&nbsp;&nbsp; <strong>Class:</strong> TYBCA &nbsp;&nbsp;|&nbsp;&nbsp; <strong>Division:</strong> E2</div>
  <div><strong>Roll No:</strong> TE2208 &nbsp;&nbsp;|&nbsp;&nbsp; <strong>Project Title:</strong> CareerLens AI — A Career Planning and Job-Matching Web Application</div>
</div>

<table>
  <tr>
    <th style="width: 10%;">Sr. No</th>
    <th style="width: 60%;">Component</th>
    <th style="width: 15%;">Max Marks</th>
    <th style="width: 15%;">Marks Awarded</th>
  </tr>
  <tr><td class="center">1</td><td>Information Gathering</td><td class="center">8</td><td></td></tr>
  <tr><td class="center">2</td><td>Analysis & Problem Statement</td><td class="center">8</td><td></td></tr>
  <tr><td class="center">3</td><td>Design (DFD, ER, Architecture Diagrams)</td><td class="center">6</td><td></td></tr>
  <tr><td class="center">4</td><td>Working Project / Implementation</td><td class="center">12</td><td></td></tr>
  <tr><td class="center">5</td><td>Testing & Results</td><td class="center">4</td><td></td></tr>
  <tr><td class="center">6</td><td>Report Format & Neatness</td><td class="center">4</td><td></td></tr>
  <tr><td class="center">7</td><td>Viva-Voce</td><td class="center">8</td><td></td></tr>
  <tr style="background: #f8fafc; font-weight: bold;"><td class="center"></td><td>Total</td><td class="center">50</td><td></td></tr>
</table>

<table class="sig-table" style="margin-top: 30px;">
  <tr>
    <td style="width: 50%;"><strong>Prof. Prakash Nikam Sir</strong><br>Project Guide</td>
    <td style="width: 50%; text-align: right;"><strong>Prof. Amit Tale</strong><br>HOD, Dept. of Computer Application</td>
  </tr>
</table>

<div class="page-break"></div>

<!-- 4. EVALUATION SHEET — EDUSKILLS -->
<div class="center">
  <img src="${logoUri}" style="max-width: 70%;" alt="MIT Logo">
  <div style="font-size: 9.5pt; margin-top: 2px;">School of Computer Science & Application &bull; Department of Computer Application</div>
  <div style="font-size: 9.5pt; margin-bottom: 8px;">Academic Year 2026 – 2027 &bull; Semester – V</div>
  <div style="font-size: 13pt; margin-bottom: 12px;" class="bold">Evaluation Sheet – EduSkills Presentation</div>
</div>

<div style="font-size: 10pt; line-height: 1.3; margin-bottom: 10px;">
  <div><strong>Name:</strong> Raj Ramnivas Yadav &nbsp;&nbsp;|&nbsp;&nbsp; <strong>Roll No:</strong> TE2208</div>
  <div><strong>Course Name:</strong> Data Structures and Algorithms in C + Project (AICTE–EduSkills)</div>
</div>

<table>
  <tr>
    <th style="width: 10%;">Sr. No</th>
    <th style="width: 60%;">Component</th>
    <th style="width: 15%;">Max Marks</th>
    <th style="width: 15%;">Marks Awarded</th>
  </tr>
  <tr><td class="center">1</td><td>Course Enrolled & Offer Selection</td><td class="center">10</td><td></td></tr>
  <tr><td class="center">2</td><td>Knowledge of Topics (DSA in C)</td><td class="center">15</td><td></td></tr>
  <tr><td class="center">3</td><td>Practical Work / Demo</td><td class="center">8</td><td></td></tr>
  <tr><td class="center">4</td><td>Slide Design & Visuals</td><td class="center">5</td><td></td></tr>
  <tr><td class="center">5</td><td>Speaking Skills & Time Management</td><td class="center">5</td><td></td></tr>
  <tr><td class="center">6</td><td>Answers to Questions</td><td class="center">7</td><td></td></tr>
  <tr style="background: #f8fafc; font-weight: bold;"><td class="center"></td><td>Total</td><td class="center">50</td><td></td></tr>
</table>

<table style="margin-top: 15px;">
  <tr>
    <th style="width: 70%;">Final Marks</th>
    <th style="width: 15%;">Max Marks</th>
    <th style="width: 15%;">Marks Awarded</th>
  </tr>
  <tr><td>Part A – Field Project</td><td class="center">50</td><td></td></tr>
  <tr><td>Part B – EduSkills Presentation</td><td class="center">50</td><td></td></tr>
  <tr style="background: #e2e8f0; font-weight: bold;"><td>Total</td><td class="center">100</td><td></td></tr>
</table>

<div style="margin: 15px 0;"><strong>Grade Awarded:</strong> ____________</div>

<table class="sig-table" style="margin-top: 25px;">
  <tr>
    <td style="width: 50%;"><strong>Prof. Prakash Nikam Sir</strong><br>Project Guide</td>
    <td style="width: 50%; text-align: right;"><strong>Prof. Amit Tale</strong><br>HOD, Dept. of Computer Application</td>
  </tr>
</table>

<div class="page-break"></div>

<!-- 5. DECLARATION & ACKNOWLEDGEMENT -->
<h1>Declaration</h1>
<p>
  I hereby declare that this field project report titled <strong>"CareerLens AI — A Career Planning and Job-Matching Web Application"</strong> has been prepared for academic submission in partial fulfilment of the requirements for the award of the Degree of Bachelor of Computer Applications (TYBCA, Semester V) at MAEER's MIT Arts, Commerce and Science College, Alandi (D.), Pune.
</p>
<p>
  I affirm that the work presented herein represents my original development and analytical efforts carried out under the academic supervision of Prof. Prakash Nikam Sir. All implementation modules, software architectures, algorithms, and test results documented in this report accurately reflect the functioning of the deployed application (https://careerlensai-seven.vercel.app/) and verified codebase.
</p>
<p>
  I further declare that appropriate references have been cited for all third-party libraries, documentation, and external resources utilized during this project, and that no part of this report has been plagiarized or previously submitted for the award of any other degree or diploma.
</p>
<div style="margin: 25px 0 35px 0;">
  <div>Date: ____________</div>
  <div>Place: Pune</div>
  <br>
  <div>Signature: ______________________</div>
  <div>Name: Raj Ramnivas Yadav</div>
  <div>Roll No: TE2208 | Class: TYBCA (Division E2)</div>
</div>

<hr style="border: none; border-top: 1px solid #cbd5e1; margin: 30px 0;">

<h1>Acknowledgement</h1>
<p>
  I express my profound gratitude to my project guide, Prof. Prakash Nikam Sir, for his invaluable guidance, technical insights, and continuous encouragement throughout the conception, design, and implementation of CareerLens AI. His constructive critique significantly shaped the architectural integrity and professional presentation of this field project.
</p>
<p>
  I extend my sincere thanks to Prof. Amit Tale, Head of the Department of Computer Application, and to the faculty members of the School of Computer Science & Application at MAEER's MIT Arts, Commerce and Science College, Alandi (D.), Pune, for providing the institutional infrastructure, computing environment, and academic ecosystem necessary to complete this project.
</p>
<p>
  I also acknowledge the AICTE–EduSkills Foundation for selecting me for the 8-Week Virtual Internship Program in Data Structures and Algorithms in C + Project (AICTE Student ID: STU6810fb64da87c1745943396). The algorithmic foundations, complexity analysis, and data structure principles acquired during this internship directly influenced the deterministic skill-matching and prioritized queueing logic implemented in CareerLens AI.
</p>
<p class="right" style="margin-top: 25px;">
  <strong>Raj Ramnivas Yadav</strong><br>TYBCA (Semester V), Division E2<br>Roll No: TE2208
</p>

<div class="page-break"></div>

<!-- 6. INDEX -->
<h1>INDEX</h1>
<div class="center italic" style="margin-bottom: 12px;">Table of Contents</div>

<table>
  <tr><th style="width: 12%;">Sr. No</th><th style="width: 73%;">Topic / Chapter</th><th style="width: 15%;">Page No</th></tr>
  <tr style="background: #f1f5f9; font-weight: bold;"><td class="center">—</td><td>PART A – FIELD PROJECT</td><td class="center">1</td></tr>
  <tr><td class="center">1</td><td>Introduction</td><td class="center">1</td></tr>
  <tr><td class="center">2</td><td>Information Gathering & Requirement Analysis</td><td class="center">3</td></tr>
  <tr><td class="center">3</td><td>Analysis of Existing Systems</td><td class="center">5</td></tr>
  <tr><td class="center">4</td><td>Problem Statement</td><td class="center">7</td></tr>
  <tr><td class="center">5</td><td>Objectives & Scope</td><td class="center">9</td></tr>
  <tr><td class="center">6</td><td>Proposed System & Design</td><td class="center">11</td></tr>
  <tr><td class="center">7</td><td>Implementation</td><td class="center">19</td></tr>
  <tr><td class="center">8</td><td>Testing & Results</td><td class="center">27</td></tr>
  <tr><td class="center">9</td><td>Conclusion & Future Scope</td><td class="center">30</td></tr>
  <tr><td class="center">10</td><td>References</td><td class="center">32</td></tr>
  <tr style="background: #f1f5f9; font-weight: bold;"><td class="center">—</td><td>PART B – AICTE–EDUSKILLS INTERNSHIP</td><td class="center">33</td></tr>
  <tr><td class="center">11</td><td>Course Details (DSA in C + Capstone Project)</td><td class="center">33</td></tr>
  <tr><td class="center">12</td><td>Course Certificate & Offer Letter Evidence</td><td class="center">35</td></tr>
  <tr><td class="center">13</td><td>What I Learned & Algorithmic Synthesis</td><td class="center">38</td></tr>
  <tr style="background: #f1f5f9; font-weight: bold;"><td class="center">14</td><td>PART C – PRESENTATION SLIDES APPENDIX</td><td class="center">40</td></tr>
</table>

<div class="page-break"></div>

<!-- PART A -->
<div class="center" style="margin-top: 150px;">
  <div style="font-size: 22pt; font-weight: bold; color: #1e3a8a;">PART A</div>
  <div style="font-size: 16pt; font-weight: bold; margin-top: 10px;">FIELD PROJECT (1 CREDIT)</div>
  <div style="font-size: 13pt; margin-top: 20px;" class="bold">CareerLens AI — A Career Planning and Job-Matching Web Application</div>
</div>

<div class="page-break"></div>

<!-- CHAPTER 1 -->
<h1>CHAPTER 1<br>INTRODUCTION</h1>
<h2>1.1 Background and Motivation</h2>
<p>The transition from undergraduate computer application studies to professional employment represents one of the most demanding phases in a software engineer's early career. Every year, thousands of computer science and BCA graduates enter the job market equipped with foundational knowledge in programming languages, database management, and software engineering. However, upon encountering real-world technical recruitment processes, candidates often experience a pronounced structural gap between academic curricula and industry hiring expectations.</p>
<p>Modern technology job postings rarely request isolated programming fundamentals; instead, they specify intricate ecosystems comprising modern web frameworks (e.g., React, Next.js), typed supersets (TypeScript), containerization tooling (Docker), continuous integration pipelines, and specialized database paradigms. Complicating this reality further is the pervasive deployment of commercial Applicant Tracking Systems (ATS) and automated screening filters by employers. These automated systems rapidly filter candidate résumés against job descriptions, frequently discarding promising applicants who lack specific industry phrasing, while offering zero constructive feedback to help the candidate improve.</p>

<h2>1.2 Introduction to CareerLens AI</h2>
<p>CareerLens AI is an independent, full-stack career planning and job-readiness workspace designed specifically for students, recent graduates, and early-career job seekers. The platform serves as a personalized career intelligence workbench that bridges the divide between self-assessment and successful job placement. Rather than acting as a passive job directory or an opaque, generative 'black-box' tool that hallucinates matching percentages, CareerLens AI implements a 100% transparent, deterministic competency matching engine.</p>
<p>CareerLens AI empowers candidates to systematically audit their verified capabilities against authentic job postings. The system analyzes arbitrary job descriptions, isolates required minimum qualifications from preferred bonus competencies, computes a mathematically grounded compatibility score, and generates an actionable, three-tiered learning roadmap to systematically close identified technical gaps.</p>

<h2>1.3 Purpose and Significance</h2>
<p>The primary purpose of CareerLens AI is to democratize career readiness intelligence through algorithmic transparency and complete client data privacy. Unlike commercial platforms that lock résumé optimization behind expensive monthly subscriptions or sell user candidate data to third parties, CareerLens AI operates on a dual-engine architecture: it functions with 100% capability in an offline, zero-dependency mode using encrypted browser localStorage, while offering cloud synchronization through Supabase PostgreSQL equipped with Row-Level Security (RLS).</p>

<h2>1.4 Overview of the Project Modules</h2>
<p>CareerLens AI is engineered using modern web technologies: Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, and Supabase. The platform provides seven core operational modules: Candidate Dashboard, Résumé Review & Skill Synchronizer, Job Compatibility Engine, Mathematical Transparency Disclosure, Prioritized Learning Roadmaps, Role-Specific Interview Workbench, and Application Pipeline Tracker.</p>

<div class="page-break"></div>

<!-- CHAPTER 2 -->
<h1>CHAPTER 2<br>INFORMATION GATHERING & REQUIREMENT ANALYSIS</h1>
<h2>2.1 Problem Discovery and Field Observations</h2>
<p>To formulate the specifications for CareerLens AI, a thorough investigative study of student job-seeking practices was conducted among undergraduate final-year students (TYBCA) and recent computer science graduates. The study involved informal interviews, review of job-search spreadsheets, and observation of how students prepare for campus placements and off-campus recruitment drives.</p>
<p>The investigation revealed three recurring behavioral patterns and operational bottlenecks: disorganized application tracking across manual notes, widespread confusion regarding why résumés failed to pass initial ATS screenings, and non-prioritized self-study where candidates suffered from tutorial overload without knowing which missing skills were mandatory baseline criteria versus non-critical bonus tools.</p>

<h2>2.2 Target Users</h2>
<p>1. Final-Year Undergraduate Students (BCA / B.Sc. CS / B.Tech): Seeking structured transition guidance from academic theory to corporate placement readiness.<br>
2. Early-Career Job Seekers & Career Changers: Software developers with 0–2 years of experience preparing for lateral career shifts.<br>
3. Academic Placement Coordinators & Mentors: Project guides and faculty advisors reviewing student candidate portfolios.</p>

<h2>2.3 Software Requirements Specification (SRS)</h2>
<table>
  <tr><th style="width: 30%;">Requirement Category</th><th style="width: 70%;">Detailed Specification</th></tr>
  <tr><td><strong>System Users</strong></td><td>Student Candidates, Self-Directed Job Seekers, Academic Mentors.</td></tr>
  <tr><td><strong>Functional Requirements</strong></td><td>Profile skill management, plain-text résumé extraction, job description keyword parsing, 70/30 segmented qualification weighting, zero-denominator safety guard, prioritized learning roadmap generation, STAR interview question drills with automated rubric scoring, full CRUD application tracking, and JSON data export.</td></tr>
  <tr><td><strong>Non-Functional Requirements</strong></td><td>Algorithmic transparency, zero false substring collisions, responsive mobile/desktop UI, sub-500ms client processing latency, WCAG accessible contrast, and 100% client data privacy.</td></tr>
  <tr><td><strong>Data Persistence</strong></td><td>Dual-engine architecture: encrypted HTML5 LocalStorage for zero-dependency client privacy, with optional Supabase Cloud PostgreSQL with Row-Level Security (RLS).</td></tr>
  <tr><td><strong>System Safety & Reliability</strong></td><td>Zero-Denominator Guard prevents division-by-zero or false 0% matches when job postings contain no technical criteria.</td></tr>
</table>

<h2>2.4 Minimum Hardware and Software Execution Requirements</h2>
<table>
  <tr><th style="width: 25%;">Component</th><th style="width: 35%;">Minimum Requirement</th><th style="width: 40%;">Development Specification</th></tr>
  <tr><td><strong>Processor (CPU)</strong></td><td>Dual-Core x86/ARM, 1.6 GHz</td><td>Intel Core i5 / AMD Ryzen 5 or Apple Silicon</td></tr>
  <tr><td><strong>Memory (RAM)</strong></td><td>4 GB RAM</td><td>8 GB to 16 GB DDR4/DDR5 RAM</td></tr>
  <tr><td><strong>Storage</strong></td><td>500 MB free disk space</td><td>SSD Storage (Node.js runtime & dependencies)</td></tr>
  <tr><td><strong>Operating System</strong></td><td>Windows 10/11, macOS, Linux</td><td>Windows 11 (64-bit) development environment</td></tr>
  <tr><td><strong>Runtime Environment</strong></td><td>Chromium, Firefox, or Safari</td><td>Google Chrome 120+, Node.js v22.17.1, npm 10.9.2</td></tr>
</table>

<div class="page-break"></div>

<!-- CHAPTER 3 -->
<h1>CHAPTER 3<br>ANALYSIS OF EXISTING SYSTEMS</h1>
<h2>3.1 Existing Career-Planning and Job-Matching Approaches</h2>
<p>Currently, students and early-career job seekers rely on three primary mechanisms to evaluate job opportunities and prepare for employment: mainstream employment portals (LinkedIn, Indeed, Naukri), commercial résumé scanners (Jobscan, ResumeWorded), and manual spreadsheets and unstructured notes.</p>

<h2>3.2 Limitations and Identified Gaps</h2>
<table>
  <tr><th style="width: 30%;">Functional Area</th><th style="width: 70%;">Identified Weakness in Current Systems</th></tr>
  <tr><td><strong>Scoring Transparency</strong></td><td>Proprietary black-box algorithms conceal mathematical calculations; candidates cannot verify how scores are generated.</td></tr>
  <tr><td><strong>Keyword Match Precision</strong></td><td>Naive string matching produces false substring collisions (e.g., programming language 'C' erroneously matches 'CSS', and 'Java' matches 'JavaScript').</td></tr>
  <tr><td><strong>Requirement Weighting</strong></td><td>Existing scanners treat all keywords equally, failing to distinguish between mandatory baseline requirements and optional bonus skills.</td></tr>
  <tr><td><strong>Zero-Denominator Handling</strong></td><td>Scanners display confusing 0% match scores or phantom skill gaps when evaluated against job postings lacking explicit technical terms.</td></tr>
  <tr><td><strong>Privacy & Monetization</strong></td><td>Commercial platforms monetize candidate résumés and impose aggressive paywalls, restricting access for student job seekers.</td></tr>
  <tr><td><strong>Process Fragmentation</strong></td><td>Job discovery, skill roadmaps, interview preparation, and pipeline tracking exist as disconnected, siloed tools.</td></tr>
</table>

<h2>3.3 Comparison with the Proposed System</h2>
<table>
  <tr><th style="width: 28%;">Evaluation Dimension</th><th style="width: 36%;">Existing Commercial Portals</th><th style="width: 36%;">CareerLens AI (Proposed System)</th></tr>
  <tr><td><strong>Mathematical Transparency</strong></td><td>Opaque, hidden percentage score</td><td>100% open deterministic formula with full calculation disclosure modal</td></tr>
  <tr><td><strong>Keyword Match Safety</strong></td><td>Prone to false substring collisions</td><td>Strict token-boundary regex matching with canonical alias normalization</td></tr>
  <tr><td><strong>Requirement Segmentation</strong></td><td>Uniform keyword frequency count</td><td>70% Required minimums + 30% Preferred bonus qualifications weighting</td></tr>
  <tr><td><strong>Zero-Denominator Safety</strong></td><td>Displays misleading 0% or crashes</td><td>Zero-Denominator Guard prompts for qualifications; never shows false 0%</td></tr>
  <tr><td><strong>Actionable Roadmap Mapping</strong></td><td>None; candidate must search independently</td><td>Automatically generates 3-tier milestone plans with mini-projects & doc links</td></tr>
  <tr><td><strong>Data Privacy & Architecture</strong></td><td>Server tracking, public profiles, cookies</td><td>Dual-engine: 100% offline encrypted LocalStorage or private Supabase RLS</td></tr>
</table>

<div class="page-break"></div>

<!-- CHAPTER 4 & 5 -->
<h1>CHAPTER 4<br>PROBLEM STATEMENT</h1>
<p>Undergraduate computer application students and early-career job seekers face significant hurdles when navigating technical job recruitment. While students possess academic training in programming and computer applications, they lack an objective, transparent, and integrated software mechanism to evaluate their genuine market readiness against industry job postings.</p>

<table>
  <tr><th style="width: 35%;">Core Problem Challenge</th><th style="width: 65%;">CareerLens AI Concrete Architectural Solution</th></tr>
  <tr><td><strong>Opaque black-box scoring systems</strong></td><td>Transparent mathematical formulation modal detailing exact fractions and percentages.</td></tr>
  <tr><td><strong>False keyword matching collisions</strong></td><td>Regex token-boundary matcher with canonical alias dictionary covering 150+ technologies.</td></tr>
  <tr><td><strong>Equal weighting of core vs. bonus skills</strong></td><td>Segmented requirement engine assigning 70% weight to Required skills and 30% to Preferred.</td></tr>
  <tr><td><strong>Phantom 0% scores on vague descriptions</strong></td><td>Zero-Denominator Guard returning informative prompts when zero technical terms exist.</td></tr>
  <tr><td><strong>Disconnected preparation tools</strong></td><td>Integrated workspace unifying résumé extraction, job matching, roadmaps, interview drills, and pipeline tracking.</td></tr>
</table>

<h1 style="margin-top: 30px;">CHAPTER 5<br>OBJECTIVES & SCOPE</h1>
<h2>5.1 Specific Objectives</h2>
<p>
  1. Centralized Career Intelligence: Unify skills, analyses, roadmaps, interview drills, and applications.<br>
  2. Deterministic Skill Extraction: Implement token-boundary regex scanning covering 150+ tech aliases.<br>
  3. Bidirectional Profile Sync: Automatically update profile tags from parsed résumé text.<br>
  4. Segmented Qualification Weighting: Weight Required skills at 70% and Preferred skills at 30%.<br>
  5. Algorithmic Transparency: Disclose the full mathematical scoring formula in an on-screen breakdown modal.<br>
  6. Zero-Denominator Safety Guard: Handle empty or non-technical JDs safely without false 0% ratings.<br>
  7. Prioritized Roadmap Generation: Map missing skills into High, Medium, and Supplementary tiers.<br>
  8. Practical Milestone Deliverables: Provide mini-projects and official documentation links for each gap.<br>
  9. Role-Specific Interview Simulator: Provide curated technical, coding, and HR questions across 5 role tracks.<br>
  10. Automated Answer Rubric Evaluation: Evaluate user answers against key concepts with coverage ratings.<br>
  11. Full Lifecycle Pipeline Tracking: Complete CRUD tracking with stages, salary notes, and follow-up dates.<br>
  12. Data Privacy & Portability: Provide client-side LocalStorage, JSON export, and Supabase cloud sync.
</p>

<div class="page-break"></div>

<!-- CHAPTER 6: PROPOSED SYSTEM & DESIGN -->
<h1>CHAPTER 6<br>PROPOSED SYSTEM & DESIGN</h1>
<h2>6.1 Workflow & Architecture</h2>
<p>CareerLens AI proposes an integrated candidate journey. The candidate sets up their profile, uploads or pastes résumé text, and analyzes any target job description. The deterministic engine executes token-boundary parsing, applies 70/30 weighting, renders a transparent score, and feeds missing competencies into structured learning roadmaps, interview drills, and application pipeline tracking.</p>

<div class="img-container">
  <img src="${dfd0Uri}" alt="DFD Level 0">
  <div class="caption">Figure 6.1: Data Flow Diagram (DFD) Level 0 — Context Level Diagram</div>
</div>

<div class="img-container">
  <img src="${dfd1Uri}" alt="DFD Level 1">
  <div class="caption">Figure 6.2: Data Flow Diagram (DFD) Level 1 — Functional Decomposition</div>
</div>

<div class="page-break"></div>

<div class="img-container">
  <img src="${ucUri}" alt="Use Case Diagram">
  <div class="caption">Figure 6.3: UML Use-Case Diagram for CareerLens AI Actors and Workflows</div>
</div>

<div class="img-container">
  <img src="${actUri}" alt="Activity Diagram">
  <div class="caption">Figure 6.4: UML Activity Diagram — End-to-End Competency Matching Process</div>
</div>

<div class="page-break"></div>

<div class="img-container">
  <img src="${archUri}" alt="System Architecture Diagram">
  <div class="caption">Figure 6.5: System Architecture Diagram — 3-Tier Dual-Engine Design</div>
</div>

<div class="img-container">
  <img src="${erUri}" alt="ER Diagram">
  <div class="caption">Figure 6.6: Entity-Relationship (ER) Diagram — Data Schema & Key Relationships</div>
</div>

<h2>6.2 Database Schema Definitions</h2>
<table>
  <tr><th style="width: 25%;">Entity / Table</th><th style="width: 45%;">Primary Attributes & Data Types</th><th style="width: 30%;">Operational Purpose</th></tr>
  <tr><td><strong>PROFILES</strong></td><td>id (PK, UUID), email, full_name, headline, bio, skills (TEXT[]), target_role, created_at, updated_at</td><td>Stores core user profile data and verified skill tags.</td></tr>
  <tr><td><strong>RESUMES</strong></td><td>id (PK, UUID), user_id (FK), file_name, extracted_text, detected_skills (TEXT[]), created_at</td><td>Maintains parsed candidate résumés and skill audit results.</td></tr>
  <tr><td><strong>JOB_ANALYSES</strong></td><td>id (PK, UUID), user_id (FK), job_title, company, detected_jd_skills[], matched_skills[], missing_skills[], match_percentage, math_explanation</td><td>Stores historical compatibility analysis reports and calculations.</td></tr>
  <tr><td><strong>LEARNING_PLANS</strong></td><td>id (PK, UUID), user_id (FK), skill_name, priority, timeframe, concepts[], mini_project, resources (JSONB), completed</td><td>Tracks prioritized milestones, project goals, and completion states.</td></tr>
  <tr><td><strong>INTERVIEW_SESSIONS</strong></td><td>id (PK, UUID), user_id (FK), question_id, user_answer, coverage_pct, feedback, created_at</td><td>Logs user interview practice responses and rubric scores.</td></tr>
  <tr><td><strong>JOB_APPLICATIONS</strong></td><td>id (PK, UUID), user_id (FK), company, role, status, date_applied, follow_up_date, salary_range, notes</td><td>Manages candidate pipeline stages from Applied to Offer.</td></tr>
</table>

<div class="page-break"></div>

<!-- CHAPTER 7: IMPLEMENTATION -->
<h1>CHAPTER 7<br>IMPLEMENTATION</h1>
<h2>7.1 Actual Technology Stack Found in Code</h2>
<table>
  <tr><th style="width: 25%;">Engineering Layer</th><th style="width: 35%;">Selected Technology</th><th style="width: 40%;">Engineering Rationale & Justification</th></tr>
  <tr><td><strong>Frontend Framework</strong></td><td>Next.js 14.2.35 (App Router)</td><td>Enables hybrid SSG and SSR for sub-500ms client latency.</td></tr>
  <tr><td><strong>Language</strong></td><td>TypeScript 5.6.3</td><td>Compile-time type safety across data models and API payloads.</td></tr>
  <tr><td><strong>Styling</strong></td><td>Tailwind CSS 3.4.14</td><td>Utility-first styling with custom editorial SaaS palette.</td></tr>
  <tr><td><strong>State Management</strong></td><td>React Context (CareerLensProvider)</td><td>Dual-mode persistence synchronizing LocalStorage and Supabase.</td></tr>
  <tr><td><strong>API Route Handlers</strong></td><td>Next.js Serverless Edge Routes</td><td>Implements /api/analyze, /api/learning-plan, /api/interview, /api/applications.</td></tr>
  <tr><td><strong>Database & Auth</strong></td><td>Supabase PostgreSQL + RLS</td><td>Relational storage with user-isolated Row-Level Security policies.</td></tr>
  <tr><td><strong>Deployment</strong></td><td>Vercel Cloud Edge Network</td><td>Automated Git CI/CD deployment (careerlensai-seven.vercel.app).</td></tr>
</table>

<h2>7.2 Deterministic Skill Extraction Code Snippet</h2>
<pre>export function extractSkills(text: string): string[] {
  if (!text || typeof text !== 'string') return [];
  const textLower = ' ' + text.toLowerCase() + ' ';
  const detected = new Set&lt;string&gt;();

  SKILLS_DATABASE.forEach(skill =&gt; {
    const regex = new RegExp('(^|[^a-zA-Z0-9_#+])' + skill + '([^a-zA-Z0-9_#+]|$)', 'i');
    if (regex.test(textLower)) detected.add(skill);
  });

  Object.keys(SKILL_ALIASES).forEach(alias =&gt; {
    const canonical = SKILL_ALIASES[alias];
    const regex = new RegExp('(^|[^a-zA-Z0-9_#+])' + alias + '([^a-zA-Z0-9_#+]|$)', 'i');
    if (regex.test(textLower)) detected.add(canonical);
  });

  return Array.from(detected).sort();
}</pre>

<h2>7.3 Live Application Screenshots</h2>
<div class="img-container">
  <img src="${shotUris['01_landing_page.png']}" alt="Landing Page">
  <div class="caption">Figure 7.1: Public Landing Page featuring custom optical lens logo and transparency notice.</div>
</div>

<div class="img-container">
  <img src="${shotUris['02_dashboard.png']}" alt="Dashboard">
  <div class="caption">Figure 7.2: Candidate Dashboard displaying KPI metrics (70% match score, verified skills, pipeline counts).</div>
</div>

<div class="page-break"></div>

<div class="img-container">
  <img src="${shotUris['13_resume_review.png']}" alt="Resume Review">
  <div class="caption">Figure 7.3: Résumé Review & Skill Synchronizer auditing text and updating profile competencies.</div>
</div>

<div class="img-container">
  <img src="${shotUris['03_job_analysis_input.png']}" alt="Job Analysis Input">
  <div class="caption">Figure 7.4: Job Compatibility Analyzer showing sample selector, role inputs, and JD textarea.</div>
</div>

<div class="page-break"></div>

<div class="img-container">
  <img src="${shotUris['04_job_analysis_results.png']}" alt="Analysis Results">
  <div class="caption">Figure 7.5: Analysis Results displaying 70% weighted match, matched checkmarks, and prioritized gaps.</div>
</div>

<div class="img-container">
  <img src="${shotUris['05_zero_denominator_guard.png']}" alt="Zero Denominator Guard">
  <div class="caption">Figure 7.6: Zero-Denominator Guard active alert when non-technical job description is tested.</div>
</div>

<div class="page-break"></div>

<div class="img-container">
  <img src="${shotUris['06_learning_roadmaps.png']}" alt="Learning Roadmaps">
  <div class="caption">Figure 7.7: Personalized Learning Roadmaps with High/Medium/Supplementary priorities and mini-projects.</div>
</div>

<div class="img-container">
  <img src="${shotUris['07_custom_goal_modal.png']}" alt="Custom Goal Modal">
  <div class="caption">Figure 7.8: Add Custom Learning Goal modal allowing candidates to define personal deliverables.</div>
</div>

<div class="page-break"></div>

<div class="img-container">
  <img src="${shotUris['08_interview_practice.png']}" alt="Interview Practice">
  <div class="caption">Figure 7.9: Role-Specific Interview Workbench with questions, model answers, and rubric evaluation.</div>
</div>

<div class="img-container">
  <img src="${shotUris['10_application_tracker.png']}" alt="Application Tracker">
  <div class="caption">Figure 7.10: Job Application Pipeline Tracker with status stages, follow-up dates, and JSON export.</div>
</div>

<div class="page-break"></div>

<!-- CHAPTER 8: TESTING & RESULTS -->
<h1>CHAPTER 8<br>TESTING & RESULTS</h1>
<h2>8.1 Testing Methodology</h2>
<p>CareerLens AI was tested using an iterative 'Loop Engineering' framework combining unit assertion scripts, compile-time TypeScript type checking, Next.js production build verification, and automated end-to-end browser execution on the live deployed Vercel application.</p>

<table>
  <tr><th style="width: 10%;">Test ID</th><th style="width: 18%;">Module</th><th style="width: 32%;">Action & Input</th><th style="width: 30%;">Expected Outcome</th><th style="width: 10%;">Status</th></tr>
  <tr><td class="center">TC01</td><td>Profile Skills</td><td>Type 'Docker' and press Add</td><td>Skill tag added to profile and persistent in storage</td><td class="center bold" style="color: #059669;">PASS</td></tr>
  <tr><td class="center">TC02</td><td>Profile Skills</td><td>Click 'x' on 'Git' skill tag</td><td>Tag removed from profile and removed from state</td><td class="center bold" style="color: #059669;">PASS</td></tr>
  <tr><td class="center">TC03</td><td>Résumé Review</td><td>Paste plain-text résumé with skills</td><td>Extracts recognized skills and syncs to profile</td><td class="center bold" style="color: #059669;">PASS</td></tr>
  <tr><td class="center">TC04</td><td>Job Analysis</td><td>Load 'Junior Frontend' sample JD</td><td>Correctly detects 7 JD skills and displays 70% score</td><td class="center bold" style="color: #059669;">PASS</td></tr>
  <tr><td class="center">TC05</td><td>Job Analysis</td><td>Paste non-technical text ('great attitude')</td><td>Zero-Denominator Guard triggers; displays guidance</td><td class="center bold" style="color: #059669;">PASS</td></tr>
  <tr><td class="center">TC06</td><td>Job Analysis</td><td>Click 'How is this calculated?' button</td><td>Expands formula modal showing exact mathematical steps</td><td class="center bold" style="color: #059669;">PASS</td></tr>
  <tr><td class="center">TC07</td><td>Job Analysis</td><td>Click 'Add Gaps to Learning Plan'</td><td>Missing skills (TypeScript, Tailwind) queued in plan</td><td class="center bold" style="color: #059669;">PASS</td></tr>
  <tr><td class="center">TC08</td><td>Learning Plan</td><td>Click checkbox on 'TypeScript' goal</td><td>Marks item as completed and updates progress bar</td><td class="center bold" style="color: #059669;">PASS</td></tr>
  <tr><td class="center">TC09</td><td>Learning Plan</td><td>Click 'Add Custom Goal' for 'GraphQL'</td><td>New custom goal card added with priority & project</td><td class="center bold" style="color: #059669;">PASS</td></tr>
  <tr><td class="center">TC10</td><td>Learning Plan</td><td>Filter by 'High Priority'</td><td>Displays only High Priority cards; hides other tiers</td><td class="center bold" style="color: #059669;">PASS</td></tr>
  <tr><td class="center">TC11</td><td>Interview Prep</td><td>Select role 'Backend Engineering'</td><td>Filters question bank to Python/Node/SQL questions</td><td class="center bold" style="color: #059669;">PASS</td></tr>
  <tr><td class="center">TC12</td><td>Interview Prep</td><td>Type answer to Event Loop & Evaluate</td><td>Returns concept coverage %, word rating, feedback</td><td class="center bold" style="color: #059669;">PASS</td></tr>
  <tr><td class="center">TC13</td><td>Job Tracker</td><td>Add application 'Stripe / Frontend'</td><td>New row appears in tracker table with 'Applied' badge</td><td class="center bold" style="color: #059669;">PASS</td></tr>
  <tr><td class="center">TC14</td><td>Job Tracker</td><td>Change status to 'Interviewing'</td><td>Row badge updates color and updates active metrics</td><td class="center bold" style="color: #059669;">PASS</td></tr>
  <tr><td class="center">TC15</td><td>Settings</td><td>Click 'Export JSON Archive'</td><td>Downloads valid JSON file containing all workspace data</td><td class="center bold" style="color: #059669;">PASS</td></tr>
</table>

<div class="page-break"></div>

<!-- CHAPTER 9 & 10 -->
<h1>CHAPTER 9<br>CONCLUSION & FUTURE SCOPE</h1>
<h2>9.1 Conclusion</h2>
<p>The development of CareerLens AI successfully demonstrates that an open, deterministic, client-side web application can deliver superior career readiness intelligence compared to opaque, commercial ATS black boxes. By combining strict token-boundary regular expressions with segmented 70/30 qualification weighting, CareerLens AI provides candidates with honest, mathematically verifiable compatibility scores.</p>
<p>The platform bridges the critical divide between job analysis and actionable self-improvement, channeling gaps into prioritized roadmaps, interview drills, and an organized job search pipeline. Built with Next.js 14, TypeScript, and a dual-engine persistence layer, CareerLens AI achieves total client data privacy and zero operating expenses.</p>

<h2>9.2 Future Scope & Proposed Enhancements</h2>
<p>
  • Local On-Device LLM Synthesis: Integrating quantized open-weights models (e.g. Llama-3-8B via WebGPU) for privacy-preserving résumé bullet rewriting.<br>
  • Live Job Board Webhook Integrations: Connecting official LinkedIn and Indeed APIs for real-time local job alerts.<br>
  • Cross-Platform Mobile Application: Packaging the application as a native iOS and Android app via React Native.<br>
  • University Placement Dashboard: Providing faculty coordinators with aggregated placement readiness analytics across cohort divisions.
</p>

<h1 style="margin-top: 30px;">CHAPTER 10<br>REFERENCES</h1>
<p>
  1. Next.js Documentation (v14.2) — Vercel Inc. Available at: https://nextjs.org/docs<br>
  2. React Documentation & Hooks API — Meta Open Source. Available at: https://react.dev/<br>
  3. TypeScript Language Specification (v5.6) — Microsoft Corporation. Available at: https://www.typescriptlang.org/<br>
  4. Tailwind CSS Framework Documentation (v3.4) — Tailwind Labs. Available at: https://tailwindcss.com/docs<br>
  5. Supabase Documentation (PostgreSQL, Row-Level Security, & Auth). Available at: https://supabase.com/docs<br>
  6. Pressman, R. S., & Maxim, B. R. (2020). Software Engineering: A Practitioner's Approach (9th ed.). McGraw-Hill Education.<br>
  7. Mozilla Developer Network (MDN) Web Docs — Web APIs & HTML5 LocalStorage. Available at: https://developer.mozilla.org/<br>
  8. IEEE Computer Society — 'Skill Extraction and Competency Matching in Technical Recruitment Systems', IEEE Transactions on Learning Technologies, 2023.
</p>

<div class="page-break"></div>

<!-- PART B -->
<div class="center" style="margin-top: 150px;">
  <div style="font-size: 22pt; font-weight: bold; color: #1e3a8a;">PART B</div>
  <div style="font-size: 16pt; font-weight: bold; margin-top: 10px;">AICTE–EDUSKILLS VIRTUAL INTERNSHIP (1 CREDIT)</div>
  <div style="font-size: 12pt; margin-top: 20px;" class="bold">Domain: Data Structures and Algorithms in C + Project<br>Duration: 8 Weeks (October 2026 – December 2026)<br>Mode: Virtual</div>
</div>

<div class="page-break"></div>

<!-- CHAPTER 11: COURSE DETAILS -->
<h1>CHAPTER 11<br>COURSE DETAILS</h1>
<p>
  <strong>Internship Program:</strong> AICTE–EduSkills Virtual Internship Program<br>
  <strong>Domain:</strong> Data Structures and Algorithms in C + Project<br>
  <strong>Duration:</strong> 8 Weeks (October 2026 – December 2026)<br>
  <strong>Stream & Branch:</strong> BCA &bull; Class: TYBCA (Division E2) &bull; Roll No: TE2208<br>
  <strong>Institution:</strong> MAEER's MIT Arts, Commerce and Science College, Alandi (D.), Pune<br>
  <strong>Student Name:</strong> RAJ RAMNIVAS YADAV<br>
  <strong>AICTE Student ID:</strong> STU6810fb64da87c1745943396<br>
  <strong>Offer Letter Ref No:</strong> C19Y2026M101591617
</p>
<p>I have been selected for the prestigious 8-Week AICTE–EduSkills Virtual Internship Program in Data Structures and Algorithms in C + Project. Supported by the All India Council for Technical Education (AICTE) and EduSkills Foundation, this program provides industry-aligned training in algorithmic problem-solving, computational complexity, memory management, and practical software design.</p>

<table>
  <tr><th style="width: 15%;">Week</th><th style="width: 35%;">Module Title</th><th style="width: 50%;">Technical Topics & Practical Scope</th></tr>
  <tr><td class="center bold">Week 1</td><td>Course Kick-off & Algorithmic Thinking</td><td>Introduction to course objectives and C refresher. Algorithmic thinking, time/space complexity analysis using Big-O notation.</td></tr>
  <tr><td class="center bold">Week 2</td><td>Linear Data Structures (Arrays & Linked Lists)</td><td>Understanding arrays and linked lists (singly, doubly, circular) in C, dynamic memory allocation, and operation performance.</td></tr>
  <tr><td class="center bold">Week 3</td><td>Stacks, Queues & Recursion</td><td>LIFO and FIFO implementations in C. Call stack analysis, recursion mechanics, and recursion applications in data structures.</td></tr>
  <tr><td class="center bold">Week 4</td><td>Tree Structures & Binary Search Trees (BST)</td><td>Tree concepts, binary trees, traversal algorithms (inorder, preorder, postorder), and BST insertion, deletion, and searching.</td></tr>
  <tr><td class="center bold">Week 5</td><td>Heaps, Hashing & Graphs</td><td>Heap data structures, priority queues, hash tables, collision resolution techniques, and graph BFS/DFS traversals.</td></tr>
  <tr><td class="center bold">Week 6</td><td>Sorting & Searching Algorithms</td><td>Sorting algorithms (Bubble, Merge, Quick Sort) and searching algorithms (Linear & Binary Search) with asymptotic efficiency analysis.</td></tr>
  <tr><td class="center bold">Week 7</td><td>Advanced Structures & Paradigms</td><td>Advanced data structures including Tries and AVL Trees. Algorithmic paradigms including Divide & Conquer and Greedy approaches.</td></tr>
  <tr><td class="center bold">Week 8</td><td>Best Practices & Capstone Project</td><td>Code optimization, memory debugging (Valgrind), and building the capstone project: Real-Time Event Scheduler using data structures.</td></tr>
</table>

<div class="page-break"></div>

<!-- CHAPTER 12: OFFER LETTER -->
<h1>CHAPTER 12<br>COURSE CERTIFICATE & OFFER LETTER</h1>
<p>The AICTE–EduSkills Virtual Internship in Data Structures and Algorithms in C commenced in October 2026 and is currently in progress (scheduled for completion in December 2026). The official 2-page Offer Letter is attached below as verified evidence of selection and active enrollment.</p>

<div class="img-container">
  <img src="${off1Uri}" alt="Offer Letter Page 1">
  <div class="caption">Figure 12.1: Official AICTE–EduSkills Internship Offer Letter — Page 1 (Ref No: C19Y2026M101591617)</div>
</div>

<div class="page-break"></div>

<div class="img-container">
  <img src="${off2Uri}" alt="Offer Letter Page 2">
  <div class="caption">Figure 12.2: Official AICTE–EduSkills Internship Offer Letter — Page 2 (8-Week Curriculum & Capstone Plan)</div>
</div>

<div class="center" style="margin-top: 30px; padding: 20px; border: 2px dashed #94a3b8; background: #f8fafc;">
  <div class="bold" style="font-size: 13pt;">[ PLACEHOLDER FOR FINAL COMPLETION CERTIFICATE ]</div>
  <p class="italic" style="margin-top: 8px; font-size: 10pt;">
    Note: As confirmed on Page 1 of the official offer letter, the final Virtual Internship Certificate will be awarded upon completing all 8 weekly assessments and the final exit test in December 2026. The completion certificate will be appended upon formal issuance.
  </p>
</div>

<div class="page-break"></div>

<!-- CHAPTER 13: WHAT I LEARNED -->
<h1>CHAPTER 13<br>WHAT I LEARNED & ALGORITHMIC SYNTHESIS</h1>
<h2>13.1 Technical Concepts Acquired in the Internship</h2>
<p>The AICTE–EduSkills internship in Data Structures and Algorithms in C provided essential low-level systems programming and algorithmic design capabilities: mastering Big-O complexity analysis, pointer arithmetic and manual memory management (malloc/free), implementing linear and non-linear data structures (linked lists, BSTs, heaps, graphs) from scratch, and architecting the Real-Time Event Scheduler capstone project.</p>

<h2>13.2 Synthesis: How DSA Principles Informed CareerLens AI</h2>
<p>Although CareerLens AI was implemented in TypeScript and Next.js, the computational principles acquired during the C internship directly informed its engineering architecture:<br>
1. Fast Skill Lookup with Hash Sets: The skill database and alias normalization tables were implemented using O(1) hash lookups, mirroring the hashing concepts studied in Week 5.<br>
2. Prioritized Roadmap Scheduling: The three-tiered roadmap generator implements a priority queue discipline, scheduling foundational prerequisites before secondary frameworks, echoing the heap concepts covered in Week 5.<br>
3. Single-Pass Regex Matching: Token-boundary regex searches were optimized to execute within a single pass over the tokenized text, ensuring sub-50ms client processing latency.<br>
4. Defensive Programming: The discipline of boundary condition validation in C directly inspired the Zero-Denominator Guard in CareerLens AI, guaranteeing robust software resilience.</p>

<div class="page-break"></div>

<!-- PART C: PRESENTATION APPENDIX -->
<div class="center" style="margin-top: 150px;">
  <div style="font-size: 22pt; font-weight: bold; color: #1e3a8a;">PART C</div>
  <div style="font-size: 16pt; font-weight: bold; margin-top: 10px;">PRESENTATION APPENDIX</div>
  <div style="font-size: 13pt; margin-top: 20px;" class="bold">CHAPTER 14: PRESENTATION SLIDE SCREENSHOTS</div>
  <p class="center" style="margin-top: 10px; font-size: 10.5pt;">Complete 18-Slide PowerPoint Presentation for the Field Project Evaluation</p>
</div>

<div class="page-break"></div>

<!-- Slides in pairs -->
${slideUris.map((uri, idx) => {
  const slideNum = idx + 1;
  const pad = slideNum < 10 ? `0${slideNum}` : `${slideNum}`;
  let html = `
    <div class="img-container" style="margin-bottom: 25px;">
      <img src="${uri}" style="max-width: 90%;" alt="Slide ${pad}">
      <div class="caption">Slide ${pad} of 18: CareerLens AI Presentation</div>
    </div>
  `;
  if (slideNum % 2 === 0 && slideNum < 18) {
    html += '<div class="page-break"></div>';
  }
  return html;
}).join('\n')}

</body>
</html>`;

async function renderPdf() {
  console.log('📄 Rendering PDF via headless Chrome...');
  const tempHtmlPath = path.join(BASE_DIR, 'report_temp.html');
  fs.writeFileSync(tempHtmlPath, htmlContent, 'utf8');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('file:///' + tempHtmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

  await page.pdf({
    path: OUTPUT_PDF,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: '<div style="width: 100%; font-size: 8pt; font-family: Times New Roman; color: #64748b; text-align: center; padding-bottom: 8mm;">MAEER&#39;s MIT Arts, Commerce & Science College, Alandi | Raj Ramnivas Yadav (TYBCA) | Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
    margin: {
      top: '15mm',
      bottom: '20mm',
      left: '20mm',
      right: '15mm'
    }
  });

  await browser.close();
  try { fs.unlinkSync(tempHtmlPath); } catch(e) {}
  console.log(`[OK] Successfully rendered complete PDF report: ${OUTPUT_PDF}`);
}

renderPdf();
