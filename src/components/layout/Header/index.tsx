// libs
import {
  type ChangeEvent, type FC, useEffect, useState,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, InputGroup } from '@blueprintjs/core';
// constants
import { ROUTES } from 'constants/routes';
// hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
// static
import { Shell, User } from 'lucide-react';
import { setSearch } from 'store/filters/slice';

const Header: FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.authState);

  useEffect(() => {
    dispatch(setSearch(searchValue));
  }, [dispatch, searchValue]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <header className="header-wrapper">
      <div className="wrapper header">
        <nav className="header-navigation">
          <button className="header-logo-btn" onClick={() => navigate(ROUTES.HOME)}>
            <Link to={ROUTES.HOME}>
              <Shell className="logo" />
            </Link>
          </button>
          <InputGroup leftIcon="search" onChange={onChangeHandler} type="search" value={searchValue} />
        </nav>
        <div className="users-btn">
          {
            token ? (
              <Link to={ROUTES.PROFILE}>
                <User size={32} />
              </Link>
            ) : (
              <Button className="log-in-btn" icon="log-in" intent="success" onClick={() => navigate(ROUTES.LOGIN)} size="medium" type="button" variant="outlined">Войти</Button>
            )
          }
        </div>
      </div>
    </header>
  );
};

export default Header;
