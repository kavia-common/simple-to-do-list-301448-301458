# Todo Application

A simple, modern todo application built with React frontend, FastAPI backend, and SQLite database.

## Features

- ✅ Add new todos with title and optional description
- ✅ Edit existing todos
- ✅ Mark todos as complete/incomplete
- ✅ Delete todos
- ✅ Clean, responsive UI with modern design
- ✅ Real-time statistics (active, completed, total)

## Architecture

- **Frontend**: React 18.2.0 (Port 3000)
- **Backend**: FastAPI (Port 3001)
- **Database**: SQLite (file-based)

## Integration Status

✅ **VERIFIED**: All integration tests passed on 2025-12-23  
📋 See [INTEGRATION_VERIFICATION.md](./INTEGRATION_VERIFICATION.md) for detailed test results

## Quick Start

### Prerequisites
- Node.js and npm (for frontend)
- Python 3.8+ (for backend)
- pip (Python package manager)

### 1. Start the Backend

```bash
cd todo_backend
pip install -r requirements.txt  # Install dependencies (first time only)
uvicorn src.api.main:app --reload --port 3001
```

Backend will be available at http://localhost:3001
API documentation at http://localhost:3001/docs

### 2. Start the Frontend

```bash
cd todo_frontend
npm install  # Install dependencies (first time only)
npm start
```

Frontend will be available at http://localhost:3000

### 3. Use the Application

Open http://localhost:3000 in your browser and start managing your todos!

## Project Structure

```
simple-to-do-list-301448-301458/
├── README.md                          # This file
├── INTEGRATION_SUMMARY.md             # Detailed integration documentation
├── INTEGRATION_CHECKLIST.md           # Testing checklist
└── todo_frontend/                     # React frontend application
    ├── src/
    │   ├── App.js                     # Main application component
    │   ├── components/
    │   │   ├── TodoInput.js           # Todo input form
    │   │   └── TodoItem.js            # Individual todo item
    │   └── services/
    │       └── todoApi.js             # Backend API client
    ├── .env                           # Environment configuration
    └── package.json                   # Frontend dependencies
```

## Configuration

The application is pre-configured to work out of the box:

- **Frontend**: Connects to backend at `http://localhost:3001`
- **Backend**: Accepts requests from `http://localhost:3000`
- **Database**: SQLite file at `../database/myapp.db`

See `.env` files in each container for detailed configuration options.

## Documentation

- **Integration Details**: See [INTEGRATION_SUMMARY.md](./INTEGRATION_SUMMARY.md)
- **Verification Report**: See [INTEGRATION_VERIFICATION.md](./INTEGRATION_VERIFICATION.md) ✅
- **Testing Checklist**: See [INTEGRATION_CHECKLIST.md](./INTEGRATION_CHECKLIST.md)
- **Troubleshooting Guide**: See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) 🔧
- **Frontend README**: See [todo_frontend/README.md](./todo_frontend/README.md)
- **API Documentation**: Visit http://localhost:3001/docs (when backend is running)

## Technology Stack

### Frontend
- React 18.2.0
- Vanilla CSS (no UI framework)
- Fetch API for HTTP requests

### Backend
- FastAPI (Python)
- SQLite3 for database
- Pydantic for data validation
- CORS middleware for cross-origin requests

### Database
- SQLite (file-based)
- Single `todos` table with full CRUD support

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | Get all todos |
| POST | `/todos` | Create a new todo |
| GET | `/todos/{id}` | Get a specific todo |
| PUT | `/todos/{id}` | Update a todo |
| PATCH | `/todos/{id}/complete` | Toggle completion status |
| DELETE | `/todos/{id}` | Delete a todo |

## Development

### Frontend Development
```bash
cd todo_frontend
npm start          # Start dev server
npm test           # Run tests
npm run build      # Build for production
```

### Backend Development
```bash
cd todo_backend
uvicorn src.api.main:app --reload --port 3001  # Start with auto-reload
```

## Troubleshooting

### Frontend can't connect to backend
1. Verify backend is running on port 3001
2. Check `todo_frontend/.env` has `REACT_APP_API_URL=http://localhost:3001`
3. Restart frontend with `npm start`

### CORS errors
Backend is already configured to allow localhost:3000. If you still see CORS errors:
1. Ensure backend `.env` includes `http://localhost:3000` in `ALLOWED_ORIGINS`
2. Restart backend server

### Port already in use
If port 3000 or 3001 is already in use:
- Frontend: Set different port with `PORT=3005 npm start`
- Backend: Change port in uvicorn command: `--port 3006`

## License

This is a sample application for demonstration purposes.
