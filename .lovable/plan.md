
# Scale Down App for Iframe Embedding

## Overview
Add a feature that allows the entire app to scale down proportionally when embedded in an iframe, controlled via URL parameters. This will make the app appear as a miniature version without requiring horizontal scrolling.

## How It Will Work

When you embed the app with a scale parameter like:
```
https://figma-pixel-perfect-clone-9628.lovable.app?scale=0.5
```

The entire app will shrink to 50% of its original size, fitting perfectly in a smaller iframe without cutting off content or requiring scrolling.

## Implementation Steps

### 1. Create an Embed Scale Hook
Create a new custom hook `useEmbedScale` that:
- Reads the `scale` parameter from the URL (e.g., `?scale=0.5`)
- Detects if the app is running inside an iframe
- Returns the scale value for use in styling

### 2. Create an Embed Wrapper Component
Create a wrapper component `EmbedScaleWrapper` that:
- Wraps the entire app content
- Applies `transform: scale()` based on the URL parameter
- Compensates for the scale by adjusting width/height (e.g., at 50% scale, set width/height to 200%)
- Uses `transform-origin: top left` to scale from the corner

### 3. Update App.tsx
Wrap all routes with the new `EmbedScaleWrapper` component

### 4. Add CSS Styles
Add necessary CSS to handle the scaled container properly

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/hooks/useEmbedScale.ts` | Create - URL parameter detection hook |
| `src/components/EmbedScaleWrapper.tsx` | Create - Wrapper component with transform |
| `src/App.tsx` | Modify - Wrap content with EmbedScaleWrapper |

## Usage in WordPress

After implementation, embed like this:

```html
<iframe 
  src="https://figma-pixel-perfect-clone-9628.lovable.app?scale=0.5" 
  width="50%" 
  height="400" 
  style="border: none; border-radius: 12px;"
></iframe>
```

**Scale options:**
- `?scale=0.5` - 50% size
- `?scale=0.75` - 75% size  
- `?scale=0.6` - 60% size

---

## Technical Details

### useEmbedScale Hook
```typescript
// Reads ?scale=X from URL, defaults to 1 (100%)
// Returns: { scale: number, isEmbedded: boolean }
```

### EmbedScaleWrapper Component
```typescript
// Applies CSS transform based on scale parameter
// Compensates dimensions: width = 100/scale %, height = 100/scale %
// Example at 0.5 scale: transform: scale(0.5), width: 200%, height: 200%
```

### CSS Transform Approach
The transform approach scales everything proportionally:
- Text, buttons, spacing all shrink together
- No layout breaks or horizontal scrolling
- App looks like a perfect miniature version
