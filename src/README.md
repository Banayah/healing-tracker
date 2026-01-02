# Healing Journey Tracker

A comprehensive web application to track your healing journey, including herbs, foods, daily wellness metrics, and health testing reminders.

## Features

### 📊 Dashboard
- Overview of all your wellness metrics
- Track average sleep, stress levels, and workout streaks
- View recent journal entries at a glance
- Monitor your consistency rate

### 🌿 Herbs & Foods Catalog
- **Foods**: Track lysine vs arginine levels per serving
- **Herbs**: Manage purchase history with source and pricing
- Full CRUD operations for all items
- Filter by type (herbs/foods)
- View lysine scores for foods

### 📖 Daily Journal
- Log sleep hours and quality
- Track workouts with type and duration
- Monitor stress levels (1-5 scale)
- Record daily notes
- Track which herbs and foods you consumed
- **Lysine Score Calculator**: Automatically calculates if you have a positive lysine score for the day

### 📅 Consistency Tracker
- Visual calendar showing tracked days
- Current and longest streak tracking
- Weekly and monthly consistency percentages
- View detailed entry information for any date

### 🩺 Testing Tracker
- Set up recurring health test reminders (default: 3 months/90 days)
- Get alerts for upcoming tests (within 2 weeks)
- Mark tests as complete to auto-schedule next test
- Track last test date and notes

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **VS Code** - [Download here](https://code.visualstudio.com/)
- **npm** or **yarn** package manager (comes with Node.js)

## Getting Started

### 1. Open the Project in VS Code

```bash
# Navigate to your project directory
cd path/to/healing-journey-tracker

# Open in VS Code
code .
```

### 2. Install Dependencies

Open the integrated terminal in VS Code:
- **Windows/Linux**: `Ctrl + ~`
- **Mac**: `Cmd + ~`

Then run:

```bash
npm install
```

Or if you prefer yarn:

```bash
yarn install
```

### 3. Start the Development Server

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

The application will start and you should see output like:

```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 4. View the Application

Open your browser and navigate to `http://localhost:5173/`

The app will automatically reload when you make changes to the code.

## Project Structure

```
healing-journey-tracker/
├── components/
│   ├── ui/                      # Shadcn UI components
│   ├── Dashboard.tsx            # Dashboard overview
│   ├── HerbsAndFoods.tsx        # Herbs & foods catalog
│   ├── DailyJournal.tsx         # Daily wellness journal
│   ├── ConsistencyTracker.tsx   # Consistency tracking
│   └── TestingTracker.tsx       # Health testing reminders
├── lib/
│   └── storage.ts               # Local storage utilities (will be replaced with Supabase)
├── styles/
│   └── globals.css              # Global styles and Tailwind config
├── App.tsx                      # Main application component
└── README.md                    # This file
```

## Technology Stack

- **React** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Styling
- **Shadcn/ui** - UI component library
- **Lucide React** - Icons
- **Vite** - Build tool and dev server
- **Local Storage** - Current data persistence (temporary)

## Data Storage

Currently, all data is stored in your browser's **Local Storage**. This means:
- ✅ Data persists when you refresh the page
- ✅ No backend required for development
- ⚠️ Data is only available on the device/browser you're using
- ⚠️ Clearing browser data will delete all entries

### Planned: Supabase Integration

The app is designed to integrate with Supabase for:
- Cross-device data synchronization
- Secure cloud storage
- Real-time updates
- Data backup and recovery

## Development Workflow in VS Code

### Recommended VS Code Extensions

1. **ES7+ React/Redux/React-Native snippets** - For React snippets
2. **Tailwind CSS IntelliSense** - For Tailwind class autocomplete
3. **TypeScript Vue Plugin (Volar)** - For better TypeScript support
4. **Prettier** - Code formatting
5. **ESLint** - Code linting

### Making Changes

1. **Edit Component Files**: Navigate to `/components` and edit any `.tsx` file
2. **Auto-Save**: Enable auto-save in VS Code (File → Auto Save)
3. **Hot Reload**: Changes will automatically reflect in the browser
4. **TypeScript Errors**: Check the Problems panel (`Ctrl/Cmd + Shift + M`)

### Common Tasks

#### Adding a New Component

```bash
# Create a new component file
/components/YourComponent.tsx
```

```tsx
import { Card } from "./ui/card";

export function YourComponent() {
  return (
    <Card>
      {/* Your component code */}
    </Card>
  );
}
```

#### Importing Data Functions

```tsx
import { getHerbsFoods, saveHerbFood } from "../lib/storage";
```

#### Using Shadcn UI Components

All UI components are in `/components/ui`. Import them like:

```tsx
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
```

## Usage Guide

### Adding Herbs & Foods

1. Navigate to the **Herbs & Foods** tab
2. Click **Add Item**
3. For **Foods**: Enter lysine and arginine values (in mg per serving)
4. For **Herbs**: Add purchase records with source and price

### Daily Journaling

1. Go to **Daily Journal** tab
2. Select the date (defaults to today)
3. Enter your metrics:
   - Sleep hours and quality
   - Workout details (if applicable)
   - Stress level
   - Notes
4. Select consumed herbs/foods
5. View your **Daily Lysine Score** (foods only)
6. Click **Save Entry**

### Tracking Consistency

1. Visit **Consistency** tab
2. View your current streak and longest streak
3. Click on calendar dates to see entry details
4. Monitor weekly and monthly consistency percentages

### Setting Up Testing Reminders

1. Go to **Testing** tab
2. Click **Add Test Reminder**
3. Enter test type (e.g., "Blood Work")
4. Set frequency (default: 90 days for 3 months)
5. Optionally add notes
6. When you complete a test, click **Mark Complete**
7. The next test will be automatically scheduled

## Tips for Positive Lysine Score

**High Lysine Foods** (to increase):
- Chicken, turkey, fish
- Dairy products (cheese, yogurt, milk)
- Eggs
- Legumes (beans, lentils)

**High Arginine Foods** (to limit):
- Nuts (especially peanuts, walnuts)
- Seeds (pumpkin, sesame)
- Chocolate
- Whole grains

Aim for a **positive lysine score** daily by consuming more lysine than arginine.

## Troubleshooting

### Port Already in Use

If port 5173 is already in use:

```bash
npm run dev -- --port 3000
```

### Clear Local Storage

To reset all data:
1. Open browser DevTools (F12)
2. Go to Application → Local Storage
3. Clear all entries
4. Refresh the page

### TypeScript Errors

```bash
# Check for errors
npm run type-check

# If using VS Code, restart the TypeScript server:
# Ctrl/Cmd + Shift + P → "TypeScript: Restart TS Server"
```

## Building for Production

```bash
npm run build
```

The built files will be in the `/dist` directory.

## Future Enhancements

- [ ] Supabase backend integration
- [ ] Data export/import functionality
- [ ] Charts and graphs for trends
- [ ] Email/SMS reminders for testing
- [ ] Mobile app version
- [ ] Photo uploads for meals
- [ ] Custom herb/food database with nutritional info

## Contributing

This is a personal project for tracking your healing journey. Feel free to:
- Add new features
- Customize tracking metrics
- Modify the UI/UX to your preferences
- Integrate with other health tracking tools

## License

This project is for personal use.

## Support

For issues or questions:
1. Check the browser console for errors (F12)
2. Review the TypeScript errors in VS Code
3. Verify all dependencies are installed
4. Ensure you're using Node.js v16+

---

**Start your healing journey today! 🌱**
