import React, { useState } from 'react';

// PUBLIC_INTERFACE
/**
 * TodoInput component for adding new todo items
 * @param {Object} props
 * @param {Function} props.onAdd - Callback when a new todo is added
 * @param {boolean} props.isLoading - Loading state for add action
 */
function TodoInput({ onAdd, isLoading = false }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showDescription, setShowDescription] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim()) {
      try {
        setHasError(false);
        await onAdd({
          title: title.trim(),
          description: description.trim()
        });
        // Clear form on success
        setTitle('');
        setDescription('');
        setShowDescription(false);
      } catch (err) {
        // Trigger error animation
        setHasError(true);
        setTimeout(() => setHasError(false), 400);
      }
    } else {
      // Trigger validation error animation
      setHasError(true);
      setTimeout(() => setHasError(false), 400);
    }
  };

  return (
    <form 
      className={`todo-input-form ${hasError ? 'error' : ''}`}
      onSubmit={handleSubmit}
    >
      <div className="input-row">
        <input
          type="text"
          className={`todo-input ${hasError && !title.trim() ? 'error' : ''}`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task"
          maxLength={500}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className={`btn btn-add ${isLoading ? 'loading' : ''}`}
          disabled={!title.trim() || isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Adding...
            </>
          ) : (
            '➕ Add'
          )}
        </button>
      </div>
      {showDescription ? (
        <div className="description-row">
          <textarea
            className="todo-description-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description (optional)..."
            rows="2"
            maxLength={2000}
            disabled={isLoading}
          />
          <button
            type="button"
            className="btn btn-hide-desc"
            onClick={() => {
              setShowDescription(false);
              setDescription('');
            }}
            disabled={isLoading}
          >
            Hide
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="btn-show-desc"
          onClick={() => setShowDescription(true)}
          disabled={isLoading}
        >
          + Add description
        </button>
      )}
    </form>
  );
}

export default TodoInput;
