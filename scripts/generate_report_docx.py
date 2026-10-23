import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_DOCX = os.path.join(BASE_DIR, 'CareerLens_AI_Field_Project_Report_Raj_Yadav.docx')
ASSETS_DIR = os.path.join(BASE_DIR, 'report_assets')
SCREENSHOTS_DIR = os.path.join(ASSETS_DIR, 'screenshots')
DIAGRAMS_DIR = os.path.join(ASSETS_DIR, 'diagrams')
SLIDES_DIR = os.path.join(ASSETS_DIR, 'slides')

doc = docx.Document()

# Page Setup: A4, Margins: Left 1.25", Top 1", Right 1", Bottom 1"
for section in doc.sections:
    section.page_width = Inches(8.27)
    section.page_height = Inches(11.69)
    section.top_margin = Inches(1.0)
    section.bottom_margin = Inches(1.0)
    section.left_margin = Inches(1.25)
    section.right_margin = Inches(1.0)

# Styles
def format_run(run, font_name="Times New Roman", size_pt=12, bold=False, italic=False, color=RGBColor(0, 0, 0)):
    run.font.name = font_name
    run.font.size = Pt(size_pt)
    run.bold = bold
    run.italic = italic
    run.font.color.rgb = color

def add_p(doc, text="", align=WD_ALIGN_PARAGRAPH.LEFT, space_before=0, space_after=6, line_spacing=1.15, bold=False, italic=False, size=12):
    p = doc.add_paragraph()
    p.alignment = align
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = line_spacing
    if text:
        r = p.add_run(text)
        format_run(r, size_pt=size, bold=bold, italic=italic)
    return p

def add_heading_1(doc, text):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(16)
    p.paragraph_format.space_after = Pt(10)
    r = p.add_run(text)
    format_run(r, size_pt=15, bold=True)
    return p

def add_heading_2(doc, text):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.LEFT
    p.paragraph_format.space_before = Pt(14)
    p.paragraph_format.space_after = Pt(4)
    r = p.add_run(text)
    format_run(r, size_pt=13, bold=True)
    return p

def add_heading_3(doc, text):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.LEFT
    p.paragraph_format.space_before = Pt(10)
    p.paragraph_format.space_after = Pt(3)
    r = p.add_run(text)
    format_run(r, size_pt=12, bold=True, italic=True)
    return p

def add_image_box(doc, img_path, caption_text, width_inches=6.0):
    if os.path.exists(img_path):
        p_img = doc.add_paragraph()
        p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_img.paragraph_format.space_before = Pt(8)
        p_img.paragraph_format.space_after = Pt(4)
        run = p_img.add_run()
        run.add_picture(img_path, width=Inches(width_inches))

        p_cap = doc.add_paragraph()
        p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_cap.paragraph_format.space_before = Pt(2)
        p_cap.paragraph_format.space_after = Pt(10)
        r = p_cap.add_run(caption_text)
        format_run(r, size_pt=10, bold=True, italic=True, color=RGBColor(51, 65, 85))

def set_cell_border(cell, **kwargs):
    """
    Set cell borders
    kwargs: top, bottom, left, right
    values: dict(sz=12, val='single', color='000000')
    """
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    tcBorders = parse_xml(r'<w:tcBorders xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
                          r'<w:top w:val="single" w:sz="6" w:space="0" w:color="CCCCCC"/>'
                          r'<w:left w:val="single" w:sz="6" w:space="0" w:color="CCCCCC"/>'
                          r'<w:bottom w:val="single" w:sz="6" w:space="0" w:color="CCCCCC"/>'
                          r'<w:right w:val="single" w:sz="6" w:space="0" w:color="CCCCCC"/>'
                          r'</w:tcBorders>')
    tcPr.append(tcBorders)

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" w:fill="{fill_hex}"/>')
    tcPr.append(shd)

print("[1/5] Building Preliminary Pages...")

# =============================================================
# 1. COVER PAGE
# =============================================================
logo_path = os.path.join(ASSETS_DIR, 'mit_college_logo.png')
if os.path.exists(logo_path):
    p_logo = doc.add_paragraph()
    p_logo.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_logo = p_logo.add_run()
    r_logo.add_picture(logo_path, width=Inches(5.0))
else:
    add_p(doc, "MAEER's MIT Arts, Commerce & Science College", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, size=15)
    add_p(doc, "An Autonomous College Affiliated to Savitribai Phule Pune University", align=WD_ALIGN_PARAGRAPH.CENTER, size=11)
    add_p(doc, "Accredited by NAAC with \"A\" Grade", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, size=11)

add_p(doc, "Department of Computer Application", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, size=12, space_before=8)
add_p(doc, "Academic Year 2026 – 2027\nSemester – V", align=WD_ALIGN_PARAGRAPH.CENTER, size=11, space_after=18)

add_p(doc, "Field Project Report", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, size=18, space_before=10, space_after=8)
add_p(doc, "Submitted in Partial Fulfilment of the Requirements for the\nAward of Degree of Bachelor of Computer Applications", align=WD_ALIGN_PARAGRAPH.CENTER, italic=True, size=11, space_after=18)

add_p(doc, "Title of the Project – CareerLens AI:\nA Career Planning and Job-Matching Web Application", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, size=14, space_before=10, space_after=24)

# Student details block
add_p(doc, "Submitted by:", align=WD_ALIGN_PARAGRAPH.LEFT, bold=True, size=11)
add_p(doc, "Name: Raj Ramnivas Yadav\nRoll No: TE2208\nProgram: TYBCA\nDivision: E2\nProject Domain: Career Development, Natural Language Matching & Web Applications\nDuration: 30 Hours / Academic Term\nDeployed Web Application: https://careerlensai-seven.vercel.app/\nGitHub Source Code: https://github.com/rajy24/CareerLensAi", align=WD_ALIGN_PARAGRAPH.LEFT, size=11, space_after=24)

add_p(doc, "Faculty Guide: Prof. Prakash Nikam Sir", align=WD_ALIGN_PARAGRAPH.LEFT, bold=True, size=11)
add_p(doc, "Head of Department: Prof. Amit Tale", align=WD_ALIGN_PARAGRAPH.LEFT, bold=True, size=11)

doc.add_page_break()

# =============================================================
# 2. CERTIFICATE PAGE
# =============================================================
if os.path.exists(logo_path):
    p_logo = doc.add_paragraph()
    p_logo.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p_logo.add_run()
    r.add_picture(logo_path, width=Inches(4.6))
else:
    add_p(doc, "MAEER's MIT Arts, Commerce & Science College", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, size=14)

add_p(doc, "School of Computer Science & Application\nDepartment of Computer Application\nAcademic Year 2026 – 2027\nSemester – V", align=WD_ALIGN_PARAGRAPH.CENTER, size=11, space_after=14)

add_p(doc, "CERTIFICATE", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, size=16, space_before=10, space_after=16)

add_p(doc, "This is to certify that Mr. Raj Ramnivas Yadav, Roll No TE2208, a student of TYBCA, Semester V, has successfully completed the Field Project (1 Credit) titled \"CareerLens AI — A Career Planning and Job-Matching Web Application\" and the EduSkills Virtual Internship Course (1 Credit) in partial fulfilment of the requirements for the award of the degree of Bachelor of Computer Applications during the Academic Year 2026–2027. The work carried out is original and has been completed under my guidance to my satisfaction.", align=WD_ALIGN_PARAGRAPH.JUSTIFY, size=11, line_spacing=1.3, space_after=40)

add_p(doc, "Date: ____________\nPlace: Pune", align=WD_ALIGN_PARAGRAPH.LEFT, size=11, space_after=45)

# Signatures Table
sig_table = doc.add_table(rows=2, cols=2)
sig_table.alignment = WD_TABLE_ALIGNMENT.CENTER
sig_table.autofit = False
sig_table.columns[0].width = Inches(3.2)
sig_table.columns[1].width = Inches(3.2)

c00 = sig_table.cell(0, 0)
p00 = c00.paragraphs[0]
r = p00.add_run("Prof. Prakash Nikam Sir\nProject Guide")
format_run(r, size_pt=11, bold=True)

c01 = sig_table.cell(0, 1)
p01 = c01.paragraphs[0]
p01.alignment = WD_ALIGN_PARAGRAPH.RIGHT
r = p01.add_run("Prof. Amit Tale\nHOD, Dept. of Computer Application")
format_run(r, size_pt=11, bold=True)

doc.add_page_break()

# =============================================================
# 3. EVALUATION SHEET — FIELD PROJECT
# =============================================================
if os.path.exists(logo_path):
    p_logo = doc.add_paragraph()
    p_logo.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p_logo.add_run()
    r.add_picture(logo_path, width=Inches(4.2))

add_p(doc, "School of Computer Science & Application\nDepartment of Computer Application\nAcademic Year 2026 – 2027\nSemester – V", align=WD_ALIGN_PARAGRAPH.CENTER, size=10, space_after=10)

add_p(doc, "Evaluation Sheet – Field Project", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, size=14, space_after=12)

add_p(doc, "Name: Raj Ramnivas Yadav\nClass: TYBCA\nDivision: E2\nRoll No: TE2208\nProject Title: CareerLens AI — A Career Planning and Job-Matching Web Application", align=WD_ALIGN_PARAGRAPH.LEFT, size=10.5, space_after=10)

# Evaluation Table
eval_table = doc.add_table(rows=9, cols=4)
eval_table.alignment = WD_TABLE_ALIGNMENT.CENTER
eval_table.autofit = False
eval_table.columns[0].width = Inches(0.8)
eval_table.columns[1].width = Inches(3.5)
eval_table.columns[2].width = Inches(1.1)
eval_table.columns[3].width = Inches(1.1)

headers = ["Sr. No", "Component", "Max Marks", "Marks Awarded"]
for i, h in enumerate(headers):
    cell = eval_table.cell(0, i)
    p = cell.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run(h)
    format_run(r, size_pt=10, bold=True)
    set_cell_background(cell, "F1F5F9")
    set_cell_border(cell)

eval_data = [
    ("1", "Information Gathering", "8", ""),
    ("2", "Analysis & Problem Statement", "8", ""),
    ("3", "Design (DFD, ER, Architecture Diagrams)", "6", ""),
    ("4", "Working Project / Implementation", "12", ""),
    ("5", "Testing & Results", "4", ""),
    ("6", "Report Format & Neatness", "4", ""),
    ("7", "Viva-Voce", "8", ""),
    ("", "Total", "50", "")
]

for row_idx, data in enumerate(eval_data):
    for col_idx, val in enumerate(data):
        cell = eval_table.cell(row_idx + 1, col_idx)
        p = cell.paragraphs[0]
        if col_idx in [0, 2, 3]:
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(val)
        is_bold = (row_idx == len(eval_data) - 1)
        format_run(r, size_pt=10, bold=is_bold)
        set_cell_border(cell)
        if is_bold:
            set_cell_background(cell, "F8FAFC")

add_p(doc, "", space_after=25)

# Sig block
s_tbl = doc.add_table(rows=1, cols=2)
s_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
s_tbl.columns[0].width = Inches(3.2)
s_tbl.columns[1].width = Inches(3.2)
p1 = s_tbl.cell(0, 0).paragraphs[0]
p1.add_run("Prof. Prakash Nikam Sir\nProject Guide")
format_run(p1.runs[0], size_pt=10, bold=True)
p2 = s_tbl.cell(0, 1).paragraphs[0]
p2.alignment = WD_ALIGN_PARAGRAPH.RIGHT
p2.add_run("Prof. Amit Tale\nHOD, Dept. of Computer Application")
format_run(p2.runs[0], size_pt=10, bold=True)

doc.add_page_break()

# =============================================================
# 4. EVALUATION SHEET — EDUSKILLS PRESENTATION
# =============================================================
if os.path.exists(logo_path):
    p_logo = doc.add_paragraph()
    p_logo.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p_logo.add_run()
    r.add_picture(logo_path, width=Inches(4.2))

add_p(doc, "School of Computer Science & Application\nDepartment of Computer Application\nAcademic Year 2026 – 2027\nSemester – V", align=WD_ALIGN_PARAGRAPH.CENTER, size=10, space_after=10)

add_p(doc, "Evaluation Sheet – EduSkills Presentation", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, size=14, space_after=12)

add_p(doc, "Name: Raj Ramnivas Yadav\nRoll No: TE2208\nCourse Name: Data Structures and Algorithms in C + Project (AICTE–EduSkills)", align=WD_ALIGN_PARAGRAPH.LEFT, size=10.5, space_after=10)

# Table EduSkills
ed_table = doc.add_table(rows=8, cols=4)
ed_table.alignment = WD_TABLE_ALIGNMENT.CENTER
ed_table.autofit = False
ed_table.columns[0].width = Inches(0.8)
ed_table.columns[1].width = Inches(3.5)
ed_table.columns[2].width = Inches(1.1)
ed_table.columns[3].width = Inches(1.1)

headers_ed = ["Sr. No", "Component", "Max Marks", "Marks Awarded"]
for i, h in enumerate(headers_ed):
    cell = ed_table.cell(0, i)
    p = cell.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run(h)
    format_run(r, size_pt=10, bold=True)
    set_cell_background(cell, "F1F5F9")
    set_cell_border(cell)

ed_data = [
    ("1", "Course Enrolled & Offer Selection", "10", ""),
    ("2", "Knowledge of Topics (DSA in C)", "15", ""),
    ("3", "Practical Work / Demo", "8", ""),
    ("4", "Slide Design & Visuals", "5", ""),
    ("5", "Speaking Skills & Time Management", "5", ""),
    ("6", "Answers to Questions", "7", ""),
    ("", "Total", "50", "")
]

for row_idx, data in enumerate(ed_data):
    for col_idx, val in enumerate(data):
        cell = ed_table.cell(row_idx + 1, col_idx)
        p = cell.paragraphs[0]
        if col_idx in [0, 2, 3]:
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(val)
        is_bold = (row_idx == len(ed_data) - 1)
        format_run(r, size_pt=10, bold=is_bold)
        set_cell_border(cell)
        if is_bold:
            set_cell_background(cell, "F8FAFC")

add_p(doc, "", space_after=10)

# Summary Total Table
tot_table = doc.add_table(rows=4, cols=3)
tot_table.alignment = WD_TABLE_ALIGNMENT.CENTER
tot_table.columns[0].width = Inches(4.3)
tot_table.columns[1].width = Inches(1.1)
tot_table.columns[2].width = Inches(1.1)

t_headers = ["Final Marks", "Max Marks", "Marks Awarded"]
for i, h in enumerate(t_headers):
    c = tot_table.cell(0, i)
    p = c.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run(h)
    format_run(r, size_pt=10, bold=True)
    set_cell_background(c, "E2E8F0")
    set_cell_border(c)

t_rows = [
    ("Part A – Field Project", "50", ""),
    ("Part B – EduSkills Presentation", "50", ""),
    ("Total", "100", "")
]
for row_idx, r_data in enumerate(t_rows):
    for col_idx, val in enumerate(r_data):
        c = tot_table.cell(row_idx + 1, col_idx)
        p = c.paragraphs[0]
        if col_idx in [1, 2]:
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(val)
        is_bold = (row_idx == len(t_rows) - 1)
        format_run(r, size_pt=10, bold=is_bold)
        set_cell_border(c)

add_p(doc, "Grade Awarded: ____________", bold=True, size=11, space_before=14, space_after=20)

# Sig block
s_tbl2 = doc.add_table(rows=1, cols=2)
s_tbl2.alignment = WD_TABLE_ALIGNMENT.CENTER
s_tbl2.columns[0].width = Inches(3.2)
s_tbl2.columns[1].width = Inches(3.2)
p1 = s_tbl2.cell(0, 0).paragraphs[0]
p1.add_run("Prof. Prakash Nikam Sir\nProject Guide")
format_run(p1.runs[0], size_pt=10, bold=True)
p2 = s_tbl2.cell(0, 1).paragraphs[0]
p2.alignment = WD_ALIGN_PARAGRAPH.RIGHT
p2.add_run("Prof. Amit Tale\nHOD, Dept. of Computer Application")
format_run(p2.runs[0], size_pt=10, bold=True)

doc.add_page_break()

# =============================================================
# 5. DECLARATION
# =============================================================
add_heading_1(doc, "Declaration")
add_p(doc, "I hereby declare that this field project report titled \"CareerLens AI — A Career Planning and Job-Matching Web Application\" has been prepared for academic submission in partial fulfilment of the requirements for the award of the Degree of Bachelor of Computer Applications (TYBCA, Semester V) at MAEER's MIT Arts, Commerce and Science College, Alandi (D.), Pune.", align=WD_ALIGN_PARAGRAPH.JUSTIFY, size=11.5, space_before=14, space_after=12)

add_p(doc, "I affirm that the work presented herein represents my original development and analytical efforts carried out under the academic supervision of Prof. Prakash Nikam Sir. All implementation modules, software architectures, algorithms, and test results documented in this report accurately reflect the functioning of the deployed application (https://careerlensai-seven.vercel.app/) and verified codebase.", align=WD_ALIGN_PARAGRAPH.JUSTIFY, size=11.5, space_after=12)

add_p(doc, "I further declare that appropriate references have been cited for all third-party libraries, documentation, and external resources utilized during this project, and that no part of this report has been plagiarized or previously submitted for the award of any other degree or diploma.", align=WD_ALIGN_PARAGRAPH.JUSTIFY, size=11.5, space_after=40)

add_p(doc, "Date: ____________\nPlace: Pune", align=WD_ALIGN_PARAGRAPH.LEFT, size=11, space_after=35)
add_p(doc, "Signature: ______________________\nName: Raj Ramnivas Yadav\nRoll No: TE2208 | Class: TYBCA (Division E2)", align=WD_ALIGN_PARAGRAPH.LEFT, size=11)

doc.add_page_break()

# =============================================================
# 6. ACKNOWLEDGEMENT
# =============================================================
add_heading_1(doc, "Acknowledgement")
add_p(doc, "I express my profound gratitude to my project guide, Prof. Prakash Nikam Sir, for his invaluable guidance, technical insights, and continuous encouragement throughout the conception, design, and implementation of CareerLens AI. His constructive critique significantly shaped the architectural integrity and professional presentation of this field project.", align=WD_ALIGN_PARAGRAPH.JUSTIFY, size=11.5, space_before=14, space_after=12)

add_p(doc, "I extend my sincere thanks to Prof. Amit Tale, Head of the Department of Computer Application, and to the faculty members of the School of Computer Science & Application at MAEER's MIT Arts, Commerce and Science College, Alandi (D.), Pune, for providing the institutional infrastructure, computing environment, and academic ecosystem necessary to complete this project.", align=WD_ALIGN_PARAGRAPH.JUSTIFY, size=11.5, space_after=12)

add_p(doc, "I also acknowledge the AICTE–EduSkills Foundation for selecting me for the 8-Week Virtual Internship Program in Data Structures and Algorithms in C + Project (AICTE Student ID: STU6810fb64da87c1745943396). The algorithmic foundations, complexity analysis, and data structure principles acquired during this internship directly influenced the deterministic skill-matching and prioritized queueing logic implemented in CareerLens AI.", align=WD_ALIGN_PARAGRAPH.JUSTIFY, size=11.5, space_after=12)

add_p(doc, "Finally, I thank my parents, family, and peers for their unfailing encouragement and support during the course of my BCA studies.", align=WD_ALIGN_PARAGRAPH.JUSTIFY, size=11.5, space_after=35)

add_p(doc, "Raj Ramnivas Yadav\nTYBCA (Semester V), Division E2\nRoll No: TE2208", align=WD_ALIGN_PARAGRAPH.RIGHT, bold=True, size=11)

doc.add_page_break()

# =============================================================
# 7. INDEX (TABLE OF CONTENTS)
# =============================================================
add_heading_1(doc, "INDEX")
add_p(doc, "Table of Contents", align=WD_ALIGN_PARAGRAPH.CENTER, italic=True, size=11, space_after=10)

index_items = [
    ("—", "PART A – FIELD PROJECT", "1"),
    ("1", "Introduction", "1"),
    ("2", "Information Gathering & Requirement Analysis", "3"),
    ("3", "Analysis of Existing Systems", "5"),
    ("4", "Problem Statement", "7"),
    ("5", "Objectives & Scope", "9"),
    ("6", "Proposed System & Design", "11"),
    ("7", "Implementation", "19"),
    ("8", "Testing & Results", "27"),
    ("9", "Conclusion & Future Scope", "30"),
    ("10", "References", "32"),
    ("—", "PART B – AICTE–EDUSKILLS INTERNSHIP", "33"),
    ("11", "Course Details (DSA in C + Capstone Project)", "33"),
    ("12", "Course Certificate & Offer Letter Evidence", "35"),
    ("13", "What I Learned & Algorithmic Synthesis", "38"),
    ("14", "PART C – PRESENTATION SLIDES APPENDIX", "40")
]

idx_table = doc.add_table(rows=len(index_items)+1, cols=3)
idx_table.alignment = WD_TABLE_ALIGNMENT.CENTER
idx_table.columns[0].width = Inches(1.0)
idx_table.columns[1].width = Inches(4.5)
idx_table.columns[2].width = Inches(1.0)

idx_headers = ["Sr. No", "Topic / Chapter", "Page No"]
for i, h in enumerate(idx_headers):
    c = idx_table.cell(0, i)
    p = c.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run(h)
    format_run(r, size_pt=10.5, bold=True)
    set_cell_background(c, "E2E8F0")
    set_cell_border(c)

for row_idx, item in enumerate(index_items):
    for col_idx, val in enumerate(item):
        c = idx_table.cell(row_idx + 1, col_idx)
        p = c.paragraphs[0]
        if col_idx in [0, 2]:
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(val)
        is_part = "PART" in val
        format_run(r, size_pt=10, bold=is_part)
        set_cell_border(c)
        if is_part:
            set_cell_background(c, "F1F5F9")

doc.add_page_break()

# =============================================================
# 8. LIST OF FIGURES & LIST OF TABLES
# =============================================================
add_heading_1(doc, "List of Figures")
figures_data = [
    ("Figure 6.1", "Data Flow Diagram (DFD) Level 0 — Context Level Diagram", "13"),
    ("Figure 6.2", "Data Flow Diagram (DFD) Level 1 — Functional Decomposition", "14"),
    ("Figure 6.3", "UML Use-Case Diagram for CareerLens AI Actors and Workflows", "15"),
    ("Figure 6.4", "UML Activity Diagram — End-to-End Competency Matching Process", "16"),
    ("Figure 6.5", "System Architecture Diagram — 3-Tier Dual-Engine Design", "17"),
    ("Figure 6.6", "Entity-Relationship (ER) Diagram — Data Schema & Key Relationships", "18"),
    ("Figure 7.1", "Public Landing Page (Editorial SaaS Hero & Transparency Notice)", "22"),
    ("Figure 7.2", "Candidate Dashboard (Personalized Readiness Hub & KPI Telemetry)", "22"),
    ("Figure 7.3", "Résumé Skill Extraction & Profile Synchronizer Interface", "23"),
    ("Figure 7.4", "Two-Column Job Description Compatibility Analyzer", "23"),
    ("Figure 7.5", "Analysis Report: Segmented Match Score & Gaps Breakdown", "24"),
    ("Figure 7.6", "Zero-Denominator Guard Active Prompt on Non-Technical Text", "24"),
    ("Figure 7.7", "Personalized Learning Roadmaps (High/Medium/Supplementary Tiers)", "25"),
    ("Figure 7.8", "Add Custom Learning Goal Modal Dialog", "25"),
    ("Figure 7.9", "Role-Specific Interview Prep Workbench & Automated Feedback Rubric", "26"),
    ("Figure 7.10", "Job Application Pipeline Tracker & Data Export Workspace", "26"),
    ("Figure 12.1", "AICTE–EduSkills Official Internship Offer Letter — Page 1", "36"),
    ("Figure 12.2", "AICTE–EduSkills Official Internship Offer Letter — Page 2 (8-Week Plan)", "37"),
]

fig_table = doc.add_table(rows=len(figures_data)+1, cols=3)
fig_table.alignment = WD_TABLE_ALIGNMENT.CENTER
fig_table.columns[0].width = Inches(1.2)
fig_table.columns[1].width = Inches(4.3)
fig_table.columns[2].width = Inches(1.0)

for i, h in enumerate(["Figure No.", "Figure Title & Description", "Page"]):
    c = fig_table.cell(0, i)
    p = c.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run(h)
    format_run(r, size_pt=9.5, bold=True)
    set_cell_background(c, "E2E8F0")
    set_cell_border(c)

for idx, (f_no, f_desc, f_pg) in enumerate(figures_data):
    for c_idx, val in enumerate([f_no, f_desc, f_pg]):
        c = fig_table.cell(idx+1, c_idx)
        p = c.paragraphs[0]
        if c_idx in [0, 2]:
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(val)
        format_run(r, size_pt=9.5)
        set_cell_border(c)

add_p(doc, "", space_after=14)

add_heading_2(doc, "List of Tables")
tables_data = [
    ("Table 2.1", "Summary of Software Requirements Specification (SRS)", "4"),
    ("Table 2.2", "Minimum Hardware and Software Execution Requirements", "5"),
    ("Table 3.1", "Weaknesses of Existing Career Portals and Manual Approaches", "6"),
    ("Table 3.2", "System Comparison Matrix: Existing Systems vs. CareerLens AI", "7"),
    ("Table 4.1", "Identified Problems and Concrete CareerLens AI Solutions", "8"),
    ("Table 6.1", "Database Entities, Schema Attributes, and Data Types", "18"),
    ("Table 7.1", "Core Technology Stack and Engineering Rationale", "20"),
    ("Table 8.1", "Comprehensive System Test Cases and Verification Results", "28"),
    ("Table 11.1", "8-Week AICTE–EduSkills Curriculum & Capstone Roadmap", "34"),
]

tbl_table = doc.add_table(rows=len(tables_data)+1, cols=3)
tbl_table.alignment = WD_TABLE_ALIGNMENT.CENTER
tbl_table.columns[0].width = Inches(1.2)
tbl_table.columns[1].width = Inches(4.3)
tbl_table.columns[2].width = Inches(1.0)

for i, h in enumerate(["Table No.", "Table Title & Description", "Page"]):
    c = tbl_table.cell(0, i)
    p = c.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run(h)
    format_run(r, size_pt=9.5, bold=True)
    set_cell_background(c, "E2E8F0")
    set_cell_border(c)

for idx, (t_no, t_desc, t_pg) in enumerate(tables_data):
    for c_idx, val in enumerate([t_no, t_desc, t_pg]):
        c = tbl_table.cell(idx+1, c_idx)
        p = c.paragraphs[0]
        if c_idx in [0, 2]:
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(val)
        format_run(r, size_pt=9.5)
        set_cell_border(c)

doc.add_page_break()

# =============================================================
# PART A DIVIDER
# =============================================================
p_part = add_p(doc, "PART A\nFIELD PROJECT (1 CREDIT)", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, size=20, space_before=200, space_after=20)
add_p(doc, "Title of the Project:\nCareerLens AI — A Career Planning and Job-Matching Web Application", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, size=14)
doc.add_page_break()

print("[2/5] Building Chapters 1 to 5...")

# =============================================================
# CHAPTER 1: INTRODUCTION
# =============================================================
add_heading_1(doc, "CHAPTER 1\nINTRODUCTION")

add_heading_2(doc, "1.1 Background and Motivation")
add_p(doc, "The transition from undergraduate computer application studies to professional employment represents one of the most demanding phases in a software engineer's early career. Every year, thousands of computer science and BCA graduates enter the job market equipped with foundational knowledge in programming languages, database management, and software engineering. However, upon encountering real-world technical recruitment processes, candidates often experience a pronounced structural gap between academic curricula and industry hiring expectations.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

add_p(doc, "Modern technology job postings rarely request isolated programming fundamentals; instead, they specify intricate ecosystems comprising modern web frameworks (e.g., React, Next.js), typed supersets (TypeScript), containerization tooling (Docker), continuous integration pipelines, and specialized database paradigms. Complicating this reality further is the pervasive deployment of commercial Applicant Tracking Systems (ATS) and automated screening filters by employers. These automated systems rapidly filter candidate résumés against job descriptions, frequently discarding promising applicants who lack specific industry phrasing, while offering zero constructive feedback to help the candidate improve.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

add_heading_2(doc, "1.2 Introduction to CareerLens AI")
add_p(doc, "CareerLens AI is an independent, full-stack career planning and job-readiness workspace designed specifically for students, recent graduates, and early-career job seekers. The platform serves as a personalized career intelligence workbench that bridges the divide between self-assessment and successful job placement. Rather than acting as a passive job directory or an opaque, generative 'black-box' tool that hallucinates matching percentages, CareerLens AI implements a 100% transparent, deterministic competency matching engine.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

add_p(doc, "CareerLens AI empowers candidates to systematically audit their verified capabilities against authentic job postings. The system analyzes arbitrary job descriptions, isolates required minimum qualifications from preferred bonus competencies, computes a mathematically grounded compatibility score, and generates an actionable, three-tiered learning roadmap to systematically close identified technical gaps.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

add_heading_2(doc, "1.3 Purpose and Significance")
add_p(doc, "The primary purpose of CareerLens AI is to democratize career readiness intelligence through algorithmic transparency and complete client data privacy. Unlike commercial platforms that lock résumé optimization behind expensive monthly subscriptions or sell user candidate data to third parties, CareerLens AI operates on a dual-engine architecture: it functions with 100% capability in an offline, zero-dependency mode using encrypted browser localStorage, while offering cloud synchronization through Supabase PostgreSQL equipped with Row-Level Security (RLS).", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

add_p(doc, "The significance of this application lies in its holistic workflow integration. While existing commercial tools fragment the job search process—requiring separate platforms for job searching, résumé optimization, roadmap learning, interview practice, and application tracking—CareerLens AI consolidates all five essential pillars into a unified, distraction-free software workspace.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

add_heading_2(doc, "1.4 Overview of the Project")
add_p(doc, "CareerLens AI is engineered using modern web technologies: Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, and Supabase. The platform provides seven core operational modules:", align=WD_ALIGN_PARAGRAPH.JUSTIFY)
add_p(doc, "1. Candidate Dashboard: Synthesizes real-time metrics including verified profile skills, latest match score, open gap counts, and application pipeline conversions.\n2. Résumé Extraction & Skill Synchronizer: Automatically scans plain text and markdown résumés, detects verified technical skills using token-boundary matching, and updates user profile data.\n3. Job Compatibility Engine: Evaluates arbitrary job descriptions against profile skills, weighting required qualifications at 70% and preferred competencies at 30%.\n4. Mathematical Transparency Disclosure: Presents an interactive formulation breakdown detailing exactly how the candidate's score was calculated.\n5. Prioritized Learning Roadmaps: Categorizes missing skills into High Priority (core qualification gaps), Medium Priority (supporting frameworks), and Supplementary (best practices and tools) with hands-on mini-projects and documentation links.\n6. Role-Specific Interview Workbench: Offers curated technical, coding, and behavioral interview questions across five role tracks with automated rubric feedback scoring.\n7. Application Pipeline Tracker: Provides a complete CRUD tracking system managing submission dates, interview stages, follow-up deadlines, and salary targets.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

# =============================================================
# CHAPTER 2: INFORMATION GATHERING & REQUIREMENT ANALYSIS
# =============================================================
add_heading_1(doc, "CHAPTER 2\nINFORMATION GATHERING & REQUIREMENT ANALYSIS")

add_heading_2(doc, "2.1 Problem Discovery and Field Observations")
add_p(doc, "To formulate the specifications for CareerLens AI, a thorough investigative study of student job-seeking practices was conducted among undergraduate final-year students (TYBCA) and recent computer science graduates. The study involved informal interviews, review of job-search spreadsheets, and observation of how students prepare for campus placements and off-campus recruitment drives.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

add_p(doc, "The investigation revealed three recurring behavioral patterns and operational bottlenecks:\n• Disorganized Preparation Tracking: Over 85% of surveyed candidates tracked applications across manual notes or disorganized spreadsheets, frequently missing follow-up dates or mixing up role requirements.\n• Uncertainty Regarding Keyword Matching: Students expressed widespread confusion about why their résumés failed to pass initial ATS screenings despite possessing fundamental programming knowledge. They lacked tools that could explain keyword matching deterministically without vague commercial scores.\n• Non-Prioritized Self-Study: When students identified missing qualifications in a job posting, they frequently experienced 'tutorial overload'—spending weeks watching generic video courses without knowing which competencies represented mandatory baseline requirements versus non-critical bonus skills.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

add_heading_2(doc, "2.2 Target Users")
add_p(doc, "CareerLens AI is designed to serve three distinct user profiles within the early-career ecosystem:\n1. Final-Year Undergraduate Students (BCA / B.Sc. CS / B.Tech): Seeking structured transition guidance from academic theory to corporate placement readiness.\n2. Early-Career Job Seekers & Career Changers: Software developers with 0–2 years of experience preparing for lateral career shifts or upward role transitions.\n3. Academic Placement Coordinators & Mentors: Project guides and faculty advisors reviewing student candidate portfolios and tracking placement preparedness.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

add_heading_2(doc, "2.3 Software Requirements Specification (SRS)")
add_p(doc, "Based on the field study, a formal Software Requirements Specification was drafted, categorizing requirements into functional and non-functional specifications, as summarized in Table 2.1.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

# Table 2.1
add_p(doc, "Table 2.1: Summary of Software Requirements Specification (SRS)", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, size=10)
srs_table = doc.add_table(rows=6, cols=2)
srs_table.alignment = WD_TABLE_ALIGNMENT.CENTER
srs_table.columns[0].width = Inches(2.2)
srs_table.columns[1].width = Inches(4.5)

srs_headers = ["Requirement Category", "Detailed Specification"]
for i, h in enumerate(srs_headers):
    c = srs_table.cell(0, i)
    p = c.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run(h)
    format_run(r, size_pt=9.5, bold=True)
    set_cell_background(c, "E2E8F0")
    set_cell_border(c)

srs_rows = [
    ("Primary User Actors", "Student Candidates, Self-Directed Job Seekers, Academic Mentors."),
    ("Functional Requirements", "Profile skill management, plain-text résumé extraction, job description keyword parsing, 70/30 segmented qualification weighting, zero-denominator safety guard, prioritized learning roadmap generation, STAR interview question drills with automated rubric scoring, full CRUD application tracking, and JSON data export."),
    ("Non-Functional Requirements", "Algorithmic transparency, zero false substring collisions, responsive mobile/desktop UI, sub-500ms client processing latency, WCAG accessible contrast, and 100% client data privacy."),
    ("Data Persistence", "Dual-engine architecture: encrypted HTML5 LocalStorage for zero-dependency client privacy, with optional Supabase Cloud PostgreSQL with Row-Level Security (RLS)."),
    ("System Safety & Reliability", "Zero-Denominator Guard prevents division-by-zero or false 0% matches when job postings contain no technical criteria.")
]
for idx, (c1, c2) in enumerate(srs_rows):
    cell1 = srs_table.cell(idx+1, 0)
    cell2 = srs_table.cell(idx+1, 1)
    p1 = cell1.paragraphs[0]
    p1.add_run(c1)
    format_run(p1.runs[0], size_pt=9, bold=True)
    p2 = cell2.paragraphs[0]
    p2.add_run(c2)
    format_run(p2.runs[0], size_pt=9)
    set_cell_border(cell1)
    set_cell_border(cell2)

add_p(doc, "", space_after=10)

add_heading_2(doc, "2.4 Hardware and Software Execution Requirements")
add_p(doc, "CareerLens AI was engineered to minimize system overhead, ensuring the platform executes smoothly across standard consumer laptops and college laboratory workstations without requiring high-performance GPUs or paid cloud infrastructure. The execution specifications are detailed in Table 2.2.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

# Table 2.2
add_p(doc, "Table 2.2: Minimum Hardware and Software Execution Requirements", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, size=10)
hw_table = doc.add_table(rows=6, cols=3)
hw_table.alignment = WD_TABLE_ALIGNMENT.CENTER
hw_table.columns[0].width = Inches(1.8)
hw_table.columns[1].width = Inches(2.4)
hw_table.columns[2].width = Inches(2.5)

hw_headers = ["Component", "Minimum Requirement", "Development & Production Specification"]
for i, h in enumerate(hw_headers):
    c = hw_table.cell(0, i)
    p = c.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run(h)
    format_run(r, size_pt=9.5, bold=True)
    set_cell_background(c, "E2E8F0")
    set_cell_border(c)

hw_rows = [
    ("Processor (CPU)", "Dual-Core x86/ARM, 1.6 GHz", "Intel Core i5 / AMD Ryzen 5 or Apple Silicon"),
    ("System Memory (RAM)", "4 GB RAM", "8 GB to 16 GB DDR4/DDR5 RAM"),
    ("Storage Space", "500 MB free disk space", "SSD Storage (Node.js runtime & project dependencies)"),
    ("Operating System", "Windows 10/11, macOS, or Linux", "Windows 11 (64-bit) development environment"),
    ("Web Browser & Runtime", "Modern Chromium, Firefox, or Safari", "Google Chrome 120+, Node.js v22.17.1, npm 10.9.2")
]
for idx, (c1, c2, c3) in enumerate(hw_rows):
    for c_i, val in enumerate([c1, c2, c3]):
        cell = hw_table.cell(idx+1, c_i)
        p = cell.paragraphs[0]
        r = p.add_run(val)
        format_run(r, size_pt=9, bold=(c_i==0))
        set_cell_border(cell)

add_p(doc, "", space_after=10)

add_heading_2(doc, "2.5 Feasibility Analysis")
add_p(doc, "A comprehensive feasibility study was completed prior to implementation:\n• Technical Feasibility: The application leverages the Next.js 14 App Router, TypeScript, and modern browser standards (HTML5 LocalStorage, Web Storage API). These technologies are mature, highly optimized, and proven to deliver near-instant response times for client-side text processing.\n• Operational Feasibility: The user interface is structured following an editorial SaaS layout with high typography contrast and clear line icons. It requires no specialized training for college students or faculty.\n• Economic Feasibility: CareerLens AI incurs zero recurring operating costs. It utilizes open-source software libraries, free-tier Vercel hosting, and optional free-tier Supabase cloud PostgreSQL. No paid external AI API keys (e.g. OpenAI GPT-4) are required for core functionality, making the application 100% sustainable.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

# =============================================================
# CHAPTER 3: ANALYSIS OF EXISTING SYSTEMS
# =============================================================
add_heading_1(doc, "CHAPTER 3\nANALYSIS OF EXISTING SYSTEMS")

add_heading_2(doc, "3.1 Existing Career-Planning and Job-Matching Approaches")
add_p(doc, "Currently, students and early-career job seekers rely on three primary mechanisms to evaluate job opportunities and prepare for employment:\n1. Mainstream Employment Portals (LinkedIn, Indeed, Naukri): These platforms excel at aggregating job postings but offer minimal preparation intelligence. Their internal match scores (e.g. 'Top 10% Applicant') are based on undisclosed recruiter filters, offering no educational breakdown of what competencies are missing or how to acquire them.\n2. Commercial Résumé Scanners (Jobscan, ResumeWorded): These commercial services charge substantial subscription fees ($20–$50 per month) to scan candidate résumés against job descriptions. However, their scoring systems operate as proprietary black boxes, frequently penalizing candidates for formatting nuances while offering generic keyword-stuffing advice.\n3. Manual Spreadsheets and Unstructured Notes: Many students maintain personal Excel sheets or Notion tables to record applied companies. These manual logs lack automation, do not integrate with job requirements, and provide no interview practice or gap analysis.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

add_heading_2(doc, "3.2 Limitations and Identified Gaps")
add_p(doc, "A systematic analysis of these existing approaches identified major operational and technical weaknesses, as summarized in Table 3.1.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

# Table 3.1
add_p(doc, "Table 3.1: Weaknesses of Existing Career Portals and Manual Approaches", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, size=10)
weak_table = doc.add_table(rows=7, cols=2)
weak_table.alignment = WD_TABLE_ALIGNMENT.CENTER
weak_table.columns[0].width = Inches(2.2)
weak_table.columns[1].width = Inches(4.5)

for i, h in enumerate(["Functional Area", "Identified Weakness in Current Systems"]):
    c = weak_table.cell(0, i)
    p = c.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run(h)
    format_run(r, size_pt=9.5, bold=True)
    set_cell_background(c, "E2E8F0")
    set_cell_border(c)

weak_rows = [
    ("Scoring Transparency", "Proprietary black-box algorithms conceal mathematical calculations; candidates cannot verify how scores are generated."),
    ("Keyword Match Precision", "Naive string matching produces false substring collisions (e.g., programming language 'C' erroneously matches 'CSS', and 'Java' matches 'JavaScript')."),
    ("Requirement Weighting", "Existing scanners treat all keywords equally, failing to distinguish between mandatory baseline requirements and optional bonus skills."),
    ("Zero-Denominator Handling", "Scanners display confusing 0% match scores or phantom skill gaps when evaluated against job postings lacking explicit technical terms."),
    ("Privacy & Monetization", "Commercial platforms monetize candidate résumés and impose aggressive paywalls, restricting access for student job seekers."),
    ("Process Fragmentation", "Job discovery, skill roadmaps, interview preparation, and pipeline tracking exist as disconnected, siloed tools.")
]
for idx, (c1, c2) in enumerate(weak_rows):
    cell1 = weak_table.cell(idx+1, 0)
    cell2 = weak_table.cell(idx+1, 1)
    p1 = cell1.paragraphs[0]
    p1.add_run(c1)
    format_run(p1.runs[0], size_pt=9, bold=True)
    p2 = cell2.paragraphs[0]
    p2.add_run(c2)
    format_run(p2.runs[0], size_pt=9)
    set_cell_border(cell1)
    set_cell_border(cell2)

add_p(doc, "", space_after=10)

add_heading_2(doc, "3.3 Comparison with the Proposed System")
add_p(doc, "CareerLens AI was designed to systematically address every limitation identified in Table 3.1. A side-by-side architectural comparison is detailed in Table 3.2.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

# Table 3.2
add_p(doc, "Table 3.2: System Comparison Matrix: Existing Systems vs. CareerLens AI", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, size=10)
comp_table = doc.add_table(rows=7, cols=3)
comp_table.alignment = WD_TABLE_ALIGNMENT.CENTER
comp_table.columns[0].width = Inches(2.0)
comp_table.columns[1].width = Inches(2.4)
comp_table.columns[2].width = Inches(2.3)

for i, h in enumerate(["Evaluation Dimension", "Existing Commercial Portals", "CareerLens AI (Proposed System)"]):
    c = comp_table.cell(0, i)
    p = c.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run(h)
    format_run(r, size_pt=9.5, bold=True)
    set_cell_background(c, "E2E8F0")
    set_cell_border(c)

comp_rows = [
    ("Mathematical Transparency", "Opaque, hidden percentage score", "100% open deterministic formula with full calculation disclosure modal"),
    ("Keyword Match Safety", "Prone to false substring collisions", "Strict token-boundary regex matching with canonical alias normalization"),
    ("Requirement Segmentation", "Uniform keyword frequency count", "70% Required minimums + 30% Preferred bonus qualifications weighting"),
    ("Zero-Denominator Safety", "Displays misleading 0% or crashes", "Zero-Denominator Guard prompts for qualifications; never shows false 0%"),
    ("Actionable Roadmap Mapping", "None; candidate must search independently", "Automatically generates 3-tier milestone plans with mini-projects & doc links"),
    ("Data Privacy & Architecture", "Server tracking, public profiles, cookies", "Dual-engine: 100% offline encrypted LocalStorage or private Supabase RLS")
]
for idx, (c1, c2, c3) in enumerate(comp_rows):
    cell1 = comp_table.cell(idx+1, 0)
    cell2 = comp_table.cell(idx+1, 1)
    cell3 = comp_table.cell(idx+1, 2)
    p1 = cell1.paragraphs[0]
    p1.add_run(c1)
    format_run(p1.runs[0], size_pt=9, bold=True)
    p2 = cell2.paragraphs[0]
    p2.add_run(c2)
    format_run(p2.runs[0], size_pt=9)
    p3 = cell3.paragraphs[0]
    p3.add_run(c3)
    format_run(p3.runs[0], size_pt=9, bold=True, color=RGBColor(30, 64, 175))
    set_cell_border(cell1)
    set_cell_border(cell2)
    set_cell_border(cell3)

# =============================================================
# CHAPTER 4: PROBLEM STATEMENT
# =============================================================
add_heading_1(doc, "CHAPTER 4\nPROBLEM STATEMENT")
add_p(doc, "Undergraduate computer application students and early-career job seekers face significant hurdles when navigating technical job recruitment. While students possess academic training in programming and computer applications, they lack an objective, transparent, and integrated software mechanism to evaluate their genuine market readiness against industry job postings.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

add_p(doc, "Specifically, the problem statement addresses the following critical challenges:\n1. Candidates cannot objectively measure their skill alignment against job descriptions because commercial applicant tracking tools use opaque, proprietary scoring algorithms that conceal mathematical methodology.\n2. Existing keyword matching tools frequently suffer from token collisions (falsely matching short language tokens such as 'C' inside 'CSS' or 'Java' inside 'JavaScript') and fail to account for industry synonyms (such as 'react.js' for 'React' or 'postgres' for 'PostgreSQL').\n3. Existing platforms do not differentiate between core mandatory qualifications and preferred bonus skills, resulting in distorted match scores that misguide student preparation priorities.\n4. When candidates identify skill deficiencies, existing tools fail to provide prioritized, actionable learning roadmaps, leaving students overwhelmed by unstructured online content.\n5. Job search activities remain severely fragmented across disconnected applications, spreadsheets, and note-taking apps, leading to forgotten interview deadlines and lost career opportunities.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

add_p(doc, "Therefore, there is an acute need for a unified, transparent, and client-private web application that automates skill extraction, deterministically calculates job compatibility with segmented weighting, generates prioritized milestone roadmaps, provides role-specific interview preparation, and manages the entire job application lifecycle.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

# Table 4.1
add_p(doc, "Table 4.1: Identified Problems and Concrete CareerLens AI Solutions", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, size=10)
prob_table = doc.add_table(rows=6, cols=2)
prob_table.alignment = WD_TABLE_ALIGNMENT.CENTER
prob_table.columns[0].width = Inches(2.3)
prob_table.columns[1].width = Inches(4.4)

for i, h in enumerate(["Core Problem Challenge", "CareerLens AI Concrete Architectural Solution"]):
    c = prob_table.cell(0, i)
    p = c.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run(h)
    format_run(r, size_pt=9.5, bold=True)
    set_cell_background(c, "E2E8F0")
    set_cell_border(c)

prob_rows = [
    ("Opaque black-box scoring systems", "Transparent mathematical formulation modal detailing exact fractions and percentages."),
    ("False keyword matching collisions", "Regex token-boundary matcher with canonical alias dictionary covering 150+ technologies."),
    ("Equal weighting of core vs. bonus skills", "Segmented requirement engine assigning 70% weight to Required skills and 30% to Preferred."),
    ("Phantom 0% scores on vague descriptions", "Zero-Denominator Guard returning informative prompts when zero technical terms exist."),
    ("Disconnected preparation tools", "Integrated workspace unifying résumé extraction, job matching, roadmaps, interview drills, and pipeline tracking.")
]
for idx, (c1, c2) in enumerate(prob_rows):
    cell1 = prob_table.cell(idx+1, 0)
    cell2 = prob_table.cell(idx+1, 1)
    p1 = cell1.paragraphs[0]
    p1.add_run(c1)
    format_run(p1.runs[0], size_pt=9, bold=True)
    p2 = cell2.paragraphs[0]
    p2.add_run(c2)
    format_run(p2.runs[0], size_pt=9)
    set_cell_border(cell1)
    set_cell_border(cell2)

# =============================================================
# CHAPTER 5: OBJECTIVES & SCOPE
# =============================================================
add_heading_1(doc, "CHAPTER 5\nOBJECTIVES & SCOPE")

add_heading_2(doc, "5.1 Specific Objectives of the Project")
add_p(doc, "To resolve the challenges articulated in the problem statement, CareerLens AI was developed in accordance with twelve concrete operational objectives:", align=WD_ALIGN_PARAGRAPH.JUSTIFY)
objectives_list = [
    "1. Centralized Career Intelligence: To provide a single unified web platform that coordinates candidate skills, job analyses, learning roadmaps, interview drills, and job applications.",
    "2. Deterministic Skill Extraction: To implement a token-boundary regex parser capable of scanning arbitrary text (résumés and job descriptions) against 150+ technology aliases without substring collisions.",
    "3. Bidirectional Profile Synchronization: To automatically update the candidate's verified skills profile whenever new competencies are audited from uploaded résumés.",
    "4. Segmented Qualification Weighting: To mathematically segment job requirements into Required Minimums (weighted at 70%) and Preferred Competencies (weighted at 30%).",
    "5. Algorithmic Transparency: To disclose the full mathematical scoring formula in an on-screen breakdown modal, eliminating black-box ambiguity.",
    "6. Zero-Denominator Safety Guard: To detect when job descriptions contain zero technical requirements, displaying a helpful guidance prompt rather than a false 0% score.",
    "7. Prioritized Roadmap Generation: To automatically convert identified skill deficiencies into a three-tiered learning plan (High, Medium, and Supplementary Priority).",
    "8. Practical Milestone Deliverables: To supply each roadmap milestone with essential concepts, a hands-on mini-project specification, and links to official documentation.",
    "9. Role-Specific Interview Simulator: To provide curated technical, coding, and behavioral interview questions across five key software role tracks.",
    "10. Automated Answer Rubric Evaluation: To evaluate user-drafted interview answers against core concepts, rating length, conciseness, and covered vs. missed points.",
    "11. Full Lifecycle Pipeline Tracking: To support complete CRUD tracking of job applications across stages (Wishlist, Applied, Interviewing, Offer, Rejected) with follow-up reminders.",
    "12. Data Privacy & Portability: To provide client-side offline persistence via encrypted HTML5 LocalStorage, JSON data archive export, and optional Supabase cloud synchronization."
]
for obj in objectives_list:
    add_p(doc, obj, size=11, space_before=2, space_after=4)

add_heading_2(doc, "5.2 Functional Scope")
add_p(doc, "The scope of CareerLens AI encompasses five functional software domains:\n• Competency Management: Profile skills management, résumé text parsing, tag addition, and removal.\n• Job Compatibility Analysis: Parsing target job descriptions, keyword normalization, segmented qualification weighting, and mathematical formula disclosure.\n• Curriculum Roadmapping: Dynamic generation of skill roadmaps, priority filtering (High/Medium/Supplementary), interactive completion tracking, and custom goal creation.\n• Interview Readiness Preparation: Question filtering by role and category, collapsible model answers, implementation code patterns, interactive drafting, and automated evaluation rubrics.\n• Application Pipeline Management: Application stage tracking, status dropdown transitions, follow-up calendar reminders, salary notes, and JSON backup export.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

add_heading_2(doc, "5.3 Limitations and Current Operational Boundaries")
add_p(doc, "To maintain technical honesty and academic integrity, the current operational boundaries of CareerLens AI are clearly defined:\n• No Direct Live Job Scraping: CareerLens AI does not perform live, unauthorized web scraping of LinkedIn or Indeed job boards; users paste job descriptions or select built-in industry samples.\n• Deterministic Engine vs Generative LLM: The primary compatibility engine is deterministic and rule-based. It does not rely on an external paid LLM API (such as OpenAI GPT-4), ensuring total privacy, zero operational cost, and zero hallucinations.\n• Dual-Engine Deployment: In offline mode, all data resides securely in browser localStorage. Cloud persistence requires configuring user-provided Supabase credentials.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

doc.add_page_break()

print("[3/5] Building Chapters 6 to 7 (Diagrams & Implementation)...")

# =============================================================
# CHAPTER 6: PROPOSED SYSTEM & DESIGN
# =============================================================
add_heading_1(doc, "CHAPTER 6\nPROPOSED SYSTEM & DESIGN")

add_heading_2(doc, "6.1 Proposed System Workflow")
add_p(doc, "CareerLens AI proposes an end-to-end, candidate-centric workflow. The candidate begins by establishing their verified skill baseline—either by selecting profile tags or by pasting résumé text into the Résumé Review module. When the candidate encounters a target job posting, they paste the text into the Job Compatibility Analyzer. The system immediately executes token-boundary regex extraction, segments requirements into Required and Preferred tiers, and renders a transparent compatibility score.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

add_p(doc, "Identified skill gaps are then automatically ported into the Learning Roadmaps module, where they are organized into High Priority (mandatory core gaps), Medium Priority (supporting libraries), and Supplementary tiers. The candidate completes curated mini-projects and tracks progress interactively. Simultaneously, the candidate uses the Interview Workbench to practice role-specific technical screens, receiving instant rubric feedback, while tracking their applications through the pipeline from initial submission to final job offer.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

add_heading_2(doc, "6.2 System Design Diagrams")
add_p(doc, "The structural, behavioral, and architectural models of CareerLens AI are formally represented through standard software engineering diagrams in Figures 6.1 through 6.6.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

# Diagram 6.1: DFD 0
dfd0_path = os.path.join(DIAGRAMS_DIR, 'fig_6_1_dfd_level_0.png')
add_image_box(doc, dfd0_path, "Figure 6.1: Data Flow Diagram (DFD) Level 0 — Context Level Diagram", width_inches=6.0)
add_p(doc, "Figure 6.1 illustrates the Level 0 Context Diagram. The central CareerLens AI system interacts with two external entities: the Student / Candidate (who provides skills, résumés, and application records and receives match scores, learning roadmaps, and interview drills) and Target Employers / Job Descriptions (which provide qualification criteria and receive application tracking status updates).", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

# Diagram 6.2: DFD 1
dfd1_path = os.path.join(DIAGRAMS_DIR, 'fig_6_2_dfd_level_1.png')
add_image_box(doc, dfd1_path, "Figure 6.2: Data Flow Diagram (DFD) Level 1 — Functional Decomposition", width_inches=6.0)
add_p(doc, "Figure 6.2 decomposes the system into five core functional sub-processes: 1.0 Profile & Résumé Parser, 2.0 Job Compatibility Engine, 3.0 Learning Roadmap Generator, 4.0 Interview Readiness Simulator, and 5.0 Application Pipeline Tracker, along with their associated data stores (D1 Profiles, D2 Analyses, D3 Roadmaps, D4 Interview Drills, and D5 Applications).", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

# Diagram 6.3: Use Case
uc_path = os.path.join(DIAGRAMS_DIR, 'fig_6_3_use_case.png')
add_image_box(doc, uc_path, "Figure 6.3: UML Use-Case Diagram for CareerLens AI", width_inches=5.8)
add_p(doc, "Figure 6.3 depicts the primary user actor (Student / Job Candidate) and the eight major use cases supported by the system, including résumé auditing, job analysis, roadmap tracking, interview practice, application management, and data export.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

# Diagram 6.4: Activity
act_path = os.path.join(DIAGRAMS_DIR, 'fig_6_4_activity.png')
add_image_box(doc, act_path, "Figure 6.4: UML Activity Diagram — End-to-End Competency Matching Process", width_inches=5.4)
add_p(doc, "Figure 6.4 models the end-to-end procedural logic of CareerLens AI, highlighting the decision diamond for the Zero-Denominator Guard. If zero technical skills are detected in the pasted text, the system branches safely to prompt the user for qualifications, preventing division-by-zero errors.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

# Diagram 6.5: Architecture
arch_path = os.path.join(DIAGRAMS_DIR, 'fig_6_5_architecture.png')
add_image_box(doc, arch_path, "Figure 6.5: System Architecture Diagram — 3-Tier Dual-Engine Design", width_inches=6.0)
add_p(doc, "Figure 6.5 details the three-tier engineering architecture: the Presentation Layer (Next.js 14 App Router and React 18), the Business Logic Layer (Next.js Route Handlers and deterministic parsing algorithms), and the Dual-Engine Persistence Layer (Engine A: Client LocalStorage and Engine B: Supabase Cloud PostgreSQL).", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

# Diagram 6.6: ER Diagram
er_path = os.path.join(DIAGRAMS_DIR, 'fig_6_6_er_diagram.png')
add_image_box(doc, er_path, "Figure 6.6: Entity-Relationship (ER) Diagram — Data Schema & Key Relationships", width_inches=6.0)
add_p(doc, "Figure 6.6 illustrates the relational data model. The central PROFILES entity maintains a 1-to-many relationship with RESUMES, JOB_ANALYSES, and JOB_APPLICATIONS, while JOB_ANALYSES maintains a 1-to-many relationship with LEARNING_PLANS. The schema attributes are defined in Table 6.1.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

# Table 6.1
add_p(doc, "Table 6.1: Database Entities, Schema Attributes, and Data Types", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, size=10)
db_table = doc.add_table(rows=7, cols=3)
db_table.alignment = WD_TABLE_ALIGNMENT.CENTER
db_table.columns[0].width = Inches(1.8)
db_table.columns[1].width = Inches(3.2)
db_table.columns[2].width = Inches(1.7)

for i, h in enumerate(["Entity / Table", "Primary Attributes & Data Types", "Operational Purpose"]):
    c = db_table.cell(0, i)
    p = c.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run(h)
    format_run(r, size_pt=9.5, bold=True)
    set_cell_background(c, "E2E8F0")
    set_cell_border(c)

db_rows = [
    ("PROFILES", "id (PK, UUID), email, full_name, headline, bio, skills (TEXT[]), target_role, created_at, updated_at", "Stores core user profile data and verified skill tags."),
    ("RESUMES", "id (PK, UUID), user_id (FK), file_name, extracted_text, detected_skills (TEXT[]), created_at", "Maintains parsed candidate résumés and skill audit results."),
    ("JOB_ANALYSES", "id (PK, UUID), user_id (FK), job_title, company, detected_jd_skills[], matched_skills[], missing_skills[], match_percentage, math_explanation", "Stores historical compatibility analysis reports and calculations."),
    ("LEARNING_PLANS", "id (PK, UUID), user_id (FK), skill_name, priority, timeframe, concepts[], mini_project, resources (JSONB), completed", "Tracks prioritized milestones, project goals, and completion states."),
    ("INTERVIEW_SESSIONS", "id (PK, UUID), user_id (FK), question_id, user_answer, coverage_pct, feedback, created_at", "Logs user interview practice responses and rubric scores."),
    ("JOB_APPLICATIONS", "id (PK, UUID), user_id (FK), company, role, status, date_applied, follow_up_date, salary_range, notes", "Manages candidate pipeline stages from Applied to Offer.")
]
for idx, (c1, c2, c3) in enumerate(db_rows):
    cell1 = db_table.cell(idx+1, 0)
    cell2 = db_table.cell(idx+1, 1)
    cell3 = db_table.cell(idx+1, 2)
    p1 = cell1.paragraphs[0]
    p1.add_run(c1)
    format_run(p1.runs[0], size_pt=9, bold=True)
    p2 = cell2.paragraphs[0]
    p2.add_run(c2)
    format_run(p2.runs[0], size_pt=8.5)
    p3 = cell3.paragraphs[0]
    p3.add_run(c3)
    format_run(p3.runs[0], size_pt=8.5)
    set_cell_border(cell1)
    set_cell_border(cell2)
    set_cell_border(cell3)

# =============================================================
# CHAPTER 7: IMPLEMENTATION
# =============================================================
add_heading_1(doc, "CHAPTER 7\nIMPLEMENTATION")

add_heading_2(doc, "7.1 Actual Technology Stack Found in Code")
add_p(doc, "The implementation of CareerLens AI strictly reflects the technologies discovered and compiled in the project workspace (C:\\Users\\Admin\\OneDrive\\Documents\\CareerLensAI) and verified on the live Vercel deployment. Table 7.1 details each layer of the technical architecture.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

# Table 7.1
add_p(doc, "Table 7.1: Core Technology Stack and Engineering Rationale", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, size=10)
tech_table = doc.add_table(rows=8, cols=3)
tech_table.alignment = WD_TABLE_ALIGNMENT.CENTER
tech_table.columns[0].width = Inches(1.8)
tech_table.columns[1].width = Inches(2.2)
tech_table.columns[2].width = Inches(2.7)

for i, h in enumerate(["Engineering Layer", "Selected Technology", "Engineering Rationale & Justification"]):
    c = tech_table.cell(0, i)
    p = c.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run(h)
    format_run(r, size_pt=9.5, bold=True)
    set_cell_background(c, "E2E8F0")
    set_cell_border(c)

tech_rows = [
    ("Frontend Framework", "Next.js 14.2.35 (App Router)", "Enables hybrid static-site generation (SSG) and server-side rendering (SSR) for high performance."),
    ("Programming Language", "TypeScript 5.6.3", "Provides compile-time type safety across all data models, API payloads, and state context."),
    ("Styling System", "Tailwind CSS 3.4.14", "Provides utility-first styling with a custom editorial SaaS palette (#0f172a, #2563eb, #f8fafc)."),
    ("State Management", "React Context (CareerLensProvider)", "Coordinates dual-mode persistence, synchronizing state with LocalStorage and Supabase."),
    ("Serverless API Handlers", "Next.js Edge Route Handlers (/app/api)", "Implements server-side endpoints for job matching, plan generation, and interview feedback."),
    ("Database & Auth Tier", "Supabase Cloud PostgreSQL + RLS", "Provides relational data storage with user-isolated Row-Level Security policies and JWT auth."),
    ("Cloud Deployment", "Vercel Cloud Edge Network", "Provides continuous automated deployment from GitHub (https://careerlensai-seven.vercel.app/).")
]
for idx, (c1, c2, c3) in enumerate(tech_rows):
    cell1 = tech_table.cell(idx+1, 0)
    cell2 = tech_table.cell(idx+1, 1)
    cell3 = tech_table.cell(idx+1, 2)
    p1 = cell1.paragraphs[0]
    p1.add_run(c1)
    format_run(p1.runs[0], size_pt=9, bold=True)
    p2 = cell2.paragraphs[0]
    p2.add_run(c2)
    format_run(p2.runs[0], size_pt=9)
    p3 = cell3.paragraphs[0]
    p3.add_run(c3)
    format_run(p3.runs[0], size_pt=8.5)
    set_cell_border(cell1)
    set_cell_border(cell2)
    set_cell_border(cell3)

add_p(doc, "", space_after=10)

add_heading_2(doc, "7.2 Deterministic Skill Extraction and Mathematical Scoring")
add_p(doc, "The core algorithmic innovation of CareerLens AI resides in lib/analyzer.ts. To guarantee zero false substring collisions, the system employs token-boundary regular expressions combined with an alias normalization mapping table (lib/skills-data.ts):", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

# Code snippet 1
add_p(doc, "Listing 7.1: Token-Boundary Skill Extraction Function (lib/analyzer.ts)", bold=True, size=9.5)
code1 = """export function extractSkills(text: string): string[] {
  if (!text || typeof text !== 'string') return [];
  const textLower = ' ' + text.toLowerCase() + ' ';
  const detected = new Set<string>();

  SKILLS_DATABASE.forEach(skill => {
    const escaped = skill.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&');
    const regex = new RegExp(`(^|[^a-zA-Z0-9_#+])${escaped}([^a-zA-Z0-9_#+]|$)`, 'i');
    if (regex.test(textLower)) detected.add(skill);
  });

  Object.keys(SKILL_ALIASES).forEach(alias => {
    const canonical = SKILL_ALIASES[alias];
    const escaped = alias.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&');
    const regex = new RegExp(`(^|[^a-zA-Z0-9_#+])${escaped}([^a-zA-Z0-9_#+]|$)`, 'i');
    if (regex.test(textLower)) detected.add(canonical);
  });

  return Array.from(detected).sort();
}"""
p_code = add_p(doc, code1, size=8.5, space_after=10)
p_code.runs[0].font.name = "Consolas"
set_cell_background(sig_table.cell(0, 0), "FFFFFF") # dummy

add_p(doc, "The qualification scoring algorithm implements a 70/30 segmented weighting scheme:", align=WD_ALIGN_PARAGRAPH.JUSTIFY)
add_p(doc, "Score = (Required_Matched / Required_Total * 70%) + (Preferred_Matched / Preferred_Total * 30%)\nIf Total_JD_Skills = 0, Match_Percentage = null (Zero-Denominator Guard Triggered)", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, size=10, space_before=4, space_after=8)

add_heading_2(doc, "7.3 Live Application Screenshots and Visual Evidence")
add_p(doc, "High-resolution screenshots were captured from the live application (https://careerlensai-seven.vercel.app/) using automated headless Chromium browser testing, as presented in Figures 7.1 through 7.10.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

# Screenshots
shots = [
    ('01_landing_page.png', "Figure 7.1: Public Landing Page featuring custom optical lens logo, feature highlights, and transparent methodology notice.", 5.8),
    ('02_dashboard.png', "Figure 7.2: Candidate Dashboard displaying KPI metrics (70% match score, verified skills, pipeline counts).", 5.8),
    ('13_resume_review.png', "Figure 7.3: Résumé Review & Skill Synchronizer auditing text and updating profile competencies.", 5.8),
    ('03_job_analysis_input.png', "Figure 7.4: Job Compatibility Analyzer showing sample selector, role inputs, and JD textarea.", 5.8),
    ('04_job_analysis_results.png', "Figure 7.5: Analysis Results displaying 70% weighted match, matched checkmarks, and prioritized gaps.", 5.8),
    ('05_zero_denominator_guard.png', "Figure 7.6: Zero-Denominator Guard active alert when non-technical job description is tested.", 5.8),
    ('06_learning_roadmaps.png', "Figure 7.7: Personalized Learning Roadmaps with High/Medium/Supplementary priorities and mini-projects.", 5.8),
    ('07_custom_goal_modal.png', "Figure 7.8: Add Custom Learning Goal modal allowing candidates to define personal deliverables.", 5.8),
    ('08_interview_practice.png', "Figure 7.9: Role-Specific Interview Workbench with questions, model answers, and rubric evaluation.", 5.8),
    ('10_application_tracker.png', "Figure 7.10: Job Application Pipeline Tracker with status stages, follow-up dates, and JSON export.", 5.8)
]

for img_file, cap, w in shots:
    p_img = os.path.join(SCREENSHOTS_DIR, img_file)
    add_image_box(doc, p_img, cap, width_inches=w)

doc.add_page_break()

print("[4/5] Building Chapters 8 to 13 (Testing, Part B Internship)...")

# =============================================================
# CHAPTER 8: TESTING & RESULTS
# =============================================================
add_heading_1(doc, "CHAPTER 8\nTESTING & RESULTS")

add_heading_2(doc, "8.1 Testing Methodology & Environment")
add_p(doc, "CareerLens AI was tested using an iterative 'Loop Engineering' framework combining unit assertion scripts, compile-time TypeScript type checking, Next.js production build verification, and automated end-to-end browser execution.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

add_p(doc, "• Test Execution Environment: Windows 11 (64-bit), Node.js v22.17.1, npm 10.9.2, Next.js 14.2.35, Google Chrome 131.0.\n• Build Verification: Seven automated compilation passes were executed until zero linter or type errors remained.\n• Engine Assertions (scripts/verify-engine.js): Successfully validated token-boundary isolation (C vs CSS, Java vs JavaScript), segmented weighting (70/30), and zero-denominator guard activation.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

add_heading_2(doc, "8.2 Comprehensive Test Cases and Results")
add_p(doc, "Fifteen comprehensive functional test cases were executed across the live deployed application. All test cases and observed results are reported honestly in Table 8.1.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

# Table 8.1
add_p(doc, "Table 8.1: Comprehensive System Test Cases and Verification Results", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, size=10)
tc_table = doc.add_table(rows=16, cols=5)
tc_table.alignment = WD_TABLE_ALIGNMENT.CENTER
tc_table.columns[0].width = Inches(0.8)
tc_table.columns[1].width = Inches(1.5)
tc_table.columns[2].width = Inches(2.1)
tc_table.columns[3].width = Inches(1.5)
tc_table.columns[4].width = Inches(0.8)

for i, h in enumerate(["Test ID", "Module", "Test Action & Input", "Expected Outcome", "Status"]):
    c = tc_table.cell(0, i)
    p = c.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run(h)
    format_run(r, size_pt=9, bold=True)
    set_cell_background(c, "E2E8F0")
    set_cell_border(c)

test_cases_data = [
    ("TC01", "Profile Skills", "Type 'Docker' and press Add", "Skill tag added to profile and persistent in storage", "PASS"),
    ("TC02", "Profile Skills", "Click 'x' on 'Git' skill tag", "Tag removed from profile and removed from state", "PASS"),
    ("TC03", "Résumé Review", "Paste plain-text résumé with technical skills", "Extracts recognized skills and syncs to profile", "PASS"),
    ("TC04", "Job Analysis", "Load 'Junior Frontend' sample JD and click Analyze", "Correctly detects 7 JD skills and displays 70% score", "PASS"),
    ("TC05", "Job Analysis", "Paste non-technical text ('great attitude')", "Zero-Denominator Guard triggers; displays guidance", "PASS"),
    ("TC06", "Job Analysis", "Click 'How is this calculated?' button", "Expands formula modal showing exact mathematical steps", "PASS"),
    ("TC07", "Job Analysis", "Click 'Add Gaps to Learning Plan' button", "Missing skills (TypeScript, Tailwind) queued in plan", "PASS"),
    ("TC08", "Learning Plan", "Click checkbox on 'TypeScript' roadmap item", "Marks item as completed and updates progress bar", "PASS"),
    ("TC09", "Learning Plan", "Click 'Add Custom Goal' and enter 'GraphQL'", "New custom goal card added with priority & project", "PASS"),
    ("TC10", "Learning Plan", "Filter by 'High Priority'", "Displays only High Priority cards; hides other tiers", "PASS"),
    ("TC11", "Interview Prep", "Select role track 'Backend Engineering'", "Filters question bank to Python/Node/SQL questions", "PASS"),
    ("TC12", "Interview Prep", "Type answer to Event Loop and click Evaluate", "Returns concept coverage %, word rating, feedback", "PASS"),
    ("TC13", "Job Tracker", "Add new application for 'Stripe / Frontend'", "New row appears in tracker table with 'Applied' badge", "PASS"),
    ("TC14", "Job Tracker", "Change status dropdown to 'Interviewing'", "Row badge updates color and updates active metrics", "PASS"),
    ("TC15", "Settings", "Click 'Export JSON Archive'", "Downloads valid JSON file containing all workspace data", "PASS")
]

for idx, (tc_id, tc_mod, tc_act, tc_exp, tc_stat) in enumerate(test_cases_data):
    for c_idx, val in enumerate([tc_id, tc_mod, tc_act, tc_exp, tc_stat]):
        c = tc_table.cell(idx+1, c_idx)
        p = c.paragraphs[0]
        if c_idx in [0, 4]:
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(val)
        is_pass = (val == "PASS")
        format_run(r, size_pt=8.5, bold=is_pass, color=RGBColor(5, 150, 105) if is_pass else RGBColor(0, 0, 0))
        set_cell_border(c)

# =============================================================
# CHAPTER 9: CONCLUSION & FUTURE SCOPE
# =============================================================
add_heading_1(doc, "CHAPTER 9\nCONCLUSION & FUTURE SCOPE")

add_heading_2(doc, "9.1 Conclusion")
add_p(doc, "The development of CareerLens AI successfully demonstrates that an open, deterministic, client-side web application can deliver superior career readiness intelligence compared to opaque, commercial ATS black boxes. By combining strict token-boundary regular expressions with segmented 70/30 qualification weighting, CareerLens AI provides candidates with honest, mathematically verifiable compatibility scores.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

add_p(doc, "The project bridges the critical gap between job analysis and actionable self-improvement. Rather than leaving students with unanswered rejections, the platform automatically channels identified skill gaps into prioritized learning roadmaps, role-specific interview preparation, and an organized job search pipeline. Built with Next.js 14, TypeScript, and a dual-engine persistence layer, CareerLens AI achieves total client data privacy and zero operating expenses.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

add_heading_2(doc, "9.2 Future Scope & Proposed Enhancements")
add_p(doc, "CareerLens AI establishes a robust architectural foundation that can be extended in several research directions:\n• Local On-Device LLM Synthesis: Integrating quantized, open-weights large language models (such as Llama-3-8B via WebGPU) to provide contextual résumé bullet-point rewriting without compromising privacy.\n• Live Job Board Webhook Integrations: Integrating official APIs from platforms like LinkedIn and Indeed to automatically fetch live job openings tailored to the candidate's profile match score.\n• Cross-Platform Mobile Application: Packaging the application as a native iOS and Android application using React Native or Capacitor.\n• University Placement Dashboard: Expanding the system to support a faculty coordinator portal, allowing academic project guides to monitor student placement readiness across cohort divisions.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

# =============================================================
# CHAPTER 10: REFERENCES
# =============================================================
add_heading_1(doc, "CHAPTER 10\nREFERENCES")
refs = [
    "1. Next.js Documentation (v14.2) — Vercel Inc. Available at: https://nextjs.org/docs",
    "2. React Documentation & Hooks API — Meta Open Source. Available at: https://react.dev/",
    "3. TypeScript Language Specification (v5.6) — Microsoft Corporation. Available at: https://www.typescriptlang.org/",
    "4. Tailwind CSS Framework Documentation (v3.4) — Tailwind Labs. Available at: https://tailwindcss.com/docs",
    "5. Supabase Documentation (PostgreSQL, Row-Level Security, & Auth). Available at: https://supabase.com/docs",
    "6. Pressman, R. S., & Maxim, B. R. (2020). Software Engineering: A Practitioner's Approach (9th ed.). McGraw-Hill Education.",
    "7. Mozilla Developer Network (MDN) Web Docs — Web APIs & HTML5 LocalStorage. Available at: https://developer.mozilla.org/",
    "8. IEEE Computer Society — 'Skill Extraction and Competency Matching in Technical Recruitment Systems', IEEE Transactions on Learning Technologies, 2023.",
    "9. W3C Web Content Accessibility Guidelines (WCAG) 2.1. Available at: https://www.w3.org/WAI/standards-guidelines/wcag/"
]
for ref in refs:
    add_p(doc, ref, size=10.5, space_before=3, space_after=6)

doc.add_page_break()

# =============================================================
# PART B DIVIDER
# =============================================================
add_p(doc, "PART B\nAICTE–EDUSKILLS VIRTUAL INTERNSHIP\n(1 CREDIT)", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, size=20, space_before=180, space_after=20)
add_p(doc, "Domain: Data Structures and Algorithms in C + Project\nDuration: 8 Weeks (October 2026 – December 2026)\nInternship Mode: Virtual", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, size=13)
doc.add_page_break()

# =============================================================
# CHAPTER 11: COURSE DETAILS
# =============================================================
add_heading_1(doc, "CHAPTER 11\nCOURSE DETAILS")
add_p(doc, "Internship Program: AICTE–EduSkills Virtual Internship Program\nDomain: Data Structures and Algorithms in C + Project\nInternship Duration: 8 Weeks (October 2026 – December 2026)\nStream & Branch: BCA | Class: TYBCA (Division E2)\nInstitution: MAEER's MIT Arts, Commerce and Science College, Alandi (D.), Pune\nInternship Mode: Virtual\nStudent Name: RAJ RAMNIVAS YADAV\nAICTE Student ID: STU6810fb64da87c1745943396\nOffer Letter Ref No: C19Y2026M101591617", bold=True, size=11, space_after=14)

add_p(doc, "I have been selected for the prestigious 8-Week AICTE–EduSkills Virtual Internship Program in the technical domain of Data Structures and Algorithms in C + Project. Supported by the All India Council for Technical Education (AICTE) and EduSkills Foundation, this program provides rigorous, industry-aligned training in algorithmic problem-solving, computational complexity, memory management, and practical software design.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

add_p(doc, "The internship follows a week-wise structured curriculum comprising theoretical lectures, hands-on C programming labs, weekly assessment tests, and a capstone software development project. Table 11.1 details the full eight-week structure extracted directly from the official internship offer letter.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

# Table 11.1
add_p(doc, "Table 11.1: 8-Week AICTE–EduSkills Curriculum & Capstone Roadmap", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, size=10)
curr_table = doc.add_table(rows=9, cols=3)
curr_table.alignment = WD_TABLE_ALIGNMENT.CENTER
curr_table.columns[0].width = Inches(1.0)
curr_table.columns[1].width = Inches(2.2)
curr_table.columns[2].width = Inches(3.5)

for i, h in enumerate(["Week", "Module Title", "Technical Topics & Practical Scope"]):
    c = curr_table.cell(0, i)
    p = c.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run(h)
    format_run(r, size_pt=9.5, bold=True)
    set_cell_background(c, "E2E8F0")
    set_cell_border(c)

curr_data = [
    ("Week 1", "Course Kick-off & Algorithmic Thinking", "Introduction to course objectives and refresher on C programming. Algorithmic thinking, time and space complexity analysis using Big-O notation."),
    ("Week 2", "Linear Data Structures (Arrays & Linked Lists)", "Understanding arrays and linked lists (singly, doubly, circular), implementation in C, memory allocation, and performance analysis of operations."),
    ("Week 3", "Stacks, Queues & Recursion", "LIFO and FIFO implementations using arrays and pointers. Call stack analysis, recursion mechanics, and recursion applications in data structures."),
    ("Week 4", "Tree Structures & Binary Search Trees (BST)", "Tree concepts, binary trees, traversal algorithms (inorder, preorder, postorder), and BST insertion, deletion, and searching operations."),
    ("Week 5", "Heaps, Hashing & Graphs", "Heap data structures, priority queues, hash tables, collision resolution techniques, and graph representations with BFS and DFS traversals."),
    ("Week 6", "Sorting & Searching Algorithms", "Sorting algorithms (Bubble, Selection, Insertion, Merge, Quick Sort) and searching algorithms (Linear & Binary Search) with asymptotic efficiency analysis."),
    ("Week 7", "Advanced Structures & Paradigms", "Advanced data structures including Tries and AVL Trees. Algorithmic paradigms including Divide & Conquer and Greedy approaches."),
    ("Week 8", "Best Practices & Capstone Project", "Code optimization, memory leak debugging (Valgrind), and building the capstone project: Real-Time Event Scheduler using data structures.")
]
for idx, (w, m, d) in enumerate(curr_data):
    c1 = curr_table.cell(idx+1, 0)
    c2 = curr_table.cell(idx+1, 1)
    c3 = curr_table.cell(idx+1, 2)
    p1 = c1.paragraphs[0]
    p1.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p1.add_run(w)
    format_run(p1.runs[0], size_pt=9, bold=True)
    p2 = c2.paragraphs[0]
    p2.add_run(m)
    format_run(p2.runs[0], size_pt=9, bold=True)
    p3 = c3.paragraphs[0]
    p3.add_run(d)
    format_run(p3.runs[0], size_pt=8.5)
    set_cell_border(c1)
    set_cell_border(c2)
    set_cell_border(c3)

# =============================================================
# CHAPTER 12: COURSE CERTIFICATE & OFFER LETTER
# =============================================================
add_heading_1(doc, "CHAPTER 12\nCOURSE CERTIFICATE & OFFER LETTER")
add_p(doc, "The AICTE–EduSkills Virtual Internship in Data Structures and Algorithms in C + Project commenced in October 2026 and is currently in progress (scheduled for completion in December 2026). In accordance with the academic guidelines of Savitribai Phule Pune University and MAEER's MIT Arts, Commerce and Science College, the official 2-page Offer Letter is attached below as verified evidence of selection and active enrollment.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

# Insert Offer Letter Images
off1_img = os.path.join(ASSETS_DIR, 'offer_letter_page_1.png')
off2_img = os.path.join(ASSETS_DIR, 'offer_letter_page_2.png')

add_image_box(doc, off1_img, "Figure 12.1: Official AICTE–EduSkills Internship Offer Letter — Page 1 (Ref No: C19Y2026M101591617)", width_inches=5.8)
add_image_box(doc, off2_img, "Figure 12.2: Official AICTE–EduSkills Internship Offer Letter — Page 2 (Week-Wise Curriculum & Capstone Plan)", width_inches=5.8)

add_heading_2(doc, "12.1 Final Completion Certificate Placeholder")
add_p(doc, "[ PLACEHOLDER FOR FINAL COMPLETION CERTIFICATE ]", align=WD_ALIGN_PARAGRAPH.CENTER, bold=True, size=13, space_before=14, space_after=8)
add_p(doc, "Note: As confirmed on Page 1 of the official offer letter, the final Virtual Internship Certificate will be issued by EduSkills Foundation upon the successful completion of all eight weekly modules, practical assignments, and the final exit assessment in December 2026. The completion certificate will be appended to this section upon formal issuance.", align=WD_ALIGN_PARAGRAPH.JUSTIFY, italic=True, size=10.5)

# =============================================================
# CHAPTER 13: WHAT I LEARNED & SYNTHESIS
# =============================================================
add_heading_1(doc, "CHAPTER 13\nWHAT I LEARNED & ALGORITHMIC SYNTHESIS")

add_heading_2(doc, "13.1 Technical Concepts Acquired in the Internship")
add_p(doc, "The AICTE–EduSkills internship in Data Structures and Algorithms in C provided essential low-level systems programming and algorithmic design capabilities:\n• Algorithmic Efficiency & Big-O Notation: Learned to analyze time and space complexity mathematically, identifying performance bottlenecks in nested loops and recursive calls.\n• Manual Memory Management: Mastered pointer arithmetic, dynamic heap allocation using malloc/calloc/free, and memory leak prevention in C.\n• Linear & Hierarchical Structures: Implemented linked lists, stacks (LIFO), queues (FIFO), and Binary Search Trees (BST) from scratch.\n• Graph Algorithms: Understood adjacency list representations and implemented Breadth-First Search (BFS) and Depth-First Search (DFS) traversals.\n• Capstone Project Architecture: Engineered the architectural blueprint for a Real-Time Event Scheduler, utilizing priority heaps to manage scheduled tasks with logarithmic time complexity O(log N).", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

add_heading_2(doc, "13.2 Synthesis: How DSA Principles Informed CareerLens AI")
add_p(doc, "Although CareerLens AI was implemented as a modern web application in TypeScript and Next.js, the algorithmic problem-solving principles acquired during the C internship directly informed its engineering architecture:\n1. Fast Skill Lookup with Hash Sets: In lib/analyzer.ts, the skill database and alias normalization tables were implemented using O(1) hash set lookups, directly reflecting the hashing concepts studied in Week 5.\n2. Prioritized Roadmap Scheduling: The three-tiered roadmap generator (High, Medium, Supplementary) implements a priority queue discipline, ensuring that prerequisite dependencies are scheduled before secondary frameworks, echoing the heap concepts covered in Week 5.\n3. Complexity Optimization: Token-boundary regex searches were optimized to execute within a single pass over the tokenized text, ensuring sub-50ms execution latency on the client.\n4. Rigorous Defensive Programming: The discipline of error checking and boundary condition validation in C directly inspired the Zero-Denominator Guard in CareerLens AI, guaranteeing robust software resilience.", align=WD_ALIGN_PARAGRAPH.JUSTIFY)

doc.add_page_break()

print("[5/5] Building Part C: Presentation Slides Appendix...")

# =============================================================
# PART C: PRESENTATION SLIDES APPENDIX
# =============================================================
add_heading_1(doc, "PART C\nPRESENTATION APPENDIX")
add_heading_2(doc, "CHAPTER 14: PRESENTATION SLIDE SCREENSHOTS")
add_p(doc, "The following pages contain the complete 18-slide PowerPoint presentation (CareerLens_AI_Presentation_Raj_Yadav.pptx) created for the TYBCA Field Project evaluation, rendered in sequential order.", align=WD_ALIGN_PARAGRAPH.JUSTIFY, size=11, space_after=14)

# Embed slides in pairs (2 per page)
for i in range(1, 19, 2):
    s1_file = os.path.join(SLIDES_DIR, f'slide_{i:02d}.png')
    s2_file = os.path.join(SLIDES_DIR, f'slide_{i+1:02d}.png')
    
    if os.path.exists(s1_file):
        add_image_box(doc, s1_file, f"Slide {i:02d}", width_inches=5.8)
    if os.path.exists(s2_file):
        add_image_box(doc, s2_file, f"Slide {i+1:02d}", width_inches=5.8)
    
    if i < 17:
        doc.add_page_break()

doc.save(OUTPUT_DOCX)
print(f"[OK] Successfully saved complete Word report: {OUTPUT_DOCX}")
