import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import './App.css';

type Todo = {
  id: string;
  value: string;
  checked: boolean;
  removed: boolean;
};

type Filter = 'all' | 'checked' | 'unchecked' | 'removed';

const App: React.FC = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) return;
    const newId = nanoid();
    const newTodo: Todo = {
      value: text,
      id: newId,
      checked: false,
      removed: false,
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

  const handleDelete = (id: string, removed: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.removed = !removed;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'all':
        return !todo.removed;
      case 'checked':
        return todo.checked && !todo.removed;
      case 'unchecked':
        return !todo.checked && !todo.removed;
      case 'removed':
        return todo.removed;
      default:
        return todo;
    }
  });

  return (
    <div className='App'>
      <select
        defaultValue='all'
        onChange={(e) => setFilter(e.target.value as Filter)}
      >
        <option value='all'>全てのタスク</option>
        <option value='checked'>完了したタスク</option>
        <option value='unchecked'>未完了のタスク</option>
        <option value='removed'>削除済みのタスク</option>
      </select>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={text}
          disabled={filter === 'checked' || filter === 'removed'}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type='submit'
          disabled={filter === 'checked' || filter === 'removed'}
          onSubmit={(e) => e.preventDefault()}
        >
          追加
        </button>
      </form>
      <ul>
        {filteredTodos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type='text'
                className={todo.checked ? 'checked' : ''}
                disabled={todo.checked || todo.removed}
                value={todo.value}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
              />
              <input
                type='checkbox'
                disabled={todo.removed}
                checked={todo.checked}
                onChange={() => handleCheck(todo.id, todo.checked)}
              />
              <button onClick={() => handleDelete(todo.id, todo.removed)}>
                {todo.removed ? '復元' : '削除'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
