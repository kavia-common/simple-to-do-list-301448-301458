# Todo Frontend - React Application

This is a React-based frontend for the Todo application. It provides a clean, modern UI for managing todo items with add, edit, delete, and complete functionality.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with blue and cyan accent colors
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify
- **Full CRUD**: Create, read, update, delete, and mark todos as complete

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
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Customization

### Colors

The main brand colors are defined as CSS variables in `src/App.css`:

```css
:root {
  --primary: #3b82f6;
  --secondary: #64748b;
  --success: #06b6d4;
  --error: #EF4444;
  --background: #f9fafb;
  --surface: #ffffff;
  --text: #111827;
}
```

### Components

This template uses pure HTML/CSS components instead of a UI framework. You can find component styles in `src/App.css`. 

Common components include:
- Buttons (`.btn`, `.btn-large`)
- Container (`.container`)
- Typography (`.title`, `.subtitle`, `.description`)

## API Configuration

### Backend Connection

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

### Environment variable not working

- React environment variables MUST start with `REACT_APP_`
- Changes to `.env` require restarting the dev server (`npm start`)
- The `.env` file must be in the project root (`todo_frontend/.env`)

### Running the Full Application

1. **Configure the frontend**: Set `REACT_APP_API_URL` in `.env` to point to your backend
2. **Start the backend**: Make sure the backend is running at the URL specified in `REACT_APP_API_URL`
3. **Start the frontend**: Run `npm start` (runs on port 3000)
4. **Open the app**: Navigate to [http://localhost:3000](http://localhost:3000) in your browser

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
