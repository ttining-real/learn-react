import { memo } from 'react';
import GlobalNav from './GlobalNav';
import SkipToMain from './SkipToMain';
import HomeLink from './HomeLink';

function AppHeader() {
  return (
    <header className="p-4">
      <SkipToMain />
      <HomeLink lang="en" />
      <GlobalNav />
    </header>
  );
}

export default memo(AppHeader);
