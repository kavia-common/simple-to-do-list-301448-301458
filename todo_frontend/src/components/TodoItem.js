import React, { useState, useEffect } from 'react';

// PUBLIC_INTERFACE
/**
 * TodoItem component displays a single todo with edit, delete, and complete controls
 * @param {Object} props
 * @param {Object} props.todo - Todo object
 * @param {Function} props.onUpdate - Callback when todo is updated
 * @param {Function} props.onDelete - Callback when todo is deleted
 * @param {Function} props.onToggleComplete - Callback when completion status is toggled
 * @param {boolean} props.isUpdating - Loading state for update action
 * @param {boolean} props.isDeleting - Loading state for delete action
 * @param {boolean} props.isToggling - Loading state for toggle action
 */
function TodoItem({ 
  todo, 
  onUpdate, 
  onDelete, 
  onToggleComplete,
  isUpdating = false,
  isDeleting = false,
  isToggling = false
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [isCompleting, setIsCompleting] = useState(false);

  // Trigger completing animation when status changes
  useEffect(() => {
    if (todo.completed && !isCompleting) {
      setIsCompleting(true);
      setTimeout(() => setIsCompleting(false), 300);
    }
  }, [todo.completed]);

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

  const handleToggle = () => {
    onToggleComplete(todo.id, !todo.completed);
  };

  if (isEditing) {
    return (
      <div className="todo-item editing" data-todo-id={todo.id}>
        <input
          type="text"
          className="edit-input"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Todo title"
          autoFocus
          disabled={isUpdating}
        />
        <textarea
          className="edit-textarea"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          placeholder="Description (optional)"
          rows="2"
          disabled={isUpdating}
        />
        <div className="edit-actions">
          <button 
            className={`btn btn-save ${isUpdating ? 'loading' : ''}`}
            onClick={handleSave}
            disabled={isUpdating || !editTitle.trim()}
          >
            {isUpdating ? (
              <>
                <span className="spinner"></span>
                Saving...
              </>
            ) : (
              'Save'
            )}
          </button>
          <button 
            className="btn btn-cancel" 
            onClick={handleCancel}
            disabled={isUpdating}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`todo-item ${todo.completed ? 'completed' : ''} ${isCompleting ? 'completing' : ''}`}
      data-todo-id={todo.id}
    >
      <div className="todo-content">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          disabled={isToggling}
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
          className={`btn btn-edit ${isUpdating ? 'loading' : ''}`}
          onClick={() => setIsEditing(true)}
          disabled={isUpdating || isDeleting || isToggling}
          aria-label={`Edit "${todo.title}"`}
        >
          ✏️ Edit
        </button>
        <button
          className={`btn btn-delete ${isDeleting ? 'loading' : ''}`}
          onClick={() => onDelete(todo.id)}
          disabled={isUpdating || isDeleting || isToggling}
          aria-label={`Delete "${todo.title}"`}
        >
          {isDeleting ? (
            <>
              <span className="spinner"></span>
              Deleting...
            </>
          ) : (
            <>🗑️ Delete</>
          )}
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
