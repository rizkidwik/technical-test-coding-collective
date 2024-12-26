# Auto Attendance Using Playwright

This automation auto attendance for this system. Its only just run one line code and you can automate your attendance.

## Requirement
- Playwright - for auto attendance using browser from playwright
- node-cron - for auto scheduling function
- dotenv - for environment variables


## Running Automation Attendance :
```bash
npm install
node autoAttendance.js
```

Copy .env.example
```
cp .env.example .env
```
and adjust .env with your url, email & password for automation attendance

## Set schedule for auto attendance
The auto attendance will run on 09:00 and 18:00 on Monday to Friday

```
cron.schedule('0 9 * * 1-5', submitAttendance);

cron.schedule('0 18 * * 1-5', submitAttendance);
```
