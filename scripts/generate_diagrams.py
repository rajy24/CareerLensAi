import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'report_assets', 'diagrams')
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Common academic styling: pure black and white, clean fonts
plt.rcParams['font.family'] = 'DejaVu Sans'
plt.rcParams['font.size'] = 9.5
plt.rcParams['text.color'] = '#000000'
plt.rcParams['axes.edgecolor'] = '#000000'

# -------------------------------------------------------------
# 1. DFD Level 0 (Context Diagram)
# -------------------------------------------------------------
def create_dfd_level_0():
    fig, ax = plt.subplots(figsize=(9, 4.8), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 5)
    ax.axis('off')

    # Central Process Circle (CareerLens AI)
    process = patches.Circle((5, 2.5), 1.2, edgecolor='#000000', facecolor='#ffffff', linewidth=1.5, zorder=2)
    ax.add_patch(process)
    ax.text(5, 2.7, '0.0', ha='center', va='center', fontsize=11, fontweight='bold')
    ax.text(5, 2.3, 'CareerLens AI\nCareer Planning &\nJob-Matching System', ha='center', va='center', fontsize=9.5)

    # External Entity: Student / Job Seeker (Left)
    entity_user = patches.Rectangle((0.4, 1.7), 2.2, 1.6, edgecolor='#000000', facecolor='#ffffff', linewidth=1.5)
    ax.add_patch(entity_user)
    ax.text(1.5, 2.5, 'Student /\nJob Seeker', ha='center', va='center', fontsize=10, fontweight='bold')

    # External Entity: Target Employers / Job Descriptions (Right)
    entity_target = patches.Rectangle((7.4, 1.7), 2.2, 1.6, edgecolor='#000000', facecolor='#ffffff', linewidth=1.5)
    ax.add_patch(entity_target)
    ax.text(8.5, 2.5, 'Target Employers /\nJob Descriptions', ha='center', va='center', fontsize=10, fontweight='bold')

    # Arrows Left -> Process
    ax.annotate('', xy=(3.8, 2.8), xytext=(2.6, 2.8),
                arrowprops=dict(arrowstyle="->", color="#000000", lw=1.2))
    ax.text(3.2, 2.95, 'Profile Skills, Résumé Text,\nApplication Updates', ha='center', va='bottom', fontsize=8)

    # Arrows Process -> Left
    ax.annotate('', xy=(2.6, 2.2), xytext=(3.8, 2.2),
                arrowprops=dict(arrowstyle="->", color="#000000", lw=1.2))
    ax.text(3.2, 2.05, 'Match Scores, Learning Roadmaps,\nInterview Feedback', ha='center', va='top', fontsize=8)

    # Arrows Right -> Process
    ax.annotate('', xy=(6.2, 2.8), xytext=(7.4, 2.8),
                arrowprops=dict(arrowstyle="->", color="#000000", lw=1.2))
    ax.text(6.8, 2.95, 'Job Postings, Role\nQualifications & Criteria', ha='center', va='bottom', fontsize=8)

    # Arrows Process -> Right
    ax.annotate('', xy=(7.4, 2.2), xytext=(6.2, 2.2),
                arrowprops=dict(arrowstyle="->", color="#000000", lw=1.2))
    ax.text(6.8, 2.05, 'Application Tracking Status,\nCandidate Compatibility', ha='center', va='top', fontsize=8)

    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, 'fig_6_1_dfd_level_0.png'), bbox_inches='tight', facecolor='#ffffff')
    plt.close()

# -------------------------------------------------------------
# 2. DFD Level 1 (Decomposition Diagram)
# -------------------------------------------------------------
def create_dfd_level_1():
    fig, ax = plt.subplots(figsize=(10, 6.8), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 7)
    ax.axis('off')

    # External Entity: Student / Candidate (Left)
    user_box = patches.Rectangle((0.4, 2.7), 1.8, 1.6, edgecolor='#000000', facecolor='#ffffff', linewidth=1.5)
    ax.add_patch(user_box)
    ax.text(1.3, 3.5, 'Student /\nCandidate', ha='center', va='center', fontweight='bold', fontsize=9.5)

    # Five Functional Processes (Circles)
    procs = [
        ('1.0\nProfile &\nRésumé Parser', (3.5, 5.5)),
        ('2.0\nJob Compatibility\nEngine', (6.5, 5.5)),
        ('3.0\nLearning Roadmap\nGenerator', (9.0, 3.7)),
        ('4.0\nInterview Readiness\nSimulator', (6.5, 1.8)),
        ('5.0\nApplication\nPipeline Tracker', (3.5, 1.8)),
    ]

    for label, (x, y) in procs:
        circle = patches.Circle((x, y), 0.85, edgecolor='#000000', facecolor='#ffffff', linewidth=1.4)
        ax.add_patch(circle)
        ax.text(x, y, label, ha='center', va='center', fontsize=8.2, fontweight='bold')

    # Data Stores (Open-ended horizontal bars)
    def draw_store(name, x, y, w=2.4, h=0.45):
        # Open ended rectangle (top and bottom lines, left vertical line)
        ax.plot([x, x+w], [y+h/2, y+h/2], color='#000000', lw=1.2)
        ax.plot([x, x+w], [y-h/2, y-h/2], color='#000000', lw=1.2)
        ax.plot([x, x], [y-h/2, y+h/2], color='#000000', lw=1.2)
        ax.text(x + w/2, y, name, ha='center', va='center', fontsize=7.5, fontweight='bold')

    draw_store('D1: Profiles & Résumés Store', 4.0, 6.7)
    draw_store('D2: Compatibility Analyses Store', 7.5, 6.7)
    draw_store('D3: Learning Roadmaps Store', 7.8, 2.7)
    draw_store('D4: Interview Questions & Drills', 5.3, 0.5)
    draw_store('D5: Job Applications Store', 2.3, 0.5)

    # Connectors & Data Flows (black arrows)
    arrows = [
        # User to 1.0
        ((1.3, 4.3), (2.8, 5.2), 'Résumé / Skills'),
        # 1.0 to 2.0
        ((4.35, 5.5), (5.65, 5.5), 'Verified Skills'),
        # User to 2.0
        ((2.2, 3.7), (5.7, 5.2), 'Job Description Text'),
        # 2.0 to 3.0
        ((7.3, 5.2), (8.4, 4.2), 'Skill Gaps'),
        # 2.0 to 4.0
        ((6.5, 4.65), (6.5, 2.65), 'Target Role'),
        # User to 5.0
        ((2.2, 3.2), (2.8, 2.1), 'New Application'),
        # 1.0 to D1
        ((3.9, 6.3), (4.5, 6.5), ''),
        # 2.0 to D2
        ((7.0, 6.3), (8.0, 6.5), ''),
        # 3.0 to D3
        ((9.0, 2.85), (9.0, 2.95), ''),
        # 4.0 to D4
        ((6.5, 0.95), (6.5, 0.75), ''),
        # 5.0 to D5
        ((3.5, 0.95), (3.5, 0.75), ''),
    ]

    for start, end, label in arrows:
        ax.annotate('', xy=end, xytext=start,
                    arrowprops=dict(arrowstyle="->", color="#000000", lw=1.1))
        if label:
            mx = (start[0] + end[0]) / 2
            my = (start[1] + end[1]) / 2 + 0.15
            ax.text(mx, my, label, ha='center', va='bottom', fontsize=7, backgroundcolor='#ffffff')

    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, 'fig_6_2_dfd_level_1.png'), bbox_inches='tight', facecolor='#ffffff')
    plt.close()

# -------------------------------------------------------------
# 3. UML Use-Case Diagram
# -------------------------------------------------------------
def create_use_case():
    fig, ax = plt.subplots(figsize=(8.5, 7.5), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 9)
    ax.axis('off')

    # System boundary box
    sys_box = patches.Rectangle((3.2, 0.4), 6.4, 8.2, edgecolor='#000000', facecolor='#ffffff', linewidth=1.5)
    ax.add_patch(sys_box)
    ax.text(6.4, 8.35, 'CareerLens AI System Boundary', ha='center', va='center', fontsize=10.5, fontweight='bold')

    # Actor: Student / Candidate (Stick Figure)
    # Head
    head = patches.Circle((1.5, 5.0), 0.35, edgecolor='#000000', facecolor='#ffffff', linewidth=1.5)
    ax.add_patch(head)
    # Body
    ax.plot([1.5, 1.5], [4.65, 3.6], color='#000000', lw=1.5)
    # Arms
    ax.plot([1.0, 2.0], [4.2, 4.2], color='#000000', lw=1.5)
    # Legs
    ax.plot([1.5, 1.1], [3.6, 2.7], color='#000000', lw=1.5)
    ax.plot([1.5, 1.9], [3.6, 2.7], color='#000000', lw=1.5)
    # Label
    ax.text(1.5, 2.3, 'Student /\nJob Candidate', ha='center', va='top', fontsize=9.5, fontweight='bold')

    # Use Cases (Ovals)
    use_cases = [
        ('Manage Profile Skills & Upload Résumé', 7.5),
        ('Paste Job Posting & Run Compatibility Analysis', 6.5),
        ('Review Segmented Match & Formula Breakdown', 5.5),
        ('Generate & Track Prioritized Learning Roadmaps', 4.5),
        ('Add Custom Learning Milestones & Goals', 3.5),
        ('Practise Role Questions & Review Rubric Feedback', 2.5),
        ('Track Applications & Manage Pipeline Stages', 1.5),
        ('Export Offline Career Data Archive (JSON)', 0.7),
    ]

    actor_point = (1.5, 4.2)

    for text, y in use_cases:
        ellipse = patches.Ellipse((6.4, y), 5.4, 0.65, edgecolor='#000000', facecolor='#ffffff', linewidth=1.2)
        ax.add_patch(ellipse)
        ax.text(6.4, y, text, ha='center', va='center', fontsize=8.2)
        # Connection line
        ax.plot([actor_point[0], 3.7], [actor_point[1], y], color='#000000', lw=0.9, linestyle='-')

    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, 'fig_6_3_use_case.png'), bbox_inches='tight', facecolor='#ffffff')
    plt.close()

# -------------------------------------------------------------
# 4. UML Activity Diagram
# -------------------------------------------------------------
def create_activity():
    fig, ax = plt.subplots(figsize=(7.5, 9.0), dpi=300)
    ax.set_xlim(0, 8)
    ax.set_ylim(0, 10.5)
    ax.axis('off')

    # Initial state (solid black circle)
    start = patches.Circle((4, 9.8), 0.22, edgecolor='#000000', facecolor='#000000')
    ax.add_patch(start)

    # Activity nodes (rounded rectangles)
    activities = [
        ('Enter verified skills or upload résumé text', 8.8),
        ('Extract canonical technical competencies via regex', 7.7),
        ('Paste target job description text', 6.6),
    ]

    for text, y in activities:
        box = patches.FancyBboxPatch((1.6, y-0.35), 4.8, 0.7, boxstyle="round,pad=0.1",
                                     edgecolor='#000000', facecolor='#ffffff', linewidth=1.2)
        ax.add_patch(box)
        ax.text(4, y, text, ha='center', va='center', fontsize=8.5)

    # Connecting arrows
    ax.annotate('', xy=(4, 9.15), xytext=(4, 9.58), arrowprops=dict(arrowstyle="->", color="#000000", lw=1.2))
    ax.annotate('', xy=(4, 8.05), xytext=(4, 8.45), arrowprops=dict(arrowstyle="->", color="#000000", lw=1.2))
    ax.annotate('', xy=(4, 6.95), xytext=(4, 7.35), arrowprops=dict(arrowstyle="->", color="#000000", lw=1.2))

    # Decision Diamond
    diamond_y = 5.4
    diamond = patches.Polygon([[4, diamond_y+0.5], [5.8, diamond_y], [4, diamond_y-0.5], [2.2, diamond_y]],
                              closed=True, edgecolor='#000000', facecolor='#ffffff', linewidth=1.2)
    ax.add_patch(diamond)
    ax.text(4, diamond_y, 'Are technical\nskills found in JD?', ha='center', va='center', fontsize=7.5, fontweight='bold')
    ax.annotate('', xy=(4, diamond_y+0.5), xytext=(4, 6.25), arrowprops=dict(arrowstyle="->", color="#000000", lw=1.2))

    # Guard Branch: No (Zero-Denominator Guard)
    guard_box = patches.FancyBboxPatch((5.4, 4.0), 2.3, 0.7, boxstyle="round,pad=0.08",
                                       edgecolor='#000000', facecolor='#ffffff', linewidth=1.2)
    ax.add_patch(guard_box)
    ax.text(6.55, 4.35, 'Trigger Zero-Denominator Guard:\nPrompt user for qualifications', ha='center', va='center', fontsize=7)
    # Arrow to guard
    ax.plot([5.8, 6.55, 6.55], [diamond_y, diamond_y, 4.7], color='#000000', lw=1.1)
    ax.annotate('', xy=(6.55, 4.7), xytext=(6.55, 4.8), arrowprops=dict(arrowstyle="->", color="#000000", lw=1.1))
    ax.text(6.0, diamond_y + 0.15, '[No / 0 skills]', fontsize=7.2, fontweight='bold')
    # Loop back to input
    ax.plot([6.55, 6.55, 6.4, 6.4], [4.0, 3.5, 3.5, 6.6], color='#000000', lw=1.1, linestyle='--')
    ax.annotate('', xy=(6.4, 6.6), xytext=(6.55, 3.5), arrowprops=dict(arrowstyle="->", color="#000000", lw=1.1, linestyle='--'))

    # Guard Branch: Yes
    ax.text(4.1, 4.7, '[Yes]', fontsize=7.5, fontweight='bold')

    lower_activities = [
        ('Segment qualifications into Required (70%) vs Preferred (30%)', 3.8),
        ('Calculate deterministic match percentage & formula breakdown', 2.7),
        ('Generate prioritized learning roadmaps for missing gaps', 1.6),
    ]

    for text, y in lower_activities:
        box = patches.FancyBboxPatch((1.6, y-0.35), 4.8, 0.7, boxstyle="round,pad=0.1",
                                     edgecolor='#000000', facecolor='#ffffff', linewidth=1.2)
        ax.add_patch(box)
        ax.text(4, y, text, ha='center', va='center', fontsize=8.3)

    ax.annotate('', xy=(4, 4.15), xytext=(4, diamond_y-0.5), arrowprops=dict(arrowstyle="->", color="#000000", lw=1.2))
    ax.annotate('', xy=(4, 3.05), xytext=(4, 3.45), arrowprops=dict(arrowstyle="->", color="#000000", lw=1.2))
    ax.annotate('', xy=(4, 1.95), xytext=(4, 2.35), arrowprops=dict(arrowstyle="->", color="#000000", lw=1.2))

    # Final State (Bullseye)
    end_outer = patches.Circle((4, 0.6), 0.28, edgecolor='#000000', facecolor='#ffffff', linewidth=1.5)
    end_inner = patches.Circle((4, 0.6), 0.16, edgecolor='#000000', facecolor='#000000')
    ax.add_patch(end_outer)
    ax.add_patch(end_inner)
    ax.annotate('', xy=(4, 0.88), xytext=(4, 1.25), arrowprops=dict(arrowstyle="->", color="#000000", lw=1.2))

    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, 'fig_6_4_activity.png'), bbox_inches='tight', facecolor='#ffffff')
    plt.close()

# -------------------------------------------------------------
# 5. System Architecture (3-Tier Dual-Engine)
# -------------------------------------------------------------
def create_architecture():
    fig, ax = plt.subplots(figsize=(9.5, 6.8), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 7.5)
    ax.axis('off')

    # Tier 1: Presentation Layer
    tier1_box = patches.Rectangle((0.5, 5.2), 9.0, 1.9, edgecolor='#000000', facecolor='#ffffff', linewidth=1.4)
    ax.add_patch(tier1_box)
    ax.text(5.0, 6.85, 'PRESENTATION TIER (Next.js 14 App Router & React)', ha='center', va='center', fontsize=9.5, fontweight='bold')

    t1_components = [
        ('Landing Page', 1.4), ('Dashboard', 3.2), ('Job Analysis', 5.0),
        ('Learning Plan', 6.8), ('Interview Prep', 8.6),
    ]
    for name, x in t1_components:
        b = patches.Rectangle((x-0.8, 5.4), 1.6, 0.8, edgecolor='#000000', facecolor='#ffffff', linewidth=1.0)
        ax.add_patch(b)
        ax.text(x, 5.8, name, ha='center', va='center', fontsize=7.5)

    # Connector Tier 1 <-> Tier 2
    ax.annotate('', xy=(5.0, 4.8), xytext=(5.0, 5.2), arrowprops=dict(arrowstyle="<->", color="#000000", lw=1.4))

    # Tier 2: Business Logic & Application Engine
    tier2_box = patches.Rectangle((0.5, 2.7), 9.0, 2.1, edgecolor='#000000', facecolor='#ffffff', linewidth=1.4)
    ax.add_patch(tier2_box)
    ax.text(5.0, 4.55, 'BUSINESS LOGIC & APPLICATION ENGINE (Serverless API & Client Context)', ha='center', va='center', fontsize=9.5, fontweight='bold')

    t2_engines = [
        ('Deterministic Skill Parser\n(Regex Token Boundary)', 1.7),
        ('Segmented Scorer\n(70% Req / 30% Pref)', 3.9),
        ('Zero-Denominator Guard\n(Safety Verification)', 6.1),
        ('Interview Rubric Evaluator\n(Keypoint Matcher)', 8.3),
    ]
    for name, x in t2_engines:
        b = patches.Rectangle((x-0.95, 3.4), 1.9, 0.85, edgecolor='#000000', facecolor='#ffffff', linewidth=1.0)
        ax.add_patch(b)
        ax.text(x, 3.82, name, ha='center', va='center', fontsize=7.0)

    # API Endpoints Bar
    ax.plot([0.8, 9.2], [3.2, 3.2], color='#000000', lw=0.8, linestyle=':')
    ax.text(5.0, 2.95, 'Next.js Route Handlers: POST /api/analyze  |  POST /api/learning-plan  |  POST /api/interview  |  POST /api/applications',
            ha='center', va='center', fontsize=7.2)

    # Connector Tier 2 <-> Tier 3
    ax.annotate('', xy=(5.0, 2.3), xytext=(5.0, 2.7), arrowprops=dict(arrowstyle="<->", color="#000000", lw=1.4))

    # Tier 3: Dual-Engine Data Persistence
    tier3_box = patches.Rectangle((0.5, 0.4), 9.0, 1.9, edgecolor='#000000', facecolor='#ffffff', linewidth=1.4)
    ax.add_patch(tier3_box)
    ax.text(5.0, 2.05, 'DUAL-ENGINE DATA PERSISTENCE LAYER', ha='center', va='center', fontsize=9.5, fontweight='bold')

    # Engine A: LocalStorage
    eng_a = patches.Rectangle((0.8, 0.6), 4.0, 1.2, edgecolor='#000000', facecolor='#ffffff', linewidth=1.0)
    ax.add_patch(eng_a)
    ax.text(2.8, 1.55, 'Engine A: Client-Side LocalStorage (Active)', ha='center', va='center', fontsize=8.0, fontweight='bold')
    ax.text(2.8, 1.05, '• 100% Privacy & Zero API Dependency\n• Encrypted Browser Cache Persistence\n• Complete Offline Portability (JSON Export)',
            ha='center', va='center', fontsize=7.0)

    # Engine B: Supabase PostgreSQL
    eng_b = patches.Rectangle((5.2, 0.6), 4.0, 1.2, edgecolor='#000000', facecolor='#ffffff', linewidth=1.0)
    ax.add_patch(eng_b)
    ax.text(7.2, 1.55, 'Engine B: Supabase Cloud PostgreSQL (Ready)', ha='center', va='center', fontsize=8.0, fontweight='bold')
    ax.text(7.2, 1.05, '• PostgreSQL with Row-Level Security (RLS)\n• Supabase Auth & JWT Sessions\n• Private Résumé Cloud Storage',
            ha='center', va='center', fontsize=7.0)

    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, 'fig_6_5_architecture.png'), bbox_inches='tight', facecolor='#ffffff')
    plt.close()

# -------------------------------------------------------------
# 6. Entity-Relationship (ER) Diagram
# -------------------------------------------------------------
def create_er_diagram():
    fig, ax = plt.subplots(figsize=(10, 6.8), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 7.5)
    ax.axis('off')

    def draw_entity(title, attributes, x, y, w=2.4, h=1.8):
        # Outer box
        box = patches.Rectangle((x, y), w, h, edgecolor='#000000', facecolor='#ffffff', linewidth=1.2)
        ax.add_patch(box)
        # Header box
        header = patches.Rectangle((x, y + h - 0.4), w, 0.4, edgecolor='#000000', facecolor='#ffffff', linewidth=1.2)
        ax.add_patch(header)
        ax.text(x + w/2, y + h - 0.2, title, ha='center', va='center', fontsize=8.5, fontweight='bold')
        # Attributes
        attr_text = '\n'.join(attributes)
        ax.text(x + 0.12, y + h - 0.55, attr_text, ha='left', va='top', fontsize=7.0)

    # Tables
    draw_entity('PROFILES', [
        'id (PK, UUID)',
        'email (VARCHAR)',
        'full_name (TEXT)',
        'skills (TEXT[])',
        'target_role (TEXT)',
        'created_at (TIMESTAMP)'
    ], 0.5, 4.8)

    draw_entity('JOB_ANALYSES', [
        'id (PK, UUID)',
        'user_id (FK, UUID)',
        'job_title (TEXT)',
        'company_name (TEXT)',
        'matched_skills (TEXT[])',
        'missing_skills (TEXT[])',
        'match_percentage (FLOAT)'
    ], 3.8, 4.8)

    draw_entity('LEARNING_PLANS', [
        'id (PK, UUID)',
        'user_id (FK, UUID)',
        'skill_name (TEXT)',
        'priority (TEXT)',
        'timeframe (TEXT)',
        'completed (BOOLEAN)',
        'resources (JSONB)'
    ], 7.1, 4.8)

    draw_entity('RESUMES', [
        'id (PK, UUID)',
        'user_id (FK, UUID)',
        'file_name (TEXT)',
        'extracted_text (TEXT)',
        'detected_skills (TEXT[])',
        'created_at (TIMESTAMP)'
    ], 0.5, 1.5)

    draw_entity('JOB_APPLICATIONS', [
        'id (PK, UUID)',
        'user_id (FK, UUID)',
        'company (TEXT)',
        'role (TEXT)',
        'status (TEXT)',
        'salary_range (TEXT)',
        'date_applied (DATE)'
    ], 3.8, 1.5)

    draw_entity('INTERVIEW_SESSIONS', [
        'id (PK, UUID)',
        'user_id (FK, UUID)',
        'question_id (TEXT)',
        'user_answer (TEXT)',
        'coverage_pct (INT)',
        'feedback (TEXT)',
        'created_at (TIMESTAMP)'
    ], 7.1, 1.5)

    # Relationships (Lines with 1:N cardinality)
    # PROFILES -> JOB_ANALYSES
    ax.plot([2.9, 3.8], [5.7, 5.7], color='#000000', lw=1.2)
    ax.text(3.35, 5.85, '1 : N', ha='center', va='bottom', fontsize=7.5, fontweight='bold')

    # JOB_ANALYSES -> LEARNING_PLANS
    ax.plot([6.2, 7.1], [5.7, 5.7], color='#000000', lw=1.2)
    ax.text(6.65, 5.85, '1 : N', ha='center', va='bottom', fontsize=7.5, fontweight='bold')

    # PROFILES -> RESUMES
    ax.plot([1.7, 1.7], [4.8, 3.3], color='#000000', lw=1.2)
    ax.text(1.85, 4.05, '1 : N', ha='left', va='center', fontsize=7.5, fontweight='bold')

    # PROFILES -> JOB_APPLICATIONS
    ax.plot([2.9, 3.8], [5.2, 2.7], color='#000000', lw=1.2)
    ax.text(3.15, 3.85, '1 : N', ha='center', va='center', fontsize=7.5, fontweight='bold')

    # PROFILES / USER -> INTERVIEW_SESSIONS
    ax.plot([6.2, 7.1], [2.4, 2.4], color='#000000', lw=1.2)
    ax.text(6.65, 2.55, '1 : N', ha='center', va='bottom', fontsize=7.5, fontweight='bold')

    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, 'fig_6_6_er_diagram.png'), bbox_inches='tight', facecolor='#ffffff')
    plt.close()

if __name__ == '__main__':
    print('Generating academic black-and-white system diagrams...')
    create_dfd_level_0()
    create_dfd_level_1()
    create_use_case()
    create_activity()
    create_architecture()
    create_er_diagram()
    print('[OK] Generated 6 clean black-and-white system diagrams in report_assets/diagrams/')
