const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.join(__dirname, '..', 'report_assets', 'screenshots');
const BASE_URL = 'http://localhost:3000'; // local server is running live; highly reliable and identical to vercel

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function capture() {
  console.log('🚀 Launching headless Chrome via puppeteer-core...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
    defaultViewport: { width: 1440, height: 900 }
  });

  const page = await browser.newPage();

  // Helper to take screenshot
  async function snap(fileName, waitMs = 800) {
    if (waitMs > 0) await new Promise(r => setTimeout(r, waitMs));
    const filePath = path.join(OUTPUT_DIR, fileName);
    await page.screenshot({ path: filePath, fullPage: false });
    console.log(`📸 Saved: ${fileName}`);
  }

  try {
    // 1. Landing Page
    console.log('Navigating to Landing Page...');
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
    await snap('01_landing_page.png');

    // 2. Sign In Page
    console.log('Navigating to Sign In Page...');
    await page.goto(`${BASE_URL}/auth/signin`, { waitUntil: 'networkidle2' });
    await snap('15_auth_signin.png');

    // 3. Dashboard (Load sample data first)
    console.log('Navigating to Dashboard...');
    await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'networkidle2' });
    // Click "Load Realistic Sample Data" button if present
    try {
      const demoBtn = await page.$('button ::-p-text(Load Demo Dataset)');
      if (demoBtn) await demoBtn.click();
    } catch(e) {}
    await snap('02_dashboard.png');

    // 4. Job Analysis View (Initial)
    console.log('Navigating to Job Analysis...');
    await page.goto(`${BASE_URL}/analysis`, { waitUntil: 'networkidle2' });
    await snap('03_job_analysis_input.png');

    // Run analysis on sample JD
    try {
      const runBtn = await page.$('button ::-p-text(Run Compatibility Analysis)');
      if (runBtn) {
        await runBtn.click();
        await new Promise(r => setTimeout(r, 1200));
        await snap('04_job_analysis_results.png');
      }
    } catch(e) {}

    // Test zero-denominator guard
    try {
      await page.$eval('textarea', el => el.value = 'We are looking for a rockstar guru with positive vibes.');
      const runBtn2 = await page.$('button ::-p-text(Run Compatibility Analysis)');
      if (runBtn2) {
        await runBtn2.click();
        await new Promise(r => setTimeout(r, 1000));
        await snap('05_zero_denominator_guard.png');
      }
    } catch(e) {}

    // 5. Learning Plan
    console.log('Navigating to Learning Plan...');
    await page.goto(`${BASE_URL}/learning-plan`, { waitUntil: 'networkidle2' });
    await snap('06_learning_roadmaps.png');

    // Open Add Custom Goal modal
    try {
      const addGoalBtn = await page.$('button ::-p-text(Add Custom Goal)');
      if (addGoalBtn) {
        await addGoalBtn.click();
        await snap('07_custom_goal_modal.png', 400);
        const cancelBtn = await page.$('button ::-p-text(Cancel)');
        if (cancelBtn) await cancelBtn.click();
      }
    } catch(e) {}

    // 6. Interview Practice
    console.log('Navigating to Interview Practice...');
    await page.goto(`${BASE_URL}/interview`, { waitUntil: 'networkidle2' });
    await snap('08_interview_practice.png');

    // Practise Answer on first question
    try {
      const practiceBtn = await page.$('button ::-p-text(Practise Answer)');
      if (practiceBtn) {
        await practiceBtn.click();
        await new Promise(r => setTimeout(r, 400));
        const textarea = await page.$('textarea');
        if (textarea) {
          await textarea.type('The event loop coordinates the call stack and microtask queues, executing promises before macrotasks like setTimeout.');
          const evalBtn = await page.$('button ::-p-text(Evaluate Response)');
          if (evalBtn) {
            await evalBtn.click();
            await snap('09_interview_evaluation.png', 1000);
          }
        }
      }
    } catch(e) {}

    // 7. Applications Tracker
    console.log('Navigating to Applications Tracker...');
    await page.goto(`${BASE_URL}/applications`, { waitUntil: 'networkidle2' });
    await snap('10_application_tracker.png');

    // Open Add Application modal
    try {
      const addAppBtn = await page.$('button ::-p-text(Add Application)');
      if (addAppBtn) {
        await addAppBtn.click();
        await snap('11_add_application_modal.png', 400);
        const cancelBtn = await page.$('button ::-p-text(Cancel)');
        if (cancelBtn) await cancelBtn.click();
      }
    } catch(e) {}

    // 8. Analytics View
    console.log('Navigating to Analytics...');
    await page.goto(`${BASE_URL}/analytics`, { waitUntil: 'networkidle2' });
    await snap('12_readiness_analytics.png');

    // 9. Résumé Review
    console.log('Navigating to Résumé Review...');
    await page.goto(`${BASE_URL}/resume`, { waitUntil: 'networkidle2' });
    await snap('13_resume_review.png');

    // 10. Settings & Portability
    console.log('Navigating to Settings...');
    await page.goto(`${BASE_URL}/settings`, { waitUntil: 'networkidle2' });
    await snap('14_settings_workspace.png');

    console.log('🎉 All screenshots captured successfully!');
  } catch (err) {
    console.error('Error during screenshot capture:', err);
  } finally {
    await browser.close();
  }
}

capture();
