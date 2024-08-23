import { createContext, useMemo, useReducer, useCallback } from 'react';
import authReducer, {
  INITIAL_AUTH_INFO,
  resetAuth,
  setAuth,
} from '@/stores/auth';

// 인증 (Authentication) / 권한 (Authorization)
const authContext = createContext();

export const AuthProvider = (props) => {
  const [authState, dispatch] = useReducer(authReducer, INITIAL_AUTH_INFO);

  const handleSetAuth = useCallback(
    (authInfo) => dispatch(setAuth(authInfo)),
    []
  );
  const handleResetAuth = useCallback(() => dispatch(resetAuth()), []);

  return (
    <authContext.Provider
      value={{
        authInfo: useMemo(() => authState, [authState]),
        setAuth: handleSetAuth,
        resetAuth: handleResetAuth,
      }}
      {...props}
    />
  );
};
