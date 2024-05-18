import { Todo, User } from './types';

export const getTodosWithUser = (todos: Todo[], users: User[]): Todo[] => {
  const usersMap = users.reduce<Record<string, User>>(
    (acc, user: User) => ({ ...acc, [user.id]: user }),
    {},
  );

  return todos.map((todo: Todo) => ({ ...todo, user: usersMap[todo.userId] }));
};

export const getUserById = (users: User[], userId: number) =>
  users.find(({ id }) => id === userId);

export const getMaxTodoId = (todos: Todo[]) => {
  return Math.max(...todos.map(todo => todo.id));
};
