import React, { useState } from 'react';
import { Plus, Check, X } from 'lucide-react';
import { TodoItem } from '../types/planner';

interface TodoSectionProps {
  todos: TodoItem[];
  onUpdateTodos: (todos: TodoItem[]) => void;
}

export const TodoSection: React.FC<TodoSectionProps> = ({ todos, onUpdateTodos }) => {
  const [newTodoText, setNewTodoText] = useState('');
  const [showAddInput, setShowAddInput] = useState(false);

  const topTodos = todos.slice(0, 3);
  const remainingTodos = todos.slice(3);

  const addTodo = () => {
    if (newTodoText.trim()) {
      const newTodo: TodoItem = {
        id: Date.now().toString(),
        text: newTodoText.trim(),
        completed: false,
        priority: todos.length + 1
      };
      onUpdateTodos([...todos, newTodo]);
      setNewTodoText('');
      setShowAddInput(false);
    }
  };

  const toggleTodo = (id: string) => {
    const updated = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    onUpdateTodos(updated);
  };

  const deleteTodo = (id: string) => {
    const updated = todos.filter(todo => todo.id !== id);
    onUpdateTodos(updated);
  };

  const TodoList = ({ items, title }: { items: TodoItem[], title: string }) => (
    <div className="fade-in" style={{
      background: '#FFFFFF',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 4px 16px rgba(139, 90, 60, 0.1)',
    }}>
      <h3 style={{
        fontFamily: 'Caveat, cursive',
        fontSize: '18px',
        color: '#8B5A3C',
        marginBottom: '16px',
        fontWeight: 700,
        margin: '0 0 16px 0'
      }}>
        {title}
      </h3>
      {items.map(todo => (
        <div key={todo.id} style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '12px',
          gap: '12px',
        }} className="slide-in">
          <button
            onClick={() => toggleTodo(todo.id)}
            style={{
              width: '20px',
              height: '20px',
              border: `2px solid ${todo.completed ? '#8B5A3C' : '#D4C4B0'}`,
              borderRadius: '4px',
              background: todo.completed ? '#8B5A3C' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {todo.completed && <Check size={14} color="#FFFFFF" />}
          </button>
          <span style={{
            flex: 1,
            fontFamily: 'Caveat, cursive',
            fontSize: '18px',
            color: todo.completed ? '#B8B5B0' : '#2C2C2C',
            lineHeight: '22px',
            textDecoration: todo.completed ? 'line-through' : 'none',
            fontWeight: 600
          }}>
            {todo.text}
          </span>
          <button
            onClick={() => deleteTodo(todo.id)}
            style={{
              padding: '4px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={16} color="#D4C4B0" />
          </button>
        </div>
      ))}
      
      {title === "TODAY'S TOP 3" && items.length < 3 && (
        <>
          {showAddInput ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '8px'
            }}>
              <input
                type="text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                placeholder="Add new task..."
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                onBlur={() => {
                  if (!newTodoText.trim()) {
                    setShowAddInput(false);
                  }
                }}
                style={{
                  flex: 1,
                  fontFamily: 'Caveat, cursive',
                  fontSize: '18px',
                  color: '#2C2C2C',
                  border: 'none',
                  borderBottom: '1px solid #D4C4B0',
                  background: 'transparent',
                  padding: '4px 0',
                  outline: 'none',
                  fontWeight: 600
                }}
              />
              <button 
                onClick={addTodo}
                style={{
                  padding: '4px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Check size={16} color="#8B5A3C" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAddInput(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 0',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#8B5A3C'
              }}
            >
              <Plus size={16} />
              <span style={{
                fontFamily: 'Caveat, cursive',
                fontSize: '16px',
                fontWeight: 600
              }}>
                Add task
              </span>
            </button>
          )}
        </>
      )}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <TodoList items={topTodos} title="TODAY'S TOP 3" />
      {remainingTodos.length > 0 && (
        <TodoList items={remainingTodos} title="TO DO'S" />
      )}
    </div>
  );
};