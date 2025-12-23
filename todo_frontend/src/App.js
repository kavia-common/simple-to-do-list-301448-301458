import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';
import ThemeToggle from './components/ThemeToggle';
import { getTodos, createTodo, updateTodo, deleteTodo, toggleTodoComplete } from './services/todoApi';

// PUBLIC_INTERFACE
/**
 * Main App component for the Todo application
 * Manages state and coordinates between components and API with toast notifications
 */
function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null); // Track which action is loading

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
      const errorMsg = 'Failed to load todos: ' + err.message;
      setError(errorMsg);
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
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
      setActionLoading('add');
      const newTodo = await createTodo(todo);
      setTodos([...todos, newTodo]);
      toast.success('✅ Todo added successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } catch (err) {
      const errorMsg = 'Failed to add todo: ' + err.message;
      setError(errorMsg);
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      console.error('Error adding todo:', err);
      throw err; // Re-throw to allow TodoInput to handle error animation
    } finally {
      setActionLoading(null);
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
      setActionLoading(`update-${id}`);
      const updatedTodo = await updateTodo(id, updates);
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
      toast.success('📝 Todo updated successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } catch (err) {
      const errorMsg = 'Failed to update todo: ' + err.message;
      setError(errorMsg);
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      console.error('Error updating todo:', err);
    } finally {
      setActionLoading(null);
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
      setActionLoading(`delete-${id}`);
      
      // Add removing class for exit animation
      const todoElement = document.querySelector(`[data-todo-id="${id}"]`);
      if (todoElement) {
        todoElement.classList.add('removing');
        // Wait for animation to complete before removing from state
        await new Promise(resolve => setTimeout(resolve, 250));
      }
      
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
      toast.success('🗑️ Todo deleted successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } catch (err) {
      const errorMsg = 'Failed to delete todo: ' + err.message;
      setError(errorMsg);
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      console.error('Error deleting todo:', err);
    } finally {
      setActionLoading(null);
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
      setActionLoading(`toggle-${id}`);
      
      // Optimistically update UI
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, completed } : todo
      ));
      
      const updatedTodo = await toggleTodoComplete(id, completed);
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
      toast.success(completed ? '✔️ Todo marked as complete!' : '↩️ Todo marked as incomplete!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } catch (err) {
      // Revert optimistic update on error
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, completed: !completed } : todo
      ));
      
      const errorMsg = 'Failed to toggle todo: ' + err.message;
      setError(errorMsg);
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      console.error('Error toggling todo:', err);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <ThemeToggle />
        <h1 className="app-title">📝 My Todo List</h1>
        <p className="app-subtitle">Stay organized and get things done</p>
      </header>

      <main className="app-main">
        <div className="container">
          <TodoInput 
            onAdd={handleAddTodo} 
            isLoading={actionLoading === 'add'}
          />

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
                  isUpdating={actionLoading === `update-${todo.id}`}
                  isDeleting={actionLoading === `delete-${todo.id}`}
                  isToggling={actionLoading === `toggle-${todo.id}`}
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

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
