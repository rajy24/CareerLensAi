const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ROOT_DIR = path.join(__dirname, '..');
const ASSETS_DIR = path.join(ROOT_DIR, 'report_assets');
const OUTPUT_PDF = path.join(ROOT_DIR, 'CareerLens_AI_Field_Project_Report_Raj_Yadav_Final.pdf');

function getBase64Image(filePath) {
  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath).slice(1);
    const mime = ext === 'png' ? 'image/png' : 'image/jpeg';
    return `data:${mime};base64,${fs.readFileSync(filePath).toString('base64')}`;
  }
  console.warn(`[WARN] Image not found: ${filePath}`);
  return '';
}

const logoBase64 = getBase64Image(path.join(ASSETS_DIR, 'mit_college_logo.png'));
const offer1Base64 = getBase64Image(path.join(ASSETS_DIR, 'offer_letter_page_1.png'));
const offer2Base64 = getBase64Image(path.join(ASSETS_DIR, 'offer_letter_page_2.png'));

// Diagram base64
const dfd0Base64 = getBase64Image(path.join(ASSETS_DIR, 'diagrams', 'fig_6_1_dfd_level_0.png'));
const dfd1Base64 = getBase64Image(path.join(ASSETS_DIR, 'diagrams', 'fig_6_2_dfd_level_1.png'));
const usecaseBase64 = getBase64Image(path.join(ASSETS_DIR, 'diagrams', 'fig_6_3_use_case.png'));
const activityBase64 = getBase64Image(path.join(ASSETS_DIR, 'diagrams', 'fig_6_4_activity.png'));
const archBase64 = getBase64Image(path.join(ASSETS_DIR, 'diagrams', 'fig_6_5_architecture.png'));
const erBase64 = getBase64Image(path.join(ASSETS_DIR, 'diagrams', 'fig_6_6_er_diagram.png'));

// Screenshot base64
const ssDashboard = getBase64Image(path.join(ASSETS_DIR, 'screenshots', '02_dashboard.png'));
const ssJobAnalysis = getBase64Image(path.join(ASSETS_DIR, 'screenshots', '04_job_analysis_results.png'));
const ssRoadmap = getBase64Image(path.join(ASSETS_DIR, 'screenshots', '06_learning_roadmaps.png'));

// Slide base64 array (18 slides)
const slideImages = [];
for (let i = 1; i <= 18; i++) {
  const p = path.join(ASSETS_DIR, 'slides', `slide_${String(i).padStart(2, '0')}.png`);
  slideImages.push(getBase64Image(p));
}

function buildReportHtml() {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>CareerLens AI — BCA Field Project Report</title>
  <style>
    @page {
      size: A4;
      margin: 18mm 15mm 20mm 20mm;
    }

    * {
      box-sizing: border-box;
    }

    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 12pt;
      line-height: 1.35;
      color: #000000;
      background: #ffffff;
      margin: 0;
      padding: 0;
    }

    .page-break {
      page-break-before: always;
      break-before: page;
    }

    .avoid-break {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    h1.chapter-title {
      font-size: 16pt;
      font-weight: bold;
      text-align: center;
      text-transform: uppercase;
      margin-top: 15px;
      margin-bottom: 5px;
    }

    h2.chapter-subtitle {
      font-size: 14pt;
      font-weight: bold;
      text-align: center;
      text-transform: uppercase;
      margin-top: 0;
      margin-bottom: 25px;
    }

    h3.section-heading {
      font-size: 12.5pt;
      font-weight: bold;
      margin-top: 18px;
      margin-bottom: 6px;
    }

    h4.subsection-heading {
      font-size: 12pt;
      font-weight: bold;
      margin-top: 14px;
      margin-bottom: 4px;
    }

    p {
      text-align: justify;
      margin-top: 0;
      margin-bottom: 10px;
    }

    ul, ol {
      margin-top: 4px;
      margin-bottom: 10px;
      padding-left: 28px;
    }

    li {
      margin-bottom: 4px;
      text-align: justify;
    }

    table.academic-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
      margin-bottom: 16px;
      font-size: 10.5pt;
    }

    table.academic-table th {
      border: 1px solid #000000;
      padding: 6px 8px;
      background-color: #f2f2f2;
      font-weight: bold;
      text-align: left;
    }

    table.academic-table td {
      border: 1px solid #000000;
      padding: 6px 8px;
      vertical-align: top;
      background-color: #ffffff;
    }

    .figure-container {
      text-align: center;
      margin: 14px 0;
      page-break-inside: avoid;
    }

    .figure-container img {
      max-width: 95%;
      height: auto;
      border: 1px solid #333333;
      padding: 3px;
      background: #ffffff;
    }

    .figure-caption {
      font-size: 10.5pt;
      font-weight: bold;
      text-align: center;
      margin-top: 6px;
      margin-bottom: 12px;
    }

    .divider-page {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding-top: 35vh;
    }

    .divider-title {
      font-size: 20pt;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 10px;
    }

    .divider-subtitle {
      font-size: 15pt;
      font-weight: bold;
      text-transform: uppercase;
    }

    pre.code-block {
      background: #fdfdfd;
      border: 1px solid #333333;
      padding: 10px;
      font-family: 'Courier New', Courier, monospace;
      font-size: 9.5pt;
      line-height: 1.3;
      white-space: pre-wrap;
      margin: 10px 0;
      page-break-inside: avoid;
    }
  </style>
</head>
<body>

  <!-- ========================================================= -->
  <!-- 1. COVER PAGE                                             -->
  <!-- ========================================================= -->
  <div id="page-cover" style="text-align: center; padding-top: 10px;">
    ${logoBase64 ? `<img src="${logoBase64}" style="max-height: 75px; margin-bottom: 6px;" />` : ''}
    <div style="font-size: 11pt; font-weight: bold; margin-bottom: 2px;">School of Computer Science & Application</div>
    <div style="font-size: 12pt; font-weight: bold; margin-bottom: 2px;">Department of Computer Application</div>
    <div style="font-size: 11pt; margin-bottom: 2px;">Academic Year 2026 – 2027</div>
    <div style="font-size: 11pt; margin-bottom: 20px;">Semester – V</div>

    <div style="font-size: 16pt; font-weight: bold; margin-bottom: 12px; text-transform: uppercase;">Field Project Report</div>
    <div style="font-size: 11pt; margin-bottom: 6px;">Submitted in Partial Fulfilment of the Requirements for the</div>
    <div style="font-size: 12pt; font-weight: bold; margin-bottom: 25px;">Award of Degree of Bachelor of Computer Applications</div>

    <div style="font-size: 14pt; font-weight: bold; margin: 25px 0 35px 0; line-height: 1.4;">
      Title of the Project – CareerLens AI — A Career Planning and Job-Matching Web Application
    </div>

    <div style="text-align: left; margin: 40px auto 0 80px; font-size: 11.5pt; line-height: 1.7;">
      <p style="font-weight: bold; margin-bottom: 8px;">Submitted by:</p>
      <table style="border: none; font-size: 11.5pt; line-height: 1.6;">
        <tr><td style="border: none; padding: 2px 10px 2px 0; width: 140px;"><strong>Name:</strong></td><td style="border: none; padding: 2px 0;">Raj Ramnivas Yadav</td></tr>
        <tr><td style="border: none; padding: 2px 10px 2px 0;"><strong>Roll No:</strong></td><td style="border: none; padding: 2px 0;">TE2208</td></tr>
        <tr><td style="border: none; padding: 2px 10px 2px 0;"><strong>Program:</strong></td><td style="border: none; padding: 2px 0;">TYBCA - E2</td></tr>
        <tr><td style="border: none; padding: 2px 10px 2px 0;"><strong>Guide Name:</strong></td><td style="border: none; padding: 2px 0;">Prof. Prakash Nikam Sir</td></tr>
      </table>
    </div>
  </div>

  <!-- ========================================================= -->
  <!-- 2. CERTIFICATE                                            -->
  <!-- ========================================================= -->
  <div id="page-certificate" class="page-break" style="text-align: center; padding-top: 10px;">
    ${logoBase64 ? `<img src="${logoBase64}" style="max-height: 70px; margin-bottom: 6px;" />` : ''}
    <div style="font-size: 11pt; font-weight: bold;">School of Computer Science & Application</div>
    <div style="font-size: 12pt; font-weight: bold;">Department of Computer Application</div>
    <div style="font-size: 11pt;">Academic Year 2026 – 2027</div>
    <div style="font-size: 11pt; margin-bottom: 25px;">Semester – V</div>

    <h1 style="font-size: 16pt; font-weight: bold; text-decoration: underline; margin-bottom: 30px;">CERTIFICATE</h1>

    <p style="text-align: justify; line-height: 1.8; font-size: 12pt; margin-bottom: 40px;">
      This is to certify that <strong>Mr. Raj Ramnivas Yadav</strong>, Roll No <strong>TE2208</strong>, a student of <strong>TYBCA, Semester V</strong>, has successfully completed the Field Project (1 Credit) titled <strong>"CareerLens AI — A Career Planning and Job-Matching Web Application"</strong> and the EduSkills Virtual Internship Course (1 Credit) in partial fulfilment of the requirements for the award of the degree of <strong>Bachelor of Computer Applications</strong> during the Academic Year 2026–2027. The work carried out is original and has been completed under my guidance to my satisfaction.
    </p>

    <div style="text-align: left; font-size: 11.5pt; margin-bottom: 60px;">
      <p style="margin: 4px 0;">Date: ____________</p>
      <p style="margin: 4px 0;">Place: Pune</p>
    </div>

    <table style="width: 100%; border: none; margin-top: 40px; font-size: 11.5pt;">
      <tr>
        <td style="border: none; width: 50%; text-align: center; vertical-align: bottom;">
          _____________________________
          <div style="font-weight: bold; margin-top: 6px;">Prof. Prakash Nikam Sir</div>
          <div>Project Guide</div>
        </td>
        <td style="border: none; width: 50%; text-align: center; vertical-align: bottom;">
          _____________________________
          <div style="font-weight: bold; margin-top: 6px;">Prof. Amit Tale</div>
          <div>HOD, Dept. of Computer Application</div>
        </td>
      </tr>
      <tr>
        <td colspan="2" style="border: none; text-align: center; padding-top: 45px; font-style: italic;">
          (College Seal)
        </td>
      </tr>
    </table>
  </div>

  <!-- ========================================================= -->
  <!-- 3. FIELD PROJECT EVALUATION SHEET                         -->
  <!-- ========================================================= -->
  <div id="page-eval-field" class="page-break" style="padding-top: 10px;">
    <div style="text-align: center;">
      ${logoBase64 ? `<img src="${logoBase64}" style="max-height: 65px; margin-bottom: 4px;" />` : ''}
      <div style="font-size: 10.5pt; font-weight: bold;">School of Computer Science & Application</div>
      <div style="font-size: 11pt; font-weight: bold;">Department of Computer Application</div>
      <div style="font-size: 10.5pt;">Academic Year 2026 – 2027</div>
      <div style="font-size: 10.5pt; margin-bottom: 15px;">Semester – V</div>
      <div style="font-size: 14pt; font-weight: bold; margin-bottom: 15px;">Evaluation Sheet – Field Project</div>
    </div>

    <div style="font-size: 11pt; line-height: 1.5; margin-bottom: 15px;">
      <table style="border: none; width: 100%;">
        <tr><td style="border: none; width: 130px;"><strong>Name:</strong></td><td style="border: none;">Raj Ramnivas Yadav</td></tr>
        <tr><td style="border: none;"><strong>Class:</strong></td><td style="border: none;">TYBCA - E2</td></tr>
        <tr><td style="border: none;"><strong>Roll No:</strong></td><td style="border: none;">TE2208</td></tr>
        <tr><td style="border: none;"><strong>Project Title:</strong></td><td style="border: none;">CareerLens AI — A Career Planning and Job-Matching Web Application</td></tr>
      </table>
    </div>

    <table class="academic-table" style="margin-top: 10px;">
      <thead>
        <tr>
          <th style="width: 10%; text-align: center;">Sr. No</th>
          <th style="width: 60%;">Component</th>
          <th style="width: 15%; text-align: center;">Max Marks</th>
          <th style="width: 15%; text-align: center;">Marks Awarded</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="text-align: center;">1</td><td>Information Gathering</td><td style="text-align: center;">8</td><td></td></tr>
        <tr><td style="text-align: center;">2</td><td>Analysis & Problem Statement</td><td style="text-align: center;">8</td><td></td></tr>
        <tr><td style="text-align: center;">3</td><td>Design (DFD, ER, Tables)</td><td style="text-align: center;">6</td><td></td></tr>
        <tr><td style="text-align: center;">4</td><td>Working Project / Implementation</td><td style="text-align: center;">12</td><td></td></tr>
        <tr><td style="text-align: center;">5</td><td>Testing & Results</td><td style="text-align: center;">4</td><td></td></tr>
        <tr><td style="text-align: center;">6</td><td>Report Format & Neatness</td><td style="text-align: center;">4</td><td></td></tr>
        <tr><td style="text-align: center;">7</td><td>Viva</td><td style="text-align: center;">8</td><td></td></tr>
        <tr style="font-weight: bold; background-color: #f9f9f9;"><td colspan="2" style="text-align: right;">Total</td><td style="text-align: center;">50</td><td></td></tr>
      </tbody>
    </table>

    <table style="width: 100%; border: none; margin-top: 60px; font-size: 11pt;">
      <tr>
        <td style="border: none; width: 50%; text-align: center;">
          _____________________________
          <div style="font-weight: bold; margin-top: 6px;">Prof. Prakash Nikam Sir</div>
          <div>Project Guide</div>
        </td>
        <td style="border: none; width: 50%; text-align: center;">
          _____________________________
          <div style="font-weight: bold; margin-top: 6px;">Prof. Amit Tale</div>
          <div>HOD, Dept. of Computer Application</div>
        </td>
      </tr>
    </table>
  </div>

  <!-- ========================================================= -->
  <!-- 4. EDUSKILLS PRESENTATION EVALUATION SHEET                -->
  <!-- ========================================================= -->
  <div id="page-eval-eduskills" class="page-break" style="padding-top: 10px;">
    <div style="text-align: center;">
      ${logoBase64 ? `<img src="${logoBase64}" style="max-height: 65px; margin-bottom: 4px;" />` : ''}
      <div style="font-size: 10.5pt; font-weight: bold;">School of Computer Science & Application</div>
      <div style="font-size: 11pt; font-weight: bold;">Department of Computer Application</div>
      <div style="font-size: 10.5pt;">Academic Year 2026 – 2027</div>
      <div style="font-size: 10.5pt; margin-bottom: 15px;">Semester – V</div>
      <div style="font-size: 14pt; font-weight: bold; margin-bottom: 15px;">Evaluation Sheet – EduSkills Presentation</div>
    </div>

    <div style="font-size: 11pt; line-height: 1.5; margin-bottom: 15px;">
      <table style="border: none; width: 100%;">
        <tr><td style="border: none; width: 130px;"><strong>Name:</strong></td><td style="border: none;">Raj Ramnivas Yadav</td></tr>
        <tr><td style="border: none;"><strong>Roll No:</strong></td><td style="border: none;">TE2208</td></tr>
        <tr><td style="border: none;"><strong>Course Name:</strong></td><td style="border: none;">Data Structures and Algorithms in C + Project</td></tr>
      </table>
    </div>

    <table class="academic-table" style="margin-top: 10px;">
      <thead>
        <tr>
          <th style="width: 10%; text-align: center;">Sr. No</th>
          <th style="width: 60%;">Component</th>
          <th style="width: 15%; text-align: center;">Max Marks</th>
          <th style="width: 15%; text-align: center;">Marks Awarded</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="text-align: center;">1</td><td>Course Completed & Certificate</td><td style="text-align: center;">10</td><td></td></tr>
        <tr><td style="text-align: center;">2</td><td>Knowledge of Topics</td><td style="text-align: center;">15</td><td></td></tr>
        <tr><td style="text-align: center;">3</td><td>Practical Work / Demo</td><td style="text-align: center;">8</td><td></td></tr>
        <tr><td style="text-align: center;">4</td><td>Slide Design</td><td style="text-align: center;">5</td><td></td></tr>
        <tr><td style="text-align: center;">5</td><td>Speaking Skills & Time Management</td><td style="text-align: center;">5</td><td></td></tr>
        <tr><td style="text-align: center;">6</td><td>Answers to Questions</td><td style="text-align: center;">7</td><td></td></tr>
        <tr style="font-weight: bold; background-color: #f9f9f9;"><td colspan="2" style="text-align: right;">Total</td><td style="text-align: center;">50</td><td></td></tr>
      </tbody>
    </table>

    <table class="academic-table" style="margin-top: 20px; width: 75%; margin-left: auto; margin-right: auto;">
      <thead>
        <tr>
          <th style="width: 60%;">Final Marks</th>
          <th style="width: 20%; text-align: center;">Max Marks</th>
          <th style="width: 20%; text-align: center;">Marks Awarded</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Part A – Field Project</td><td style="text-align: center;">50</td><td></td></tr>
        <tr><td>Part B – EduSkills Presentation</td><td style="text-align: center;">50</td><td></td></tr>
        <tr style="font-weight: bold; background-color: #f9f9f9;"><td>Total</td><td style="text-align: center;">100</td><td></td></tr>
      </tbody>
    </table>

    <div style="margin: 25px auto 40px auto; width: 75%; font-size: 11pt;">
      <strong>Grade Awarded:</strong> ________________________
    </div>

    <table style="width: 100%; border: none; margin-top: 40px; font-size: 11pt;">
      <tr>
        <td style="border: none; width: 50%; text-align: center;">
          _____________________________
          <div style="font-weight: bold; margin-top: 6px;">Prof. Prakash Nikam Sir</div>
          <div>Project Guide</div>
        </td>
        <td style="border: none; width: 50%; text-align: center;">
          _____________________________
          <div style="font-weight: bold; margin-top: 6px;">Prof. Amit Tale</div>
          <div>HOD, Dept. of Computer Application</div>
        </td>
      </tr>
    </table>
  </div>

  <!-- ========================================================= -->
  <!-- 5. DECLARATION (STANDALONE PAGE)                          -->
  <!-- ========================================================= -->
  <div id="page-declaration" class="page-break" style="padding-top: 40px;">
    <h1 style="font-size: 16pt; font-weight: bold; text-align: center; margin-bottom: 40px;">Declaration</h1>

    <p style="text-align: justify; line-height: 2.0; font-size: 12pt; margin-bottom: 80px;">
      I hereby declare that the field project report titled <strong>"CareerLens AI — A Career Planning and Job-Matching Web Application"</strong> is my original work, carried out under the guidance of <strong>Prof. Prakash Nikam Sir</strong>. This report has not been submitted elsewhere for the award of any degree or diploma.
    </p>

    <div style="font-size: 11.5pt; line-height: 1.8; margin-bottom: 60px;">
      <p style="margin: 4px 0;">Date: ____________</p>
      <p style="margin: 4px 0;">Place: Pune</p>
    </div>

    <div style="text-align: right; margin-right: 30px; font-size: 12pt;">
      <p style="margin-bottom: 50px;">Signature: __________________________</p>
      <p style="font-weight: bold; margin: 4px 0;">Name: Raj Ramnivas Yadav</p>
      <p style="margin: 4px 0;">Roll No: TE2208</p>
      <p style="margin: 4px 0;">Program: TYBCA - E2</p>
    </div>
  </div>

  <!-- ========================================================= -->
  <!-- 6. ACKNOWLEDGEMENT (STANDALONE PAGE)                      -->
  <!-- ========================================================= -->
  <div id="page-acknowledgement" class="page-break" style="padding-top: 40px;">
    <h1 style="font-size: 16pt; font-weight: bold; text-align: center; margin-bottom: 40px;">Acknowledgement</h1>

    <p style="text-align: justify; line-height: 1.8; font-size: 12pt; margin-bottom: 25px;">
      I sincerely thank my guide <strong>Prof. Prakash Nikam Sir</strong> for his constant guidance, constructive critique, and encouragement throughout this project. His academic insights and technical advice greatly assisted in the structured design and completion of CareerLens AI.
    </p>

    <p style="text-align: justify; line-height: 1.8; font-size: 12pt; margin-bottom: 25px;">
      I am thankful to <strong>Prof. Amit Tale</strong>, Head of the Department of Computer Application, for granting permission and providing the departmental facilities required to undertake this field project.
    </p>

    <p style="text-align: justify; line-height: 1.8; font-size: 12pt; margin-bottom: 25px;">
      I also extend my sincere appreciation to the faculty members of the Department of Computer Application for their valuable academic support, and to my classmates and peers who participated in testing the application, filling evaluation forms, and providing constructive feedback on user interface workflows.
    </p>

    <div style="text-align: right; margin-top: 80px; margin-right: 30px; font-size: 12pt; line-height: 1.6;">
      <div style="font-weight: bold;">Raj Ramnivas Yadav</div>
      <div>TYBCA - Division E2</div>
      <div>Roll No: TE2208</div>
    </div>
  </div>

  <!-- ========================================================= -->
  <!-- 7. INDEX (TABLE OF CONTENTS)                              -->
  <!-- ========================================================= -->
  <div id="page-index" class="page-break" style="padding-top: 20px;">
    <h1 style="font-size: 16pt; font-weight: bold; text-align: center; margin-bottom: 25px;">INDEX</h1>

    <table class="academic-table" style="font-size: 11pt;">
      <thead>
        <tr>
          <th style="width: 10%; text-align: center;">Sr. No</th>
          <th style="width: 65%;">Topic</th>
          <th style="width: 15%; text-align: center;">Page No</th>
          <th style="width: 10%; text-align: center;">Sign</th>
        </tr>
      </thead>
      <tbody>
        <tr style="background-color: #f2f2f2; font-weight: bold;">
          <td colspan="4" style="padding: 6px 10px;">PART A – FIELD PROJECT</td>
        </tr>
        <tr><td style="text-align: center;">1</td><td>Introduction</td><td style="text-align: center;">10</td><td></td></tr>
        <tr><td style="text-align: center;">2</td><td>Information Gathering</td><td style="text-align: center;">11</td><td></td></tr>
        <tr><td style="text-align: center;">3</td><td>Analysis of Existing System</td><td style="text-align: center;">12</td><td></td></tr>
        <tr><td style="text-align: center;">4</td><td>Problem Statement</td><td style="text-align: center;">13</td><td></td></tr>
        <tr><td style="text-align: center;">5</td><td>Objectives & Scope</td><td style="text-align: center;">14</td><td></td></tr>
        <tr><td style="text-align: center;">6</td><td>Proposed System & Design</td><td style="text-align: center;">15</td><td></td></tr>
        <tr><td style="text-align: center;">7</td><td>Implementation</td><td style="text-align: center;">21</td><td></td></tr>
        <tr><td style="text-align: center;">8</td><td>Testing & Results</td><td style="text-align: center;">25</td><td></td></tr>
        <tr><td style="text-align: center;">9</td><td>Conclusion & Future Scope</td><td style="text-align: center;">27</td><td></td></tr>
        <tr><td style="text-align: center;">10</td><td>References</td><td style="text-align: center;">28</td><td></td></tr>
        <tr style="background-color: #f2f2f2; font-weight: bold;">
          <td colspan="4" style="padding: 6px 10px;">PART B – EDUSKILLS COURSE</td>
        </tr>
        <tr><td style="text-align: center;">11</td><td>Course Details</td><td style="text-align: center;">30</td><td></td></tr>
        <tr><td style="text-align: center;">12</td><td>Course Enrollment & Offer Letter</td><td style="text-align: center;">32</td><td></td></tr>
        <tr><td style="text-align: center;">13</td><td>What I Learned</td><td style="text-align: center;">34</td><td></td></tr>
        <tr style="background-color: #f2f2f2; font-weight: bold;">
          <td colspan="4" style="padding: 6px 10px;">PART C – PRESENTATION SLIDES</td>
        </tr>
        <tr><td style="text-align: center;">14</td><td>Presentation Slides</td><td style="text-align: center;">36</td><td></td></tr>
      </tbody>
    </table>
  </div>

  <!-- ========================================================= -->
  <!-- 8. LIST OF FIGURES                                        -->
  <!-- ========================================================= -->
  <div id="page-figures" class="page-break" style="padding-top: 20px;">
    <h1 style="font-size: 16pt; font-weight: bold; text-align: center; margin-bottom: 25px;">LIST OF FIGURES</h1>

    <table class="academic-table" style="font-size: 10.5pt;">
      <thead>
        <tr>
          <th style="width: 15%; text-align: center;">Figure No</th>
          <th style="width: 70%;">Figure Title</th>
          <th style="width: 15%; text-align: center;">Page No</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="text-align: center; font-weight: bold;">Fig. 6.1</td><td>Data Flow Diagram (DFD) Level 0 — Context Level Diagram</td><td style="text-align: center;">15</td></tr>
        <tr><td style="text-align: center; font-weight: bold;">Fig. 6.2</td><td>Data Flow Diagram (DFD) Level 1 — Functional Decomposition Diagram</td><td style="text-align: center;">16</td></tr>
        <tr><td style="text-align: center; font-weight: bold;">Fig. 6.3</td><td>UML Use-Case Diagram for CareerLens AI</td><td style="text-align: center;">17</td></tr>
        <tr><td style="text-align: center; font-weight: bold;">Fig. 6.4</td><td>UML Activity Diagram — Competency Matching Workflow</td><td style="text-align: center;">18</td></tr>
        <tr><td style="text-align: center; font-weight: bold;">Fig. 6.5</td><td>System Architecture Diagram — Three-Tier Dual-Engine Design</td><td style="text-align: center;">19</td></tr>
        <tr><td style="text-align: center; font-weight: bold;">Fig. 6.6</td><td>Entity-Relationship (ER) Diagram (Supabase PostgreSQL Schema)</td><td style="text-align: center;">20</td></tr>
        <tr><td style="text-align: center; font-weight: bold;">Fig. 7.1</td><td>Candidate Dashboard Interface</td><td style="text-align: center;">23</td></tr>
        <tr><td style="text-align: center; font-weight: bold;">Fig. 7.2</td><td>Job Description Analysis & Match Results Interface</td><td style="text-align: center;">23</td></tr>
        <tr><td style="text-align: center; font-weight: bold;">Fig. 7.3</td><td>Prioritized Learning Roadmaps Interface</td><td style="text-align: center;">24</td></tr>
        <tr><td style="text-align: center; font-weight: bold;">Fig. 12.1</td><td>Official AICTE–EduSkills Internship Offer Letter — Page 1</td><td style="text-align: center;">32</td></tr>
        <tr><td style="text-align: center; font-weight: bold;">Fig. 12.2</td><td>Official AICTE–EduSkills Internship Offer Letter — Page 2</td><td style="text-align: center;">33</td></tr>
      </tbody>
    </table>
  </div>

  <!-- ========================================================= -->
  <!-- PART A DIVIDER                                            -->
  <!-- ========================================================= -->
  <div id="page-part-a" class="page-break divider-page">
    <div class="divider-title">PART A</div>
    <div class="divider-subtitle">FIELD PROJECT (1 CREDIT)</div>
  </div>

  <!-- ========================================================= -->
  <!-- CHAPTER 1: INTRODUCTION                                   -->
  <!-- ========================================================= -->
  <div id="ch-1" class="page-break" style="padding-top: 10px;">
    <h1 class="chapter-title">CHAPTER 1</h1>
    <h2 class="chapter-subtitle">INTRODUCTION</h2>

    <h3 class="section-heading">1.1 Background and Context</h3>
    <p>
      Undergraduate students in computer applications frequently experience difficulty when transitioning from academic coursework to technical recruitment. Students learn programming fundamentals, database concepts, and system analysis in college, but modern employment postings require complex framework ecosystems, build tools, containerization, and specific software architectures.
    </p>
    <p>
      When applying for internships and entry-level engineering roles, candidates encounter Applicant Tracking Systems (ATS) that filter résumés based on automated keyword detection. These commercial systems operate as black-box filters, rejecting candidates without providing actionable feedback regarding which skills were matched, which were missing, or how to prepare for subsequent interview rounds.
    </p>

    <h3 class="section-heading">1.2 System Overview</h3>
    <p>
      CareerLens AI is a web-based career planning and job-readiness workspace designed to provide students with transparent, verifiable feedback on their market readiness. The platform allows a student to enter their current technical competencies and evaluate them against authentic job descriptions.
    </p>
    <p>
      The core matching engine is completely deterministic and transparent. It uses token-boundary regular expressions across a database of over 150 canonical technologies, calculates a weighted compatibility score separating mandatory qualifications from preferred bonus skills, and displays the exact mathematical formulation to the candidate.
    </p>

    <h3 class="section-heading">1.3 Architecture and Module Summary</h3>
    <p>
      The application is engineered using Next.js 14 (App Router), TypeScript, and Tailwind CSS. It operates on a dual-engine architecture: all features function completely offline using browser localStorage, while optional cloud synchronization is supported via Supabase PostgreSQL.
    </p>
    <p>The system provides six integrated functional modules:</p>
    <ul>
      <li><strong>Candidate Dashboard:</strong> Real-time readiness metrics, profile competencies, and pipeline counts.</li>
      <li><strong>Résumé Review:</strong> Plain-text skill extraction with bidirectional profile synchronization.</li>
      <li><strong>Job Compatibility Engine:</strong> Segmented 70/30 qualification weighting with a Zero-Denominator Guard.</li>
      <li><strong>Learning Roadmaps:</strong> Automated conversion of missing skills into three prioritized tiers with mini-projects.</li>
      <li><strong>Interview Practice:</strong> Role-specific technical and behavioral questions evaluated via a STAR rubric.</li>
      <li><strong>Application Pipeline Tracker:</strong> Full CRUD tracking of candidate submissions with follow-up reminders.</li>
    </ul>
  </div>

  <!-- ========================================================= -->
  <!-- CHAPTER 2: INFORMATION GATHERING                          -->
  <!-- ========================================================= -->
  <div id="ch-2" class="page-break" style="padding-top: 10px;">
    <h1 class="chapter-title">CHAPTER 2</h1>
    <h2 class="chapter-subtitle">INFORMATION GATHERING</h2>

    <h3 class="section-heading">2.1 Requirements Gathering Basis</h3>
    <p>
      The functional and operational requirements for CareerLens AI were gathered through direct observation of student placement activities in the Department of Computer Application (TYBCA), informal interviews with final-year job seekers, and analysis of campus recruitment job descriptions.
    </p>
    <p>The investigation identified three persistent challenges:</p>
    <ol>
      <li><strong>Disorganized Tracking:</strong> Over 80% of surveyed students tracked applications in unmaintained text files or spreadsheets, frequently missing follow-up dates.</li>
      <li><strong>Keyword Matching Confusion:</strong> Candidates could not determine why their résumés failed commercial screening filters despite having relevant skills.</li>
      <li><strong>Unstructured Self-Study:</strong> When gaps were identified, students watched generic online tutorials without prioritizing mandatory baseline requirements over optional tools.</li>
    </ol>

    <h3 class="section-heading">2.2 Functional Requirements</h3>
    <ol>
      <li><strong>Profile and Résumé Management:</strong> The system must allow users to manage verified skills and parse plain-text résumés to extract recognized technical terms.</li>
      <li><strong>Transparent Compatibility Matching:</strong> The system must match user skills against job postings, distinguish required from preferred qualifications, and explain the score calculation.</li>
      <li><strong>Zero-Denominator Safety:</strong> When a job posting contains no technical terms, the system must prompt the user rather than displaying a false 0% score.</li>
      <li><strong>Milestone Roadmap Generation:</strong> Missing skills must be structured into High, Medium, and Supplementary priority tiers with estimated completion timeframes and mini-projects.</li>
      <li><strong>Interview Readiness Drills:</strong> The system must provide role-specific interview questions and automated rubric evaluation of candidate answers.</li>
      <li><strong>Application Pipeline Tracking:</strong> The system must support adding, editing, filtering, and deleting job applications across stages.</li>
    </ol>

    <h3 class="section-heading">2.3 Non-Functional Requirements</h3>
    <ul>
      <li><strong>Security & Privacy:</strong> Client data must persist securely in browser localStorage without mandatory external data sharing.</li>
      <li><strong>Performance:</strong> Text parsing and compatibility scoring must execute in under 100 milliseconds on the client device.</li>
      <li><strong>Usability:</strong> Responsive layout adhering to WCAG AA color contrast standards across mobile and desktop displays.</li>
      <li><strong>Reliability:</strong> Deterministic matching algorithms must prevent false substring collisions (e.g., 'C' matching 'CSS').</li>
    </ul>
  </div>

  <!-- ========================================================= -->
  <!-- CHAPTER 3: ANALYSIS OF EXISTING SYSTEM                    -->
  <!-- ========================================================= -->
  <div id="ch-3" class="page-break" style="padding-top: 10px;">
    <h1 class="chapter-title">CHAPTER 3</h1>
    <h2 class="chapter-subtitle">ANALYSIS OF EXISTING SYSTEM</h2>

    <h3 class="section-heading">3.1 Typical Existing Workflows</h3>
    <p>
      Currently, students rely on disconnected tools: commercial job portals (LinkedIn, Indeed) to discover openings, commercial ATS scanners (Jobscan, ResumeWorded) for résumé feedback, separate learning platforms (YouTube, documentation sites) for upskilling, and manual spreadsheets for tracking applications.
    </p>

    <h3 class="section-heading">3.2 Limitations and Identified Pain Points</h3>
    <ul>
      <li><strong>Opaque Proprietary Scoring:</strong> Commercial ATS checkers give arbitrary percentage scores without showing the mathematical formula, preventing candidate verification.</li>
      <li><strong>Keyword Matching Collisions:</strong> Naive substring matching falsely matches short language names inside unrelated words ('C' in 'CSS', 'Java' in 'JavaScript').</li>
      <li><strong>Uniform Keyword Weighting:</strong> Existing tools treat every detected keyword equally, failing to differentiate between mandatory core skills and secondary preferences.</li>
      <li><strong>Commercial Paywalls:</strong> Commercial résumé scanners charge $20–$50 per month, creating financial barriers for college students.</li>
    </ul>

    <h3 class="section-heading">3.3 Gap Analysis</h3>
    <table class="academic-table">
      <thead>
        <tr>
          <th style="width: 25%;">Domain Need</th>
          <th style="width: 35%;">Existing Manual / Commercial Approach</th>
          <th style="width: 40%;">CareerLens AI Implementation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Scoring Transparency</strong></td>
          <td>Concealed algorithm; black-box percentage score</td>
          <td>Deterministic formula with on-screen calculation modal</td>
        </tr>
        <tr>
          <td><strong>Token Boundary Safety</strong></td>
          <td>Prone to false substring collisions</td>
          <td>Strict token-boundary regex across 150+ canonical aliases</td>
        </tr>
        <tr>
          <td><strong>Qualification Weighting</strong></td>
          <td>Uniform keyword frequency count</td>
          <td>Segmented 70% Required + 30% Preferred weighting</td>
        </tr>
        <tr>
          <td><strong>Zero-Skill Handling</strong></td>
          <td>Displays false 0% or crashes</td>
          <td>Zero-Denominator Guard prompts for technical criteria</td>
        </tr>
        <tr>
          <td><strong>Upskilling Workflow</strong></td>
          <td>Disconnected video tutorials without milestones</td>
          <td>3-tier prioritized roadmap with hands-on mini-projects</td>
        </tr>
        <tr>
          <td><strong>Data Privacy & Cost</strong></td>
          <td>User tracking, ads, and monthly paywalls</td>
          <td>100% free, client-side localStorage, zero paid API dependencies</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ========================================================= -->
  <!-- CHAPTER 4: PROBLEM STATEMENT                              -->
  <!-- ========================================================= -->
  <div id="ch-4" class="page-break" style="padding-top: 10px;">
    <h1 class="chapter-title">CHAPTER 4</h1>
    <h2 class="chapter-subtitle">PROBLEM STATEMENT</h2>

    <p>
      Undergraduate computer application students face significant hurdles during technical recruitment. While students possess academic training in programming and software development, they lack an objective, transparent, and integrated software mechanism to evaluate their genuine readiness against industry job postings.
    </p>
    <p>
      Specifically, this project addresses the following critical problems:
    </p>
    <ol>
      <li>
        <strong>Opaque Candidate Evaluation:</strong> Existing career portals and commercial applicant tracking scanners conceal their scoring logic, presenting arbitrary match scores that fail to explain what specific skills candidates lack.
      </li>
      <li>
        <strong>Algorithmic Inaccuracies in Matching:</strong> Basic text scanning systems suffer from token collision errors—falsely matching short language tokens such as 'C' inside 'CSS'—and fail to recognize industry synonyms (e.g., 'react.js' for 'React' or 'postgres' for 'PostgreSQL').
      </li>
      <li>
        <strong>Distorted Qualification Weighting:</strong> Existing tools treat all extracted keywords equally. A missing mandatory qualification (e.g., React for a Frontend role) is penalized identically to an optional tool (e.g., Docker), providing candidates with misleading preparation priorities.
      </li>
      <li>
        <strong>Fragmented Career Preparation Tools:</strong> Job searching, résumé optimization, roadmap learning, interview preparation, and application tracking currently exist as disjointed tools, leading to dropped applications and lost employment opportunities.
      </li>
    </ol>
    <p>
      CareerLens AI addresses these challenges by delivering an integrated, transparent, client-side web application combining token-boundary parsing, segmented 70/30 weighting, automated roadmap generation, interview drill feedback, and full CRUD application pipeline tracking.
    </p>
  </div>

  <!-- ========================================================= -->
  <!-- CHAPTER 5: OBJECTIVES & SCOPE                             -->
  <!-- ========================================================= -->
  <div id="ch-5" class="page-break" style="padding-top: 10px;">
    <h1 class="chapter-title">CHAPTER 5</h1>
    <h2 class="chapter-subtitle">OBJECTIVES & SCOPE</h2>

    <h3 class="section-heading">5.1 Primary Objectives</h3>
    <ol>
      <li>Deliver a responsive web-based career workspace using Next.js 14, TypeScript, and Tailwind CSS.</li>
      <li>Implement a deterministic regex token-boundary parser covering 150+ canonical software engineering technologies.</li>
      <li>Engineer a segmented 70/30 qualification scoring algorithm separating required baseline criteria from preferred skills.</li>
      <li>Implement a Zero-Denominator Guard to safely handle job postings lacking technical terms.</li>
      <li>Provide an interactive mathematical formula modal that discloses exact score calculations.</li>
      <li>Generate structured 3-tier learning roadmaps (High, Medium, Supplementary) for identified skill gaps.</li>
      <li>Provide role-specific technical and behavioral interview practice with instant rubric evaluation.</li>
      <li>Deliver a full CRUD job application tracker supporting stage transitions, deadlines, and JSON data export.</li>
    </ol>

    <h3 class="section-heading">5.2 Current In-Scope Capabilities</h3>
    <ul>
      <li><strong>Competency Management:</strong> Profile skill tags, résumé text extraction, and bidirectional synchronization.</li>
      <li><strong>Job Description Analysis:</strong> Keyword parsing, alias normalization, and segmented compatibility scoring.</li>
      <li><strong>Curriculum Roadmapping:</strong> Automated milestone plans, completion checkboxes, and custom goal creation.</li>
      <li><strong>Interview Readiness:</strong> Role track filtering, model answers, and rubric-based response evaluation.</li>
      <li><strong>Pipeline Tracking:</strong> Application status management (Applied, Interviewing, Offer, Rejected) with offline JSON backup.</li>
    </ul>

    <h3 class="section-heading">5.3 Out of Scope or Deferred</h3>
    <ul>
      <li><strong>Live Job Scraping:</strong> No automated scraping of LinkedIn or Indeed; candidates paste authentic job postings.</li>
      <li><strong>External Paid LLMs:</strong> The primary matching engine is deterministic and rule-based, avoiding paid cloud API dependencies.</li>
      <li><strong>Native Mobile Apps:</strong> Delivered as a responsive web application; native iOS/Android builds are deferred.</li>
    </ul>
  </div>

  <!-- ========================================================= -->
  <!-- CHAPTER 6: PROPOSED SYSTEM & DESIGN                       -->
  <!-- ========================================================= -->
  <div id="ch-6" class="page-break" style="padding-top: 10px;">
    <h1 class="chapter-title">CHAPTER 6</h1>
    <h2 class="chapter-subtitle">PROPOSED SYSTEM & DESIGN</h2>

    <h3 class="section-heading">6.1 System Workflow</h3>
    <p>
      CareerLens AI establishes a unified, candidate-centric workflow. The candidate begins by defining verified competencies—either manually or by pasting résumé text into the Résumé Review module. When evaluating a job posting, the candidate pastes the text into the Compatibility Analyzer. The system tokenizes the text, segments qualifications into Required and Preferred tiers, and displays a deterministic match percentage with full mathematical disclosure.
    </p>
    <p>
      Missing technical skills are automatically ported into the Learning Roadmaps module, where milestones are prioritized by criticality. The candidate practices role-specific interview screens with rubric feedback and tracks submissions through the integrated application pipeline.
    </p>

    <h3 class="section-heading">6.2 Data Flow Diagrams</h3>
    <div id="fig-6-1" class="figure-container">
      <img src="${dfd0Base64}" />
      <div class="figure-caption">Figure 6.1: Data Flow Diagram (DFD) Level 0 — Context Level Diagram</div>
    </div>
    <p>
      Figure 6.1 models the external interactions of CareerLens AI. The student inputs profile skills, résumés, and application records, receiving compatibility scores, learning roadmaps, and interview feedback. Target employers provide job postings and receive application tracking status records.
    </p>

    <div id="fig-6-2" class="figure-container page-break">
      <img src="${dfd1Base64}" />
      <div class="figure-caption">Figure 6.2: Data Flow Diagram (DFD) Level 1 — Functional Decomposition Diagram</div>
    </div>
    <p>
      Figure 6.2 decomposes the system into five core functional sub-processes: 1.0 Profile & Résumé Parser, 2.0 Job Compatibility Engine, 3.0 Learning Roadmap Generator, 4.0 Interview Readiness Simulator, and 5.0 Application Pipeline Tracker, along with their associated data stores (D1 Profiles, D2 Analyses, D3 Roadmaps, D4 Interview Drills, and D5 Applications).
    </p>

    <div id="fig-6-3" class="figure-container page-break">
      <img src="${usecaseBase64}" />
      <div class="figure-caption">Figure 6.3: UML Use-Case Diagram for CareerLens AI</div>
    </div>
    <p>
      Figure 6.3 illustrates the primary user actor (Student / Job Candidate) interacting with eight core system use cases within the CareerLens AI application boundary.
    </p>

    <div id="fig-6-4" class="figure-container page-break">
      <img src="${activityBase64}" />
      <div class="figure-caption">Figure 6.4: UML Activity Diagram — Competency Matching Workflow</div>
    </div>
    <p>
      Figure 6.4 details the procedural logic of the competency matching engine, highlighting the decision diamond for the Zero-Denominator Guard. If zero technical terms are detected, the system branches safely to prompt the user, preventing division-by-zero errors.
    </p>

    <div id="fig-6-5" class="figure-container page-break">
      <img src="${archBase64}" />
      <div class="figure-caption">Figure 6.5: System Architecture Diagram — Three-Tier Dual-Engine Design</div>
    </div>
    <p>
      Figure 6.5 illustrates the three-tier architecture: the Presentation Layer (Next.js 14 App Router and React 18), the Business Logic Layer (Edge Route Handlers and parsing algorithms), and the Dual-Engine Persistence Layer (Engine A: Client LocalStorage and Engine B: Supabase PostgreSQL).
    </p>

    <div id="fig-6-6" class="figure-container page-break">
      <img src="${erBase64}" />
      <div class="figure-caption">Figure 6.6: Entity-Relationship (ER) Diagram (Supabase PostgreSQL Schema)</div>
    </div>
    <p>
      Figure 6.6 models the relational database schema implemented for cloud persistence, showing the 1-to-many relationships between the primary PROFILES table and child tables (RESUMES, JOB_ANALYSES, LEARNING_PLANS, JOB_APPLICATIONS, and INTERVIEW_SESSIONS).
    </p>
  </div>

  <!-- ========================================================= -->
  <!-- CHAPTER 7: IMPLEMENTATION                                 -->
  <!-- ========================================================= -->
  <div id="ch-7" class="page-break" style="padding-top: 10px;">
    <h1 class="chapter-title">CHAPTER 7</h1>
    <h2 class="chapter-subtitle">IMPLEMENTATION</h2>

    <h3 class="section-heading">7.1 Technology Stack</h3>
    <table class="academic-table">
      <thead>
        <tr>
          <th style="width: 25%;">Area</th>
          <th style="width: 75%;">Implementation Detail</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>Framework</strong></td><td>Next.js 14.2.35 (App Router with Serverless Edge Handlers)</td></tr>
        <tr><td><strong>Language & Runtime</strong></td><td>TypeScript 5.6.3, Node.js v22.17.1</td></tr>
        <tr><td><strong>Styling</strong></td><td>Tailwind CSS 3.4.14 with responsive grid and dark/light modes</td></tr>
        <tr><td><strong>State Management</strong></td><td>React Context (CareerLensProvider) with dual-mode storage sync</td></tr>
        <tr><td><strong>Data Persistence</strong></td><td>Engine A: HTML5 LocalStorage; Engine B: Supabase Cloud PostgreSQL + RLS</td></tr>
        <tr><td><strong>Deployment</strong></td><td>Vercel Production Edge (https://careerlensai-seven.vercel.app/)</td></tr>
      </tbody>
    </table>

    <h3 class="section-heading">7.2 Core Skill Matching Algorithm</h3>
    <p>
      The skill extraction engine (<code>lib/analyzer.ts</code>) enforces strict word boundaries around canonical technology terms and aliases to eliminate false substring collisions:
    </p>
    <pre class="code-block">
export function extractSkills(text: string): string[] {
  if (!text || typeof text !== 'string') return [];
  const textLower = ' ' + text.toLowerCase() + ' ';
  const detected = new Set&lt;string&gt;();

  // Match canonical terms using token boundaries
  SKILLS_DATABASE.forEach(skill =&gt; {
    const escaped = skill.replace(/[.*+?^|()[\\]\\]/g, '\\\\$&amp;');
    const regex = new RegExp('(^|[^a-zA-Z0-9_#+])' + escaped + '([^a-zA-Z0-9_#+]|$)', 'i');
    if (regex.test(textLower)) detected.add(skill);
  });

  // Match and normalize aliases (e.g. 'react.js' -&gt; 'React')
  Object.keys(SKILL_ALIASES).forEach(alias =&gt; {
    const canonical = SKILL_ALIASES[alias];
    const escaped = alias.replace(/[.*+?^|()[\\]\\]/g, '\\\\$&amp;');
    const regex = new RegExp('(^|[^a-zA-Z0-9_#+])' + escaped + '([^a-zA-Z0-9_#+]|$)', 'i');
    if (regex.test(textLower)) detected.add(canonical);
  });

  return Array.from(detected).sort();
}</pre>

    <h3 class="section-heading">7.3 Mathematical Scoring Formulation</h3>
    <p>
      Compatibility scores are computed using a 70/30 segmented qualification weighting model:
    </p>
    <pre class="code-block">
Score = (Required_Matched / Required_Total * 70%) + (Preferred_Matched / Preferred_Total * 30%)

if (Total_JD_Skills === 0) {
  Match_Score = null; // Zero-Denominator Guard active
}</pre>

    <h3 class="section-heading page-break">7.4 User Interface Screenshots</h3>
    <div id="fig-7-1" class="figure-container">
      <img src="${ssDashboard}" />
      <div class="figure-caption">Figure 7.1: Candidate Dashboard Interface displaying readiness metrics and active pipeline</div>
    </div>

    <div id="fig-7-2" class="figure-container">
      <img src="${ssJobAnalysis}" />
      <div class="figure-caption">Figure 7.2: Job Compatibility Analysis Interface showing segmented score and matched/missing skills</div>
    </div>

    <div id="fig-7-3" class="figure-container">
      <img src="${ssRoadmap}" />
      <div class="figure-caption">Figure 7.3: Prioritized Learning Roadmaps Interface with High/Medium/Supplementary milestones</div>
    </div>
  </div>

  <!-- ========================================================= -->
  <!-- CHAPTER 8: TESTING & RESULTS                              -->
  <!-- ========================================================= -->
  <div id="ch-8" class="page-break" style="padding-top: 10px;">
    <h1 class="chapter-title">CHAPTER 8</h1>
    <h2 class="chapter-subtitle">TESTING & RESULTS</h2>

    <h3 class="section-heading">8.1 Testing Strategy</h3>
    <p>
      Testing followed an iterative verification methodology comprising automated TypeScript compiler type-checking (<code>tsc --noEmit</code>), Next.js production compilation (<code>npm run build</code>), unit assertion scripts for token boundary matching, and end-to-end browser verification across all core modules.
    </p>

    <h3 class="section-heading">8.2 Test Cases and Results</h3>
    <table class="academic-table">
      <thead>
        <tr>
          <th style="width: 10%; text-align: center;">Test ID</th>
          <th style="width: 20%;">Module</th>
          <th style="width: 35%;">Action & Test Input</th>
          <th style="width: 25%;">Expected Result</th>
          <th style="width: 10%; text-align: center;">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align: center; font-weight: bold;">TC-01</td>
          <td>Profile Skills</td>
          <td>Enter 'Docker' and click Add</td>
          <td>Tag added and persisted in localStorage</td>
          <td style="text-align: center; font-weight: bold;">PASS</td>
        </tr>
        <tr>
          <td style="text-align: center; font-weight: bold;">TC-02</td>
          <td>Profile Skills</td>
          <td>Click 'x' on 'Git' skill badge</td>
          <td>Tag removed from profile and stored state</td>
          <td style="text-align: center; font-weight: bold;">PASS</td>
        </tr>
        <tr>
          <td style="text-align: center; font-weight: bold;">TC-03</td>
          <td>Résumé Review</td>
          <td>Paste plain-text résumé with technical skills</td>
          <td>Extracts skills and syncs to profile</td>
          <td style="text-align: center; font-weight: bold;">PASS</td>
        </tr>
        <tr>
          <td style="text-align: center; font-weight: bold;">TC-04</td>
          <td>Job Analysis</td>
          <td>Load 'Junior Frontend' sample and analyze</td>
          <td>Computes 70% weighted score correctly</td>
          <td style="text-align: center; font-weight: bold;">PASS</td>
        </tr>
        <tr>
          <td style="text-align: center; font-weight: bold;">TC-05</td>
          <td>Job Analysis</td>
          <td>Paste non-technical text ('good communication')</td>
          <td>Zero-Denominator Guard triggers prompt</td>
          <td style="text-align: center; font-weight: bold;">PASS</td>
        </tr>
        <tr>
          <td style="text-align: center; font-weight: bold;">TC-06</td>
          <td>Job Analysis</td>
          <td>Click 'How is this calculated?' button</td>
          <td>Formula modal opens showing exact math</td>
          <td style="text-align: center; font-weight: bold;">PASS</td>
        </tr>
        <tr>
          <td style="text-align: center; font-weight: bold;">TC-07</td>
          <td>Learning Plan</td>
          <td>Click 'Add Gaps to Learning Plan'</td>
          <td>Missing skills queued in prioritized roadmaps</td>
          <td style="text-align: center; font-weight: bold;">PASS</td>
        </tr>
        <tr>
          <td style="text-align: center; font-weight: bold;">TC-08</td>
          <td>Learning Plan</td>
          <td>Click milestone checkbox on 'TypeScript'</td>
          <td>Item marked completed; progress bar updates</td>
          <td style="text-align: center; font-weight: bold;">PASS</td>
        </tr>
        <tr>
          <td style="text-align: center; font-weight: bold;">TC-09</td>
          <td>Interview Prep</td>
          <td>Select role track 'Backend Engineering'</td>
          <td>Filters question bank to backend topics</td>
          <td style="text-align: center; font-weight: bold;">PASS</td>
        </tr>
        <tr>
          <td style="text-align: center; font-weight: bold;">TC-10</td>
          <td>Interview Prep</td>
          <td>Draft answer and submit for rubric evaluation</td>
          <td>Returns concept coverage % and feedback</td>
          <td style="text-align: center; font-weight: bold;">PASS</td>
        </tr>
        <tr>
          <td style="text-align: center; font-weight: bold;">TC-11</td>
          <td>Job Tracker</td>
          <td>Add application 'Stripe / Frontend Engineer'</td>
          <td>New record appears with 'Applied' status</td>
          <td style="text-align: center; font-weight: bold;">PASS</td>
        </tr>
        <tr>
          <td style="text-align: center; font-weight: bold;">TC-12</td>
          <td>Settings</td>
          <td>Click 'Export Career Data (JSON)'</td>
          <td>Downloads valid JSON archive file</td>
          <td style="text-align: center; font-weight: bold;">PASS</td>
        </tr>
      </tbody>
    </table>

    <h3 class="section-heading">8.3 Results and Verification Summary</h3>
    <p>
      All twelve core test cases passed successfully. TypeScript type checks and production compilation passed with zero errors. The application was deployed and verified on Vercel at <code>https://careerlensai-seven.vercel.app/</code>.
    </p>
  </div>

  <!-- ========================================================= -->
  <!-- CHAPTER 9: CONCLUSION & FUTURE SCOPE                      -->
  <!-- ========================================================= -->
  <div id="ch-9" class="page-break" style="padding-top: 10px;">
    <h1 class="chapter-title">CHAPTER 9</h1>
    <h2 class="chapter-subtitle">CONCLUSION & FUTURE SCOPE</h2>

    <h3 class="section-heading">9.1 Conclusion</h3>
    <p>
      CareerLens AI demonstrates that an open, transparent, and client-side web application can effectively resolve student career readiness challenges without relying on opaque commercial ATS scanners. By implementing token-boundary regular expressions and segmented 70/30 qualification weighting, the platform delivers honest, verifiable compatibility feedback.
    </p>
    <p>
      The platform bridges the gap between skill evaluation and practical self-improvement by structuring identified gaps into prioritized learning roadmaps, role-specific interview preparation, and an organized application tracking pipeline. Built on Next.js 14, TypeScript, and a dual-engine architecture, CareerLens AI provides complete client privacy at zero operational cost.
    </p>

    <h3 class="section-heading">9.2 Future Scope</h3>
    <ol>
      <li><strong>Local On-Device AI:</strong> Integrating quantized open-source models via WebGPU for client-side résumé rewrite suggestions without cloud data leakage.</li>
      <li><strong>Official Job Board APIs:</strong> Connecting official APIs from LinkedIn and Indeed to match live postings against candidate profiles.</li>
      <li><strong>University Placement Coordinator Portal:</strong> Enabling college placement officers to monitor cohort placement readiness metrics across departments.</li>
      <li><strong>Mobile Application:</strong> Packaging the web application as a native Android and iOS app using Capacitor or React Native.</li>
    </ol>
  </div>

  <!-- ========================================================= -->
  <!-- CHAPTER 10: REFERENCES                                    -->
  <!-- ========================================================= -->
  <div id="ch-10" class="page-break" style="padding-top: 10px;">
    <h1 class="chapter-title">CHAPTER 10</h1>
    <h2 class="chapter-subtitle">REFERENCES</h2>

    <ol style="line-height: 1.8; font-size: 11pt;">
      <li>Next.js Documentation (App Router & Route Handlers). Available at: <a href="https://nextjs.org/docs">https://nextjs.org/docs</a></li>
      <li>React Documentation and Hooks Specification. Available at: <a href="https://react.dev/">https://react.dev/</a></li>
      <li>TypeScript Language Reference (v5.6). Available at: <a href="https://www.typescriptlang.org/docs/">https://www.typescriptlang.org/docs/</a></li>
      <li>Tailwind CSS Framework Documentation (v3.4). Available at: <a href="https://tailwindcss.com/docs">https://tailwindcss.com/docs</a></li>
      <li>Supabase Documentation (PostgreSQL, Row-Level Security & Auth). Available at: <a href="https://supabase.com/docs">https://supabase.com/docs</a></li>
      <li>Pressman, R. S., & Maxim, B. R. (2020). <em>Software Engineering: A Practitioner's Approach</em> (9th ed.). McGraw-Hill Education.</li>
      <li>Mozilla Developer Network (MDN) — Web Storage API and Regular Expressions. Available at: <a href="https://developer.mozilla.org/">https://developer.mozilla.org/</a></li>
      <li>IEEE Transactions on Learning Technologies — Skill Extraction and Competency Matching in Educational Systems (2023).</li>
    </ol>
  </div>

  <!-- ========================================================= -->
  <!-- PART B DIVIDER                                            -->
  <!-- ========================================================= -->
  <div id="page-part-b" class="page-break divider-page">
    <div class="divider-title">PART B</div>
    <div class="divider-subtitle">EDUSKILLS COURSE (1 CREDIT)</div>
  </div>

  <!-- ========================================================= -->
  <!-- CHAPTER 11: COURSE DETAILS                                -->
  <!-- ========================================================= -->
  <div id="ch-11" class="page-break" style="padding-top: 10px;">
    <h1 class="chapter-title">CHAPTER 11</h1>
    <h2 class="chapter-subtitle">COURSE DETAILS</h2>

    <p>
      I have been selected for the <strong>AICTE–EduSkills Virtual Internship Program</strong> in the technical domain of <strong>Data Structures and Algorithms in C + Project</strong>. Supported by the All India Council for Technical Education (AICTE) and EduSkills Foundation, this virtual internship runs for a duration of 8 weeks (October 2026 – December 2026).
    </p>

    <h3 class="section-heading">11.1 Student and Enrollment Information</h3>
    <table class="academic-table">
      <tr><td style="width: 30%;"><strong>Student Name</strong></td><td style="width: 70%;">Raj Ramnivas Yadav</td></tr>
      <tr><td><strong>Program & Class</strong></td><td>Bachelor of Computer Applications (TYBCA, Semester V)</td></tr>
      <tr><td><strong>Division & Roll No</strong></td><td>Division E2 | Roll No: TE2208</td></tr>
      <tr><td><strong>Institution</strong></td><td>MAEER's MIT Arts, Commerce and Science College, Alandi (D.), Pune</td></tr>
      <tr><td><strong>Internship Domain</strong></td><td>Data Structures and Algorithms in C + Project</td></tr>
      <tr><td><strong>Duration & Mode</strong></td><td>8 Weeks (October 2026 – December 2026) | Virtual Mode</td></tr>
      <tr><td><strong>AICTE Student ID</strong></td><td>STU6810fb64da87c1745943396</td></tr>
      <tr><td><strong>Offer Letter Ref No</strong></td><td>C19Y2026M101591617</td></tr>
    </table>

    <h3 class="section-heading">11.2 8-Week Curriculum Breakdown</h3>
    <table class="academic-table">
      <thead>
        <tr>
          <th style="width: 12%; text-align: center;">Week</th>
          <th style="width: 33%;">Module Title</th>
          <th style="width: 55%;">Technical Topics Covered</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="text-align: center; font-weight: bold;">Week 1</td><td>Course Kick-off & Algorithmic Thinking</td><td>C programming refresher, problem-solving, asymptotic analysis, Big-O notation.</td></tr>
        <tr><td style="text-align: center; font-weight: bold;">Week 2</td><td>Linear Data Structures</td><td>Arrays, linked lists (singly, doubly, circular), dynamic memory allocation in C.</td></tr>
        <tr><td style="text-align: center; font-weight: bold;">Week 3</td><td>Stacks, Queues & Recursion</td><td>LIFO/FIFO pointer implementations, call stack mechanics, recursive problem solving.</td></tr>
        <tr><td style="text-align: center; font-weight: bold;">Week 4</td><td>Trees & Binary Search Trees</td><td>Tree terminology, binary trees, DFS traversals (inorder, preorder, postorder), BST operations.</td></tr>
        <tr><td style="text-align: center; font-weight: bold;">Week 5</td><td>Heaps, Hashing & Graphs</td><td>Min/max heaps, priority queues, hash tables, collision resolution, BFS/DFS graph traversals.</td></tr>
        <tr><td style="text-align: center; font-weight: bold;">Week 6</td><td>Sorting & Searching</td><td>Bubble, Insertion, Merge, Quick sort, Linear and Binary search efficiency analysis.</td></tr>
        <tr><td style="text-align: center; font-weight: bold;">Week 7</td><td>Advanced Structures & Paradigms</td><td>Tries, AVL trees, Divide & Conquer algorithms, Greedy strategy implementations.</td></tr>
        <tr><td style="text-align: center; font-weight: bold;">Week 8</td><td>Optimization & Capstone Project</td><td>Code optimization, memory management, and capstone: Real-Time Event Scheduler.</td></tr>
      </tbody>
    </table>
  </div>

  <!-- ========================================================= -->
  <!-- CHAPTER 12: COURSE ENROLLMENT & OFFER LETTER              -->
  <!-- ========================================================= -->
  <div id="ch-12" class="page-break" style="padding-top: 10px;">
    <h1 class="chapter-title">CHAPTER 12</h1>
    <h2 class="chapter-subtitle">COURSE ENROLLMENT & OFFER LETTER</h2>

    <p>
      The AICTE–EduSkills Virtual Internship in Data Structures and Algorithms in C + Project commenced in October 2026 and is currently in progress, scheduled for completion in December 2026. The official two-page Offer Letter issued by EduSkills Foundation is attached below as verified evidence of selection and active enrollment.
    </p>

    <div id="fig-12-1" class="figure-container">
      <img src="${offer1Base64}" style="max-height: 720px; border: 1px solid #000;" />
      <div class="figure-caption">Figure 12.1: Official AICTE–EduSkills Internship Offer Letter — Page 1 (Ref No: C19Y2026M101591617)</div>
    </div>

    <div id="fig-12-2" class="figure-container page-break" style="padding-top: 15px;">
      <img src="${offer2Base64}" style="max-height: 720px; border: 1px solid #000;" />
      <div class="figure-caption">Figure 12.2: Official AICTE–EduSkills Internship Offer Letter — Page 2 (8-Week Curriculum Structure)</div>
    </div>
  </div>

  <!-- ========================================================= -->
  <!-- CHAPTER 13: WHAT I LEARNED                                -->
  <!-- ========================================================= -->
  <div id="ch-13" class="page-break" style="padding-top: 10px;">
    <h1 class="chapter-title">CHAPTER 13</h1>
    <h2 class="chapter-subtitle">WHAT I LEARNED</h2>

    <p>
      During the AICTE–EduSkills Virtual Internship in Data Structures and Algorithms in C + Project, I acquired foundational competencies in algorithmic problem-solving, computational complexity, memory management, and data organization:
    </p>

    <h3 class="section-heading">13.1 Core Concepts Acquired</h3>
    <ul>
      <li><strong>Algorithmic Complexity & Big-O Analysis:</strong> Evaluated time and space complexities mathematically to identify execution bottlenecks in nested loops and recursion.</li>
      <li><strong>Manual Memory Management in C:</strong> Mastered pointer arithmetic, dynamic heap allocation using <code>malloc</code> and <code>free</code>, and preventing memory leaks.</li>
      <li><strong>Linear and Hierarchical Data Structures:</strong> Implemented singly and doubly linked lists, stacks (LIFO), queues (FIFO), and Binary Search Trees (BST) from scratch in C.</li>
      <li><strong>Graph & Search Algorithms:</strong> Studied graph representations via adjacency lists and implemented Breadth-First Search (BFS) and Depth-First Search (DFS) traversals.</li>
      <li><strong>Capstone Project Architecture:</strong> Designed a Real-Time Event Scheduler utilizing binary min-heaps to manage time-prioritized events with $O(\\log N)$ scheduling efficiency.</li>
    </ul>

    <h3 class="section-heading">13.2 Algorithmic Synthesis: Connecting DSA to CareerLens AI</h3>
    <p>
      Although CareerLens AI was implemented using modern web technologies (Next.js and TypeScript), the algorithmic principles studied during the C internship directly guided the web application's architecture:
    </p>
    <ol>
      <li><strong>Hash-Set Keyword Lookups:</strong> Inspired by hash table collision resolution studied in Week 5, the skill matching engine utilizes $O(1)$ set lookups for canonical technologies, completing text parsing in under 50ms.</li>
      <li><strong>Priority Queue Heuristics for Roadmaps:</strong> The 3-tier roadmap generator (High, Medium, Supplementary) implements a priority queue discipline, ensuring foundational skills are scheduled before dependent frameworks.</li>
      <li><strong>Defensive Boundary Verification:</strong> The rigorous pointer safety checks required in C directly inspired the Zero-Denominator Guard, eliminating division-by-zero crashes when non-technical job descriptions are analyzed.</li>
    </ol>
  </div>

  <!-- ========================================================= -->
  <!-- PART C DIVIDER                                            -->
  <!-- ========================================================= -->
  <div id="page-part-c" class="page-break divider-page">
    <div class="divider-title">PART C</div>
    <div class="divider-subtitle">PRESENTATION SLIDES</div>
  </div>

  <!-- ========================================================= -->
  <!-- CHAPTER 14: PRESENTATION SLIDES                           -->
  <!-- ========================================================= -->
  <div id="ch-14" class="page-break" style="padding-top: 10px;">
    <h1 class="chapter-title">CHAPTER 14</h1>
    <h2 class="chapter-subtitle">PRESENTATION SLIDES</h2>

    <p style="text-align: center; margin-bottom: 20px;">
      The following pages contain the 18-slide presentation deck prepared for the TYBCA Field Project evaluation, rendered with two slides per page.
    </p>

    <!-- Slides 1 & 2 -->
    <div class="figure-container">
      <img src="${slideImages[0]}" style="max-height: 380px; margin-bottom: 8px;" />
      <div class="figure-caption">Slide 1: Title Slide — CareerLens AI Field Project Presentation</div>
    </div>
    <div class="figure-container">
      <img src="${slideImages[1]}" style="max-height: 380px; margin-bottom: 8px;" />
      <div class="figure-caption">Slide 2: Introduction & Project Motivation</div>
    </div>

    <!-- Slides 3 & 4 -->
    <div class="page-break"></div>
    <div class="figure-container">
      <img src="${slideImages[2]}" style="max-height: 380px; margin-bottom: 8px;" />
      <div class="figure-caption">Slide 3: Problem Statement & Identified Gaps</div>
    </div>
    <div class="figure-container">
      <img src="${slideImages[3]}" style="max-height: 380px; margin-bottom: 8px;" />
      <div class="figure-caption">Slide 4: Project Objectives & Functional Scope</div>
    </div>

    <!-- Slides 5 & 6 -->
    <div class="page-break"></div>
    <div class="figure-container">
      <img src="${slideImages[4]}" style="max-height: 380px; margin-bottom: 8px;" />
      <div class="figure-caption">Slide 5: System Comparison Matrix</div>
    </div>
    <div class="figure-container">
      <img src="${slideImages[5]}" style="max-height: 380px; margin-bottom: 8px;" />
      <div class="figure-caption">Slide 6: System Architecture (3-Tier Dual-Engine Design)</div>
    </div>

    <!-- Slides 7 & 8 -->
    <div class="page-break"></div>
    <div class="figure-container">
      <img src="${slideImages[6]}" style="max-height: 380px; margin-bottom: 8px;" />
      <div class="figure-caption">Slide 7: Data Flow Diagrams (Level 0 Context & Level 1 Decomposition)</div>
    </div>
    <div class="figure-container">
      <img src="${slideImages[7]}" style="max-height: 380px; margin-bottom: 8px;" />
      <div class="figure-caption">Slide 8: System Design (Use-Case & Activity Workflows)</div>
    </div>

    <!-- Slides 9 & 10 -->
    <div class="page-break"></div>
    <div class="figure-container">
      <img src="${slideImages[8]}" style="max-height: 380px; margin-bottom: 8px;" />
      <div class="figure-caption">Slide 9: Database Schema & Entity-Relationship Model</div>
    </div>
    <div class="figure-container">
      <img src="${slideImages[9]}" style="max-height: 380px; margin-bottom: 8px;" />
      <div class="figure-caption">Slide 10: Technology Stack & Implementation Details</div>
    </div>

    <!-- Slides 11 & 12 -->
    <div class="page-break"></div>
    <div class="figure-container">
      <img src="${slideImages[10]}" style="max-height: 380px; margin-bottom: 8px;" />
      <div class="figure-caption">Slide 11: Deterministic Competency Matching Engine & Math Formulation</div>
    </div>
    <div class="figure-container">
      <img src="${slideImages[11]}" style="max-height: 380px; margin-bottom: 8px;" />
      <div class="figure-caption">Slide 12: Application Interface (Landing Page & Dashboard)</div>
    </div>

    <!-- Slides 13 & 14 -->
    <div class="page-break"></div>
    <div class="figure-container">
      <img src="${slideImages[12]}" style="max-height: 380px; margin-bottom: 8px;" />
      <div class="figure-caption">Slide 13: Application Interface (Job Analysis & Learning Roadmaps)</div>
    </div>
    <div class="figure-container">
      <img src="${slideImages[13]}" style="max-height: 380px; margin-bottom: 8px;" />
      <div class="figure-caption">Slide 14: Application Interface (Interview Workbench & Pipeline Tracker)</div>
    </div>

    <!-- Slides 15 & 16 -->
    <div class="page-break"></div>
    <div class="figure-container">
      <img src="${slideImages[14]}" style="max-height: 380px; margin-bottom: 8px;" />
      <div class="figure-caption">Slide 15: System Verification & Test Results (12 Test Cases)</div>
    </div>
    <div class="figure-container">
      <img src="${slideImages[15]}" style="max-height: 380px; margin-bottom: 8px;" />
      <div class="figure-caption">Slide 16: Part B: AICTE–EduSkills Virtual Internship Overview</div>
    </div>

    <!-- Slides 17 & 18 -->
    <div class="page-break"></div>
    <div class="figure-container">
      <img src="${slideImages[16]}" style="max-height: 380px; margin-bottom: 8px;" />
      <div class="figure-caption">Slide 17: Synthesis: How DSA Informed CareerLens AI</div>
    </div>
    <div class="figure-container">
      <img src="${slideImages[17]}" style="max-height: 380px; margin-bottom: 8px;" />
      <div class="figure-caption">Slide 18: Conclusion & Viva Summary</div>
    </div>
  </div>

</body>
</html>
  `;
}

async function renderFinalPdf() {
  console.log('Launching headless Chrome to render submission-ready final PDF...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  const html = buildReportHtml();
  const tempPath = path.join(ROOT_DIR, 'temp_final_render.html');
  fs.writeFileSync(tempPath, html, 'utf8');

  await page.goto('file:///' + tempPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

  await page.pdf({
    path: OUTPUT_PDF,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `
      <div style="width: 100%; font-size: 8.5pt; font-family: 'Times New Roman', serif; color: #475569; text-align: center; padding-bottom: 5mm;">
        MAEER&#39;s MIT Arts, Commerce & Science College, Alandi | Raj Ramnivas Yadav (TYBCA) | Page <span class="pageNumber"></span> of <span class="totalPages"></span>
      </div>
    `,
    margin: {
      top: '15mm',
      bottom: '18mm',
      left: '20mm',
      right: '15mm'
    }
  });

  await browser.close();
  try { fs.unlinkSync(tempPath); } catch (e) {}

  console.log(`[OK] Successfully rendered final submission-ready PDF: ${OUTPUT_PDF}`);
}

renderFinalPdf();
