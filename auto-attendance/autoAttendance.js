import { chromium } from 'playwright';
import 'dotenv/config';
import cron from 'node-cron'

async function submitAttendance() {
  console.log('Starting attendance submission...');
  const browser = await chromium.launch({
    headless: false  
  });

  const context = await browser.newContext({
    geolocation: { latitude: -8.0106474, longitude: 111.9395686 }, 
    permissions: ['geolocation', 'camera']
  });

  try {
    const page = await context.newPage();
    
    await page.goto(`${process.env.BASE_URL}/login`, { timeout: 30000 });
    
    // Login
    console.log('Attempting login...');
    await page.fill('#email', process.env.USER_EMAIL || 'email@mail.com');
    await page.fill('#password', process.env.USER_PASSWORD || '1234');
    await page.click('button[type="submit"]');

    // Submit attendance
    await page.goto(`${process.env.BASE_URL}/submit-attendance`, { timeout: 30000 });

    // wait for video until ready
    await page.waitForFunction(() => {
        const video = document.querySelector('video');
        return video && video.readyState === 4;
    });

    await page.click('#btnSubmit');
    
  } catch (error) {
    console.error('Failed auto attendance:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
  } finally {
    await browser.close();
  }
}

cron.schedule('0 9 * * 1-5', submitAttendance);

cron.schedule('0 18 * * 1-5', submitAttendance);