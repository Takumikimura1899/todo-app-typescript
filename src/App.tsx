import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import './App.css';

type Todo = {
  id: string;
  value: string;
  checked: boolean;
};

const App: React.FC = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) return;
    const newId = nanoid();
    const newTodo: Todo = {
      value: text,
      id: newId,
      checked: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const handleEdit = (id: string, value: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleCheck = (id: string, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleDelete = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    // setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type='submit' onSubmit={(e) => e.preventDefault()}>
          追加
        </button>
      </form>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type='text'
                disabled={todo.checked}
                value={todo.value}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
              />
              <input
                type='checkbox'
                checked={todo.checked}
                onChange={() => handleCheck(todo.id, todo.checked)}
              />
              <button onClick={() => handleDelete(todo.id)}>削除</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
