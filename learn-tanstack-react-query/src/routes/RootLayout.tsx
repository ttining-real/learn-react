import { Outlet, ScrollRestoration } from 'react-router-dom';
import { useFocusingPrevFocusedElement } from '@/hooks/useFocusingPrevFocusedElement';
import AppHeader from '@/components/AppHeader';

function RootLayout() {
  useFocusingPrevFocusedElement();

  return (
    <div className="layout">
      <AppHeader />
      <main>
        <Outlet />
      </main>
      <ScrollRestoration />
    </div>
  );
}

export default RootLayout;
