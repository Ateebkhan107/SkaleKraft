# SkaleKraft

Production website for SkaleKraft at `https://skalekraft.in`.

## Local Development

```bash
npm install
npm run dev
```

## Production Checks

```bash
npm run lint
npm run build
npm audit --omit=dev
```

## Required Vercel Environment Variables

```env
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL_TO=ateeb@skalekraft.in
CONTACT_EMAIL_FROM=SkaleKraft <ateeb@skalekraft.in>
JOIN_EMAIL_TO=ateeb@skalekraft.in
NEXT_PUBLIC_SITE_URL=https://skalekraft.in
```

Do not commit `.env.local` or real API keys.
