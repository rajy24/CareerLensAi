import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'report_assets', 'slides')
os.makedirs(OUTPUT_DIR, exist_ok=True)
ASSETS_DIR = os.path.join(os.path.dirname(__file__), '..', 'report_assets')
SCREENSHOTS_DIR = os.path.join(ASSETS_DIR, 'screenshots')
DIAGRAMS_DIR = os.path.join(ASSETS_DIR, 'diagrams')

slides_data = [
    {
        "num": 1, "title": "CareerLens AI", "subtitle": "A Career Planning and Job-Matching Web Application",
        "type": "title", "details": [
            "Student Name: Raj Ramnivas Yadav | Roll No: TE2208 | Div: E2",
            "Bachelor of Computer Applications (TYBCA) — Semester V (2026–2027)",
            "MAEER's MIT Arts, Commerce and Science College, Alandi (D.), Pune",
            "Project Guide: Prof. Prakash Nikam Sir | HOD: Prof. Amit Tale",
            "AICTE–EduSkills Virtual Internship: Data Structures & Algorithms in C + Project",
            "Live Web App: https://careerlensai-seven.vercel.app/"
        ]
    },
    {
        "num": 2, "title": "Introduction & Project Motivation", "type": "two_card",
        "left_title": "Background & Motivation", "left_items": [
            "• Graduate Transition Crisis: Difficulty mapping coursework to job qualifications.",
            "• Opaque Screening Systems: Commercial ATS rejections lack actionable feedback.",
            "• Experience Paradox: Unclear distinction between required and preferred skills.",
            "• Fragmented Workflow: Disconnected tools for resume, roadmaps, and applications."
        ],
        "right_title": "CareerLens AI Overview", "right_items": [
            "• Unified Career Workspace: Seamless transition from self-audit to job offer.",
            "• Deterministic Engine: Zero-hallucination token-boundary keyword matching.",
            "• Segmented Scoring: 70% Required minimums + 30% Preferred bonus qualifications.",
            "• Dual-Engine Persistence: Complete offline privacy fallback or Supabase Cloud."
        ]
    },
    {
        "num": 3, "title": "Problem Statement & Identified Gaps", "type": "three_card",
        "c1_title": "1. Opaque Scoring", "c1_items": [
            "• Blackbox percentage match.",
            "• No mathematical formula.",
            "• False substring collisions ('C' matches 'CSS', 'Java' in 'JS')."
        ],
        "c2_title": "2. Unstructured Gaps", "c2_items": [
            "• Skill gaps lack clear study sequence.",
            "• Random tutorials without mini-projects.",
            "• No priority tiering (Core vs Bonus)."
        ],
        "c3_title": "3. Siloed Preparation", "c3_items": [
            "• Out-of-date manual spreadsheets.",
            "• Interview prep detached from job requirements.",
            "• No objective rubric scoring."
        ]
    },
    {
        "num": 4, "title": "Project Objectives & Scope", "type": "two_card",
        "left_title": "Key Objectives", "left_items": [
            "1. Responsive editorial SaaS platform using Next.js 14 & Tailwind.",
            "2. Deterministic regex parser for 150+ canonical tech aliases.",
            "3. Segmented 70/30 weighting for required vs preferred qualifications.",
            "4. Zero-Denominator Guard preventing false 0% compatibility ratings.",
            "5. Automated 3-tier prioritized learning roadmaps with mini-projects.",
            "6. Role-specific interview workbench with automated rubric scoring.",
            "7. Complete job application tracking workspace with pipeline stages."
        ],
        "right_title": "Functional Scope", "right_items": [
            "• Implemented Modules:",
            "  - Dashboard KPI summary & telemetry.",
            "  - Resume text extraction & profile sync.",
            "  - Job compatibility analyzer with formula disclosure.",
            "  - Milestone roadmaps with official doc links.",
            "  - Technical, coding & HR interview drills.",
            "  - Application tracker with JSON backup export.",
            "• Future Scope:",
            "  - Direct LinkedIn/Indeed live API webhooks.",
            "  - On-device quantized local LLM synthesis."
        ]
    },
    {
        "num": 5, "title": "Existing Systems vs CareerLens AI", "type": "table"
    },
    {
        "num": 6, "title": "System Architecture: 3-Tier Dual-Engine Design", "type": "image",
        "img": os.path.join(DIAGRAMS_DIR, 'fig_6_5_architecture.png'),
        "caption": "Figure 6.5: Next.js 14 Client Layer, Serverless API Route Handlers, and Dual-Engine Persistence"
    },
    {
        "num": 7, "title": "Data Flow Diagrams: Level 0 (Context) & Level 1", "type": "double_image",
        "img1": os.path.join(DIAGRAMS_DIR, 'fig_6_1_dfd_level_0.png'), "cap1": "DFD Level 0: Context Diagram",
        "img2": os.path.join(DIAGRAMS_DIR, 'fig_6_2_dfd_level_1.png'), "cap2": "DFD Level 1: Functional Decomposition"
    },
    {
        "num": 8, "title": "System Design: Use-Case & Activity Workflows", "type": "double_image",
        "img1": os.path.join(DIAGRAMS_DIR, 'fig_6_3_use_case.png'), "cap1": "UML Use-Case Diagram",
        "img2": os.path.join(DIAGRAMS_DIR, 'fig_6_4_activity.png'), "cap2": "UML Activity Diagram"
    },
    {
        "num": 9, "title": "Relational Schema & Entity-Relationship (ER) Diagram", "type": "image",
        "img": os.path.join(DIAGRAMS_DIR, 'fig_6_6_er_diagram.png'),
        "caption": "Figure 6.6: Database Schema covering Profiles, Resumes, Analyses, Plans, Sessions, and Applications"
    },
    {
        "num": 10, "title": "Technology Stack & Engineering Architecture", "type": "three_card",
        "c1_title": "Frontend Tier", "c1_items": [
            "• Next.js 14.2 App Router",
            "• React 18 & TypeScript 5.6",
            "• Tailwind CSS 3.4 Design",
            "• Framer Motion & Lucide Icons",
            "• Plus Jakarta Sans Typography"
        ],
        "c2_title": "Backend Logic Tier", "c2_items": [
            "• Node.js v22 & Vercel Edge",
            "• /api/analyze route handler",
            "• /api/learning-plan handler",
            "• /api/interview rubric evaluator",
            "• /api/applications CRUD handler"
        ],
        "c3_title": "Database & Cloud", "c3_items": [
            "• Supabase PostgreSQL RLS",
            "• Supabase Auth & JWT Sessions",
            "• Encrypted LocalStorage Fallback",
            "• Vercel Global Edge Hosting",
            "• Git 2.47 & GitHub (rajy24)"
        ]
    },
    {
        "num": 11, "title": "Deterministic Competency Matching Engine", "type": "two_card",
        "left_title": "Algorithmic Formulation", "left_items": [
            "• Token-Boundary Regular Expressions:",
            "  (^|[^a-zA-Z0-9_#+])SKILL([^a-zA-Z0-9_#+]|$)",
            "  Guarantees zero false substring collisions.",
            "• Canonical Alias Normalization:",
            "  Maps 'react.js' -> 'React', 'ts' -> 'TypeScript'.",
            "• Segmented Qualification Weighting:",
            "  Required minimums = 70% | Preferred = 30%",
            "• Zero-Denominator Guard:",
            "  Returns null on non-technical descriptions."
        ],
        "right_title": "Mathematical Example (Junior Frontend)", "right_items": [
            "• Required Skills (4): HTML, CSS, JS, React",
            "• Preferred Skills (3): TypeScript, Tailwind, Jest",
            "• Candidate Skills: HTML, CSS, JS, React, Git",
            "• Calculation Breakdown:",
            "  - Req Matched: 4/4 (100%) -> Weighted: 70.0%",
            "  - Pref Matched: 0/3 (0.0%) -> Weighted: 0.0%",
            "  - Compatibility Score: 70.0% -> Rounded: 70%",
            "• Readiness Badge: Moderate Readiness",
            "• Output Gaps: TypeScript, Tailwind, Jest."
        ]
    },
    {
        "num": 12, "title": "Application Interface: Landing Page & Dashboard", "type": "double_image",
        "img1": os.path.join(SCREENSHOTS_DIR, '01_landing_page.png'), "cap1": "Landing Page: Public SaaS Presentation",
        "img2": os.path.join(SCREENSHOTS_DIR, '02_dashboard.png'), "cap2": "Candidate Dashboard: Real-Time Readiness Hub"
    },
    {
        "num": 13, "title": "Application Interface: Job Analyzer & Roadmaps", "type": "double_image",
        "img1": os.path.join(SCREENSHOTS_DIR, '04_job_analysis_results.png'), "cap1": "Compatibility Analyzer: 70% Score Breakdown",
        "img2": os.path.join(SCREENSHOTS_DIR, '06_learning_roadmaps.png'), "cap2": "Learning Roadmaps: Prioritized Skill Gaps"
    },
    {
        "num": 14, "title": "Application Interface: Interview Prep & Tracker", "type": "double_image",
        "img1": os.path.join(SCREENSHOTS_DIR, '08_interview_practice.png'), "cap1": "Interview Workbench: Role Drills & Feedback",
        "img2": os.path.join(SCREENSHOTS_DIR, '10_application_tracker.png'), "cap2": "Applications Tracker: Candidate Pipeline Table"
    },
    {
        "num": 15, "title": "Testing, Verification & Quality Assurance", "type": "two_card",
        "left_title": "Loop Engineering Methodology", "left_items": [
            "• 7 Automated Build & Verification Iterations.",
            "• TypeScript Compiler Type Safety verified.",
            "• Production build (npm run build) passed Code 0.",
            "• All 20 static and dynamic routes compiled.",
            "• Deterministic engine automated test suite passed.",
            "• Zero-Denominator Guard verified for empty JDs."
        ],
        "right_title": "Functional Test Cases Summary", "right_items": [
            "• TC01: Profile Skill Tag Management -> PASS",
            "• TC02: Resume Text Extraction & Sync -> PASS",
            "• TC03: Sample JD Pre-population -> PASS",
            "• TC04: Deterministic Compatibility Score -> PASS",
            "• TC05: Zero-Denominator Safety Guard -> PASS",
            "• TC06: Roadmap Milestone Generation -> PASS",
            "• TC07: Interview Rubric Concept Coverage -> PASS",
            "• TC08: Application Pipeline CRUD -> PASS",
            "• TC09: JSON Archive Data Portability -> PASS"
        ]
    },
    {
        "num": 16, "title": "Part B: AICTE–EduSkills Virtual Internship", "type": "two_card",
        "left_title": "Internship Selection & Details", "left_items": [
            "• Program: AICTE–EduSkills Virtual Internship",
            "• Domain: Data Structures & Algorithms in C + Project",
            "• Duration: 8 Weeks (October 2026 – December 2026)",
            "• Student Name: Raj Ramnivas Yadav",
            "• AICTE Student ID: STU6810fb64da87c1745943396",
            "• Offer Letter Ref: C19Y2026M101591617",
            "• Director: Bibek Ranjan, Director, EduSkills",
            "• Status: Currently in progress (October 2026)."
        ],
        "right_title": "8-Week Curriculum & Capstone", "right_items": [
            "• Week 1: Algorithmic Thinking & Big-O Complexity",
            "• Week 2: Arrays & Linked Lists implementation in C",
            "• Week 3: Stacks, Queues & Recursion mechanics",
            "• Week 4: Binary Trees & Binary Search Trees (BST)",
            "• Week 5: Heaps, Priority Queues, Hashing & Graphs",
            "• Week 6: Sorting (Quick/Merge) & Binary Search",
            "• Week 7: Advanced Data Structures (Tries, AVL, Greedy)",
            "• Week 8: Capstone: Real-Time Event Scheduler in C",
            "• Project Synthesis: DSA concepts applied to CareerLens."
        ]
    },
    {
        "num": 17, "title": "Conclusion & Future Research Scope", "type": "two_card",
        "left_title": "Project Conclusion", "left_items": [
            "• Demonstrated that transparent, deterministic algorithms provide superior career guidance over opaque blackboxes.",
            "• Segmented 70/30 weighting aligns student preparation directly with technical recruiter screening practices.",
            "• Dual-engine persistence provides seamless zero-cost client operation alongside enterprise cloud capabilities.",
            "• Project achieved all 12 operational objectives."
        ],
        "right_title": "Future Scope & Enhancements", "right_items": [
            "• Fine-Tuned Local LLM: Client-side quantized WebGPU model for dynamic bullet point rewriting.",
            "• Direct Job Board Sync: Webhooks with LinkedIn and Indeed for real-time local role alerts.",
            "• Mobile Cross-Platform App: React Native package for native mobile access.",
            "• Cohort Benchmarking: Anonymous aggregate skill benchmarking across university departments."
        ]
    },
    {
        "num": 18, "title": "Thank You & Q&A", "type": "center",
        "details": [
            "Raj Ramnivas Yadav | TYBCA | Roll No: TE2208 | Division: E2",
            "Department of Computer Application",
            "MAEER's MIT Arts, Commerce and Science College, Alandi (D.), Pune",
            "Live Web App: https://careerlensai-seven.vercel.app/",
            "GitHub Repository: https://github.com/rajy24/CareerLensAi"
        ]
    }
]

for s in slides_data:
    fig, ax = plt.subplots(figsize=(13.333, 7.5), dpi=200)
    ax.set_xlim(0, 13.333)
    ax.set_ylim(0, 7.5)
    ax.axis('off')

    if s["type"] == "title":
        # Dark title slide
        bg = patches.Rectangle((0, 0), 13.333, 7.5, facecolor='#0f172a')
        ax.add_patch(bg)
        # Header accent
        ax.plot([0.8, 12.5], [6.5, 6.5], color='#2563eb', lw=3)
        ax.text(0.8, 5.7, s["title"], fontsize=32, fontweight='bold', color='#ffffff', ha='left')
        ax.text(0.8, 5.0, s["subtitle"], fontsize=18, fontweight='bold', color='#38bdf8', ha='left')
        ax.text(0.8, 4.4, "Submitted for Degree of Bachelor of Computer Applications (TYBCA) — Sem V", fontsize=11, color='#94a3b8', ha='left')
        # Details card
        box = patches.FancyBboxPatch((0.8, 1.0), 11.7, 2.8, boxstyle="round,pad=0.2", edgecolor='#3b82f6', facecolor='#1e293b', lw=1.5)
        ax.add_patch(box)
        for i, line in enumerate(s["details"]):
            ax.text(1.2, 3.4 - (i * 0.42), line, fontsize=10.5, color='#f8fafc', fontweight='medium')

    elif s["type"] == "center":
        # Dark Thank you slide
        bg = patches.Rectangle((0, 0), 13.333, 7.5, facecolor='#0f172a')
        ax.add_patch(bg)
        ax.text(6.666, 5.2, s["title"], fontsize=40, fontweight='bold', color='#ffffff', ha='center')
        ax.text(6.666, 4.4, "Questions & Discussion", fontsize=20, fontweight='bold', color='#38bdf8', ha='center')
        for i, line in enumerate(s["details"]):
            ax.text(6.666, 3.4 - (i * 0.48), line, fontsize=12, color='#cbd5e1', ha='center')

    else:
        # Standard white/light slide with Navy header
        bg = patches.Rectangle((0, 0), 13.333, 7.5, facecolor='#f8fafc')
        ax.add_patch(bg)
        top_bar = patches.Rectangle((0, 6.4), 13.333, 1.1, facecolor='#0f172a')
        ax.add_patch(top_bar)
        ax.plot([0, 13.333], [6.4, 6.4], color='#2563eb', lw=3)

        ax.text(0.8, 7.15, "CAREERLENS AI — FIELD PROJECT PRESENTATION", fontsize=9.5, fontweight='bold', color='#38bdf8')
        ax.text(0.8, 6.65, s["title"], fontsize=18, fontweight='bold', color='#ffffff')
        ax.text(0.8, 0.25, "MAEER's MIT Arts, Commerce & Science College | Raj Ramnivas Yadav (TYBCA - TE2208)", fontsize=8.5, color='#64748b')

        if s["type"] == "two_card":
            # Left card
            b_l = patches.FancyBboxPatch((0.8, 0.8), 5.6, 5.2, boxstyle="round,pad=0.15", edgecolor='#cbd5e1', facecolor='#ffffff', lw=1.5)
            ax.add_patch(b_l)
            ax.text(1.1, 5.6, s["left_title"], fontsize=12, fontweight='bold', color='#0f172a')
            for i, line in enumerate(s["left_items"]):
                ax.text(1.1, 5.0 - (i * 0.45), line, fontsize=9.2, color='#1e293b')

            # Right card
            b_r = patches.FancyBboxPatch((6.8, 0.8), 5.7, 5.2, boxstyle="round,pad=0.15", edgecolor='#cbd5e1', facecolor='#ffffff', lw=1.5)
            ax.add_patch(b_r)
            ax.text(7.1, 5.6, s["right_title"], fontsize=12, fontweight='bold', color='#0f172a')
            for i, line in enumerate(s["right_items"]):
                ax.text(7.1, 5.0 - (i * 0.45), line, fontsize=9.2, color='#1e293b')

        elif s["type"] == "three_card":
            for idx, c_key in enumerate(["c1", "c2", "c3"]):
                x = 0.8 + idx * 4.0
                box = patches.FancyBboxPatch((x, 0.8), 3.7, 5.2, boxstyle="round,pad=0.15", edgecolor='#cbd5e1', facecolor='#ffffff', lw=1.5)
                ax.add_patch(box)
                ax.text(x + 0.25, 5.6, s[f"{c_key}_title"], fontsize=11, fontweight='bold', color='#0f172a')
                for i, line in enumerate(s[f"{c_key}_items"]):
                    ax.text(x + 0.25, 5.0 - (i * 0.45), line, fontsize=8.8, color='#1e293b')

        elif s["type"] == "table":
            box = patches.FancyBboxPatch((0.8, 0.8), 11.7, 5.2, boxstyle="round,pad=0.15", edgecolor='#cbd5e1', facecolor='#ffffff', lw=1.5)
            ax.add_patch(box)
            ax.text(1.1, 5.6, "System Comparison Matrix: Traditional vs Commercial vs CareerLens AI", fontsize=12, fontweight='bold', color='#0f172a')
            table_rows = [
                ("Dimension", "Traditional Portals", "Commercial ATS Scanners", "CareerLens AI (Proposed)"),
                ("Scoring Transparency", "Opaque algorithmic feed; no formula", "Proprietary black-box score", "100% open deterministic formula with full math disclosure"),
                ("Collision Safety", "Prone to substring bugs ('C' in 'CSS')", "Inconsistent token isolation", "Strict token-boundary regex prevents false matches"),
                ("Requirement Weighting", "No core vs bonus qualification split", "Uniform keyword count", "Segmented weighting: 70% Required + 30% Preferred"),
                ("Zero-Denominator", "Displays 0% or phantom matches", "Confusing 0% score on short text", "Safety guard prompts for qualifications; never false 0%"),
                ("Privacy & Cost", "Public profiles, tracking cookies", "Paid subscription ($20-$40/mo)", "100% free, client-side privacy, encrypted localStorage"),
                ("Workflow Coverage", "Job discovery only", "Resume score only", "Unified: Resume + Match + Roadmap + Drills + Tracker")
            ]
            for r_idx, (c1, c2, c3, c4) in enumerate(table_rows):
                y = 5.0 - (r_idx * 0.6)
                bg_row = '#eff6ff' if r_idx == 0 else ('#f8fafc' if r_idx % 2 == 1 else '#ffffff')
                r_rect = patches.Rectangle((1.0, y - 0.2), 11.3, 0.5, facecolor=bg_row)
                ax.add_patch(r_rect)
                fweight = 'bold' if r_idx == 0 else 'normal'
                ax.text(1.2, y, c1, fontsize=8.2, fontweight=fweight, color='#0f172a')
                ax.text(3.6, y, c2, fontsize=8, fontweight=fweight, color='#475569')
                ax.text(6.5, y, c3, fontsize=8, fontweight=fweight, color='#475569')
                ax.text(9.2, y, c4, fontsize=8, fontweight='bold' if r_idx > 0 else 'bold', color='#2563eb' if r_idx > 0 else '#0f172a')

        elif s["type"] == "image":
            if os.path.exists(s["img"]):
                img_data = plt.imread(s["img"])
                ax.imshow(img_data, extent=[1.2, 12.1, 1.2, 6.0], aspect='auto')
            ax.text(6.666, 0.8, s["caption"], fontsize=9.5, fontweight='bold', color='#1e3a8a', ha='center')

        elif s["type"] == "double_image":
            if os.path.exists(s["img1"]):
                img1 = plt.imread(s["img1"])
                ax.imshow(img1, extent=[0.8, 6.4, 1.4, 6.0], aspect='auto')
            ax.text(3.6, 0.95, s["cap1"], fontsize=9, fontweight='bold', color='#1e3a8a', ha='center')

            if os.path.exists(s["img2"]):
                img2 = plt.imread(s["img2"])
                ax.imshow(img2, extent=[6.9, 12.5, 1.4, 6.0], aspect='auto')
            ax.text(9.7, 0.95, s["cap2"], fontsize=9, fontweight='bold', color='#1e3a8a', ha='center')

    out_file = os.path.join(OUTPUT_DIR, f'slide_{s["num"]:02d}.png')
    plt.tight_layout()
    plt.savefig(out_file, bbox_inches='tight')
    plt.close()
    print(f"[OK] Rendered Slide {s['num']:02d} -> {out_file}")

print('[DONE] All slide previews rendered successfully!')
