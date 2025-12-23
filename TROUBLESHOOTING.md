# Todo App Troubleshooting Guide

This guide covers common issues and their solutions for the todo application.

## Quick Diagnostics

### Check Service Status
```bash
# Check if backend is running
curl http://localhost:3001/

# Check if frontend is running
curl -I http://localhost:3000/

# Check running processes
ps aux | grep -E "(uvicorn|react-scripts)" | grep -v grep
```

---

## Common Issues

### Issue 1: "Failed to fetch" Error in Browser

**Symptoms**: 
- Error message in frontend UI: "Failed to load todos: Failed to fetch"
- Network errors in browser console

**Diagnosis**:
```bash
# Test backend directly
curl http://localhost:3001/todos
```

**Solutions**:

1. **Backend not running**
   ```bash
   cd simple-to-do-list-301448-301457/todo_backend
   source venv/bin/activate
   uvicorn src.api.main:app --host 0.0.0.0 --port 3001
   ```

2. **Wrong backend URL**
   - Check `.env` file: `REACT_APP_API_URL=http://localhost:3001`
   - Restart frontend after changing `.env`

3. **Port already in use**
   ```bash
   # Find process using port 3001
   lsof -i :3001
   # Kill if necessary
   kill -9 <PID>
   ```

---

### Issue 2: CORS Error

**Symptoms**:
- Browser console shows: "Access to fetch at 'http://localhost:3001/todos' from origin 'http://localhost:3000' has been blocked by CORS policy"

**Diagnosis**:
```bash
# Test CORS preflight
curl -H "Origin: http://localhost:3000" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS http://localhost:3001/todos -v
```

**Solutions**:

1. **Check backend CORS configuration**
   - File: `simple-to-do-list-301448-301457/todo_backend/.env`
   - Ensure: `ALLOWED_ORIGINS=...http://localhost:3000...`

2. **Restart backend** after changing CORS settings
   ```bash
   # Kill and restart uvicorn
   pkill -f uvicorn
   cd simple-to-do-list-301448-301457/todo_backend
   uvicorn src.api.main:app --host 0.0.0.0 --port 3001
   ```

3. **Clear browser cache**
   - Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
   - Or open in incognito/private window

---

### Issue 3: Frontend Not Loading

**Symptoms**:
- Browser shows blank page
- Or "Cannot GET /" error

**Diagnosis**:
```bash
# Check if frontend is running
curl -I http://localhost:3000/
```

**Solutions**:

1. **Frontend not running**
   ```bash
   cd simple-to-do-list-301448-301458/todo_frontend
   npm start
   ```

2. **Dependencies not installed**
   ```bash
   cd simple-to-do-list-301448-301458/todo_frontend
   npm install
   npm start
   ```

3. **Port 3000 already in use**
   ```bash
   # Find process using port 3000
   lsof -i :3000
   # Kill if necessary
   kill -9 <PID>
   # Or start on different port
   PORT=3005 npm start
   ```

---

### Issue 4: Database Error

**Symptoms**:
- Backend returns 500 Internal Server Error
- Backend logs show "database is locked" or "unable to open database file"

**Diagnosis**:
```bash
# Check if database file exists
ls -la simple-to-do-list-301448-301459/database/myapp.db

# Check backend logs
tail -f simple-to-do-list-301448-301457/todo_backend/logs/*.log
```

**Solutions**:

1. **Database file missing**
   - Backend should create it automatically
   - Check `SQLITE_DB` environment variable in backend `.env`

2. **Permission issues**
   ```bash
   chmod 644 simple-to-do-list-301448-301459/database/myapp.db
   chmod 755 simple-to-do-list-301448-301459/database/
   ```

3. **Database locked**
   - Close any other connections to the database
   - Restart backend service

---

### Issue 5: Environment Variables Not Working

**Symptoms**:
- Frontend connects to wrong backend URL
- Changes to `.env` file don't take effect

**Solutions**:

1. **Restart development server**
   - React loads environment variables at startup
   - Stop (Ctrl+C) and restart `npm start`

2. **Check environment variable name**
   - Must start with `REACT_APP_` for React
   - Example: `REACT_APP_API_URL` (not `API_URL`)

3. **Check `.env` file location**
   - Must be in project root: `todo_frontend/.env`
   - Not in subdirectories

---

### Issue 6: Todos Not Persisting

**Symptoms**:
- Todos disappear after page refresh
- Database appears empty

**Diagnosis**:
```bash
# Test backend directly
curl http://localhost:3001/todos

# Check database directly
cd simple-to-do-list-301448-301459/database
sqlite3 myapp.db "SELECT * FROM todos;"
```

**Solutions**:

1. **Backend using wrong database**
   - Check `SQLITE_DB` in backend `.env`
   - Should point to: `/home/kavia/workspace/code-generation/simple-to-do-list-301448-301459/database/myapp.db`

2. **Table doesn't exist**
   ```bash
   # Check if table exists
   sqlite3 myapp.db ".schema todos"
   ```
   - If missing, backend should create it automatically on first run

---

## Advanced Diagnostics

### Check API Endpoints
```bash
# Test all endpoints
curl http://localhost:3001/                          # Health check
curl http://localhost:3001/todos                     # List todos
curl -X POST http://localhost:3001/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","completed":false}'            # Create
curl -X PUT http://localhost:3001/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated","completed":false}'         # Update
curl -X PATCH http://localhost:3001/todos/1/complete \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'                            # Mark complete
curl -X DELETE http://localhost:3001/todos/1         # Delete
```

### View Backend Logs
```bash
# If using systemd/supervisor
journalctl -u todo-backend -f

# Or check uvicorn output directly
# (Run uvicorn in foreground to see logs)
```

### View Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for JavaScript errors
4. Go to Network tab to see API calls and responses

### Check Network Traffic
```bash
# Monitor HTTP traffic
sudo tcpdump -i lo -A 'port 3001'
```

---

## Getting Help

If issues persist:

1. **Check integration docs**:
   - `INTEGRATION_SUMMARY.md` - Configuration details
   - `INTEGRATION_CHECKLIST.md` - Manual testing checklist
   - `INTEGRATION_VERIFICATION.md` - Test results

2. **Review source code**:
   - Frontend API client: `todo_frontend/src/services/todoApi.js`
   - Backend CORS config: `todo_backend/src/api/main.py`
   - Backend routes: `todo_backend/src/api/routes.py`

3. **Check dependencies**:
   - Frontend: `todo_frontend/package.json`
   - Backend: `todo_backend/requirements.txt`

---

## Quick Reset

If all else fails, restart everything:

```bash
# Kill all services
pkill -f uvicorn
pkill -f react-scripts

# Start backend
cd simple-to-do-list-301448-301457/todo_backend
source venv/bin/activate
uvicorn src.api.main:app --host 0.0.0.0 --port 3001 &

# Start frontend
cd simple-to-do-list-301448-301458/todo_frontend
npm start &

# Wait 10 seconds, then test
sleep 10
curl http://localhost:3001/
curl -I http://localhost:3000/
```

---

## System Requirements

Ensure your system meets these requirements:
- Node.js 16+ (for React frontend)
- Python 3.8+ (for FastAPI backend)
- npm 7+ (for package management)
- 100MB free disk space
- Ports 3000 and 3001 available
