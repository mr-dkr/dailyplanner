import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Plus, Check, X } from 'lucide-react-native';
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
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map(todo => (
        <View key={todo.id} style={styles.todoItem}>
          <TouchableOpacity
            style={[styles.checkbox, todo.completed && styles.checkedBox]}
            onPress={() => toggleTodo(todo.id)}
          >
            {todo.completed && <Check size={14} color="#FFFFFF" />}
          </TouchableOpacity>
          <Text style={[
            styles.todoText,
            todo.completed && styles.completedTodo
          ]}>
            {todo.text}
          </Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteTodo(todo.id)}
          >
            <X size={16} color="#D4C4B0" />
          </TouchableOpacity>
        </View>
      ))}
      
      {title === "TODAY'S TOP 3" && items.length < 3 && (
        <>
          {showAddInput ? (
            <View style={styles.addInputContainer}>
              <TextInput
                style={styles.addInput}
                value={newTodoText}
                onChangeText={setNewTodoText}
                placeholder="Add new task..."
                autoFocus
                onSubmitEditing={addTodo}
                onBlur={() => {
                  if (!newTodoText.trim()) {
                    setShowAddInput(false);
                  }
                }}
              />
              <TouchableOpacity style={styles.addButton} onPress={addTodo}>
                <Check size={16} color="#8B5A3C" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addTodoButton}
              onPress={() => setShowAddInput(true)}
            >
              <Plus size={16} color="#8B5A3C" />
              <Text style={styles.addTodoText}>Add task</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <TodoList items={topTodos} title="TODAY'S TOP 3" />
      {remainingTodos.length > 0 && (
        <TodoList items={remainingTodos} title="TO DO'S" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#8B5A3C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#8B5A3C',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#D4C4B0',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    backgroundColor: '#8B5A3C',
    borderColor: '#8B5A3C',
  },
  todoText: {
    flex: 1,
    fontFamily: 'Caveat-Regular',
    fontSize: 16,
    color: '#2C2C2C',
    lineHeight: 20,
  },
  completedTodo: {
    textDecorationLine: 'line-through',
    color: '#B8B5B0',
  },
  deleteButton: {
    padding: 4,
  },
  addTodoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  addTodoText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#8B5A3C',
  },
  addInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  addInput: {
    flex: 1,
    fontFamily: 'Caveat-Regular',
    fontSize: 16,
    color: '#2C2C2C',
    borderBottomWidth: 1,
    borderBottomColor: '#D4C4B0',
    paddingVertical: 4,
  },
  addButton: {
    padding: 4,
  },
});