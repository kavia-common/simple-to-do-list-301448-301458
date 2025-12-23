# Todo Frontend - React Application

This is a React-based frontend for the Todo application. It provides a clean, modern UI for managing todo items with add, edit, delete, and complete functionality. The application features a stylish design with light/dark theme support and toast notifications for user feedback.

## Features

- **Modern UI**: Clean, responsive design with blue (#3b82f6) and cyan (#06b6d4) accent colors
- **Light/Dark Theme**: Toggle between light and dark modes with theme preference persistence
- **Toast Notifications**: Visual feedback for all actions (add, edit, delete, complete)
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify
- **Full CRUD**: Create, read, update, delete, and mark todos as complete
- **Accessible**: Keyboard navigation and screen reader support

## New Features

### Theme Toggle
- Click the sun/moon icon in the top-right corner of the header to switch between light and dark themes
- Theme preference is automatically saved in localStorage and persists across sessions
- Smooth transitions between themes for a pleasant user experience

### Toast Notifications
- **Add Todo**: Green success toast with ✅ icon
- **Edit Todo**: Green success toast with 📝 icon
- **Delete Todo**: Green success toast with 🗑️ icon
- **Complete Todo**: Green success toast with ✔️ or ↩️ icon
- **Errors**: Red error toast with detailed error message
- Toasts auto-dismiss after 2-5 seconds and can be manually dismissed
- All toasts appear in the top-right corner

## Backend Integration

This frontend connects to a FastAPI backend. The backend URL is configured via environment variables.

### Environment Variables

The application uses the following environment variable for backend communication:

- `REACT_APP_API_URL`: The base URL for the backend API

**Important**: This environment variable MUST be set for the application to work correctly.

#### For Local Development:
```
REACT_APP_API_URL=http://localhost:3001
```

#### For Preview/Cloud Environments:
```
REACT_APP_API_URL=https://your-cloud-origin.domain:3001
```

The frontend will use the URL specified in `REACT_APP_API_URL` to connect to the backend. If not set, it will fall back to `http://localhost:3001` (local development default).

See `.env.example` for configuration template.

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- Backend API running and accessible at the URL specified in `REACT_APP_API_URL`

### Setup

1. **Configure Environment Variables**:
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env and set REACT_APP_API_URL to your backend URL
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Other Commands

#### `npm test`
Launches the test runner in interactive watch mode.

#### `npm run build`
Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

## Customization

### Colors

The main brand colors are defined as CSS custom properties in `src/App.css`:

**Light Theme:**
```css
:root[data-theme='light'] {
  --primary: #3b82f6;
  --secondary: #64748b;
  --success: #06b6d4;
  --error: #EF4444;
  --background: #f9fafb;
  --surface: #ffffff;
  --text: #111827;
}
```

**Dark Theme:**
```css
:root[data-theme='dark'] {
  --primary: #3b82f6;
  --secondary: #94a3b8;
  --success: #06b6d4;
  --error: #EF4444;
  --background: #0f172a;
  --surface: #1e293b;
  --text: #f1f5f9;
}
```

### Components

This template uses pure HTML/CSS components with React. Component styles are in `src/App.css`.

Common components include:
- Buttons (`.btn`, `.btn-add`, `.btn-edit`, `.btn-delete`)
- Container (`.container`)
- Typography (`.app-title`, `.app-subtitle`, `.todo-title`)
- Theme Toggle (`.theme-toggle`)

## Technical Details

### Theme Management
- Theme state is managed via React Context (`ThemeContext`)
- Theme preference is stored in `localStorage` with key `'theme'`
- Theme is applied to the document root via `data-theme` attribute
- All components respond to theme changes via CSS custom properties

### Toast Notifications
- Powered by `react-toastify` library
- Positioned at top-right of screen
- Auto-dismiss with configurable timing
- Color-coded: green for success, red for errors
- Draggable and pausable on hover

### API Configuration

The frontend connects to the backend API using the URL specified in the `REACT_APP_API_URL` environment variable. This variable MUST be set before starting the application.

**Configuration file**: `.env`

**Example**:
```
REACT_APP_API_URL=https://vscode-internal-15409-beta.beta01.cloud.kavia.ai:3001
```

### CORS

The backend must be configured to accept requests from the frontend origin. For local development, this is typically `http://localhost:3000`. For cloud/preview environments, ensure the backend CORS configuration includes the appropriate frontend origin.

### API Endpoints

The application uses the following REST API endpoints:

- `GET /todos` - Fetch all todos
- `POST /todos` - Create a new todo
- `GET /todos/{id}` - Get a specific todo
- `PUT /todos/{id}` - Update a todo
- `DELETE /todos/{id}` - Delete a todo
- `PATCH /todos/{id}/complete` - Toggle todo completion status

## Troubleshooting

### "Failed to fetch" errors

If you see network errors or "Failed to fetch" messages:

1. **Verify the backend is running**: Check that the backend API is accessible at the URL specified in `REACT_APP_API_URL`
2. **Check the environment variable**: Ensure `REACT_APP_API_URL` is set correctly in `.env`
3. **Restart the dev server**: Environment variables are loaded at startup, so restart with `npm start` after changing `.env`
4. **Check CORS**: Verify the backend allows requests from your frontend origin
5. **Check the browser console**: Look for CORS errors or network issues in the DevTools console

### Theme not persisting

- Ensure localStorage is enabled in your browser
- Check browser console for any localStorage-related errors
- Clear browser cache and try again

### Toasts not appearing

- Check that `react-toastify` CSS is imported in `App.js`
- Verify `ToastContainer` component is rendered in the App
- Check browser console for any errors

### Environment variable not working

- React environment variables MUST start with `REACT_APP_`
- Changes to `.env` require restarting the dev server (`npm start`)
- The `.env` file must be in the project root (`todo_frontend/.env`)

### Running the Full Application

1. **Configure the frontend**: Set `REACT_APP_API_URL` in `.env` to point to your backend
2. **Start the backend**: Make sure the backend is running at the URL specified in `REACT_APP_API_URL`
3. **Start the frontend**: Run `npm start` (runs on port 3000)
4. **Open the app**: Navigate to [http://localhost:3000](http://localhost:3000) in your browser

## Dependencies

- **react**: ^18.2.0 - Core React library
- **react-dom**: ^18.2.0 - React DOM rendering
- **react-scripts**: ^5.0.1 - Create React App build scripts
- **react-toastify**: ^10.0.0 - Toast notification library

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

For toast notifications, see [React-Toastify documentation](https://fkhadra.github.io/react-toastify/introduction).
