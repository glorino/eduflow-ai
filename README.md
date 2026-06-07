# EduFlow AI

Enterprise Education ERP powered by AI for smart school management.

## Technology Stack

- **Frontend**: Next.js 15, TypeScript, TailwindCSS
- **Mobile**: React Native Expo
- **Database**: Neon PostgreSQL (Prisma ORM)
- **AI**: OpenAI Agents SDK
- **Deployment**: Vercel

## Features

- 10 AI Agents (Admission, Academic, Attendance, Finance, CBT, Parent Communication, Library, Discipline, Alumni, Reporting)
- 13 Business Modules
- Multi-campus, Multi-session, Multi-term support
- Nursery, Primary, Secondary, College levels
- Hybrid/Form Teacher/Subject Specialist models
- Workflow Engine
- Multi-channel Notifications
- Mobile App (React Native Expo)

## Quick Start

```bash
# Install dependencies
npm install

# Setup database
npx prisma generate
npx prisma db push
npx prisma db seed

# Start development
npm run dev
```

## Mobile Setup

```bash
cd mobile
npm install
npx expo start
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
JWT_SECRET="..."
OPENAI_API_KEY="sk-..."
```

## Deployment

### Vercel

1. Push to GitHub
2. Import repository on Vercel
3. Configure environment variables
4. Deploy

### Mobile

```bash
cd mobile
npx eas build --platform ios
npx eas build --platform android
```

## Documentation

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for complete system architecture.

## License

MIT
