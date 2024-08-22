import { useReducer } from 'react';

// 액션 타입
const ACTION_TYPE = {
  SIGN_IN: 'log in',
  SIGN_OUT: 'log out',
};

// 액션 크리에이터 (함수)
const signInAction = (payload) => ({
  type: ACTION_TYPE.SIGN_IN,
  payload,
});

const signOutAction = () => ({
  type: ACTION_TYPE.SIGN_OUT,
});

// 작업 요청(action) 알림(dispatch)이 오면 리듀서(reducer)가 일을 합니다.
// 리듀서가 하는 일은 요청을 수행해 새로운 상태(state)를 반환합니다.
const authReducer = (state, action) => {
  // 액션: 작업 요청서 action { type, payload? }
  // 요청을 식별해 기능 수행 -> 업데이트 해야 할 다음 상태 반환
  if (action.type === ACTION_TYPE.SIGN_IN) {
    return action.payload;
  }

  if (action.type === ACTION_TYPE.SIGN_OUT) {
    return null;
  }
};

function AuthStatus() {
  const [authUser, dispatch] = useReducer(authReducer, null);

  const signIn = () => {
    dispatch(
      signInAction({
        name: '야무',
        email: 'yamoo9@naver.com',
      })
    );

    // dispatch({
    //   type: ACTION_TYPE.SIGN_IN,
    //   payload: {
    //     name: '야무',
    //     email: 'yamoo9@naver.com',
    //   },
    // });
  };

  const signOut = () => {
    dispatch(signOutAction());

    // dispatch({
    //   type: ACTION_TYPE.SIGN_OUT,
    // });
  };

  return (
    <div>
      <h2 className="headline2">인증 정보</h2>
      {authUser ? (
        <>
          <p>
            {authUser.name} ({authUser.email})
          </p>
          <button type="button" onClick={signOut}>
            로그아웃
          </button>
        </>
      ) : (
        <>
          <p>인증된 사용자가 없습니다.</p>
          <button type="button" onClick={signIn}>
            로그인
          </button>
        </>
      )}
    </div>
  );
}

export default AuthStatus;
