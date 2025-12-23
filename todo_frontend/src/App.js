import React, { useState, useEffect } from 'react';
import './App.css';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';
import { getTodos, createTodo, updateTodo, deleteTodo, toggleTodoComplete } from './services/todoApi';

// PUBLIC_INTERFACE
/**
 * Main App component for the Todo application
 * Manages state and coordinates between components and API
 */
function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load todos on component mount
  useEffect(() => {
    loadTodos();
  }, []);

  // PUBLIC_INTERFACE
  /**
   * Fetches all todos from the backend API
   */
  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      setError('Failed to load todos: ' + err.message);
      console.error('Error loading todos:', err);
    } finally {
      setLoading(false);
    }
  };

  // PUBLIC_INTERFACE
  /**
   * Adds a new todo item
   * @param {Object} todo - Todo object with title and description
   */
  const handleAddTodo = async (todo) => {
    try {
      setError(null);
      const newTodo = await createTodo(todo);
      setTodos([...todos, newTodo]);
    } catch (err) {
      setError('Failed to add todo: ' + err.message);
      console.error('Error adding todo:', err);
    }
  };

  // PUBLIC_INTERFACE
  /**
   * Updates an existing todo item
   * @param {number} id - Todo ID
   * @param {Object} updates - Fields to update
   */
  const handleUpdateTodo = async (id, updates) => {
    try {
      setError(null);
      const updatedTodo = await updateTodo(id, updates);
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
    } catch (err) {
      setError('Failed to update todo: ' + err.message);
      console.error('Error updating todo:', err);
    }
  };

  // PUBLIC_INTERFACE
  /**
   * Deletes a todo item
   * @param {number} id - Todo ID to delete
   */
  const handleDeleteTodo = async (id) => {
    try {
      setError(null);
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo: ' + err.message);
      console.error('Error deleting todo:', err);
    }
  };

  // PUBLIC_INTERFACE
  /**
   * Toggles the completion status of a todo
   * @param {number} id - Todo ID
   * @param {boolean} completed - New completion status
   */
  const handleToggleComplete = async (id, completed) => {
    try {
      setError(null);
      const updatedTodo = await toggleTodoComplete(id, completed);
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
    } catch (err) {
      setError('Failed to toggle todo: ' + err.message);
      console.error('Error toggling todo:', err);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1 className="app-title">📝 My Todo List</h1>
        <p className="app-subtitle">Stay organized and get things done</p>
      </header>

      <main className="app-main">
        <div className="container">
          <TodoInput onAdd={handleAddTodo} />

          {error && (
            <div className="error-message">
              {error}
              <button className="btn-close" onClick={() => setError(null)}>×</button>
            </div>
          )}

          {loading ? (
            <div className="loading">Loading todos...</div>
          ) : todos.length === 0 ? (
            <div className="empty-state">
              <p>No todos yet! Add your first task above.</p>
            </div>
          ) : (
            <div className="todo-list">
              {todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onUpdate={handleUpdateTodo}
                  onDelete={handleDeleteTodo}
                  onToggleComplete={handleToggleComplete}
                />
              ))}
            </div>
          )}

          <div className="todo-stats">
            <span>{todos.filter(t => !t.completed).length} active</span>
            <span>•</span>
            <span>{todos.filter(t => t.completed).length} completed</span>
            <span>•</span>
            <span>{todos.length} total</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
