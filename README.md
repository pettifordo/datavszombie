# 🌻 Data vs. Zombies

A gamified data stewardship UI inspired by Plants vs. Zombies. Help data stewards cultivate healthy, thriving data gardens while defending against the zombie apocalypse of poor data quality!

## 🎮 Features

- **Your Garden** — Individual steward view showing their data assets as plants
  - Plant health reflects data quality metrics (freshness, lineage, anomalies)
  - Visual indicators for zombie attacks (quality issues)
  - Animated plant growth stages from seed to full bloom
  
- **Flower Show** — Leaderboard ranking all stewards' gardens
  - Compare gardens ranked best to worst
  - See which stewards are winning the data quality battle
  - Medals and visual rankings
  
- **Real-time Metrics**
  - Health Score: Overall data quality
  - Freshness: How current is the data
  - Lineage Quality: Data traceability
  - Anomalies: Quality issues detected

## 🚀 Getting Started

### Development

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

### Build for Production

```bash
npm run build
npm run start
```

## 🏗️ Architecture

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for smooth animations
- Mock data in `/src/lib/mockData.ts` (replace with real API integration)

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx           # Main navigation & view switcher
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── Plant.tsx          # Individual plant/asset card
│   ├── GardenView.tsx     # Single steward's garden
│   └── FlowerShow.tsx     # Leaderboard view
└── lib/
    ├── types.ts           # TypeScript types
    └── mockData.ts        # Demo data (5 stewards, 3 assets each)
```

## 🎨 Plant Health Stages

- 🌻 **Flourishing** (85-100%) - Excellent data quality
- 🌺 **Blooming** (70-84%) - Good data health
- 🌾 **Growing** (55-69%) - Acceptable but needs attention
- 🌿 **Sprouting** (40-54%) - Weak, urgent care needed
- 🍃 **Wilting** (20-39%) - Critical condition
- 💀 **Dead** (0-19%) - Failed data asset

## 🔧 Customization

### Adding Real Data

Replace the mock data in `src/lib/mockData.ts` with API calls to your data platform:

```typescript
// Example: fetch from your API
const stewards = await fetch('/api/stewards').then(r => r.json());
```

### Styling

All components use Tailwind CSS. Customize colors and animations in the component files.

## 📦 Dependencies

- `next` - React framework
- `framer-motion` - Animations
- `lucide-react` - Icons
- `typescript` - Type safety
- `tailwindcss` - Styling

## 🚀 Deploy on Vercel

The easiest way to deploy:

1. Push to GitHub (already done: `https://github.com/pettifordo/datavszombie.git`)
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import the GitHub repository
5. Click "Deploy"

That's it! Your app will be live at a Vercel URL.

For detailed instructions, see [Next.js Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying)
