import { FC } from 'react';
import { TodoInfo, Todo } from '../TodoInfo';

interface TodoListProps {
  todos: Todo[],
}

export const TodoList: FC<TodoListProps> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => <TodoInfo todo={todo} key={todo.id} />)}
  </section>
);
