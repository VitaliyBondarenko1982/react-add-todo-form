import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types';
import AddTodoForm from './components/AddTodoForm/AddTodoForm';
import { getMaxTodoId, getTodosWithUser } from './utils';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(
    getTodosWithUser(todosFromServer, usersFromServer),
  );

  const addTodo = (todo: Todo) => {
    setTodos(prevTodos => [...prevTodos, todo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <AddTodoForm addTodo={addTodo} maxTodoId={getMaxTodoId(todos)} />
      <TodoList todos={todos} />
    </div>
  );
};
