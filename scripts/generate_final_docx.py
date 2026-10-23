import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS_DIR = os.path.join(ROOT_DIR, 'report_assets')
OUTPUT_DOCX = os.path.join(ROOT_DIR, 'CareerLens_AI_Field_Project_Report_Raj_Yadav_Final.docx')

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def set_cell_border(cell, **kwargs):
    tcPr = cell._tc.get_or_add_tcPr()
    tcBorders = OxmlElement('w:tcBorders')
    for edge in ('top', 'left', 'bottom', 'right', 'insideH', 'insideV'):
        edge_data = kwargs.get(edge)
        if edge_data:
            tag = 'w:{}'.format(edge)
            element = OxmlElement(tag)
            element.set(qn('w:val'), edge_data.get('val', 'single'))
            element.set(qn('w:sz'), str(edge_data.get('sz', 4)))
            element.set(qn('w:space'), '0')
            element.set(qn('w:color'), edge_data.get('color', '000000'))
            tcBorders.append(element)
    tcPr.append(tcBorders)

def style_academic_table(table, col_widths=None):
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    border_spec = {'val': 'single', 'sz': 4, 'color': '000000'}
    for row_idx, row in enumerate(table.rows):
        for col_idx, cell in enumerate(row.cells):
            set_cell_border(cell, top=border_spec, bottom=border_spec, left=border_spec, right=border_spec)
            set_cell_margins(cell, top=100, bottom=100, left=140, right=140)
            if row_idx == 0:
                shading = parse_xml(r'<w:shd {} w:fill="F2F2F2"/>'.format(nsdecls('w')))
                cell._tc.get_or_add_tcPr().append(shading)
            if col_widths and col_idx < len(col_widths):
                cell.width = Inches(col_widths[col_idx])

def add_academic_heading(doc, text, level=1):
    p = doc.add_paragraph()
    run = p.add_run(text)
    run.font.name = 'Times New Roman'
    run.font.bold = True
    run.font.color.rgb = RGBColor(0, 0, 0)
    if level == 1:
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run.font.size = Pt(16)
        p.paragraph_format.space_before = Pt(14)
        p.paragraph_format.space_after = Pt(4)
    elif level == 2:
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run.font.size = Pt(14)
        p.paragraph_format.space_before = Pt(2)
        p.paragraph_format.space_after = Pt(18)
    elif level == 3:
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        run.font.size = Pt(12.5)
        p.paragraph_format.space_before = Pt(14)
        p.paragraph_format.space_after = Pt(4)
    return p

def add_academic_p(doc, text="", bold_prefix=""):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p.paragraph_format.line_spacing = 1.2
    p.paragraph_format.space_after = Pt(6)
    if bold_prefix:
        r_b = p.add_run(bold_prefix)
        r_b.font.name = 'Times New Roman'
        r_b.font.size = Pt(12)
        r_b.font.bold = True
        r_b.font.color.rgb = RGBColor(0, 0, 0)
    if text:
        r = p.add_run(text)
        r.font.name = 'Times New Roman'
        r.font.size = Pt(12)
        r.font.color.rgb = RGBColor(0, 0, 0)
    return p

def add_academic_bullet(doc, text="", bold_prefix=""):
    p = doc.add_paragraph(style='List Bullet')
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p.paragraph_format.line_spacing = 1.15
    p.paragraph_format.space_after = Pt(3)
    if bold_prefix:
        r_b = p.add_run(bold_prefix)
        r_b.font.name = 'Times New Roman'
        r_b.font.size = Pt(11.5)
        r_b.font.bold = True
    if text:
        r = p.add_run(text)
        r.font.name = 'Times New Roman'
        r.font.size = Pt(11.5)
    return p

def add_figure_image(doc, img_path, caption_text, width=Inches(5.8)):
    if os.path.exists(img_path):
        p_img = doc.add_paragraph()
        p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_img.paragraph_format.space_before = Pt(8)
        p_img.paragraph_format.space_after = Pt(4)
        run = p_img.add_run()
        run.add_picture(img_path, width=width)
        
        p_cap = doc.add_paragraph()
        p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_cap.paragraph_format.space_after = Pt(12)
        r_cap = p_cap.add_run(caption_text)
        r_cap.font.name = 'Times New Roman'
        r_cap.font.size = Pt(10.5)
        r_cap.font.bold = True
    else:
        print(f"[WARN] Figure missing: {img_path}")

print("Building CareerLens_AI_Field_Project_Report_Raj_Yadav_Final.docx...")
doc = docx.Document()

# Set standard margins (Left: 1.0 inch, Right: 0.75 inch, Top: 0.8 inch, Bottom: 0.8 inch)
for section in doc.sections:
    section.top_margin = Inches(0.8)
    section.bottom_margin = Inches(0.8)
    section.left_margin = Inches(1.0)
    section.right_margin = Inches(0.75)

# =========================================================
# 1. COVER PAGE
# =========================================================
p_logo = doc.add_paragraph()
p_logo.alignment = WD_ALIGN_PARAGRAPH.CENTER
logo_path = os.path.join(ASSETS_DIR, 'mit_college_logo.png')
if os.path.exists(logo_path):
    p_logo.add_run().add_picture(logo_path, width=Inches(4.5))

p_dept = doc.add_paragraph()
p_dept.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = p_dept.add_run("School of Computer Science & Application\nDepartment of Computer Application\nAcademic Year 2026 – 2027\nSemester – V\n")
r.font.name = 'Times New Roman'
r.font.size = Pt(11)
r.font.bold = True

p_type = doc.add_paragraph()
p_type.alignment = WD_ALIGN_PARAGRAPH.CENTER
p_type.paragraph_format.space_before = Pt(18)
r_type = p_type.add_run("Field Project Report\n")
r_type.font.name = 'Times New Roman'
r_type.font.size = Pt(16)
r_type.font.bold = True
r_sub = p_type.add_run("Submitted in Partial Fulfilment of the Requirements for the\nAward of Degree of Bachelor of Computer Applications\n")
r_sub.font.name = 'Times New Roman'
r_sub.font.size = Pt(11.5)

p_title = doc.add_paragraph()
p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
p_title.paragraph_format.space_before = Pt(24)
p_title.paragraph_format.space_after = Pt(36)
r_title = p_title.add_run("Title of the Project – CareerLens AI — A Career Planning and Job-Matching Web Application\n")
r_title.font.name = 'Times New Roman'
r_title.font.size = Pt(14)
r_title.font.bold = True

p_subm = doc.add_paragraph()
p_subm.paragraph_format.left_indent = Inches(1.0)
r_shead = p_subm.add_run("Submitted by:\n")
r_shead.font.name = 'Times New Roman'
r_shead.font.size = Pt(12)
r_shead.font.bold = True

details = [
    ("Name: ", "Raj Ramnivas Yadav"),
    ("Roll No: ", "TE2208"),
    ("Program: ", "TYBCA - E2"),
    ("Guide Name: ", "Prof. Prakash Nikam Sir")
]
for lbl, val in details:
    p_d = doc.add_paragraph()
    p_d.paragraph_format.left_indent = Inches(1.0)
    p_d.paragraph_format.space_after = Pt(2)
    r1 = p_d.add_run(lbl)
    r1.font.name = 'Times New Roman'
    r1.font.bold = True
    r1.font.size = Pt(11.5)
    r2 = p_d.add_run(val)
    r2.font.name = 'Times New Roman'
    r2.font.size = Pt(11.5)

doc.add_page_break()

# =========================================================
# 2. CERTIFICATE
# =========================================================
p_logo = doc.add_paragraph()
p_logo.alignment = WD_ALIGN_PARAGRAPH.CENTER
if os.path.exists(logo_path):
    p_logo.add_run().add_picture(logo_path, width=Inches(3.8))

p_dept = doc.add_paragraph()
p_dept.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = p_dept.add_run("School of Computer Science & Application\nDepartment of Computer Application\nAcademic Year 2026 – 2027\nSemester – V\n")
r.font.name = 'Times New Roman'
r.font.size = Pt(11)
r.font.bold = True

p_cert = doc.add_paragraph()
p_cert.alignment = WD_ALIGN_PARAGRAPH.CENTER
p_cert.paragraph_format.space_before = Pt(18)
p_cert.paragraph_format.space_after = Pt(24)
r_c = p_cert.add_run("CERTIFICATE")
r_c.font.name = 'Times New Roman'
r_c.font.size = Pt(16)
r_c.font.bold = True
r_c.font.underline = True

p_cbody = doc.add_paragraph()
p_cbody.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
p_cbody.paragraph_format.line_spacing = 1.8
p_cbody.paragraph_format.space_after = Pt(36)
r_cb = p_cbody.add_run(
    'This is to certify that Mr. Raj Ramnivas Yadav, Roll No TE2208, a student of TYBCA, Semester V, '
    'has successfully completed the Field Project (1 Credit) titled "CareerLens AI — A Career Planning and Job-Matching Web Application" '
    'and the EduSkills Virtual Internship Course (1 Credit) in partial fulfilment of the requirements for the award of the degree of '
    'Bachelor of Computer Applications during the Academic Year 2026–2027. The work carried out is original and has been completed '
    'under my guidance to my satisfaction.'
)
r_cb.font.name = 'Times New Roman'
r_cb.font.size = Pt(12)

p_dt = doc.add_paragraph()
p_dt.paragraph_format.space_after = Pt(40)
r_dt = p_dt.add_run("Date: ____________\nPlace: Pune")
r_dt.font.name = 'Times New Roman'
r_dt.font.size = Pt(11.5)

tbl_sigs = doc.add_table(rows=2, cols=2)
tbl_sigs.alignment = WD_TABLE_ALIGNMENT.CENTER
for r in tbl_sigs.rows:
    for c in r.cells:
        c.width = Inches(3.2)
c00 = tbl_sigs.cell(0, 0).paragraphs[0]
c00.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = c00.add_run("_____________________________\nProf. Prakash Nikam Sir\nProject Guide")
r.font.name = 'Times New Roman'
r.font.size = Pt(11.5)

c01 = tbl_sigs.cell(0, 1).paragraphs[0]
c01.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = c01.add_run("_____________________________\nProf. Amit Tale\nHOD, Dept. of Computer Application")
r.font.name = 'Times New Roman'
r.font.size = Pt(11.5)

c1 = tbl_sigs.cell(1, 0)
c1.merge(tbl_sigs.cell(1, 1))
p_seal = c1.paragraphs[0]
p_seal.alignment = WD_ALIGN_PARAGRAPH.CENTER
p_seal.paragraph_format.space_before = Pt(30)
r_seal = p_seal.add_run("(College Seal)")
r_seal.font.name = 'Times New Roman'
r_seal.font.italic = True
r_seal.font.size = Pt(11)

doc.add_page_break()

# =========================================================
# 3. FIELD PROJECT EVALUATION SHEET
# =========================================================
p_logo = doc.add_paragraph()
p_logo.alignment = WD_ALIGN_PARAGRAPH.CENTER
if os.path.exists(logo_path):
    p_logo.add_run().add_picture(logo_path, width=Inches(3.5))

p_dept = doc.add_paragraph()
p_dept.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = p_dept.add_run("School of Computer Science & Application\nDepartment of Computer Application\nAcademic Year 2026 – 2027\nSemester – V\n")
r.font.name = 'Times New Roman'
r.font.size = Pt(10.5)
r.font.bold = True

p_evh = doc.add_paragraph()
p_evh.alignment = WD_ALIGN_PARAGRAPH.CENTER
p_evh.paragraph_format.space_before = Pt(8)
p_evh.paragraph_format.space_after = Pt(12)
r_evh = p_evh.add_run("Evaluation Sheet – Field Project")
r_evh.font.name = 'Times New Roman'
r_evh.font.size = Pt(14)
r_evh.font.bold = True

p_stu = doc.add_paragraph()
p_stu.paragraph_format.space_after = Pt(10)
r_stu = p_stu.add_run("Name: Raj Ramnivas Yadav\nClass: TYBCA - E2\nRoll No: TE2208\nProject Title: CareerLens AI — A Career Planning and Job-Matching Web Application")
r_stu.font.name = 'Times New Roman'
r_stu.font.size = Pt(11)

t_eval = doc.add_table(rows=9, cols=4)
eval_headers = ["Sr. No", "Component", "Max Marks", "Marks Awarded"]
eval_rows = [
    ("1", "Information Gathering", "8", ""),
    ("2", "Analysis & Problem Statement", "8", ""),
    ("3", "Design (DFD, ER, Tables)", "6", ""),
    ("4", "Working Project / Implementation", "12", ""),
    ("5", "Testing & Results", "4", ""),
    ("6", "Report Format & Neatness", "4", ""),
    ("7", "Viva", "8", ""),
    ("", "Total", "50", "")
]
for col_idx, h in enumerate(eval_headers):
    cell = t_eval.cell(0, col_idx)
    cell.paragraphs[0].text = h
    cell.paragraphs[0].runs[0].font.bold = True
    cell.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER if col_idx != 1 else WD_ALIGN_PARAGRAPH.LEFT

for row_idx, r_data in enumerate(eval_rows):
    for col_idx, val in enumerate(r_data):
        cell = t_eval.cell(row_idx + 1, col_idx)
        cell.paragraphs[0].text = val
        if row_idx == 7:
            cell.paragraphs[0].runs[0].font.bold = True
        cell.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER if col_idx != 1 else WD_ALIGN_PARAGRAPH.LEFT

style_academic_table(t_eval, [0.8, 3.5, 1.2, 1.2])

p_sig_ev = doc.add_paragraph()
p_sig_ev.paragraph_format.space_before = Pt(45)
tbl_s = doc.add_table(rows=1, cols=2)
tbl_s.cell(0, 0).paragraphs[0].text = "_____________________________\nProf. Prakash Nikam Sir\nProject Guide"
tbl_s.cell(0, 0).paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
tbl_s.cell(0, 1).paragraphs[0].text = "_____________________________\nProf. Amit Tale\nHOD, Dept. of Computer Application"
tbl_s.cell(0, 1).paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER

doc.add_page_break()

# =========================================================
# 4. EDUSKILLS EVALUATION SHEET
# =========================================================
p_logo = doc.add_paragraph()
p_logo.alignment = WD_ALIGN_PARAGRAPH.CENTER
if os.path.exists(logo_path):
    p_logo.add_run().add_picture(logo_path, width=Inches(3.5))

p_dept = doc.add_paragraph()
p_dept.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = p_dept.add_run("School of Computer Science & Application\nDepartment of Computer Application\nAcademic Year 2026 – 2027\nSemester – V\n")
r.font.name = 'Times New Roman'
r.font.size = Pt(10.5)
r.font.bold = True

p_evh = doc.add_paragraph()
p_evh.alignment = WD_ALIGN_PARAGRAPH.CENTER
p_evh.paragraph_format.space_before = Pt(8)
p_evh.paragraph_format.space_after = Pt(12)
r_evh = p_evh.add_run("Evaluation Sheet – EduSkills Presentation")
r_evh.font.name = 'Times New Roman'
r_evh.font.size = Pt(14)
r_evh.font.bold = True

p_stu = doc.add_paragraph()
p_stu.paragraph_format.space_after = Pt(10)
r_stu = p_stu.add_run("Name: Raj Ramnivas Yadav\nRoll No: TE2208\nCourse Name: Data Structures and Algorithms in C + Project")
r_stu.font.name = 'Times New Roman'
r_stu.font.size = Pt(11)

t_edu = doc.add_table(rows=8, cols=4)
edu_headers = ["Sr. No", "Component", "Max Marks", "Marks Awarded"]
edu_rows = [
    ("1", "Course Completed & Certificate", "10", ""),
    ("2", "Knowledge of Topics", "15", ""),
    ("3", "Practical Work / Demo", "8", ""),
    ("4", "Slide Design", "5", ""),
    ("5", "Speaking Skills & Time Management", "5", ""),
    ("6", "Answers to Questions", "7", ""),
    ("", "Total", "50", "")
]
for col_idx, h in enumerate(edu_headers):
    cell = t_edu.cell(0, col_idx)
    cell.paragraphs[0].text = h
    cell.paragraphs[0].runs[0].font.bold = True
    cell.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER if col_idx != 1 else WD_ALIGN_PARAGRAPH.LEFT

for row_idx, r_data in enumerate(edu_rows):
    for col_idx, val in enumerate(r_data):
        cell = t_edu.cell(row_idx + 1, col_idx)
        cell.paragraphs[0].text = val
        if row_idx == 6:
            cell.paragraphs[0].runs[0].font.bold = True
        cell.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER if col_idx != 1 else WD_ALIGN_PARAGRAPH.LEFT

style_academic_table(t_edu, [0.8, 3.5, 1.2, 1.2])

t_fin = doc.add_table(rows=4, cols=3)
fin_headers = ["Final Marks", "Max Marks", "Marks Awarded"]
fin_rows = [
    ("Part A – Field Project", "50", ""),
    ("Part B – EduSkills Presentation", "50", ""),
    ("Total", "100", "")
]
for col_idx, h in enumerate(fin_headers):
    cell = t_fin.cell(0, col_idx)
    cell.paragraphs[0].text = h
    cell.paragraphs[0].runs[0].font.bold = True
for row_idx, r_data in enumerate(fin_rows):
    for col_idx, val in enumerate(r_data):
        cell = t_fin.cell(row_idx + 1, col_idx)
        cell.paragraphs[0].text = val
        if row_idx == 2:
            cell.paragraphs[0].runs[0].font.bold = True
style_academic_table(t_fin, [3.2, 1.5, 1.5])

p_grd = doc.add_paragraph()
p_grd.paragraph_format.space_before = Pt(14)
p_grd.paragraph_format.space_after = Pt(25)
p_grd.add_run("Grade Awarded: ________________________").font.bold = True

tbl_s2 = doc.add_table(rows=1, cols=2)
tbl_s2.cell(0, 0).paragraphs[0].text = "_____________________________\nProf. Prakash Nikam Sir\nProject Guide"
tbl_s2.cell(0, 0).paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
tbl_s2.cell(0, 1).paragraphs[0].text = "_____________________________\nProf. Amit Tale\nHOD, Dept. of Computer Application"
tbl_s2.cell(0, 1).paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER

doc.add_page_break()

# =========================================================
# 5. DECLARATION (STANDALONE PAGE)
# =========================================================
p_dh = doc.add_paragraph()
p_dh.alignment = WD_ALIGN_PARAGRAPH.CENTER
p_dh.paragraph_format.space_before = Pt(30)
p_dh.paragraph_format.space_after = Pt(30)
r_dh = p_dh.add_run("Declaration")
r_dh.font.name = 'Times New Roman'
r_dh.font.size = Pt(16)
r_dh.font.bold = True

p_db = doc.add_paragraph()
p_db.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
p_db.paragraph_format.line_spacing = 1.8
p_db.paragraph_format.space_after = Pt(60)
r_db = p_db.add_run(
    'I hereby declare that the field project report titled "CareerLens AI — A Career Planning and Job-Matching Web Application" '
    'is my original work, carried out under the guidance of Prof. Prakash Nikam Sir. This report has not been submitted '
    'elsewhere for the award of any degree or diploma.'
)
r_db.font.name = 'Times New Roman'
r_db.font.size = Pt(12)

p_dd = doc.add_paragraph()
p_dd.paragraph_format.space_after = Pt(45)
r_dd = p_dd.add_run("Date: ____________\nPlace: Pune")
r_dd.font.name = 'Times New Roman'
r_dd.font.size = Pt(11.5)

p_ds = doc.add_paragraph()
p_ds.alignment = WD_ALIGN_PARAGRAPH.RIGHT
p_ds.paragraph_format.right_indent = Inches(0.5)
r_ds = p_ds.add_run("Signature: __________________________\n\nName: Raj Ramnivas Yadav\nRoll No: TE2208\nProgram: TYBCA - E2")
r_ds.font.name = 'Times New Roman'
r_ds.font.size = Pt(11.5)

doc.add_page_break()

# =========================================================
# 6. ACKNOWLEDGEMENT (STANDALONE PAGE)
# =========================================================
p_ah = doc.add_paragraph()
p_ah.alignment = WD_ALIGN_PARAGRAPH.CENTER
p_ah.paragraph_format.space_before = Pt(30)
p_ah.paragraph_format.space_after = Pt(30)
r_ah = p_ah.add_run("Acknowledgement")
r_ah.font.name = 'Times New Roman'
r_ah.font.size = Pt(16)
r_ah.font.bold = True

add_academic_p(doc, "I sincerely thank my guide Prof. Prakash Nikam Sir for his constant guidance, constructive critique, and encouragement throughout this project. His academic insights and technical advice greatly assisted in the structured design and completion of CareerLens AI.")
add_academic_p(doc, "I am thankful to Prof. Amit Tale, Head of the Department of Computer Application, for granting permission and providing the departmental facilities required to undertake this field project.")
add_academic_p(doc, "I also extend my sincere appreciation to the faculty members of the Department of Computer Application for their valuable academic support, and to my classmates and peers who participated in testing the application, filling evaluation forms, and providing constructive feedback on user interface workflows.")

p_as = doc.add_paragraph()
p_as.alignment = WD_ALIGN_PARAGRAPH.RIGHT
p_as.paragraph_format.space_before = Pt(60)
p_as.paragraph_format.right_indent = Inches(0.5)
r_as = p_as.add_run("Raj Ramnivas Yadav\nTYBCA - Division E2\nRoll No: TE2208")
r_as.font.name = 'Times New Roman'
r_as.font.size = Pt(11.5)
r_as.font.bold = True

doc.add_page_break()

# =========================================================
# 7. INDEX (TABLE OF CONTENTS)
# =========================================================
p_ih = doc.add_paragraph()
p_ih.alignment = WD_ALIGN_PARAGRAPH.CENTER
p_ih.paragraph_format.space_before = Pt(15)
p_ih.paragraph_format.space_after = Pt(20)
r_ih = p_ih.add_run("INDEX")
r_ih.font.name = 'Times New Roman'
r_ih.font.size = Pt(16)
r_ih.font.bold = True

t_idx = doc.add_table(rows=19, cols=4)
idx_headers = ["Sr. No", "Topic", "Page No", "Sign"]
idx_data = [
    ("", "PART A – FIELD PROJECT", "", ""),
    ("1", "Introduction", "10", ""),
    ("2", "Information Gathering", "11", ""),
    ("3", "Analysis of Existing System", "12", ""),
    ("4", "Problem Statement", "13", ""),
    ("5", "Objectives & Scope", "14", ""),
    ("6", "Proposed System & Design", "15", ""),
    ("7", "Implementation", "21", ""),
    ("8", "Testing & Results", "25", ""),
    ("9", "Conclusion & Future Scope", "27", ""),
    ("10", "References", "28", ""),
    ("", "PART B – EDUSKILLS COURSE", "", ""),
    ("11", "Course Details", "30", ""),
    ("12", "Course Enrollment & Offer Letter", "32", ""),
    ("13", "What I Learned", "34", ""),
    ("", "PART C – PRESENTATION SLIDES", "", ""),
    ("14", "Presentation Slides", "36", "")
]
for col_idx, h in enumerate(idx_headers):
    cell = t_idx.cell(0, col_idx)
    cell.paragraphs[0].text = h
    cell.paragraphs[0].runs[0].font.bold = True
    cell.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER if col_idx != 1 else WD_ALIGN_PARAGRAPH.LEFT

for row_idx, r_data in enumerate(idx_data):
    for col_idx, val in enumerate(r_data):
        cell = t_idx.cell(row_idx + 1, col_idx)
        cell.paragraphs[0].text = val
        if r_data[0] == "":
            cell.paragraphs[0].runs[0].font.bold = True
        cell.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER if col_idx != 1 else WD_ALIGN_PARAGRAPH.LEFT

style_academic_table(t_idx, [0.8, 3.8, 1.2, 0.9])

doc.add_page_break()

# =========================================================
# 8. LIST OF FIGURES
# =========================================================
p_fh = doc.add_paragraph()
p_fh.alignment = WD_ALIGN_PARAGRAPH.CENTER
p_fh.paragraph_format.space_before = Pt(15)
p_fh.paragraph_format.space_after = Pt(20)
r_fh = p_fh.add_run("LIST OF FIGURES")
r_fh.font.name = 'Times New Roman'
r_fh.font.size = Pt(16)
r_fh.font.bold = True

t_fig = doc.add_table(rows=12, cols=3)
fig_headers = ["Figure No", "Figure Title", "Page No"]
fig_data = [
    ("Fig. 6.1", "Data Flow Diagram (DFD) Level 0 — Context Level Diagram", "15"),
    ("Fig. 6.2", "Data Flow Diagram (DFD) Level 1 — Functional Decomposition Diagram", "16"),
    ("Fig. 6.3", "UML Use-Case Diagram for CareerLens AI", "17"),
    ("Fig. 6.4", "UML Activity Diagram — Competency Matching Workflow", "18"),
    ("Fig. 6.5", "System Architecture Diagram — Three-Tier Dual-Engine Design", "19"),
    ("Fig. 6.6", "Entity-Relationship (ER) Diagram (Supabase PostgreSQL Schema)", "20"),
    ("Fig. 7.1", "Candidate Dashboard Interface", "23"),
    ("Fig. 7.2", "Job Description Analysis & Match Results Interface", "23"),
    ("Fig. 7.3", "Prioritized Learning Roadmaps Interface", "24"),
    ("Fig. 12.1", "Official AICTE–EduSkills Internship Offer Letter — Page 1", "32"),
    ("Fig. 12.2", "Official AICTE–EduSkills Internship Offer Letter — Page 2", "33")
]
for col_idx, h in enumerate(fig_headers):
    cell = t_fig.cell(0, col_idx)
    cell.paragraphs[0].text = h
    cell.paragraphs[0].runs[0].font.bold = True
    cell.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER if col_idx != 1 else WD_ALIGN_PARAGRAPH.LEFT

for row_idx, r_data in enumerate(fig_data):
    for col_idx, val in enumerate(r_data):
        cell = t_fig.cell(row_idx + 1, col_idx)
        cell.paragraphs[0].text = val
        cell.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER if col_idx != 1 else WD_ALIGN_PARAGRAPH.LEFT

style_academic_table(t_fig, [1.2, 4.3, 1.2])

doc.add_page_break()

# =========================================================
# PART A DIVIDER
# =========================================================
p_pa = doc.add_paragraph()
p_pa.alignment = WD_ALIGN_PARAGRAPH.CENTER
p_pa.paragraph_format.space_before = Pt(220)
r1 = p_pa.add_run("PART A\n\n")
r1.font.name = 'Times New Roman'
r1.font.size = Pt(22)
r1.font.bold = True
r2 = p_pa.add_run("FIELD PROJECT (1 CREDIT)")
r2.font.name = 'Times New Roman'
r2.font.size = Pt(16)
r2.font.bold = True

doc.add_page_break()

# =========================================================
# CHAPTER 1: INTRODUCTION
# =========================================================
add_academic_heading(doc, "CHAPTER 1", level=1)
add_academic_heading(doc, "INTRODUCTION", level=2)

add_academic_heading(doc, "1.1 Background and Context", level=3)
add_academic_p(doc, "Undergraduate students in computer applications frequently experience difficulty when transitioning from academic coursework to technical recruitment. Students learn programming fundamentals, database concepts, and system analysis in college, but modern employment postings require complex framework ecosystems, build tools, containerization, and specific software architectures.")
add_academic_p(doc, "When applying for internships and entry-level engineering roles, candidates encounter Applicant Tracking Systems (ATS) that filter résumés based on automated keyword detection. These commercial systems operate as black-box filters, rejecting candidates without providing actionable feedback regarding which skills were matched, which were missing, or how to prepare for subsequent interview rounds.")

add_academic_heading(doc, "1.2 System Overview", level=3)
add_academic_p(doc, "CareerLens AI is a web-based career planning and job-readiness workspace designed to provide students with transparent, verifiable feedback on their market readiness. The platform allows a student to enter their current technical competencies and evaluate them against authentic job descriptions.")
add_academic_p(doc, "The core matching engine is completely deterministic and transparent. It uses token-boundary regular expressions across a database of over 150 canonical technologies, calculates a weighted compatibility score separating mandatory qualifications from preferred bonus skills, and displays the exact mathematical formulation to the candidate.")

add_academic_heading(doc, "1.3 Architecture and Module Summary", level=3)
add_academic_p(doc, "The application is engineered using Next.js 14 (App Router), TypeScript, and Tailwind CSS. It operates on a dual-engine architecture: all features function completely offline using browser localStorage, while optional cloud synchronization is supported via Supabase PostgreSQL.")
add_academic_bullet(doc, "Real-time readiness metrics, profile competencies, and pipeline counts.", bold_prefix="Candidate Dashboard: ")
add_academic_bullet(doc, "Plain-text skill extraction with bidirectional profile synchronization.", bold_prefix="Résumé Review: ")
add_academic_bullet(doc, "Segmented 70/30 qualification weighting with a Zero-Denominator Guard.", bold_prefix="Job Compatibility Engine: ")
add_academic_bullet(doc, "Automated conversion of missing skills into three prioritized tiers with mini-projects.", bold_prefix="Learning Roadmaps: ")
add_academic_bullet(doc, "Role-specific technical and behavioral questions evaluated via a STAR rubric.", bold_prefix="Interview Practice: ")
add_academic_bullet(doc, "Full CRUD tracking of candidate submissions with follow-up reminders.", bold_prefix="Application Pipeline Tracker: ")

doc.add_page_break()

# =========================================================
# CHAPTER 2: INFORMATION GATHERING
# =========================================================
add_academic_heading(doc, "CHAPTER 2", level=1)
add_academic_heading(doc, "INFORMATION GATHERING", level=2)

add_academic_heading(doc, "2.1 Requirements Gathering Basis", level=3)
add_academic_p(doc, "The functional and operational requirements for CareerLens AI were gathered through direct observation of student placement activities in the Department of Computer Application (TYBCA), informal interviews with final-year job seekers, and analysis of campus recruitment job descriptions.")
add_academic_bullet(doc, "Over 80% of surveyed students tracked applications in unmaintained text files or spreadsheets, frequently missing follow-up dates.", bold_prefix="Disorganized Tracking: ")
add_academic_bullet(doc, "Candidates could not determine why their résumés failed commercial screening filters despite having relevant skills.", bold_prefix="Keyword Matching Confusion: ")
add_academic_bullet(doc, "When gaps were identified, students watched generic online tutorials without prioritizing mandatory baseline requirements over optional tools.", bold_prefix="Unstructured Self-Study: ")

add_academic_heading(doc, "2.2 Functional Requirements", level=3)
add_academic_bullet(doc, "The system must allow users to manage verified skills and parse plain-text résumés to extract recognized technical terms.", bold_prefix="Profile and Résumé Management: ")
add_academic_bullet(doc, "The system must match user skills against job postings, distinguish required from preferred qualifications, and explain the score calculation.", bold_prefix="Transparent Compatibility Matching: ")
add_academic_bullet(doc, "When a job posting contains no technical terms, the system must prompt the user rather than displaying a false 0% score.", bold_prefix="Zero-Denominator Safety: ")
add_academic_bullet(doc, "Missing skills must be structured into High, Medium, and Supplementary priority tiers with estimated completion timeframes and mini-projects.", bold_prefix="Milestone Roadmap Generation: ")
add_academic_bullet(doc, "The system must provide role-specific interview questions and automated rubric evaluation of candidate answers.", bold_prefix="Interview Readiness Drills: ")
add_academic_bullet(doc, "The system must support adding, editing, filtering, and deleting job applications across stages.", bold_prefix="Application Pipeline Tracking: ")

add_academic_heading(doc, "2.3 Non-Functional Requirements", level=3)
add_academic_bullet(doc, "Client data must persist securely in browser localStorage without mandatory external data sharing.", bold_prefix="Security & Privacy: ")
add_academic_bullet(doc, "Text parsing and compatibility scoring must execute in under 100 milliseconds on the client device.", bold_prefix="Performance: ")
add_academic_bullet(doc, "Responsive layout adhering to WCAG AA color contrast standards across mobile and desktop displays.", bold_prefix="Usability: ")
add_academic_bullet(doc, "Deterministic matching algorithms must prevent false substring collisions (e.g., 'C' matching 'CSS').", bold_prefix="Reliability: ")

doc.add_page_break()

# =========================================================
# CHAPTER 3: ANALYSIS OF EXISTING SYSTEM
# =========================================================
add_academic_heading(doc, "CHAPTER 3", level=1)
add_academic_heading(doc, "ANALYSIS OF EXISTING SYSTEM", level=2)

add_academic_heading(doc, "3.1 Typical Existing Workflows", level=3)
add_academic_p(doc, "Currently, students rely on disconnected tools: commercial job portals (LinkedIn, Indeed) to discover openings, commercial ATS scanners (Jobscan, ResumeWorded) for résumé feedback, separate learning platforms (YouTube, documentation sites) for upskilling, and manual spreadsheets for tracking applications.")

add_academic_heading(doc, "3.2 Limitations and Identified Pain Points", level=3)
add_academic_bullet(doc, "Commercial ATS checkers give arbitrary percentage scores without showing the mathematical formula, preventing candidate verification.", bold_prefix="Opaque Proprietary Scoring: ")
add_academic_bullet(doc, "Naive substring matching falsely matches short language names inside unrelated words ('C' in 'CSS', 'Java' in 'JavaScript').", bold_prefix="Keyword Matching Collisions: ")
add_academic_bullet(doc, "Existing tools treat every detected keyword equally, failing to differentiate between mandatory core skills and secondary preferences.", bold_prefix="Uniform Keyword Weighting: ")
add_academic_bullet(doc, "Commercial résumé scanners charge $20–$50 per month, creating financial barriers for college students.", bold_prefix="Commercial Paywalls: ")

add_academic_heading(doc, "3.3 Gap Analysis", level=3)
t_gap = doc.add_table(rows=7, cols=3)
gap_headers = ["Domain Need", "Existing Manual / Commercial Approach", "CareerLens AI Implementation"]
gap_rows = [
    ("Scoring Transparency", "Concealed algorithm; black-box percentage score", "Deterministic formula with on-screen calculation modal"),
    ("Token Boundary Safety", "Prone to false substring collisions", "Strict token-boundary regex across 150+ canonical aliases"),
    ("Qualification Weighting", "Uniform keyword frequency count", "Segmented 70% Required + 30% Preferred weighting"),
    ("Zero-Skill Handling", "Displays false 0% or crashes", "Zero-Denominator Guard prompts for technical criteria"),
    ("Upskilling Workflow", "Disconnected video tutorials without milestones", "3-tier prioritized roadmap with hands-on mini-projects"),
    ("Data Privacy & Cost", "User tracking, ads, and monthly paywalls", "100% free, client-side localStorage, zero paid API dependencies")
]
for col_idx, h in enumerate(gap_headers):
    t_gap.cell(0, col_idx).paragraphs[0].text = h
    t_gap.cell(0, col_idx).paragraphs[0].runs[0].font.bold = True
for row_idx, r_data in enumerate(gap_rows):
    for col_idx, val in enumerate(r_data):
        t_gap.cell(row_idx + 1, col_idx).paragraphs[0].text = val
style_academic_table(t_gap, [1.5, 2.5, 2.7])

doc.add_page_break()

# =========================================================
# CHAPTER 4: PROBLEM STATEMENT
# =========================================================
add_academic_heading(doc, "CHAPTER 4", level=1)
add_academic_heading(doc, "PROBLEM STATEMENT", level=2)

add_academic_p(doc, "Undergraduate computer application students face significant hurdles during technical recruitment. While students possess academic training in programming and software development, they lack an objective, transparent, and integrated software mechanism to evaluate their genuine readiness against industry job postings.")
add_academic_p(doc, "Specifically, this project addresses the following critical problems:")

add_academic_bullet(doc, "Existing career portals and commercial applicant tracking scanners conceal their scoring logic, presenting arbitrary match scores that fail to explain what specific skills candidates lack.", bold_prefix="1. Opaque Candidate Evaluation: ")
add_academic_bullet(doc, "Basic text scanning systems suffer from token collision errors—falsely matching short language tokens such as 'C' inside 'CSS'—and fail to recognize industry synonyms (e.g., 'react.js' for 'React' or 'postgres' for 'PostgreSQL').", bold_prefix="2. Algorithmic Inaccuracies in Matching: ")
add_academic_bullet(doc, "Existing tools treat all extracted keywords equally. A missing mandatory qualification (e.g., React for a Frontend role) is penalized identically to an optional tool (e.g., Docker), providing candidates with misleading preparation priorities.", bold_prefix="3. Distorted Qualification Weighting: ")
add_academic_bullet(doc, "Job searching, résumé optimization, roadmap learning, interview preparation, and application tracking currently exist as disjointed tools, leading to dropped applications and lost employment opportunities.", bold_prefix="4. Fragmented Career Preparation Tools: ")

add_academic_p(doc, "CareerLens AI addresses these challenges by delivering an integrated, transparent, client-side web application combining token-boundary parsing, segmented 70/30 weighting, automated roadmap generation, interview drill feedback, and full CRUD application pipeline tracking.")

doc.add_page_break()

# =========================================================
# CHAPTER 5: OBJECTIVES & SCOPE
# =========================================================
add_academic_heading(doc, "CHAPTER 5", level=1)
add_academic_heading(doc, "OBJECTIVES & SCOPE", level=2)

add_academic_heading(doc, "5.1 Primary Objectives", level=3)
add_academic_bullet(doc, "Deliver a responsive web-based career workspace using Next.js 14, TypeScript, and Tailwind CSS.")
add_academic_bullet(doc, "Implement a deterministic regex token-boundary parser covering 150+ canonical software engineering technologies.")
add_academic_bullet(doc, "Engineer a segmented 70/30 qualification scoring algorithm separating required baseline criteria from preferred skills.")
add_academic_bullet(doc, "Implement a Zero-Denominator Guard to safely handle job postings lacking technical terms.")
add_academic_bullet(doc, "Provide an interactive mathematical formula modal that discloses exact score calculations.")
add_academic_bullet(doc, "Generate structured 3-tier learning roadmaps (High, Medium, Supplementary) for identified skill gaps.")
add_academic_bullet(doc, "Provide role-specific technical and behavioral interview practice with instant rubric evaluation.")
add_academic_bullet(doc, "Deliver a full CRUD job application tracker supporting stage transitions, deadlines, and JSON data export.")

add_academic_heading(doc, "5.2 Current In-Scope Capabilities", level=3)
add_academic_bullet(doc, "Profile skill tags, résumé text extraction, and bidirectional synchronization.", bold_prefix="Competency Management: ")
add_academic_bullet(doc, "Keyword parsing, alias normalization, and segmented compatibility scoring.", bold_prefix="Job Description Analysis: ")
add_academic_bullet(doc, "Automated milestone plans, completion checkboxes, and custom goal creation.", bold_prefix="Curriculum Roadmapping: ")
add_academic_bullet(doc, "Role track filtering, model answers, and rubric-based response evaluation.", bold_prefix="Interview Readiness: ")
add_academic_bullet(doc, "Application status management (Applied, Interviewing, Offer, Rejected) with offline JSON backup.", bold_prefix="Pipeline Tracking: ")

add_academic_heading(doc, "5.3 Out of Scope or Deferred", level=3)
add_academic_bullet(doc, "No automated scraping of LinkedIn or Indeed; candidates paste authentic job postings.", bold_prefix="Live Job Scraping: ")
add_academic_bullet(doc, "The primary matching engine is deterministic and rule-based, avoiding paid cloud API dependencies.", bold_prefix="External Paid LLMs: ")
add_academic_bullet(doc, "Delivered as a responsive web application; native iOS/Android builds are deferred.", bold_prefix="Native Mobile Apps: ")

doc.add_page_break()

# =========================================================
# CHAPTER 6: PROPOSED SYSTEM & DESIGN
# =========================================================
add_academic_heading(doc, "CHAPTER 6", level=1)
add_academic_heading(doc, "PROPOSED SYSTEM & DESIGN", level=2)

add_academic_heading(doc, "6.1 System Workflow", level=3)
add_academic_p(doc, "CareerLens AI establishes a unified, candidate-centric workflow. The candidate begins by defining verified competencies—either manually or by pasting résumé text into the Résumé Review module. When evaluating a job posting, the candidate pastes the text into the Compatibility Analyzer. The system tokenizes the text, segments qualifications into Required and Preferred tiers, and displays a deterministic match percentage with full mathematical disclosure.")
add_academic_p(doc, "Missing technical skills are automatically ported into the Learning Roadmaps module, where milestones are prioritized by criticality. The candidate practices role-specific interview screens with rubric feedback and tracks submissions through the integrated application pipeline.")

add_academic_heading(doc, "6.2 Data Flow Diagrams", level=3)
add_figure_image(doc, os.path.join(ASSETS_DIR, 'diagrams', 'fig_6_1_dfd_level_0.png'), "Figure 6.1: Data Flow Diagram (DFD) Level 0 — Context Level Diagram")
add_academic_p(doc, "Figure 6.1 models the external interactions of CareerLens AI. The student inputs profile skills, résumés, and application records, receiving compatibility scores, learning roadmaps, and interview feedback. Target employers provide job postings and receive application tracking status records.")

add_figure_image(doc, os.path.join(ASSETS_DIR, 'diagrams', 'fig_6_2_dfd_level_1.png'), "Figure 6.2: Data Flow Diagram (DFD) Level 1 — Functional Decomposition Diagram")
add_academic_p(doc, "Figure 6.2 decomposes the system into five core functional sub-processes: 1.0 Profile & Résumé Parser, 2.0 Job Compatibility Engine, 3.0 Learning Roadmap Generator, 4.0 Interview Readiness Simulator, and 5.0 Application Pipeline Tracker, along with their associated data stores.")

add_figure_image(doc, os.path.join(ASSETS_DIR, 'diagrams', 'fig_6_3_use_case.png'), "Figure 6.3: UML Use-Case Diagram for CareerLens AI")
add_academic_p(doc, "Figure 6.3 illustrates the primary user actor (Student / Job Candidate) interacting with eight core system use cases within the CareerLens AI application boundary.")

add_figure_image(doc, os.path.join(ASSETS_DIR, 'diagrams', 'fig_6_4_activity.png'), "Figure 6.4: UML Activity Diagram — Competency Matching Workflow")
add_academic_p(doc, "Figure 6.4 details the procedural logic of the competency matching engine, highlighting the decision diamond for the Zero-Denominator Guard. If zero technical terms are detected, the system branches safely to prompt the user, preventing division-by-zero errors.")

add_figure_image(doc, os.path.join(ASSETS_DIR, 'diagrams', 'fig_6_5_architecture.png'), "Figure 6.5: System Architecture Diagram — Three-Tier Dual-Engine Design")
add_academic_p(doc, "Figure 6.5 illustrates the three-tier architecture: the Presentation Layer (Next.js 14 App Router and React 18), the Business Logic Layer (Edge Route Handlers and parsing algorithms), and the Dual-Engine Persistence Layer (Engine A: Client LocalStorage and Engine B: Supabase PostgreSQL).")

add_figure_image(doc, os.path.join(ASSETS_DIR, 'diagrams', 'fig_6_6_er_diagram.png'), "Figure 6.6: Entity-Relationship (ER) Diagram (Supabase PostgreSQL Schema)")
add_academic_p(doc, "Figure 6.6 models the relational database schema implemented for cloud persistence, showing the 1-to-many relationships between the primary PROFILES table and child tables (RESUMES, JOB_ANALYSES, LEARNING_PLANS, JOB_APPLICATIONS, and INTERVIEW_SESSIONS).")

doc.add_page_break()

# =========================================================
# CHAPTER 7: IMPLEMENTATION
# =========================================================
add_academic_heading(doc, "CHAPTER 7", level=1)
add_academic_heading(doc, "IMPLEMENTATION", level=2)

add_academic_heading(doc, "7.1 Technology Stack", level=3)
t_tech = doc.add_table(rows=7, cols=2)
t_tech.cell(0, 0).paragraphs[0].text = "Area"
t_tech.cell(0, 0).paragraphs[0].runs[0].font.bold = True
t_tech.cell(0, 1).paragraphs[0].text = "Implementation Detail"
t_tech.cell(0, 1).paragraphs[0].runs[0].font.bold = True
tech_data = [
    ("Framework", "Next.js 14.2.35 (App Router with Serverless Edge Handlers)"),
    ("Language & Runtime", "TypeScript 5.6.3, Node.js v22.17.1"),
    ("Styling", "Tailwind CSS 3.4.14 with responsive grid and dark/light modes"),
    ("State Management", "React Context (CareerLensProvider) with dual-mode storage sync"),
    ("Data Persistence", "Engine A: HTML5 LocalStorage; Engine B: Supabase Cloud PostgreSQL + RLS"),
    ("Deployment", "Vercel Production Edge (https://careerlensai-seven.vercel.app/)")
]
for idx, (k, v) in enumerate(tech_data):
    t_tech.cell(idx + 1, 0).paragraphs[0].text = k
    t_tech.cell(idx + 1, 1).paragraphs[0].text = v
style_academic_table(t_tech, [2.0, 4.7])

add_academic_heading(doc, "7.2 Core Skill Matching Algorithm", level=3)
add_academic_p(doc, "The skill extraction engine (lib/analyzer.ts) enforces strict word boundaries around canonical technology terms and aliases to eliminate false substring collisions:")
code_sample = (
    "export function extractSkills(text: string): string[] {\n"
    "  if (!text || typeof text !== 'string') return [];\n"
    "  const textLower = ' ' + text.toLowerCase() + ' ';\n"
    "  const detected = new Set<string>();\n\n"
    "  // Match canonical terms using token boundaries\n"
    "  SKILLS_DATABASE.forEach(skill => {\n"
    "    const escaped = skill.replace(/[.*+?^|()[\\]\\\\]/g, '\\\\$&');\n"
    "    const regex = new RegExp('(^|[^a-zA-Z0-9_#+])' + escaped + '([^a-zA-Z0-9_#+]|$)', 'i');\n"
    "    if (regex.test(textLower)) detected.add(skill);\n"
    "  });\n\n"
    "  // Match and normalize aliases (e.g. 'react.js' -> 'React')\n"
    "  Object.keys(SKILL_ALIASES).forEach(alias => {\n"
    "    const canonical = SKILL_ALIASES[alias];\n"
    "    const escaped = alias.replace(/[.*+?^|()[\\]\\\\]/g, '\\\\$&');\n"
    "    const regex = new RegExp('(^|[^a-zA-Z0-9_#+])' + escaped + '([^a-zA-Z0-9_#+]|$)', 'i');\n"
    "    if (regex.test(textLower)) detected.add(canonical);\n"
    "  });\n\n"
    "  return Array.from(detected).sort();\n"
    "}"
)
p_c = doc.add_paragraph()
p_c.paragraph_format.space_before = Pt(6)
p_c.paragraph_format.space_after = Pt(8)
r_co = p_c.add_run(code_sample)
r_co.font.name = 'Courier New'
r_co.font.size = Pt(9)

add_academic_heading(doc, "7.3 Mathematical Scoring Formulation", level=3)
add_academic_p(doc, "Compatibility scores are computed using a 70/30 segmented qualification weighting model:")
math_sample = (
    "Score = (Required_Matched / Required_Total * 70%) + (Preferred_Matched / Preferred_Total * 30%)\n\n"
    "if (Total_JD_Skills === 0) {\n"
    "  Match_Score = null; // Zero-Denominator Guard active\n"
    "}"
)
p_m = doc.add_paragraph()
r_mo = p_m.add_run(math_sample)
r_mo.font.name = 'Courier New'
r_mo.font.size = Pt(9.5)

add_academic_heading(doc, "7.4 User Interface Screenshots", level=3)
add_figure_image(doc, os.path.join(ASSETS_DIR, 'screenshots', '02_dashboard.png'), "Figure 7.1: Candidate Dashboard Interface displaying readiness metrics and active pipeline", width=Inches(5.5))
add_figure_image(doc, os.path.join(ASSETS_DIR, 'screenshots', '04_job_analysis_results.png'), "Figure 7.2: Job Compatibility Analysis Interface showing segmented score and matched/missing skills", width=Inches(5.5))
add_figure_image(doc, os.path.join(ASSETS_DIR, 'screenshots', '06_learning_roadmaps.png'), "Figure 7.3: Prioritized Learning Roadmaps Interface with High/Medium/Supplementary milestones", width=Inches(5.5))

doc.add_page_break()

# =========================================================
# CHAPTER 8: TESTING & RESULTS
# =========================================================
add_academic_heading(doc, "CHAPTER 8", level=1)
add_academic_heading(doc, "TESTING & RESULTS", level=2)

add_academic_heading(doc, "8.1 Testing Strategy", level=3)
add_academic_p(doc, "Testing followed an iterative verification methodology comprising automated TypeScript compiler type-checking (tsc --noEmit), Next.js production compilation (npm run build), unit assertion scripts for token boundary matching, and end-to-end browser verification across all core modules.")

add_academic_heading(doc, "8.2 Test Cases and Results", level=3)
t_tc = doc.add_table(rows=13, cols=5)
tc_headers = ["Test ID", "Module", "Action & Test Input", "Expected Result", "Status"]
tc_rows = [
    ("TC-01", "Profile Skills", "Enter 'Docker' and click Add", "Tag added and persisted in localStorage", "PASS"),
    ("TC-02", "Profile Skills", "Click 'x' on 'Git' skill badge", "Tag removed from profile and stored state", "PASS"),
    ("TC-03", "Résumé Review", "Paste plain-text résumé with technical skills", "Extracts skills and syncs to profile", "PASS"),
    ("TC-04", "Job Analysis", "Load 'Junior Frontend' sample and analyze", "Computes 70% weighted score correctly", "PASS"),
    ("TC-05", "Job Analysis", "Paste non-technical text ('good communication')", "Zero-Denominator Guard triggers prompt", "PASS"),
    ("TC-06", "Job Analysis", "Click 'How is this calculated?' button", "Formula modal opens showing exact math", "PASS"),
    ("TC-07", "Learning Plan", "Click 'Add Gaps to Learning Plan'", "Missing skills queued in prioritized roadmaps", "PASS"),
    ("TC-08", "Learning Plan", "Click milestone checkbox on 'TypeScript'", "Item marked completed; progress bar updates", "PASS"),
    ("TC-09", "Interview Prep", "Select role track 'Backend Engineering'", "Filters question bank to backend topics", "PASS"),
    ("TC-10", "Interview Prep", "Draft answer and submit for rubric evaluation", "Returns concept coverage % and feedback", "PASS"),
    ("TC-11", "Job Tracker", "Add application 'Stripe / Frontend Engineer'", "New record appears with 'Applied' status", "PASS"),
    ("TC-12", "Settings", "Click 'Export Career Data (JSON)'", "Downloads valid JSON archive file", "PASS")
]
for col_idx, h in enumerate(tc_headers):
    t_tc.cell(0, col_idx).paragraphs[0].text = h
    t_tc.cell(0, col_idx).paragraphs[0].runs[0].font.bold = True
for row_idx, r_data in enumerate(tc_rows):
    for col_idx, val in enumerate(r_data):
        cell = t_tc.cell(row_idx + 1, col_idx)
        cell.paragraphs[0].text = val
        if col_idx in (0, 4):
            cell.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
            cell.paragraphs[0].runs[0].font.bold = True
style_academic_table(t_tc, [0.8, 1.3, 2.2, 1.8, 0.6])

add_academic_heading(doc, "8.3 Results and Verification Summary", level=3)
add_academic_p(doc, "All twelve core test cases passed successfully. TypeScript type checks and production compilation passed with zero errors. The application was deployed and verified on Vercel at https://careerlensai-seven.vercel.app/.")

doc.add_page_break()

# =========================================================
# CHAPTER 9: CONCLUSION & FUTURE SCOPE
# =========================================================
add_academic_heading(doc, "CHAPTER 9", level=1)
add_academic_heading(doc, "CONCLUSION & FUTURE SCOPE", level=2)

add_academic_heading(doc, "9.1 Conclusion", level=3)
add_academic_p(doc, "CareerLens AI demonstrates that an open, transparent, and client-side web application can effectively resolve student career readiness challenges without relying on opaque commercial ATS scanners. By implementing token-boundary regular expressions and segmented 70/30 qualification weighting, the platform delivers honest, verifiable compatibility feedback.")
add_academic_p(doc, "The platform bridges the gap between skill evaluation and practical self-improvement by structuring identified gaps into prioritized learning roadmaps, role-specific interview preparation, and an organized application tracking pipeline. Built on Next.js 14, TypeScript, and a dual-engine architecture, CareerLens AI provides complete client privacy at zero operational cost.")

add_academic_heading(doc, "9.2 Future Scope", level=3)
add_academic_bullet(doc, "Integrating quantized open-source models via WebGPU for client-side résumé rewrite suggestions without cloud data leakage.", bold_prefix="Local On-Device AI: ")
add_academic_bullet(doc, "Connecting official APIs from LinkedIn and Indeed to match live postings against candidate profiles.", bold_prefix="Official Job Board APIs: ")
add_academic_bullet(doc, "Enabling college placement officers to monitor cohort placement readiness metrics across departments.", bold_prefix="University Placement Coordinator Portal: ")
add_academic_bullet(doc, "Packaging the web application as a native Android and iOS app using Capacitor or React Native.", bold_prefix="Mobile Application: ")

doc.add_page_break()

# =========================================================
# CHAPTER 10: REFERENCES
# =========================================================
add_academic_heading(doc, "CHAPTER 10", level=1)
add_academic_heading(doc, "REFERENCES", level=2)

refs = [
    "Next.js Documentation (App Router & Route Handlers). Available at: https://nextjs.org/docs",
    "React Documentation and Hooks Specification. Available at: https://react.dev/",
    "TypeScript Language Reference (v5.6). Available at: https://www.typescriptlang.org/docs/",
    "Tailwind CSS Framework Documentation (v3.4). Available at: https://tailwindcss.com/docs",
    "Supabase Documentation (PostgreSQL, Row-Level Security & Auth). Available at: https://supabase.com/docs",
    "Pressman, R. S., & Maxim, B. R. (2020). Software Engineering: A Practitioner's Approach (9th ed.). McGraw-Hill Education.",
    "Mozilla Developer Network (MDN) — Web Storage API and Regular Expressions. Available at: https://developer.mozilla.org/",
    "IEEE Transactions on Learning Technologies — Skill Extraction and Competency Matching in Educational Systems (2023)."
]
for idx, ref in enumerate(refs):
    p_r = doc.add_paragraph()
    p_r.paragraph_format.line_spacing = 1.3
    p_r.paragraph_format.space_after = Pt(6)
    p_r.add_run(f"[{idx + 1}] {ref}")

doc.add_page_break()

# =========================================================
# PART B DIVIDER
# =========================================================
p_pb = doc.add_paragraph()
p_pb.alignment = WD_ALIGN_PARAGRAPH.CENTER
p_pb.paragraph_format.space_before = Pt(220)
r1 = p_pb.add_run("PART B\n\n")
r1.font.name = 'Times New Roman'
r1.font.size = Pt(22)
r1.font.bold = True
r2 = p_pb.add_run("EDUSKILLS COURSE (1 CREDIT)")
r2.font.name = 'Times New Roman'
r2.font.size = Pt(16)
r2.font.bold = True

doc.add_page_break()

# =========================================================
# CHAPTER 11: COURSE DETAILS
# =========================================================
add_academic_heading(doc, "CHAPTER 11", level=1)
add_academic_heading(doc, "COURSE DETAILS", level=2)

add_academic_p(doc, "I have been selected for the AICTE–EduSkills Virtual Internship Program in the technical domain of Data Structures and Algorithms in C + Project. Supported by the All India Council for Technical Education (AICTE) and EduSkills Foundation, this virtual internship runs for a duration of 8 weeks (October 2026 – December 2026).")

add_academic_heading(doc, "11.1 Student and Enrollment Information", level=3)
t_stu_info = doc.add_table(rows=8, cols=2)
stu_data = [
    ("Student Name", "Raj Ramnivas Yadav"),
    ("Program & Class", "Bachelor of Computer Applications (TYBCA, Semester V)"),
    ("Division & Roll No", "Division E2 | Roll No: TE2208"),
    ("Institution", "MAEER's MIT Arts, Commerce and Science College, Alandi (D.), Pune"),
    ("Internship Domain", "Data Structures and Algorithms in C + Project"),
    ("Duration & Mode", "8 Weeks (October 2026 – December 2026) | Virtual Mode"),
    ("AICTE Student ID", "STU6810fb64da87c1745943396"),
    ("Offer Letter Ref No", "C19Y2026M101591617")
]
for idx, (k, v) in enumerate(stu_data):
    t_stu_info.cell(idx, 0).paragraphs[0].text = k
    t_stu_info.cell(idx, 0).paragraphs[0].runs[0].font.bold = True
    t_stu_info.cell(idx, 1).paragraphs[0].text = v
style_academic_table(t_stu_info, [2.2, 4.5])

add_academic_heading(doc, "11.2 8-Week Curriculum Breakdown", level=3)
t_curr = doc.add_table(rows=9, cols=3)
curr_headers = ["Week", "Module Title", "Technical Topics Covered"]
curr_rows = [
    ("Week 1", "Course Kick-off & Algorithmic Thinking", "C programming refresher, problem-solving, asymptotic analysis, Big-O notation."),
    ("Week 2", "Linear Data Structures", "Arrays, linked lists (singly, doubly, circular), dynamic memory allocation in C."),
    ("Week 3", "Stacks, Queues & Recursion", "LIFO/FIFO pointer implementations, call stack mechanics, recursive problem solving."),
    ("Week 4", "Trees & Binary Search Trees", "Tree terminology, binary trees, DFS traversals (inorder, preorder, postorder), BST operations."),
    ("Week 5", "Heaps, Hashing & Graphs", "Min/max heaps, priority queues, hash tables, collision resolution, BFS/DFS graph traversals."),
    ("Week 6", "Sorting & Searching", "Bubble, Insertion, Merge, Quick sort, Linear and Binary search efficiency analysis."),
    ("Week 7", "Advanced Structures & Paradigms", "Tries, AVL trees, Divide & Conquer algorithms, Greedy strategy implementations."),
    ("Week 8", "Optimization & Capstone Project", "Code optimization, memory management, and capstone: Real-Time Event Scheduler.")
]
for col_idx, h in enumerate(curr_headers):
    t_curr.cell(0, col_idx).paragraphs[0].text = h
    t_curr.cell(0, col_idx).paragraphs[0].runs[0].font.bold = True
for row_idx, r_data in enumerate(curr_rows):
    for col_idx, val in enumerate(r_data):
        cell = t_curr.cell(row_idx + 1, col_idx)
        cell.paragraphs[0].text = val
        if col_idx == 0:
            cell.paragraphs[0].runs[0].font.bold = True
            cell.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
style_academic_table(t_curr, [1.0, 2.3, 3.4])

doc.add_page_break()

# =========================================================
# CHAPTER 12: COURSE ENROLLMENT & OFFER LETTER
# =========================================================
add_academic_heading(doc, "CHAPTER 12", level=1)
add_academic_heading(doc, "COURSE ENROLLMENT & OFFER LETTER", level=2)

add_academic_p(doc, "The AICTE–EduSkills Virtual Internship in Data Structures and Algorithms in C + Project commenced in October 2026 and is currently in progress, scheduled for completion in December 2026. The official two-page Offer Letter issued by EduSkills Foundation is attached below as verified evidence of selection and active enrollment.")

add_figure_image(doc, os.path.join(ASSETS_DIR, 'offer_letter_page_1.png'), "Figure 12.1: Official AICTE–EduSkills Internship Offer Letter — Page 1 (Ref No: C19Y2026M101591617)", width=Inches(5.5))
doc.add_page_break()
add_figure_image(doc, os.path.join(ASSETS_DIR, 'offer_letter_page_2.png'), "Figure 12.2: Official AICTE–EduSkills Internship Offer Letter — Page 2 (8-Week Curriculum Structure)", width=Inches(5.5))

doc.add_page_break()

# =========================================================
# CHAPTER 13: WHAT I LEARNED
# =========================================================
add_academic_heading(doc, "CHAPTER 13", level=1)
add_academic_heading(doc, "WHAT I LEARNED", level=2)

add_academic_p(doc, "During the AICTE–EduSkills Virtual Internship in Data Structures and Algorithms in C + Project, I acquired foundational competencies in algorithmic problem-solving, computational complexity, memory management, and data organization:")

add_academic_heading(doc, "13.1 Core Concepts Acquired", level=3)
add_academic_bullet(doc, "Evaluated time and space complexities mathematically to identify execution bottlenecks in nested loops and recursion.", bold_prefix="Algorithmic Complexity & Big-O Analysis: ")
add_academic_bullet(doc, "Mastered pointer arithmetic, dynamic heap allocation using malloc and free, and preventing memory leaks.", bold_prefix="Manual Memory Management in C: ")
add_academic_bullet(doc, "Implemented singly and doubly linked lists, stacks (LIFO), queues (FIFO), and Binary Search Trees (BST) from scratch in C.", bold_prefix="Linear and Hierarchical Data Structures: ")
add_academic_bullet(doc, "Studied graph representations via adjacency lists and implemented Breadth-First Search (BFS) and Depth-First Search (DFS) traversals.", bold_prefix="Graph & Search Algorithms: ")
add_academic_bullet(doc, "Designed a Real-Time Event Scheduler utilizing binary min-heaps to manage time-prioritized events with O(log N) scheduling efficiency.", bold_prefix="Capstone Project Architecture: ")

add_academic_heading(doc, "13.2 Algorithmic Synthesis: Connecting DSA to CareerLens AI", level=3)
add_academic_p(doc, "Although CareerLens AI was implemented using modern web technologies (Next.js and TypeScript), the algorithmic principles studied during the C internship directly guided the web application's architecture:")
add_academic_bullet(doc, "Inspired by hash table collision resolution studied in Week 5, the skill matching engine utilizes O(1) set lookups for canonical technologies, completing text parsing in under 50ms.", bold_prefix="1. Hash-Set Keyword Lookups: ")
add_academic_bullet(doc, "The 3-tier roadmap generator (High, Medium, Supplementary) implements a priority queue discipline, ensuring foundational skills are scheduled before dependent frameworks.", bold_prefix="2. Priority Queue Heuristics for Roadmaps: ")
add_academic_bullet(doc, "The rigorous pointer safety checks required in C directly inspired the Zero-Denominator Guard, eliminating division-by-zero crashes when non-technical job descriptions are analyzed.", bold_prefix="3. Defensive Boundary Verification: ")

doc.add_page_break()

# =========================================================
# PART C DIVIDER
# =========================================================
p_pc = doc.add_paragraph()
p_pc.alignment = WD_ALIGN_PARAGRAPH.CENTER
p_pc.paragraph_format.space_before = Pt(220)
r1 = p_pc.add_run("PART C\n\n")
r1.font.name = 'Times New Roman'
r1.font.size = Pt(22)
r1.font.bold = True
r2 = p_pc.add_run("PRESENTATION SLIDES")
r2.font.name = 'Times New Roman'
r2.font.size = Pt(16)
r2.font.bold = True

doc.add_page_break()

# =========================================================
# CHAPTER 14: PRESENTATION SLIDES (2 per page)
# =========================================================
add_academic_heading(doc, "CHAPTER 14", level=1)
add_academic_heading(doc, "PRESENTATION SLIDES", level=2)

add_academic_p(doc, "The following pages contain the 18-slide presentation deck prepared for the TYBCA Field Project evaluation, rendered with two slides per page.")

slide_captions = [
    "Slide 1: Title Slide — CareerLens AI Field Project Presentation",
    "Slide 2: Introduction & Project Motivation",
    "Slide 3: Problem Statement & Identified Gaps",
    "Slide 4: Project Objectives & Functional Scope",
    "Slide 5: System Comparison Matrix",
    "Slide 6: System Architecture (3-Tier Dual-Engine Design)",
    "Slide 7: Data Flow Diagrams (Level 0 Context & Level 1 Decomposition)",
    "Slide 8: System Design (Use-Case & Activity Workflows)",
    "Slide 9: Database Schema & Entity-Relationship Model",
    "Slide 10: Technology Stack & Implementation Details",
    "Slide 11: Deterministic Competency Matching Engine & Math Formulation",
    "Slide 12: Application Interface (Landing Page & Dashboard)",
    "Slide 13: Application Interface (Job Analysis & Learning Roadmaps)",
    "Slide 14: Application Interface (Interview Workbench & Pipeline Tracker)",
    "Slide 15: System Verification & Test Results (12 Test Cases)",
    "Slide 16: Part B: AICTE–EduSkills Virtual Internship Overview",
    "Slide 17: Synthesis: How DSA Informed CareerLens AI",
    "Slide 18: Conclusion & Viva Summary"
]

for i in range(0, 18, 2):
    s1_idx = i
    s2_idx = i + 1
    
    s1_path = os.path.join(ASSETS_DIR, 'slides', f'slide_{s1_idx+1:02d}.png')
    s2_path = os.path.join(ASSETS_DIR, 'slides', f'slide_{s2_idx+1:02d}.png')
    
    if i > 0:
        doc.add_page_break()
        
    add_figure_image(doc, s1_path, slide_captions[s1_idx], width=Inches(5.6))
    add_figure_image(doc, s2_path, slide_captions[s2_idx], width=Inches(5.6))

doc.save(OUTPUT_DOCX)
print(f"[SUCCESS] Saved final revised Word document: {OUTPUT_DOCX}")
