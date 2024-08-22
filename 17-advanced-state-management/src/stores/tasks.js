const ACTION_TYPES = {
  ADD_TASK: '태스크 추가',
  TOGGLE_TASK: '태스크 토글',
  TOGGLE_PIN: '핀 토글',
  DELETE_TASK: '태스크 삭제',
};

export const addTask = () => ({
  type: ACTION_TYPES.ADD_TASK,
});

export const toggleTask = () => ({
  type: ACTION_TYPES.TOGGLE_TASK,
});

export const togglePin = () => ({
  type: ACTION_TYPES.TOGGLE_PIN,
});

export const deleteTask = () => ({
  type: ACTION_TYPES.DELETE_TASK,
});

export const INITIAL_TASKS = [
  { id: 1, content: 'Draiange systems', isCompleted: false, isPin: false },
  {
    id: 2,
    content: 'Reereational faeilities',
    isCompleted: false,
    isPin: false,
  },
];

export default function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.ADD_TASK: {
      console.log('추가');
      return state;
    }

    case ACTION_TYPES.DELETE_TASK: {
      console.log('삭제');
      return state;
    }

    case ACTION_TYPES.TOGGLE_PIN: {
      console.log('핀 토글');
      return state;
    }

    case ACTION_TYPES.TOGGLE_TASK: {
      console.log('태스크 토글');
      return state;
    }

    default: {
      return state;
    }
  }
}
