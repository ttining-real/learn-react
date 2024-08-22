import { primitives, semantics } from '@/theme';
import { THEME_MODE } from '@/theme/semantics';
import { createContext, useContext, useMemo, useState } from 'react';

const themeContext = createContext();

export function ThemeProvider(props) {
  const [mode, setMode] = useState(THEME_MODE.LIGHT);

  const themeValue = useMemo(
    () => ({
      mode,
      theme: semantics[mode],
      toggleThemeMode: () => {
        const nextMode =
          mode === THEME_MODE.LIGHT ? THEME_MODE.DARK : THEME_MODE.LIGHT;
        setMode(nextMode);
      },
      color: primitives.color,
    }),
    [mode]
  );

  return <themeContext.Provider value={themeValue} {...props} />;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const themeValue = useContext(themeContext);

  if (!themeValue) {
    throw new Error(
      'useTheme() 훅은 ThemeContext의 내부에서만 사용 가능합니다.'
    );
  }

  return themeValue;
}
