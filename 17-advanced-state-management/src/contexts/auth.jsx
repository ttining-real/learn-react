import {
  createContext,
  useMemo,
  useReducer,
  useCallback,
  useContext,
} from 'react';
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

export const useAuth = () => {
  const authContextValue = useContext(authContext);

  if (!authContextValue) {
    throw new Error('useAuth() 훅은 Auth Context 내부에서만 사용 가능합니다.');
  }

  return authContextValue;
};
