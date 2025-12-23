# Todo Frontend

A modern, animated React-based todo list application with theme support and tasteful micro-interactions.

## Features

- ✨ **Smooth Animations**: Tasteful animations and micro-interactions throughout the UI
- 🎨 **Theme Support**: Toggle between light and dark modes with smooth transitions
- ♿ **Accessibility**: Full support for `prefers-reduced-motion` to respect user preferences
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🔄 **Real-time Feedback**: Loading states and inline feedback for all network actions
- 🎯 **Interactive Controls**: Hover, focus, and active states with scale animations
- 🎭 **Toast Notifications**: Animated toast messages for user feedback

## Animations & Micro-Interactions

This application includes several types of animations designed to enhance user experience:

### 1. List & Item Transitions
- **Enter Animation**: Todo items fade in with a slide-up motion
- **Exit Animation**: Deleted items fade out with a smooth height collapse
- **Completion Animation**: Strike-through animation when marking items complete
- **Color Transitions**: Smooth color changes for completed items

### 2. Button & Control Interactions
- **Hover Effects**: Buttons lift slightly with enhanced shadow
- **Press Feedback**: `scale(0.98)` effect on button press
- **Focus Rings**: Accessible focus indicators with smooth transitions
- **Loading States**: Inline spinner animations during network requests

### 3. Input Micro-Interactions
- **Focus States**: Input fields glow with border animation
- **Error Feedback**: Shake animation for validation errors
- **Placeholder Transitions**: Smooth color shifts on focus

### 4. Theme Toggle Animation
- **Icon Rotation**: 360° spin animation when switching themes
- **Cross-fade**: Smooth color transitions across the entire UI
- **Backdrop Effect**: Hover scales and rotates the theme button

### 5. Toast Notifications
- **Slide-up Entrance**: Toasts slide up with fade effect
- **Auto-dismiss**: Configurable auto-close with smooth exit

### 6. Performance & Accessibility

All animations are optimized for performance:

- **CSS-based**: Uses CSS transitions and keyframes, not JavaScript
- **Duration**: Most animations complete within 200ms for snappy feel
- **Easing**: Consistent ease-out curves for natural motion
- **Reduced Motion**: Full support for `prefers-reduced-motion: reduce`

#### Reduced Motion Support

Users who prefer reduced motion (set via OS settings) will automatically see:
- Animation durations reduced to 0.01ms
- No transform-based motion (scale, rotate, translate)
- Essential functionality preserved without distracting motion

To test reduced motion in your browser:
- **macOS**: System Preferences → Accessibility → Display → Reduce motion
- **Windows**: Settings → Ease of Access → Display → Show animations
- **Chrome DevTools**: Command Menu → "Emulate CSS prefers-reduced-motion"

### Animation Implementation

All animations are defined in `src/App.css`:

- **Keyframe Animations**: `fadeInSlideUp`, `fadeOutSlideDown`, `shake`, `pulse`, `spin`, `strikeThrough`, `slideUpFade`
- **Utility Classes**: `.fade-in-slide-up`, `.fade-out-slide-down`, `.shake-animation`, `.pulse-animation`, `.spinner`
- **State Classes**: `.loading`, `.completing`, `.removing`, `.editing`, `.error`, `.transitioning`

Components using animations:
- `App.js`: Handles loading states and triggers exit animations
- `TodoItem.js`: Applies entrance, completion, and exit animations
- `TodoInput.js`: Error shake animation and loading feedback
- `ThemeToggle.js`: Icon rotation on theme switch

## Getting Started

### Prerequisites

- Node.js 14+ and npm

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file with:

```env
REACT_APP_API_URL=http://localhost:3001
```

### Running the App

```bash
npm start
```

The app will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── ThemeToggle.js      # Theme switcher with rotation animation
│   ├── TodoInput.js         # Input form with loading/error states
│   └── TodoItem.js          # Individual todo with animations
├── contexts/
│   └── ThemeContext.js      # Theme state management
├── services/
│   └── todoApi.js           # API service layer
├── App.js                   # Main app with animation orchestration
├── App.css                  # All styles and animation definitions
├── index.js                 # App entry point
└── index.css                # Global styles
```

## API Integration

The frontend communicates with a FastAPI backend via REST endpoints:

- `GET /todos` - Fetch all todos
- `POST /todos` - Create a new todo
- `GET /todos/:id` - Get a specific todo
- `PUT /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo
- `PATCH /todos/:id/complete` - Toggle completion status

## Theme System

The app uses CSS custom properties for theming:

- **Light Mode**: Defined in `:root[data-theme='light']`
- **Dark Mode**: Defined in `:root[data-theme='dark']`
- **Persistence**: Theme preference saved to `localStorage`
- **Smooth Transitions**: All theme colors transition smoothly

## Accessibility

- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus visible indicators
- Color contrast compliance
- Reduced motion support

## Technologies

- React 18
- React Toastify for notifications
- CSS3 animations and transitions
- Local Storage for theme persistence
- Fetch API for network requests

## License

MIT
