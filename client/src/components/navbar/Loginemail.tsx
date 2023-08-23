import { FC } from 'react';
import { useOlxContext } from '../../context/useOlxContext';

export const Loginemail: FC = () => {
    const {changeSelectedLoginPage} = useOlxContext();
  return (
    <div>
        <button onClick={() => changeSelectedLoginPage('main')}>back</button>
      Loginemail
    </div>
  );
};