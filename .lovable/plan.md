
# Create a `/demo` Route for Iframe Embedding

## Overview
Create a dedicated `/demo` page that auto-cycles through the key screens of the app (Job Dashboard, Candidate Review, Pipeline) with smooth transitions, creating a hands-off product tour perfect for embedding in your WordPress Elementor landing page.

## How It Will Work
- The `/demo` route renders a self-contained walkthrough that automatically transitions between 3 key views every few seconds
- Each "slide" shows a real screenshot-like render of the actual page content
- A progress indicator at the bottom shows which step is active
- The demo loops continuously, making it perfect for an always-running embed
- Navigation elements (back button, user menu) are hidden or made non-interactive to keep it clean

## Demo Flow (3 Steps, ~5s each)

```text
+-------------------+     +-------------------+     +-------------------+
|  Step 1: Job      |     |  Step 2: Candidate |     |  Step 3: Pipeline |
|  Dashboard        | --> |  Review            | --> |  Board            |
|  (/job/people/view)|     |  (/job/best-matches)|     |  (/job/pipeline)  |
+-------------------+     +-------------------+     +-------------------+
         ^                                                    |
         +----------------------------------------------------+
                          (loops back)
```

## What Each Slide Shows
1. **Job Dashboard** -- The stats cards (Applicants, Rejected, Best Matches) with animated counters and the pipeline preview
2. **Candidate Review** -- The split-panel candidate profile with match criteria and AI chat panel
3. **Pipeline Board** -- The Kanban-style board with candidates in different stages

## Embedding in WordPress Elementor

```html
<iframe 
  src="https://figma-pixel-perfect-clone-9628.lovable.app/demo?scale=0.55" 
  width="100%" 
  height="600px" 
  style="border: none; border-radius: 16px; box-shadow: 0 8px 30px rgba(0,0,0,0.12);"
></iframe>
```

## Implementation Steps

### 1. Create `/demo` Page Component
- New file: `src/pages/Demo.tsx`
- Renders 3 "slides" using the actual page components or simplified static versions
- Auto-advances every 5 seconds with a fade/slide transition
- Shows a small dot-based progress bar at the bottom
- Disables all navigation (clicks on buttons do nothing in demo mode)
- Clean, borderless look optimized for iframe embedding

### 2. Update `src/App.tsx`
- Add a new route: `<Route path="/demo" element={<Demo />} />`

### 3. Slide Content Strategy
Rather than embedding full interactive pages (which would be complex), each slide will be a **static snapshot** rendering the key visual elements from each page:
- **Slide 1**: Reuses the stats cards and "Best Matches" banner from JobPeopleView
- **Slide 2**: Renders a single candidate profile + detail panel from JobBestMatches (read-only)
- **Slide 3**: Shows the pipeline columns with candidate cards from JobPipeline (read-only)

All interactions (clicks, dropdowns) will be disabled. The demo is purely visual.

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/pages/Demo.tsx` | Create -- Main demo page with auto-cycling slides |
| `src/App.tsx` | Modify -- Add `/demo` route |

## Technical Details

- Uses `useState` + `useEffect` with `setInterval` for auto-cycling (5s per slide)
- CSS transitions (`opacity`, `transform`) for smooth slide changes
- `pointer-events: none` on interactive elements to prevent accidental clicks
- Works with the existing `?scale=` parameter for iframe sizing
- Responsive: fills available width, maintains aspect ratio
- The component imports data/components from existing pages but renders them in a read-only wrapper
