import os
import pymupdf

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'report_assets')
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 1. Extract Offer Letter Pages as High-Res Images
offer_pdf_path = r'C:\Users\Admin\Downloads\Offer_Letter_783160_1591617.pdf'
if os.path.exists(offer_pdf_path):
    doc = pymupdf.open(offer_pdf_path)
    for i, page in enumerate(doc):
        pix = page.get_pixmap(dpi=300)
        img_path = os.path.join(OUTPUT_DIR, f'offer_letter_page_{i+1}.png')
        pix.save(img_path)
        print(f'[OK] Saved Offer Letter page {i+1} -> {img_path}')

# 2. Extract MIT College Logo from sample report page 1
sample_pdf_path = r'C:\Users\Admin\Downloads\Charu_Biriya_DICS_Field_Project_Report.pdf'
if os.path.exists(sample_pdf_path):
    doc = pymupdf.open(sample_pdf_path)
    page1 = doc[0]
    # Crop the top header region containing the MIT ACSC logo
    # Page rect is usually ~ (0, 0, 595, 842)
    rect = page1.rect
    # Header is roughly in the top 60 to 180 pt
    header_crop = pymupdf.Rect(40, 50, rect.width - 40, 160)
    pix_logo = page1.get_pixmap(dpi=300, clip=header_crop)
    logo_path = os.path.join(OUTPUT_DIR, 'mit_college_logo.png')
    pix_logo.save(logo_path)
    print(f'[OK] Extracted MIT College Logo -> {logo_path}')

print('[DONE] Assets extracted successfully.')
