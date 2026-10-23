import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'report_assets', 'diagrams')
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Common styling
plt.rcParams['font.family'] = 'DejaVu Sans'
plt.rcParams['font.size'] = 10

# -------------------------------------------------------------
# 1. DFD Level 0 (Context Diagram)
# -------------------------------------------------------------
def create_dfd_level_0():
    fig, ax = plt.subplots(figsize=(10, 6), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 6)
    ax.axis('off')

    # Central Process Circle
    process = patches.Circle((5, 3), 1.35, edgecolor='#1e3a8a', facecolor='#eff6ff', linewidth=2.5, zorder=2)
    ax.add_patch(process)
    ax.text(5, 3.2, '0.0', ha='center', va='center', fontsize=12, fontweight='bold', color='#1e3a8a')
    ax.text(5, 2.8, 'CareerLens AI\nCareer Planning &\nJob-Matching System', ha='center', va='center', fontsize=10, fontweight='bold', color='#0f172a')

    # External Entity: Student / Job Seeker (Left)
    entity_user = patches.Rectangle((0.5, 2.2), 2.2, 1.6, edgecolor='#0f172a', facecolor='#f8fafc', linewidth=2)
    ax.add_patch(entity_user)
    ax.text(1.6, 3.0, 'Student /\nJob Seeker', ha='center', va='center', fontsize=10, fontweight='bold', color='#0f172a')

    # External Entity: Hiring Market / Target JDs (Right)
    entity_target = patches.Rectangle((7.3, 2.2), 2.2, 1.6, edgecolor='#0f172a', facecolor='#f8fafc', linewidth=2)
    ax.add_patch(entity_target)
    ax.text(8.4, 3.0, 'Target Employers /\nJob Descriptions', ha='center', va='center', fontsize=10, fontweight='bold', color='#0f172a')

    # Arrows Left to Process
    ax.annotate('', xy=(3.65, 3.3), xytext=(2.7, 3.3),
                arrowprops=dict(arrowstyle="->", color="#2563eb", lw=1.8))
    ax.text(3.17, 3.45, 'Profile Skills, Resume Text,\nApplication Updates', ha='center', va='bottom', fontsize=8, color='#1e293b')

    # Arrows Process to Left
    ax.annotate('', xy=(2.7, 2.7), xytext=(3.65, 2.7),
                arrowprops=dict(arrowstyle="->", color="#059669", lw=1.8))
    ax.text(3.17, 2.35, 'Match Scores, Gap Roadmaps,\nInterview Drills & Analytics', ha='center', va='top', fontsize=8, color='#1e293b')

    # Arrows Right to Process
    ax.annotate('', xy=(6.35, 3.3), xytext=(7.3, 3.3),
                arrowprops=dict(arrowstyle="->", color="#2563eb", lw=1.8))
    ax.text(6.82, 3.45, 'Job Postings, Role\nQualifications & Criteria', ha='center', va='bottom', fontsize=8, color='#1e293b')

    # Arrows Process to Right
    ax.annotate('', xy=(7.3, 2.7), xytext=(6.35, 2.7),
                arrowprops=dict(arrowstyle="->", color="#059669", lw=1.8))
    ax.text(6.82, 2.35, 'Tracking Application Status,\nRole Compatibility Records', ha='center', va='top', fontsize=8, color='#1e293b')

    ax.set_title('Figure 6.1: Data Flow Diagram (DFD) Level 0 — Context Level Diagram', fontsize=12, fontweight='bold', pad=15)
    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, 'fig_6_1_dfd_level_0.png'), bbox_inches='tight')
    plt.close()

# -------------------------------------------------------------
# 2. DFD Level 1 (Decomposition Diagram)
# -------------------------------------------------------------
def create_dfd_level_1():
    fig, ax = plt.subplots(figsize=(11, 7.5), dpi=300)
    ax.set_xlim(0, 11)
    ax.set_ylim(0, 8)
    ax.axis('off')

    # Entities
    user_box = patches.Rectangle((0.4, 3.2), 1.8, 1.8, edgecolor='#0f172a', facecolor='#f1f5f9', linewidth=2)
    ax.add_patch(user_box)
    ax.text(1.3, 4.1, 'Student /\nCandidate', ha='center', va='center', fontweight='bold', fontsize=9.5)

    # Processes
    procs = [
        ('1.0\nProfile &\nResume Parser', (3.5, 6.2)),
        ('2.0\nJob Compatibility\nEngine', (6.5, 6.2)),
        ('3.0\nLearning Roadmap\nGenerator', (9.2, 4.3)),
        ('4.0\nInterview Readiness\nSimulator', (6.5, 2.2)),
        ('5.0\nApplication\nPipeline Tracker', (3.5, 2.2)),
    ]

    for label, (x, y) in procs:
        circle = patches.Circle((x, y), 0.9, edgecolor='#1d4ed8', facecolor='#eff6ff', linewidth=1.8)
        ax.add_patch(circle)
        ax.text(x, y, label, ha='center', va='center', fontsize=8, fontweight='bold', color='#1e3a8a')

    # Data Stores
    stores = [
        ('D1: Profiles & Resumes Store', 5.0, 7.5),
        ('D2: Analyses & Match Scores Store', 8.2, 7.5),
        ('D3: Learning Roadmaps Store', 9.2, 2.2),
        ('D4: Interview Questions & Drills', 6.5, 0.7),
        ('D5: Job Applications Store', 3.5, 0.7),
    ]

    for label, x, y in stores:
        line1 = patches.Rectangle((x-1.5, y-0.25), 3.0, 0.5, edgecolor='#475569', facecolor='#ffffff', linewidth=1.2)
        ax.add_patch(line1)
        ax.plot([x-1.5, x+1.5], [y-0.25, y-0.25], color='#475569', lw=1.5)
        ax.plot([x-1.5, x+1.5], [y+0.25, y+0.25], color='#475569', lw=1.5)
        ax.text(x, y, label, ha='center', va='center', fontsize=7.5, fontweight='bold', color='#334155')

    # Connections / Data Flows
    ax.annotate('', xy=(2.6, 6.2), xytext=(1.8, 4.8), arrowprops=dict(arrowstyle="->", color="#2563eb", lw=1.4))
    ax.text(1.8, 5.8, 'Resume Text', fontsize=7, color='#1e293b')

    ax.annotate('', xy=(5.6, 6.2), xytext=(4.4, 6.2), arrowprops=dict(arrowstyle="->", color="#2563eb", lw=1.4))
    ax.text(5.0, 6.35, 'Verified Skills', ha='center', fontsize=7, color='#1e293b')

    ax.annotate('', xy=(8.3, 4.5), xytext=(7.3, 5.8), arrowprops=dict(arrowstyle="->", color="#2563eb", lw=1.4))
    ax.text(8.1, 5.3, 'Missing Gaps', fontsize=7, color='#1e293b')

    ax.annotate('', xy=(6.5, 3.1), xytext=(6.5, 5.3), arrowprops=dict(arrowstyle="->", color="#2563eb", lw=1.4))
    ax.text(6.6, 4.2, 'Target Role', fontsize=7, color='#1e293b')

    ax.annotate('', xy=(3.5, 3.1), xytext=(5.7, 5.6), arrowprops=dict(arrowstyle="->", color="#2563eb", lw=1.4))
    ax.text(4.2, 4.5, 'Job Details', fontsize=7, color='#1e293b')

    ax.annotate('', xy=(1.8, 3.4), xytext=(2.6, 2.4), arrowprops=dict(arrowstyle="->", color="#059669", lw=1.4))
    ax.text(1.7, 2.7, 'Status Reports', fontsize=7, color='#065f46')

    # Flows to Data Stores
    ax.annotate('', xy=(4.2, 7.3), xytext=(3.8, 7.0), arrowprops=dict(arrowstyle="->", color="#64748b", lw=1.2, ls='--'))
    ax.annotate('', xy=(7.5, 7.3), xytext=(6.9, 7.0), arrowprops=dict(arrowstyle="->", color="#64748b", lw=1.2, ls='--'))
    ax.annotate('', xy=(9.2, 2.5), xytext=(9.2, 3.4), arrowprops=dict(arrowstyle="->", color="#64748b", lw=1.2, ls='--'))
    ax.annotate('', xy=(6.5, 1.0), xytext=(6.5, 1.3), arrowprops=dict(arrowstyle="->", color="#64748b", lw=1.2, ls='--'))
    ax.annotate('', xy=(3.5, 1.0), xytext=(3.5, 1.3), arrowprops=dict(arrowstyle="->", color="#64748b", lw=1.2, ls='--'))

    ax.set_title('Figure 6.2: Data Flow Diagram (DFD) Level 1 — Functional Decomposition Diagram', fontsize=12, fontweight='bold', pad=15)
    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, 'fig_6_2_dfd_level_1.png'), bbox_inches='tight')
    plt.close()

# -------------------------------------------------------------
# 3. Use-Case Diagram
# -------------------------------------------------------------
def create_use_case_diagram():
    fig, ax = plt.subplots(figsize=(10, 8), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 10)
    ax.axis('off')

    # System boundary box
    sys_box = patches.Rectangle((3.0, 0.5), 6.5, 9.0, edgecolor='#1e3a8a', facecolor='#f8fafc', linewidth=2)
    ax.add_patch(sys_box)
    ax.text(6.25, 9.2, 'CareerLens AI System Boundary', ha='center', fontsize=11, fontweight='bold', color='#1e3a8a')

    # Actor: Student / Candidate
    ax.plot([1.2, 1.2], [5.0, 5.8], color='#0f172a', lw=2)  # Body
    head = patches.Circle((1.2, 6.2), 0.35, edgecolor='#0f172a', facecolor='#ffffff', lw=2)
    ax.add_patch(head)
    ax.plot([0.7, 1.7], [5.5, 5.5], color='#0f172a', lw=2)  # Arms
    ax.plot([1.2, 0.8], [5.0, 4.2], color='#0f172a', lw=2)  # Left leg
    ax.plot([1.2, 1.6], [5.0, 4.2], color='#0f172a', lw=2)  # Right leg
    ax.text(1.2, 3.8, 'Student /\nJob Candidate', ha='center', fontsize=9.5, fontweight='bold', color='#0f172a')

    # Use Cases
    use_cases = [
        (6.25, 8.4, 'Register / Authenticate Account'),
        (6.25, 7.3, 'Upload Résumé & Audit Skills'),
        (6.25, 6.2, 'Paste Job Posting & Run Compatibility Analysis'),
        (6.25, 5.1, 'Review Segmented Match & Mathematical Breakdown'),
        (6.25, 4.0, 'Generate & Track Prioritized Learning Roadmaps'),
        (6.25, 2.9, 'Practise Role Questions & Review Rubric Feedback'),
        (6.25, 1.8, 'Manage Job Pipeline (CRUD Application Tracker)'),
        (6.25, 0.9, 'Export Career Data (JSON) & Reset Workspace')
    ]

    for x, y, text in use_cases:
        ellipse = patches.Ellipse((x, y), 5.2, 0.75, edgecolor='#2563eb', facecolor='#eff6ff', linewidth=1.5)
        ax.add_patch(ellipse)
        ax.text(x, y, text, ha='center', va='center', fontsize=8.5, fontweight='semibold', color='#0f172a')
        # Actor connection line
        ax.plot([1.6, x - 2.6], [5.4, y], color='#64748b', lw=1.1, ls='-')

    ax.set_title('Figure 6.3: UML Use-Case Diagram for CareerLens AI', fontsize=12, fontweight='bold', pad=15)
    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, 'fig_6_3_use_case.png'), bbox_inches='tight')
    plt.close()

# -------------------------------------------------------------
# 4. Activity Diagram
# -------------------------------------------------------------
def create_activity_diagram():
    fig, ax = plt.subplots(figsize=(8, 10), dpi=300)
    ax.set_xlim(0, 8)
    ax.set_ylim(0, 11)
    ax.axis('off')

    # Start Node
    start = patches.Circle((4, 10.3), 0.22, facecolor='#0f172a', edgecolor='#0f172a')
    ax.add_patch(start)

    # Activity Nodes
    nodes = [
        (4, 9.4, 'Candidate enters profile skills or uploads résumé text', 4.8, 0.6),
        (4, 8.3, 'Token-boundary engine detects canonical skills & aliases', 5.0, 0.6),
        (4, 7.2, 'Candidate pastes target Job Description (JD)', 4.5, 0.6),
        (4, 6.0, 'Is technical competency found in JD?', 3.6, 0.7, True), # Decision Diamond
        (6.5, 6.0, 'Trigger Zero-Denominator Guard\nPrompt user for qualifications', 2.6, 0.7),
        (4, 4.7, 'Segment into Required (70%) vs Preferred (30%) competencies', 5.2, 0.6),
        (4, 3.6, 'Calculate deterministic match score & formula explanation', 5.0, 0.6),
        (4, 2.5, 'Automatically populate prioritized learning roadmap for gaps', 5.2, 0.6),
        (4, 1.4, 'Prepare role-based interview drills & track application pipeline', 5.2, 0.6),
    ]

    for item in nodes:
        if len(item) == 6:
            x, y, text, w, h, is_diamond = item
            diamond = patches.Polygon([[x, y+h/2], [x+w/2, y], [x, y-h/2], [x-w/2, y]],
                                      closed=True, edgecolor='#d97706', facecolor='#fef3c7', lw=1.8)
            ax.add_patch(diamond)
            ax.text(x, y, text, ha='center', va='center', fontsize=7.5, fontweight='bold', color='#92400e')
        else:
            x, y, text, w, h = item
            box = patches.FancyBboxPatch((x-w/2, y-h/2), w, h, boxstyle="round,pad=0.1",
                                         edgecolor='#2563eb', facecolor='#f8fafc', lw=1.5)
            ax.add_patch(box)
            ax.text(x, y, text, ha='center', va='center', fontsize=8, fontweight='semibold', color='#0f172a')

    # End Node
    end_outer = patches.Circle((4, 0.4), 0.25, edgecolor='#0f172a', facecolor='none', lw=1.8)
    end_inner = patches.Circle((4, 0.4), 0.16, facecolor='#0f172a', edgecolor='#0f172a')
    ax.add_patch(end_outer)
    ax.add_patch(end_inner)

    # Connecting Arrows
    arrows = [
        ((4, 10.08), (4, 9.7)),
        ((4, 9.1), (4, 8.6)),
        ((4, 8.0), (4, 7.5)),
        ((4, 6.9), (4, 6.35)),
        ((4, 5.65), (4, 5.0)),   # Yes
        ((4, 4.4), (4, 3.9)),
        ((4, 3.3), (4, 2.8)),
        ((4, 2.2), (4, 1.7)),
        ((4, 1.1), (4, 0.65)),
    ]

    for start_pt, end_pt in arrows:
        ax.annotate('', xy=end_pt, xytext=start_pt, arrowprops=dict(arrowstyle="->", color="#0f172a", lw=1.4))

    # Decision branches
    ax.text(4.15, 5.25, 'Yes', fontsize=8, fontweight='bold', color='#059669')
    # No branch to Guard
    ax.annotate('', xy=(5.2, 6.0), xytext=(5.8, 6.0), arrowprops=dict(arrowstyle="<-", color="#dc2626", lw=1.4))
    ax.text(5.5, 6.15, 'No (0 skills)', fontsize=7.5, fontweight='bold', color='#dc2626')
    # Loop back from guard to paste JD
    ax.plot([6.5, 6.5, 4.0], [6.35, 7.2, 7.2], color='#dc2626', lw=1.2, ls='--')

    ax.set_title('Figure 6.4: UML Activity Diagram — End-to-End Workflow', fontsize=12, fontweight='bold', pad=15)
    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, 'fig_6_4_activity.png'), bbox_inches='tight')
    plt.close()

# -------------------------------------------------------------
# 5. System Architecture Diagram
# -------------------------------------------------------------
def create_architecture_diagram():
    fig, ax = plt.subplots(figsize=(10, 8), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 9)
    ax.axis('off')

    # Layer 1: Client Presentation Layer
    l1 = patches.FancyBboxPatch((0.5, 6.4), 9.0, 2.1, boxstyle="round,pad=0.15", edgecolor='#1e40af', facecolor='#eff6ff', lw=2)
    ax.add_patch(l1)
    ax.text(5.0, 8.2, 'PRESENTATION LAYER (Next.js 14 App Router & React 18)', ha='center', fontsize=10.5, fontweight='bold', color='#1e40af')
    
    modules = ['Landing (/)', 'Dashboard', 'Job Analysis', 'Learning Plan', 'Interview Prep', 'Job Tracker', 'Analytics', 'Settings']
    for idx, mod in enumerate(modules):
        x = 1.0 + (idx % 4) * 2.15
        y = 7.5 if idx < 4 else 6.7
        box = patches.Rectangle((x, y-0.25), 1.9, 0.5, edgecolor='#3b82f6', facecolor='#ffffff', lw=1.2)
        ax.add_patch(box)
        ax.text(x+0.95, y, mod, ha='center', va='center', fontsize=8, fontweight='semibold', color='#1e293b')

    # Layer 2: Business Logic & Route Handlers Layer
    l2 = patches.FancyBboxPatch((0.5, 3.4), 9.0, 2.4, boxstyle="round,pad=0.15", edgecolor='#047857', facecolor='#ecfdf5', lw=2)
    ax.add_patch(l2)
    ax.text(5.0, 5.5, 'BUSINESS LOGIC & APPLICATION ENGINE (Serverless API & Client Context)', ha='center', fontsize=10.5, fontweight='bold', color='#047857')

    submodules = [
        ('Deterministic Skill Parser\n(Regex Token Boundary)', 1.8, 4.3),
        ('Job Segmenter\n(Required 70% vs Preferred 30%)', 4.0, 4.3),
        ('Zero-Denominator Guard\n(Safety Verification)', 6.2, 4.3),
        ('Interview Rubric Evaluator\n(Keypoint Matcher)', 8.2, 4.3),
        ('POST /api/analyze', 1.8, 3.6),
        ('POST /api/learning-plan', 4.0, 3.6),
        ('GET/POST /api/interview', 6.2, 3.6),
        ('POST /api/applications', 8.2, 3.6),
    ]
    for text, x, y in submodules:
        b = patches.Rectangle((x-0.95, y-0.25), 1.9, 0.5, edgecolor='#10b981', facecolor='#ffffff', lw=1)
        ax.add_patch(b)
        ax.text(x, y, text, ha='center', va='center', fontsize=7, fontweight='semibold', color='#064e3b')

    # Layer 3: Data & Persistence Layer (Dual-Mode)
    l3 = patches.FancyBboxPatch((0.5, 0.5), 9.0, 2.2, boxstyle="round,pad=0.15", edgecolor='#b45309', facecolor='#fffbeb', lw=2)
    ax.add_patch(l3)
    ax.text(5.0, 2.4, 'DUAL-ENGINE DATA PERSISTENCE LAYER', ha='center', fontsize=10.5, fontweight='bold', color='#b45309')

    # Engine A: LocalStorage Fallback (Active)
    b_local = patches.Rectangle((1.0, 0.8), 3.8, 1.3, edgecolor='#f59e0b', facecolor='#ffffff', lw=1.5)
    ax.add_patch(b_local)
    ax.text(2.9, 1.7, 'Engine A: Client-Side LocalStorage (Active)', ha='center', fontsize=8.5, fontweight='bold', color='#92400e')
    ax.text(2.9, 1.2, '• 100% Privacy & Zero API Dependency\n• Encrypted Browser Cache Persistence\n• Complete Offline Portability (JSON Export)', ha='center', fontsize=7.5, color='#78350f')

    # Engine B: Supabase Cloud (Configured)
    b_cloud = patches.Rectangle((5.2, 0.8), 3.8, 1.3, edgecolor='#f59e0b', facecolor='#ffffff', lw=1.5)
    ax.add_patch(b_cloud)
    ax.text(7.1, 1.7, 'Engine B: Supabase Cloud PostgreSQL (Ready)', ha='center', fontsize=8.5, fontweight='bold', color='#92400e')
    ax.text(7.1, 1.2, '• PostgreSQL with Row-Level Security (RLS)\n• Supabase Auth & JWT Sessions\n• Private Resume Cloud Storage', ha='center', fontsize=7.5, color='#78350f')

    # Connecting Arrows between layers
    ax.annotate('', xy=(5.0, 5.8), xytext=(5.0, 6.4), arrowprops=dict(arrowstyle="<->", color="#1e3a8a", lw=2))
    ax.annotate('', xy=(5.0, 2.7), xytext=(5.0, 3.4), arrowprops=dict(arrowstyle="<->", color="#047857", lw=2))

    ax.set_title('Figure 6.5: System Architecture Diagram — 3-Tier Dual-Engine Design', fontsize=12, fontweight='bold', pad=15)
    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, 'fig_6_5_architecture.png'), bbox_inches='tight')
    plt.close()

# -------------------------------------------------------------
# 6. ER Diagram (Data Model)
# -------------------------------------------------------------
def create_er_diagram():
    fig, ax = plt.subplots(figsize=(11, 7.5), dpi=300)
    ax.set_xlim(0, 11)
    ax.set_ylim(0, 8)
    ax.axis('off')

    entities = [
        # (name, x, y, fields)
        ('PROFILES', 1.8, 5.8, ['id (PK, UUID)', 'email (VARCHAR)', 'full_name (TEXT)', 'skills (TEXT[])', 'target_role (TEXT)', 'created_at (TIMESTAMP)']),
        ('RESUMES', 1.8, 2.2, ['id (PK, UUID)', 'user_id (FK)', 'file_name (TEXT)', 'extracted_text (TEXT)', 'detected_skills (TEXT[])', 'created_at (TIMESTAMP)']),
        ('JOB_ANALYSES', 5.5, 5.8, ['id (PK, UUID)', 'user_id (FK)', 'job_title (TEXT)', 'company_name (TEXT)', 'matched_skills (TEXT[])', 'missing_skills (TEXT[])', 'match_percentage (FLOAT)']),
        ('LEARNING_PLANS', 9.2, 5.8, ['id (PK, UUID)', 'user_id (FK)', 'skill_name (TEXT)', 'priority (TEXT)', 'timeframe (TEXT)', 'completed (BOOLEAN)', 'resources (JSONB)']),
        ('JOB_APPLICATIONS', 5.5, 2.2, ['id (PK, UUID)', 'user_id (FK)', 'company (TEXT)', 'role (TEXT)', 'status (TEXT)', 'salary_range (TEXT)', 'date_applied (DATE)']),
        ('INTERVIEW_SESSIONS', 9.2, 2.2, ['id (PK, UUID)', 'user_id (FK)', 'question_id (TEXT)', 'user_answer (TEXT)', 'coverage_pct (INT)', 'feedback (TEXT)', 'created_at (TIMESTAMP)'])
    ]

    for name, x, y, fields in entities:
        w, h = 2.4, 2.2
        box = patches.Rectangle((x-w/2, y-h/2), w, h, edgecolor='#1e3a8a', facecolor='#ffffff', lw=1.8)
        ax.add_patch(box)
        # Header box
        hdr = patches.Rectangle((x-w/2, y+h/2-0.45), w, 0.45, edgecolor='#1e3a8a', facecolor='#1e3a8a', lw=1.8)
        ax.add_patch(hdr)
        ax.text(x, y+h/2-0.23, name, ha='center', va='center', fontsize=8.5, fontweight='bold', color='#ffffff')
        
        # Fields
        for idx, fld in enumerate(fields):
            ax.text(x-w/2+0.1, y+h/2-0.75-(idx*0.27), fld, ha='left', va='center', fontsize=7.2, color='#1e293b')

    # Relationships Lines
    # Profiles -> Resumes (1 : N)
    ax.plot([1.8, 1.8], [4.7, 3.3], color='#2563eb', lw=1.8)
    ax.text(1.9, 4.0, '1 : N', fontsize=8, fontweight='bold', color='#1d4ed8')

    # Profiles -> Job_Analyses (1 : N)
    ax.plot([3.0, 4.3], [5.8, 5.8], color='#2563eb', lw=1.8)
    ax.text(3.65, 6.0, '1 : N', fontsize=8, fontweight='bold', color='#1d4ed8')

    # Job_Analyses -> Learning_Plans (1 : N)
    ax.plot([6.7, 8.0], [5.8, 5.8], color='#2563eb', lw=1.8)
    ax.text(7.35, 6.0, '1 : N', fontsize=8, fontweight='bold', color='#1d4ed8')

    # Profiles -> Job_Applications (1 : N)
    ax.plot([3.0, 4.3], [5.0, 2.8], color='#2563eb', lw=1.8)
    ax.text(3.3, 3.8, '1 : N', fontsize=8, fontweight='bold', color='#1d4ed8')

    # Profiles -> Interview_Sessions (1 : N)
    ax.plot([6.7, 8.0], [2.2, 2.2], color='#2563eb', lw=1.8)
    ax.text(7.35, 2.4, '1 : N', fontsize=8, fontweight='bold', color='#1d4ed8')

    ax.set_title('Figure 6.6: Entity-Relationship (ER) Diagram — Data Schema & Model', fontsize=12, fontweight='bold', pad=15)
    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, 'fig_6_6_er_diagram.png'), bbox_inches='tight')
    plt.close()

if __name__ == '__main__':
    print('[+] Generating high-resolution system diagrams...')
    create_dfd_level_0()
    print('[OK] Generated fig_6_1_dfd_level_0.png')
    create_dfd_level_1()
    print('[OK] Generated fig_6_2_dfd_level_1.png')
    create_use_case_diagram()
    print('[OK] Generated fig_6_3_use_case.png')
    create_activity_diagram()
    print('[OK] Generated fig_6_4_activity.png')
    create_architecture_diagram()
    print('[OK] Generated fig_6_5_architecture.png')
    create_er_diagram()
    print('[OK] Generated fig_6_6_er_diagram.png')
    print('[DONE] All diagrams generated successfully!')
