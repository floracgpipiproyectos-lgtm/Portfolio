import { useState, useEffect } from 'react'
import './App.css'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('react-todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    localStorage.setItem('react-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { 
        id: Date.now(), 
        text: inputValue.trim(), 
        completed: false 
      }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="app">
      <a href="../../index.html" className="back-link">
        ← Volver al Portfolio
      </a>

      <div className="container">
        <div className="header">
          <h1>📝 React To-Do</h1>
          <p className="subtitle">Gestiona tus tareas con React</p>
        </div>

        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Nueva tarea..."
            maxLength={100}
          />
          <button onClick={addTodo} className="btn-add">+</button>
        </div>

        <div className="filters">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            Todas
          </button>
          <button 
            className={filter === 'active' ? 'active' : ''} 
            onClick={() => setFilter('active')}
          >
            Pendientes
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''} 
            onClick={() => setFilter('completed')}
          >
            Completadas
          </button>
          {todos.some(t => t.completed) && (
            <button className="btn-clear" onClick={clearCompleted}>
              Limpiar completadas
            </button>
          )}
        </div>

        <ul className="todo-list">
          {filteredTodos.length === 0 ? (
            <li className="empty-state">
              {filter === 'all' ? '📋 No hay tareas aún' : 
               filter === 'active' ? '✓ No hay tareas pendientes' : 
               '✓ No hay tareas completadas'}
            </li>
          ) : (
            filteredTodos.map(todo => (
              <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                <div 
                  className="checkbox" 
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.completed && '✓'}
                </div>
                <span className="todo-text">{todo.text}</span>
                <button 
                  className="btn-delete" 
                  onClick={() => deleteTodo(todo.id)}
                >
                  ✕
                </button>
              </li>
            ))
          )}
        </ul>

        <div className="stats">
          {activeCount} tarea{activeCount !== 1 ? 's' : ''} pendiente{activeCount !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  )
}

export default App

