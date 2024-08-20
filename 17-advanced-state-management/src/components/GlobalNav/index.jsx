import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { navigationItems } from '@/router';
import S from './style.module.css';

function GlobalNav() {
  const [navigationList] = useState(navigationItems);

  return (
    <nav className={S.component}>
      <h2>학습 주제</h2>
      <ul>
        {navigationList.map(({ path, text }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) => {
                return isActive ? S.active : undefined;
              }}
            >
              {text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default GlobalNav;
