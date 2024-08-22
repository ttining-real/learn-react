const ACTION_TYPES = {
  ADD_TASK: '태스크 추가',
  TOGGLE_TASK: '태스크 토글',
  TOGGLE_PIN: '핀 토글',
  DELETE_TASK: '태스크 삭제',
};

export const addTask = (nextStep) => ({
  type: ACTION_TYPES.ADD_TASK,
  payload: nextStep,
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
  {
    id: '374f637e-d27f-4aa3-acb4-a76b76a31d51',
    content: 'Draiange systems',
    isCompleted: false,
    isPin: false,
  },
  {
    id: 'a1ddb5c6-f4aa-4c9c-968d-4c0750e5d705',
    content: 'Reereational faeilities',
    isCompleted: false,
    isPin: false,
  },
];

export default function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.ADD_TASK: {
      const newTask = {
        id: crypto.randomUUID(),
        content: action.payload,
        isCompleted: false,
        isPin: false,
      };

      const nextState = [newTask, ...state];

      return nextState;
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
