# Todo Frontend - React Application

This is a React-based frontend for the Todo application. It provides a clean, modern UI for managing todo items with add, edit, delete, and complete functionality.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with blue and cyan accent colors
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify
- **Full CRUD**: Create, read, update, delete, and mark todos as complete

## Backend Integration

This frontend connects to a FastAPI backend running on port 3001. The backend URL is configured via environment variables.

### Environment Variables

The application uses the following environment variable for backend communication:

- `REACT_APP_API_URL`: The base URL for the backend API (default: `http://localhost:3001`)

See `.env.example` for all available configuration options.

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Customization

### Colors

The main brand colors are defined as CSS variables in `src/App.css`:

```css
:root {
  --kavia-orange: #E87A41;
  --kavia-dark: #1A1A1A;
  --text-color: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --border-color: rgba(255, 255, 255, 0.1);
}
```

### Components

This template uses pure HTML/CSS components instead of a UI framework. You can find component styles in `src/App.css`. 

Common components include:
- Buttons (`.btn`, `.btn-large`)
- Container (`.container`)
- Navigation (`.navbar`)
- Typography (`.title`, `.subtitle`, `.description`)

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

## Configuration Notes

### Backend Connection

The frontend is configured to connect to the backend API at `http://localhost:3001` by default. This is set in the `.env` file:

```
REACT_APP_API_URL=http://localhost:3001
```

### CORS

The backend is already configured to accept requests from `http://localhost:3000`, so no additional CORS configuration is needed for local development.

### API Endpoints

The application uses the following REST API endpoints:

- `GET /todos` - Fetch all todos
- `POST /todos` - Create a new todo
- `GET /todos/{id}` - Get a specific todo
- `PUT /todos/{id}` - Update a todo
- `DELETE /todos/{id}` - Delete a todo
- `PATCH /todos/{id}/complete` - Toggle todo completion status

### Running the Full Application

1. Start the database (SQLite - no action needed, file-based)
2. Start the backend: `cd ../todo_backend && uvicorn src.api.main:app --reload --port 3001`
3. Start the frontend: `npm start` (runs on port 3000)
4. Open [http://localhost:3000](http://localhost:3000) in your browser
