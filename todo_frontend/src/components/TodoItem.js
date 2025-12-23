import React, { useState } from 'react';

// PUBLIC_INTERFACE
/**
 * TodoItem component displays a single todo with edit, delete, and complete controls
 * @param {Object} props
 * @param {Object} props.todo - Todo object
 * @param {Function} props.onUpdate - Callback when todo is updated
 * @param {Function} props.onDelete - Callback when todo is deleted
 * @param {Function} props.onToggleComplete - Callback when completion status is toggled
 */
function TodoItem({ todo, onUpdate, onDelete, onToggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        completed: todo.completed
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <input
          type="text"
          className="edit-input"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Todo title"
          autoFocus
        />
        <textarea
          className="edit-textarea"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          placeholder="Description (optional)"
          rows="2"
        />
        <div className="edit-actions">
          <button className="btn btn-save" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id, !todo.completed)}
          aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
        />
        <div className="todo-text">
          <h3 className="todo-title">{todo.title}</h3>
          {todo.description && (
            <p className="todo-description">{todo.description}</p>
          )}
        </div>
      </div>
      <div className="todo-actions">
        <button
          className="btn btn-edit"
          onClick={() => setIsEditing(true)}
          aria-label={`Edit "${todo.title}"`}
        >
          ✏️ Edit
        </button>
        <button
          className="btn btn-delete"
          onClick={() => onDelete(todo.id)}
          aria-label={`Delete "${todo.title}"`}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
