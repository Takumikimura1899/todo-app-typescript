import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import './App.css';
import InputForm from './components/InputForm';
import Select from './components/Select';

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
    setText('');
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

  const handleEmpty = () => {
    const newTodos = todos.filter((todo) => !todo.removed);
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
      <Select setFilter={setFilter} />
      {filter === 'removed' ? (
        <button onClick={handleEmpty}>ゴミ箱を空にする</button>
      ) : (
        <InputForm
          text={text}
          filter={filter}
          setText={setText}
          handleSubmit={handleSubmit}
        />
      )}
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
