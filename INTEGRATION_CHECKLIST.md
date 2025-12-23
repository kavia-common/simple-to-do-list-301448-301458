# Todo App Integration Checklist

This document provides a checklist for verifying the integration between frontend and backend.

## Configuration Verification

### Frontend Configuration
- ✅ Environment variable `REACT_APP_API_URL` is set to `http://localhost:3001` in `.env`
- ✅ API service (`src/services/todoApi.js`) uses `REACT_APP_API_URL`
- ✅ Fallback URL is configured to `http://localhost:3001`

### Backend Configuration
- ✅ CORS middleware is configured in `main.py`
- ✅ Allowed origins include `http://localhost:3000`
- ✅ All HTTP methods (GET, POST, PUT, PATCH, DELETE) are allowed
- ✅ Backend runs on port 3001

### API Endpoints Match
- ✅ `GET /todos` - Frontend calls, Backend implements
- ✅ `POST /todos` - Frontend calls, Backend implements
- ✅ `PUT /todos/{id}` - Frontend calls, Backend implements
- ✅ `PATCH /todos/{id}/complete` - Frontend calls, Backend implements
- ✅ `DELETE /todos/{id}` - Frontend calls, Backend implements

## Manual Testing Checklist

After starting both frontend (port 3000) and backend (port 3001):

### 1. Load Todos
- [ ] Open http://localhost:3000
- [ ] Verify no console errors
- [ ] Verify empty state message appears (if no todos exist)
- [ ] Verify loading state appears briefly

### 2. Create Todo
- [ ] Enter a title in the input field
- [ ] Click "Add" button
- [ ] Verify new todo appears in the list
- [ ] Verify todo has a checkbox, title, edit and delete buttons

### 3. Create Todo with Description
- [ ] Click "+ Add description" link
- [ ] Enter title and description
- [ ] Click "Add" button
- [ ] Verify todo appears with both title and description

### 4. Mark Todo Complete
- [ ] Click checkbox on a todo
- [ ] Verify todo title gets strikethrough style
- [ ] Verify todo opacity changes
- [ ] Verify stats update (active count decreases, completed count increases)

### 5. Edit Todo
- [ ] Click "Edit" button on a todo
- [ ] Modify title and/or description
- [ ] Click "Save"
- [ ] Verify changes are persisted

### 6. Delete Todo
- [ ] Click "Delete" button on a todo
- [ ] Verify todo is removed from the list
- [ ] Verify stats update

### 7. Error Handling
- [ ] Stop the backend
- [ ] Try to add a todo
- [ ] Verify error message appears
- [ ] Verify error message can be dismissed

## Expected Behavior

- Frontend on http://localhost:3000
- Backend API on http://localhost:3001
- No CORS errors in browser console
- All CRUD operations work end-to-end
- UI updates reflect backend state
- Error messages display when backend is unavailable

## Troubleshooting

### CORS Errors
If you see CORS errors in the browser console:
1. Verify backend .env has `ALLOWED_ORIGINS` including `http://localhost:3000`
2. Restart the backend server
3. Clear browser cache and reload

### Connection Refused
If you see "Connection Refused" errors:
1. Verify backend is running on port 3001
2. Verify frontend .env has `REACT_APP_API_URL=http://localhost:3001`
3. Restart the frontend with `npm start`

### 404 Errors
If you see 404 errors:
1. Verify API endpoints in `todoApi.js` match backend routes
2. Check backend logs for route registration
3. Verify backend OpenAPI docs at http://localhost:3001/docs
