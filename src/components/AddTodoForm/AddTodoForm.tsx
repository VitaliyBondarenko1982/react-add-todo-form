import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Todo } from '../../types';
import usersFromServer from '../../api/users';
import { getUserById } from '../../utils';

interface Props {
  addTodo: (todo: Todo) => void;
  maxTodoId: number;
}
const AddTodoForm: FC<Props> = ({ addTodo, maxTodoId }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleChangeUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (!userId) {
      setUserIdError(true);
    }

    if (!title || !userId) {
      return;
    }

    const newTodo: Todo = {
      id: maxTodoId + 1,
      title,
      completed: false,
      userId,
      user: getUserById(usersFromServer, userId),
    };

    addTodo(newTodo);

    setTitle('');
    setUserId(0);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={handleChangeTitle}
          placeholder="Enter a title"
        />
        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select data-cy="userSelect" value={userId} onChange={handleChangeUser}>
          <option value="0" disabled>
            Choose a user
          </option>
          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {userIdError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};

export default AddTodoForm;
