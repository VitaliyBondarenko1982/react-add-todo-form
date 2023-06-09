import { FC } from 'react';

export type User = {
  id: number,
  name: string,
  email: string,
};

interface Props {
  user: User,
}

export const UserInfo: FC<Props> = ({ user }) => {
  const { name, email } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
