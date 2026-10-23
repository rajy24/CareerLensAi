import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_PPTX = os.path.join(BASE_DIR, 'CareerLens_AI_Presentation_Raj_Yadav.pptx')
ASSETS_DIR = os.path.join(BASE_DIR, 'report_assets')
SCREENSHOTS_DIR = os.path.join(ASSETS_DIR, 'screenshots')
DIAGRAMS_DIR = os.path.join(ASSETS_DIR, 'diagrams')

# Color Palette
NAVY = RGBColor(15, 23, 42)       # #0f172a
SLATE_DARK = RGBColor(30, 41, 59) # #1e293b
BLUE_ACCENT = RGBColor(37, 99, 235)# #2563eb
EMERALD = RGBColor(5, 150, 105)   # #059669
WHITE = RGBColor(255, 255, 255)
LIGHT_BG = RGBColor(248, 250, 252)# #f8fafc
MUTED_TEXT = RGBColor(100, 116, 139) # #64748b
BORDER_COL = RGBColor(226, 232, 240)

prs = Presentation()
prs.slide_width = Inches(13.333) # 16:9 Widescreen
prs.slide_height = Inches(7.5)
blank_layout = prs.slide_layouts[6]

def add_header(slide, title_text, category="CAREERLENS AI — FIELD PROJECT PRESENTATION"):
    # Header background band
    top_bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(1.1))
    top_bar.fill.solid()
    top_bar.fill.fore_color.rgb = NAVY
    top_bar.line.fill.background()

    # Category / breadcrumb
    tx_cat = slide.shapes.add_textbox(Inches(0.8), Inches(0.12), Inches(11.5), Inches(0.3))
    tf_c = tx_cat.text_frame
    tf_c.word_wrap = True
    p_c = tf_c.paragraphs[0]
    p_c.text = category.upper()
    p_c.font.size = Pt(9.5)
    p_c.font.bold = True
    p_c.font.color.rgb = BLUE_ACCENT
    p_c.font.name = "Arial"

    # Slide Title
    tx_title = slide.shapes.add_textbox(Inches(0.8), Inches(0.38), Inches(11.5), Inches(0.6))
    tf_t = tx_title.text_frame
    tf_t.word_wrap = True
    p_t = tf_t.paragraphs[0]
    p_t.text = title_text
    p_t.font.size = Pt(20)
    p_t.font.bold = True
    p_t.font.color.rgb = WHITE
    p_t.font.name = "Arial"

    # Subtle bottom accent line
    accent = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(1.1), Inches(13.333), Inches(0.04))
    accent.fill.solid()
    accent.fill.fore_color.rgb = BLUE_ACCENT
    accent.line.fill.background()

    # Footer
    footer = slide.shapes.add_textbox(Inches(0.8), Inches(7.1), Inches(11.7), Inches(0.3))
    tf_f = footer.text_frame
    p_f = tf_f.paragraphs[0]
    p_f.text = "MAEER's MIT Arts, Commerce & Science College, Alandi (D.) | Raj Ramnivas Yadav (TYBCA - TE2208)"
    p_f.font.size = Pt(9)
    p_f.font.color.rgb = MUTED_TEXT
    p_f.font.name = "Arial"

def add_card(slide, left, top, width, height, title, content_lines, border_color=BORDER_COL, bg_color=WHITE):
    card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(left), Inches(top), Inches(width), Inches(height))
    card.fill.solid()
    card.fill.fore_color.rgb = bg_color
    card.line.color.rgb = border_color
    card.line.width = Pt(1.5)

    tx = slide.shapes.add_textbox(Inches(left + 0.15), Inches(top + 0.15), Inches(width - 0.3), Inches(height - 0.3))
    tf = tx.text_frame
    tf.word_wrap = True

    if title:
        p0 = tf.paragraphs[0]
        p0.text = title
        p0.font.size = Pt(12)
        p0.font.bold = True
        p0.font.color.rgb = NAVY
        p0.font.name = "Arial"
        p0.space_after = Pt(6)

    for idx, line in enumerate(content_lines):
        p = tf.add_paragraph() if (title or idx > 0) else tf.paragraphs[0]
        p.text = line
        p.font.size = Pt(10)
        p.font.color.rgb = SLATE_DARK
        p.font.name = "Arial"
        p.space_after = Pt(4)

# =============================================================
# SLIDE 1: TITLE SLIDE
# =============================================================
slide1 = prs.slides.add_slide(blank_layout)
# Dark elegant background
bg1 = slide1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
bg1.fill.solid()
bg1.fill.fore_color.rgb = NAVY
bg1.line.fill.background()

# MIT College Logo / Header if exists
mit_logo = os.path.join(ASSETS_DIR, 'mit_college_logo.png')
if os.path.exists(mit_logo):
    slide1.shapes.add_picture(mit_logo, Inches(0.8), Inches(0.6), height=Inches(0.9))

# Titles
t_box = slide1.shapes.add_textbox(Inches(0.8), Inches(1.8), Inches(11.7), Inches(2.2))
tf1 = t_box.text_frame
tf1.word_wrap = True

p1 = tf1.paragraphs[0]
p1.text = "CareerLens AI"
p1.font.size = Pt(36)
p1.font.bold = True
p1.font.color.rgb = WHITE
p1.font.name = "Arial"

p2 = tf1.add_paragraph()
p2.text = "A Career Planning and Job-Matching Web Application"
p2.font.size = Pt(18)
p2.font.bold = True
p2.font.color.rgb = BLUE_ACCENT
p2.font.name = "Arial"
p2.space_before = Pt(6)

p3 = tf1.add_paragraph()
p3.text = "Submitted in Partial Fulfilment of the Requirements for the Degree of Bachelor of Computer Applications"
p3.font.size = Pt(11)
p3.font.color.rgb = RGBColor(203, 213, 225)
p3.font.name = "Arial"
p3.space_before = Pt(6)

# Student & Faculty details card
add_card(slide1, 0.8, 4.4, 5.6, 2.3, "Submitted By:", [
    "Student Name: Raj Ramnivas Yadav",
    "Course & Class: Bachelor of Computer Applications (TYBCA)",
    "Semester: Semester V (Academic Year 2026–2027)",
    "Division & Roll No: E2 | TE2208",
    "Department: Department of Computer Application",
    "Institute: MAEER's MIT Arts, Commerce & Science College, Alandi"
], bg_color=RGBColor(30, 41, 59), border_color=BLUE_ACCENT)

# Faculty Guide & External Links Card
add_card(slide1, 6.8, 4.4, 5.7, 2.3, "Project Guidance & Deployment:", [
    "Faculty Guide: Prof. Prakash Nikam Sir",
    "Head of Department: Prof. Amit Tale",
    "Internship: AICTE–EduSkills Virtual Internship Program",
    "Domain: Data Structures & Algorithms in C + Project",
    "Live Deployment: https://careerlensai-seven.vercel.app/",
    "Source Repository: https://github.com/rajy24/CareerLensAi"
], bg_color=RGBColor(30, 41, 59), border_color=EMERALD)

# =============================================================
# SLIDE 2: INTRODUCTION & PROJECT OVERVIEW
# =============================================================
slide2 = prs.slides.add_slide(blank_layout)
add_header(slide2, "Introduction & Project Motivation")
add_card(slide2, 0.8, 1.4, 5.6, 5.4, "Background & Motivation", [
    "• The Transition Crisis: Early-career graduates struggle to transition from academic learning to corporate employment.",
    "• Opaque Screening Algorithms: Commercial applicant tracking systems (ATS) reject candidates without constructive feedback.",
    "• The 'Experience Paradox': Job postings demand complex tool stacks without clarifying essential vs. bonus qualifications.",
    "• Scattered Preparation: Job seekers juggle isolated tools for resume audits, skill roadmaps, interview prep, and application tracking.",
    "• Need for Transparency: Students need an honest, deterministic workspace that explains exactly where they match and where they fall short."
])
add_card(slide2, 6.8, 1.4, 5.7, 5.4, "CareerLens AI Overview", [
    "• Comprehensive Career Workspace: Unifies job description analysis, learning roadmaps, STAR-method interview practice, and pipeline tracking.",
    "• 100% Deterministic Engine: Replaces hallucination-prone blackboxes with token-boundary keyword matching and alias normalization.",
    "• Segmented Qualification Weighting: Separates requirements into Required (70%) and Preferred (30%) competencies to mirror real-world recruiter screening.",
    "• Zero-Denominator Guard: Protects against erroneous 0% compatibility scores when postings lack technical criteria.",
    "• Privacy-First Dual-Engine: Runs completely offline with encrypted browser storage or connects to Supabase Cloud PostgreSQL with Row-Level Security."
])

# =============================================================
# SLIDE 3: PROBLEM STATEMENT
# =============================================================
slide3 = prs.slides.add_slide(blank_layout)
add_header(slide3, "Problem Statement & Identified Gaps")
add_card(slide3, 0.8, 1.4, 3.6, 5.4, "1. Opaque Compatibility Scoring", [
    "• Generic career portals give ambiguous percentage scores without showing underlying calculations.",
    "• Substring collision bugs in naive keyword search falsely match 'C' inside 'CSS' or 'Java' inside 'JavaScript'.",
    "• Students cannot discern which missing competencies are core vs. secondary."
])
add_card(slide3, 4.8, 1.4, 3.6, 5.4, "2. Fragmented Learning Paths", [
    "• Identifying a skill gap does not tell a student what to study first.",
    "• Students waste hundreds of hours reading random tutorials without milestone projects.",
    "• No alignment between identified job requirement gaps and prioritized learning timelines."
])
add_card(slide3, 8.8, 1.4, 3.7, 5.4, "3. Disconnected Tracking & Prep", [
    "• Applications are tracked in manual spreadsheets that quickly become out-of-date.",
    "• Interview preparation is detached from the specific requirements of target job applications.",
    "• Lack of structured rubric evaluation for technical and behavioral questions."
])

# =============================================================
# SLIDE 4: OBJECTIVES & SCOPE
# =============================================================
slide4 = prs.slides.add_slide(blank_layout)
add_header(slide4, "Project Objectives & Operational Scope")
add_card(slide4, 0.8, 1.4, 5.6, 5.4, "Core Project Objectives", [
    "1. Develop a responsive, editorial SaaS web application using Next.js 14 and Tailwind CSS.",
    "2. Implement a deterministic token-boundary regex skill extractor covering 150+ tech aliases.",
    "3. Segment job postings into Required Qualifications (70%) and Preferred Competencies (30%).",
    "4. Formulate an open, mathematical compatibility scoring algorithm with full user disclosure.",
    "5. Implement a Zero-Denominator Guard to handle non-technical or vague job descriptions safely.",
    "6. Build a prioritized roadmap generator that maps missing skills into 3-tier structured plans.",
    "7. Provide role-specific interview practice with an interactive answer evaluation rubric.",
    "8. Implement a complete job application tracker with status stages and follow-up reminders."
])
add_card(slide4, 6.8, 1.4, 5.7, 5.4, "Functional Scope & Boundaries", [
    "• In-Scope (Implemented & Tested):",
    "  - Web-based responsive interface on desktop, tablet, and mobile.",
    "  - Resume text extraction and bidirectional verified profile skill synchronization.",
    "  - Job compatibility analyzer with mathematical formula breakdown.",
    "  - Learning plan milestones with curated official documentation and mini-projects.",
    "  - Role interview drills (Frontend, Backend, Full Stack, Data, Cloud) with answer rubric.",
    "  - Job pipeline tracker with inline status progression and JSON export.",
    "• Out-of-Scope (Future Enhancements):",
    "  - Automated live LinkedIn/Indeed job board web scrapers.",
    "  - Paid external LLM API calls (intentionally excluded to ensure 100% privacy and reliability).",
    "  - Real-time SMS and WhatsApp interview alert notifications."
])

# =============================================================
# SLIDE 5: EXISTING SYSTEMS VS CAREERLENS AI
# =============================================================
slide5 = prs.slides.add_slide(blank_layout)
add_header(slide5, "Comparative Analysis: Existing Systems vs CareerLens AI")
# Add a comparison table
rows, cols = 7, 4
left, top, width, height = Inches(0.8), Inches(1.4), Inches(11.7), Inches(5.4)
table_shape = slide5.shapes.add_table(rows, cols, left, top, width, height)
tbl = table_shape.table
tbl.columns[0].width = Inches(2.6)
tbl.columns[1].width = Inches(2.9)
tbl.columns[2].width = Inches(2.9)
tbl.columns[3].width = Inches(3.3)

headers = ["Feature / Dimension", "Traditional Portals (LinkedIn, Indeed)", "Commercial Resume Scanners", "CareerLens AI (Proposed)"]
for col_idx, h in enumerate(headers):
    cell = tbl.cell(0, col_idx)
    cell.fill.solid()
    cell.fill.fore_color.rgb = NAVY
    p = cell.text_frame.paragraphs[0]
    p.text = h
    p.font.bold = True
    p.font.size = Pt(10)
    p.font.color.rgb = WHITE

data = [
    ["Scoring Transparency", "Opaque algorithmic feed; no mathematical explanation", "Black-box proprietary percentage; no formula access", "100% open deterministic formula with full mathematical breakdown"],
    ["Keyword Collision Safety", "Basic keyword matching prone to substring false positives", "Basic keyword matching with inconsistent parsing", "Strict token-boundary regex: prevents 'C' matching 'CSS', 'Java' matching 'JS'"],
    ["Requirement Weighting", "No distinction between core and bonus criteria", "Uniform keyword count regardless of requirement tier", "Segmented weighting: 70% Required minimums + 30% Preferred bonus skills"],
    ["Zero-Denominator Guard", "Displays 0% or phantom matches on short text", "Displays arbitrary 0% score, confusing users", "Verified safety guard: prompts for full qualifications; never shows false 0%"],
    ["Data Privacy & Cost", "Requires account, public profiles, tracking cookies", "Freemium paywalls ($20-$40/mo), collects resume data", "100% free, client-side privacy, encrypted localStorage, zero API cost"],
    ["End-to-End Workflow", "Job discovery only; no learning roadmaps or interview prep", "Resume score only; no application tracker or drills", "Unified suite: Resume + Analysis + Roadmaps + Interview Drills + Pipeline"]
]

for row_idx, r in enumerate(data):
    for col_idx, val in enumerate(r):
        cell = tbl.cell(row_idx + 1, col_idx)
        cell.fill.solid()
        cell.fill.fore_color.rgb = LIGHT_BG if row_idx % 2 == 0 else WHITE
        p = cell.text_frame.paragraphs[0]
        p.text = val
        p.font.size = Pt(9)
        p.font.color.rgb = SLATE_DARK
        if col_idx == 3:
            p.font.bold = True
            p.font.color.rgb = BLUE_ACCENT

# =============================================================
# SLIDE 6: SYSTEM ARCHITECTURE
# =============================================================
slide6 = prs.slides.add_slide(blank_layout)
add_header(slide6, "System Architecture: 3-Tier Dual-Engine Design")
arch_img = os.path.join(DIAGRAMS_DIR, 'fig_6_5_architecture.png')
if os.path.exists(arch_img):
    slide6.shapes.add_picture(arch_img, Inches(0.8), Inches(1.35), width=Inches(7.2))
add_card(slide6, 8.3, 1.35, 4.2, 5.5, "Architectural Highlights", [
    "• Tier 1: Presentation Layer",
    "  - Built with Next.js 14 App Router and React 18.",
    "  - Responsive Tailwind CSS design system.",
    "  - Dynamic SVG visualizations and Lucide icons.",
    "• Tier 2: Business Logic Layer",
    "  - Token-boundary skill parser and alias normalizer.",
    "  - Deterministic qualification segmenter (70/30).",
    "  - Serverless API route handlers (/api/analyze, /api/learning-plan, /api/interview, /api/applications).",
    "• Tier 3: Dual-Engine Persistence",
    "  - Engine A (Active Fallback): Encrypted HTML5 LocalStorage for zero-dependency privacy.",
    "  - Engine B (Cloud Production): Supabase PostgreSQL with user-isolated Row-Level Security (RLS)."
])

# =============================================================
# SLIDE 7: DFD LEVEL 0 & LEVEL 1
# =============================================================
slide7 = prs.slides.add_slide(blank_layout)
add_header(slide7, "Data Flow Diagrams: Level 0 (Context) & Level 1")
dfd0_img = os.path.join(DIAGRAMS_DIR, 'fig_6_1_dfd_level_0.png')
dfd1_img = os.path.join(DIAGRAMS_DIR, 'fig_6_2_dfd_level_1.png')
if os.path.exists(dfd0_img):
    slide7.shapes.add_picture(dfd0_img, Inches(0.8), Inches(1.4), width=Inches(5.7))
if os.path.exists(dfd1_img):
    slide7.shapes.add_picture(dfd1_img, Inches(6.8), Inches(1.4), width=Inches(5.7))

# =============================================================
# SLIDE 8: USE-CASE & ACTIVITY DIAGRAMS
# =============================================================
slide8 = prs.slides.add_slide(blank_layout)
add_header(slide8, "System Design: Use-Case & Activity Workflows")
uc_img = os.path.join(DIAGRAMS_DIR, 'fig_6_3_use_case.png')
act_img = os.path.join(DIAGRAMS_DIR, 'fig_6_4_activity.png')
if os.path.exists(uc_img):
    slide8.shapes.add_picture(uc_img, Inches(0.8), Inches(1.4), width=Inches(5.7))
if os.path.exists(act_img):
    slide8.shapes.add_picture(act_img, Inches(6.8), Inches(1.4), width=Inches(5.7))

# =============================================================
# SLIDE 9: DATA MODEL & ER DIAGRAM
# =============================================================
slide9 = prs.slides.add_slide(blank_layout)
add_header(slide9, "Relational Schema & Entity-Relationship (ER) Diagram")
er_img = os.path.join(DIAGRAMS_DIR, 'fig_6_6_er_diagram.png')
if os.path.exists(er_img):
    slide9.shapes.add_picture(er_img, Inches(0.8), Inches(1.4), width=Inches(7.2))
add_card(slide9, 8.3, 1.4, 4.2, 5.4, "Database Entities & Schema", [
    "• PROFILES (Primary Entity):",
    "  - id (UUID), email, full_name, skills[], target_role, bio, timestamps.",
    "• RESUMES (1:N with Profiles):",
    "  - id, user_id (FK), file_name, extracted_text, detected_skills[].",
    "• JOB_ANALYSES (1:N with Profiles):",
    "  - id, user_id (FK), job_title, company, matched_skills[], missing_skills[], match_percentage.",
    "• LEARNING_PLANS (1:N with Analyses):",
    "  - id, user_id (FK), skill_name, priority, timeframe, concepts[], mini_project, completed.",
    "• JOB_APPLICATIONS (1:N with Profiles):",
    "  - id, user_id (FK), company, role, status, salary_range, date_applied, follow_up_date.",
    "• Security: Row-Level Security (RLS) ensures users only access their own records."
])

# =============================================================
# SLIDE 10: TECHNOLOGY STACK
# =============================================================
slide10 = prs.slides.add_slide(blank_layout)
add_header(slide10, "Technology Stack & Engineering Architecture")
add_card(slide10, 0.8, 1.4, 3.6, 5.4, "Frontend Tier", [
    "• Framework: Next.js 14.2.35",
    "• Architecture: App Router with Server & Client Component separation",
    "• Language: TypeScript 5.6.3 (Strict type verification)",
    "• Styling: Tailwind CSS 3.4 (Custom design system)",
    "• Iconography: Lucide-React line icons",
    "• Animation: Framer Motion 11.11 (Restrained micro-transitions)",
    "• Typography: Plus Jakarta Sans & JetBrains Mono"
])
add_card(slide10, 4.8, 1.4, 3.6, 5.4, "Backend & Logic Tier", [
    "• Runtime: Node.js v22 & Vercel Edge Serverless Functions",
    "• API Routes:",
    "  - /api/analyze (Skill parser & match calculator)",
    "  - /api/learning-plan (Curated milestone generator)",
    "  - /api/interview (Rubric scoring engine)",
    "  - /api/applications (Job pipeline CRUD handler)",
    "• State Context: React CareerLensProvider with dual-mode storage synchronization",
    "• Verification: 7-iteration Loop Engineering"
])
add_card(slide10, 8.8, 1.4, 3.7, 5.4, "Database & Deployment", [
    "• Cloud Database: Supabase PostgreSQL (Managed cloud instance)",
    "• Access Control: Row-Level Security (RLS) with auth.uid() isolation",
    "• Auth: Supabase Auth + JWT Sessions + Demo Guest bypass",
    "• Offline Engine: Encrypted HTML5 LocalStorage fallback",
    "• Hosting: Vercel Cloud Platform with continuous Git deployment",
    "• Version Control: Git 2.47 + GitHub repository (rajy24/CareerLensAi)"
])

# =============================================================
# SLIDE 11: DETERMINISTIC MATCHING ENGINE
# =============================================================
slide11 = prs.slides.add_slide(blank_layout)
add_header(slide11, "Deterministic Competency Matching Engine")
add_card(slide11, 0.8, 1.4, 5.6, 5.4, "Algorithmic Rules & Formula", [
    "• Token-Boundary Regex Matching:",
    "  - Uses boundary patterns (^|[^a-zA-Z0-9_#+])SKILL([^a-zA-Z0-9_#+]|$).",
    "  - Completely eliminates substring collisions (e.g. 'C' in 'CSS', 'Java' in 'JavaScript').",
    "• Canonical Alias Normalization:",
    "  - Normalizes aliases: 'react.js' -> 'React', 'postgres' -> 'PostgreSQL', 'ts' -> 'TypeScript'.",
    "• Segmented Requirement Scoring:",
    "  - Required Competencies Weight: 70%",
    "  - Preferred / Bonus Competencies Weight: 30%",
    "  - Score = (Req_Matched / Req_Total * 70) + (Pref_Matched / Pref_Total * 30)",
    "• Zero-Denominator Guard:",
    "  - If Total_JD_Skills = 0, returns match_percentage: null with a clear guidance prompt.",
    "  - Guarantees zero false 0% scores or phantom skill gaps."
])
add_card(slide11, 6.8, 1.4, 5.7, 5.4, "Mathematical Scoring Example", [
    "• Sample Evaluation Scenario:",
    "  - Job Description: Junior Frontend Developer",
    "  - Required Skills Detected (4): HTML, CSS, JavaScript, React",
    "  - Preferred Skills Detected (3): TypeScript, Tailwind CSS, Jest",
    "  - Candidate Profile Skills: HTML, CSS, JavaScript, React, Git",
    "• Calculation Breakdown:",
    "  - Required Matched: 4 / 4 = 100% -> Weighted: 70.0%",
    "  - Preferred Matched: 0 / 3 = 0.0% -> Weighted: 0.0%",
    "  - Final Compatibility Score: 70.0% -> Rounded to 70%",
    "  - Readiness Tier: Moderate Readiness (Core Qualifications Met)",
    "  - Output Gaps: TypeScript, Tailwind CSS, Jest prioritized for learning plan.",
    "• Formula is fully rendered in the UI for candidate transparency."
])

# =============================================================
# SLIDE 12: APPLICATION SHOWCASE: LANDING & DASHBOARD
# =============================================================
slide12 = prs.slides.add_slide(blank_layout)
add_header(slide12, "Application Interface: Landing Page & Dashboard")
landing_img = os.path.join(SCREENSHOTS_DIR, '01_landing_page.png')
dash_img = os.path.join(SCREENSHOTS_DIR, '02_dashboard.png')
if os.path.exists(landing_img):
    slide12.shapes.add_picture(landing_img, Inches(0.8), Inches(1.4), width=Inches(5.7))
    t1 = slide12.shapes.add_textbox(Inches(0.8), Inches(5.8), Inches(5.7), Inches(1.0))
    t1.text_frame.word_wrap = True
    p = t1.text_frame.paragraphs[0]
    p.text = "Figure 1: Public Landing Page featuring editorial SaaS layout, optical lens logo, and transparent scoring disclosures."
    p.font.size = Pt(9)
    p.font.color.rgb = SLATE_DARK
if os.path.exists(dash_img):
    slide12.shapes.add_picture(dash_img, Inches(6.8), Inches(1.4), width=Inches(5.7))
    t2 = slide12.shapes.add_textbox(Inches(6.8), Inches(5.8), Inches(5.7), Inches(1.0))
    t2.text_frame.word_wrap = True
    p = t2.text_frame.paragraphs[0]
    p.text = "Figure 2: Personalized Candidate Dashboard showing latest match rate (70%), verified skills, roadmap progress, and active applications."
    p.font.size = Pt(9)
    p.font.color.rgb = SLATE_DARK

# =============================================================
# SLIDE 13: APPLICATION SHOWCASE: ANALYZER & ROADMAPS
# =============================================================
slide13 = prs.slides.add_slide(blank_layout)
add_header(slide13, "Application Interface: Job Analyzer & Learning Roadmaps")
results_img = os.path.join(SCREENSHOTS_DIR, '04_job_analysis_results.png')
roadmaps_img = os.path.join(SCREENSHOTS_DIR, '06_learning_roadmaps.png')
if os.path.exists(results_img):
    slide13.shapes.add_picture(results_img, Inches(0.8), Inches(1.4), width=Inches(5.7))
    t1 = slide13.shapes.add_textbox(Inches(0.8), Inches(5.8), Inches(5.7), Inches(1.0))
    t1.text_frame.word_wrap = True
    p = t1.text_frame.paragraphs[0]
    p.text = "Figure 3: Two-Column Compatibility Analyzer displaying 70% weighted score, matched skills badges, missing gaps, and mathematical breakdown."
    p.font.size = Pt(9)
    p.font.color.rgb = SLATE_DARK
if os.path.exists(roadmaps_img):
    slide13.shapes.add_picture(roadmaps_img, Inches(6.8), Inches(1.4), width=Inches(5.7))
    t2 = slide13.shapes.add_textbox(Inches(6.8), Inches(5.8), Inches(5.7), Inches(1.0))
    t2.text_frame.word_wrap = True
    p = t2.text_frame.paragraphs[0]
    p.text = "Figure 4: Prioritized Learning Roadmaps categorizing skill gaps into High/Medium/Supplementary tiers with mini-projects and documentation links."
    p.font.size = Pt(9)
    p.font.color.rgb = SLATE_DARK

# =============================================================
# SLIDE 14: APPLICATION SHOWCASE: INTERVIEW & TRACKER
# =============================================================
slide14 = prs.slides.add_slide(blank_layout)
add_header(slide14, "Application Interface: Interview Workbench & Job Tracker")
interview_img = os.path.join(SCREENSHOTS_DIR, '08_interview_practice.png')
tracker_img = os.path.join(SCREENSHOTS_DIR, '10_application_tracker.png')
if os.path.exists(interview_img):
    slide14.shapes.add_picture(interview_img, Inches(0.8), Inches(1.4), width=Inches(5.7))
    t1 = slide14.shapes.add_textbox(Inches(0.8), Inches(5.8), Inches(5.7), Inches(1.0))
    t1.text_frame.word_wrap = True
    p = t1.text_frame.paragraphs[0]
    p.text = "Figure 5: Role-Specific Interview Workbench with technical, coding, and behavioral drills, model answers, and automated feedback scoring."
    p.font.size = Pt(9)
    p.font.color.rgb = SLATE_DARK
if os.path.exists(tracker_img):
    slide14.shapes.add_picture(tracker_img, Inches(6.8), Inches(1.4), width=Inches(5.7))
    t2 = slide14.shapes.add_textbox(Inches(6.8), Inches(5.8), Inches(5.7), Inches(1.0))
    t2.text_frame.word_wrap = True
    p = t2.text_frame.paragraphs[0]
    p.text = "Figure 6: Job Application Tracker with pipeline stages (Wishlist, Applied, Interviewing, Offer, Rejected), follow-up reminders, and search."
    p.font.size = Pt(9)
    p.font.color.rgb = SLATE_DARK

# =============================================================
# SLIDE 15: TESTING & QUALITY ASSURANCE
# =============================================================
slide15 = prs.slides.add_slide(blank_layout)
add_header(slide15, "Testing, Verification & Quality Assurance")
add_card(slide15, 0.8, 1.4, 5.6, 5.4, "Loop Engineering Test Strategy", [
    "• Methodology: Iterative Build -> Typecheck -> Debug -> Verify loop.",
    "• Production Compilation: Next.js 14 production build verified with Code 0.",
    "• Static & Dynamic Routes: All 20 routes compiled with zero errors.",
    "• Strict Type Safety: TypeScript compiler caught and resolved named import discrepancies, state undefined values, and payload duplication.",
    "• Deterministic Engine Test Suite (scripts/verify-engine.js):",
    "  - Substring collision isolation verified for 'C' and 'Java'.",
    "  - Zero-Denominator Guard verified for non-technical text.",
    "  - 70/30 requirement segmentation mathematically validated."
])
add_card(slide15, 6.8, 1.4, 5.7, 5.4, "Functional Test Results Summary", [
    "• TC01: User Profile Skill Management -> PASS",
    "• TC02: Resume Text Extraction & Skill Sync -> PASS",
    "• TC03: Sample JD Pre-loading -> PASS",
    "• TC04: Deterministic Compatibility Calculation -> PASS",
    "• TC05: Zero-Denominator Safety Guard -> PASS",
    "• TC06: Mathematical Formula Disclosure Modal -> PASS",
    "• TC07: Automatic Roadmap Gap Mapping -> PASS",
    "• TC08: Interactive Goal Completion Toggling -> PASS",
    "• TC09: Custom Learning Goal Creation -> PASS",
    "• TC10: Interview Question Role Filtering -> PASS",
    "• TC11: Answer Rubric Concept Coverage -> PASS",
    "• TC12: Application Pipeline CRUD Operations -> PASS",
    "• TC13: Data Portability (JSON Archive Export) -> PASS",
    "• TC14: Workspace Reset Confirmation Safety -> PASS"
])

# =============================================================
# SLIDE 16: PART B: AICTE-EDUSKILLS VIRTUAL INTERNSHIP
# =============================================================
slide16 = prs.slides.add_slide(blank_layout)
add_header(slide16, "Part B: AICTE–EduSkills Virtual Internship Program")
add_card(slide16, 0.8, 1.4, 5.6, 5.4, "Internship Structure & Selection", [
    "• Organization: AICTE – EduSkills Virtual Internship Program",
    "• Domain: Data Structures and Algorithms in C + Project",
    "• Duration: 8 Weeks (October 2026 – December 2026)",
    "• Student Name: Raj Ramnivas Yadav",
    "• Student AICTE ID: STU6810fb64da87c1745943396",
    "• Offer Letter Reference: C19Y2026M101591617",
    "• Director: Bibek Ranjan, Director, EduSkills Foundation",
    "• Status: Currently in progress (October 2026). Weekly assessments and assignments underway toward final certification."
])
add_card(slide16, 6.8, 1.4, 5.7, 5.4, "8-Week Curriculum & Capstone", [
    "• Week 1: Course Kick-off & Algorithmic Thinking (Big-O analysis)",
    "• Week 2: Linear Data Structures (Arrays & Linked Lists in C)",
    "• Week 3: Stacks, Queues & Recursion (LIFO/FIFO mechanics)",
    "• Week 4: Tree Data Structures & Binary Search Trees (BST)",
    "• Week 5: Heaps, Priority Queues, Hashing & Graphs (BFS/DFS)",
    "• Week 6: Sorting & Searching Algorithms (Quick, Merge, Binary)",
    "• Week 7: Advanced Data Structures & Paradigms (Tries, AVL, Greedy)",
    "• Week 8: Best Practices & Capstone: Real-Time Event Scheduler",
    "• Project Synthesis: DSA concepts (hashing, priority queues) directly informed CareerLens AI's taxonomy lookup and roadmap prioritization."
])

# =============================================================
# SLIDE 17: CONCLUSION & FUTURE SCOPE
# =============================================================
slide17 = prs.slides.add_slide(blank_layout)
add_header(slide17, "Conclusion & Future Research Scope")
add_card(slide17, 0.8, 1.4, 5.6, 5.4, "Project Conclusion", [
    "• Proven Feasibility: Successfully demonstrated that a deterministic, privacy-first career workspace provides superior clarity over blackbox AI systems.",
    "• Real-World Alignment: Segmented 70/30 requirement weighting mirrors actual technical recruiter qualification evaluation.",
    "• Dual-Engine Resilience: Operates with 100% functionality in offline demo mode while fully compatible with Supabase Cloud PostgreSQL with RLS.",
    "• Comprehensive Academic Value: Applied software engineering principles including requirement analysis, UML design, type safety, and systematic QA."
])
add_card(slide17, 6.8, 1.4, 5.7, 5.4, "Future Research & Development", [
    "• Optional Local LLM Integration: Integrate fine-tuned quantized open-weights models (e.g. Llama-3-8B) via WebGPU for contextual resume bullet rewriting.",
    "• Live Job Board Webhooks: Connect official APIs (LinkedIn, Indeed) for real-time local job alerts based on profile match ratings.",
    "• Mobile Cross-Platform App: Package frontend as a cross-platform React Native / Capacitor mobile application for iOS and Android.",
    "• Peer Benchmarking: Anonymous aggregate skill benchmarking across cohort university graduates."
])

# =============================================================
# SLIDE 18: THANK YOU & Q&A
# =============================================================
slide18 = prs.slides.add_slide(blank_layout)
bg18 = slide18.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
bg18.fill.solid()
bg18.fill.fore_color.rgb = NAVY
bg18.line.fill.background()

t_box18 = slide18.shapes.add_textbox(Inches(0.8), Inches(2.0), Inches(11.7), Inches(3.5))
tf18 = t_box18.text_frame
tf18.word_wrap = True

p1 = tf18.paragraphs[0]
p1.text = "Thank You!"
p1.font.size = Pt(44)
p1.font.bold = True
p1.font.color.rgb = WHITE
p1.font.name = "Arial"
p1.alignment = PP_ALIGN.CENTER

p2 = tf18.add_paragraph()
p2.text = "Questions & Feedback Welcomed"
p2.font.size = Pt(20)
p2.font.bold = True
p2.font.color.rgb = BLUE_ACCENT
p2.font.name = "Arial"
p2.space_before = Pt(12)
p2.alignment = PP_ALIGN.CENTER

p3 = tf18.add_paragraph()
p3.text = "Raj Ramnivas Yadav | TYBCA | Roll No: TE2208 | Division: E2\nMAEER's MIT Arts, Commerce and Science College, Alandi (D.), Pune"
p3.font.size = Pt(13)
p3.font.color.rgb = RGBColor(203, 213, 225)
p3.font.name = "Arial"
p3.space_before = Pt(18)
p3.alignment = PP_ALIGN.CENTER

p4 = tf18.add_paragraph()
p4.text = "Live Website: https://careerlensai-seven.vercel.app/\nGitHub Repository: https://github.com/rajy24/CareerLensAi"
p4.font.size = Pt(12)
p4.font.color.rgb = EMERALD
p4.font.name = "Arial"
p4.space_before = Pt(16)
p4.alignment = PP_ALIGN.CENTER

prs.save(OUTPUT_PPTX)
print(f"[OK] Successfully generated presentation: {OUTPUT_PPTX}")
