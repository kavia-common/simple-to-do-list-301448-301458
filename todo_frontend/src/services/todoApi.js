// API service for communicating with the backend todo API
// Backend runs on port 3001
// 
// Configuration:
// - Uses REACT_APP_API_URL environment variable
// - Falls back to http://localhost:3001 if not set
// - Backend CORS is configured to allow http://localhost:3000

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

/**
 * Handles API errors and throws appropriate error messages
 * @param {Response} response - Fetch API response object
 */
async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
    throw new Error(error.detail || `HTTP error! status: ${response.status}`);
  }
  
  // Handle 204 No Content responses
  if (response.status === 204) {
    return null;
  }
  
  return response.json();
}

// PUBLIC_INTERFACE
/**
 * Fetches all todos from the backend
 * @returns {Promise<Array>} Array of todo objects
 */
export async function getTodos() {
  const response = await fetch(`${API_BASE_URL}/todos`);
  const data = await handleResponse(response);
  return data.todos || [];
}

// PUBLIC_INTERFACE
/**
 * Creates a new todo item
 * @param {Object} todo - Todo object with title and optional description
 * @param {string} todo.title - Title of the todo (required)
 * @param {string} [todo.description] - Description of the todo
 * @returns {Promise<Object>} Created todo object
 */
export async function createTodo(todo) {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: todo.title,
      description: todo.description || '',
      completed: false
    }),
  });
  return handleResponse(response);
}

// PUBLIC_INTERFACE
/**
 * Updates an existing todo item
 * @param {number} id - ID of the todo to update
 * @param {Object} updates - Object containing fields to update
 * @returns {Promise<Object>} Updated todo object
 */
export async function updateTodo(id, updates) {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  return handleResponse(response);
}

// PUBLIC_INTERFACE
/**
 * Deletes a todo item
 * @param {number} id - ID of the todo to delete
 * @returns {Promise<null>}
 */
export async function deleteTodo(id) {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
}

// PUBLIC_INTERFACE
/**
 * Toggles the completion status of a todo
 * @param {number} id - ID of the todo to toggle
 * @param {boolean} completed - New completion status
 * @returns {Promise<Object>} Updated todo object
 */
export async function toggleTodoComplete(id, completed) {
  const response = await fetch(`${API_BASE_URL}/todos/${id}/complete`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ completed }),
  });
  return handleResponse(response);
}
