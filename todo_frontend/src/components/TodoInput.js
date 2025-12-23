import React, { useState } from 'react';

// PUBLIC_INTERFACE
/**
 * TodoInput component for adding new todo items
 * @param {Object} props
 * @param {Function} props.onAdd - Callback when a new todo is added
 */
function TodoInput({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showDescription, setShowDescription] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({
        title: title.trim(),
        description: description.trim()
      });
      setTitle('');
      setDescription('');
      setShowDescription(false);
    }
  };

  return (
    <form className="todo-input-form" onSubmit={handleSubmit}>
      <div className="input-row">
        <input
          type="text"
          className="todo-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          maxLength={500}
        />
        <button type="submit" className="btn btn-add" disabled={!title.trim()}>
          ➕ Add
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
          />
          <button
            type="button"
            className="btn btn-hide-desc"
            onClick={() => {
              setShowDescription(false);
              setDescription('');
            }}
          >
            Hide
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="btn-show-desc"
          onClick={() => setShowDescription(true)}
        >
          + Add description
        </button>
      )}
    </form>
  );
}

export default TodoInput;
