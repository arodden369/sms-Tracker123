# sms-Tracker123# 
📱 SMS Outreach Tracker

Track your B2B contractor outreach pipeline: SMS → Reply → Call → Qualified
## Deploy to Vercel

1. Push this code to a GitHub repo
2. Go to vercel.com/new and import the repo
3. Framework: Next.js (auto-detected)
4. Deploy
5. Add Vercel KV storage in dashboard
6. Redeploy

## Usage

1. **Add Record** - Log contractor after sending SMS
2. **Dashboard** - View stats and pipeline
3. **Edit Record** - Update when they reply / you call
4. **Follow-ups** - See who needs a callback

## Data Model

- Contractor info (name, business, niche, state, phone)
- SMS status (sent, reply received)
- Call status (attempted, picked up)
- Outcome (qualified, not interested, callback, etc.)
