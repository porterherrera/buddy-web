# Buddy — Fitness Accountability App (Web)

## The Pitch
Miss your workout. Pay your friend.

## How It Works
1. You and a friend both sign up
2. You each set your weekly commitment (e.g. "gym 5x this week")
3. You agree on a penalty amount (e.g. $20 per missed session)
4. Every workout, you check in: GPS location + photo proof
5. End of week: if you missed any sessions, automatic payment goes to your buddy
6. Buddy confirms or disputes check-ins

## Monetization
- 3% fee on every penalty payment processed
- Premium: $4.99/month for groups larger than 2 people

## Proof System
- GPS check-in (browser geolocation API)
- Photo upload (camera or file)
- Buddy can approve or dispute any check-in
- If disputed, the check-in doesn't count

## Pages
1. **Landing page** — headline, how it works, CTA
2. **Signup** — email + password + Stripe Connect onboarding
3. **Dashboard** — this week's commitments, check-in button, buddy status
4. **Check-in flow** — GPS + photo capture → submit
5. **Buddy pairing** — invite link system
6. **End of week settlement** — payment processing

## Stripe Connect
- Each user connects their bank via Stripe Connect Express
- Penalty payments go directly from loser to winner
- We take 3% on each transaction
- Stripe handles KYC/compliance

## Stack
- Next.js + Tailwind
- Supabase (auth + database)
- Stripe Connect
- Browser Geolocation API
- Vercel hosting

## Database Schema
- users: id, email, stripe_account_id, created_at
- buddies: id, user1_id, user2_id, penalty_amount, created_at
- commitments: id, user_id, buddy_id, activity, sessions_per_week, week_start
- checkins: id, user_id, commitment_id, photo_url, lat, lng, timestamp, status (pending/approved/disputed)
- settlements: id, buddy_id, week_start, payer_id, payee_id, amount, fee, status

## Design
- Clean, mobile-first
- Green accent (#10b981) — fitness/growth
- Dark theme
- Bold typography
- Feels like a premium fitness app
