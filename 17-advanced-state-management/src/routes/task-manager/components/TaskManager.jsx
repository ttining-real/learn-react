/* eslint-disable react/prop-types */
import taskReducer, {
  addTask,
  deleteTask,
  INITIAL_TASKS,
  togglePin,
  toggleTask,
} from '@/stores/tasks';
import { createContext, useContext, useId, useMemo, useReducer } from 'react';
import { PiPushPinFill, PiPushPinLight } from 'react-icons/pi';
import { RxCross1 } from 'react-icons/rx';
import S from './TaskManager.module.css';

const taskContext = createContext();

const useTask = () => useContext(taskContext);

function TaskManager() {
  const [taskList, dispatch] = useReducer(taskReducer, INITIAL_TASKS);

  const taskContextValue = useMemo(() => {
    const handleAddTask = (nextStep) => dispatch(addTask(nextStep));
    const handleDeleteTask = () => dispatch(deleteTask());
    const handleTogglePin = () => dispatch(togglePin());
    const handleToggleTask = () => dispatch(toggleTask());

    return {
      addTask: handleAddTask,
      deleteTask: handleDeleteTask,
      toggleTask: handleToggleTask,
      togglePin: handleTogglePin,
    };
  }, []);

  return (
    <taskContext.Provider value={taskContextValue}>
      <div className={S.component}>
        <PinnedTaskList list={taskList} />
        <TaskList list={taskList} />
        <AddTask />
      </div>
    </taskContext.Provider>
  );
}

export default TaskManager;

function PinnedTaskList({ list = [] }) {
  const { togglePin, toggleTask } = useTask();

  const handleToggleTask = (e) => {
    toggleTask(e.target.checked);
  };

  const handleTogglePin = () => {
    togglePin();
  };

  return (
    <ul
      style={{
        display: 'flex',
        flexFlow: 'column',
        gap: 6,
        paddingInlineStart: 0,
      }}
    >
      {list.map((task) => (
        <li key={task.id} style={{ display: 'flex', gap: 6 }}>
          <label>
            <input type="checkbox" name="" onChange={handleToggleTask} />{' '}
            {task.content}
          </label>
          <button type="button" onClick={handleTogglePin}>
            <PiPushPinFill />
          </button>
        </li>
      ))}
    </ul>
  );
}

function TaskList({ list = [] }) {
  const { toggleTask, togglePin, deleteTask } = useTask();

  const handleToggleTask = (e) => {
    toggleTask(e.target.checked);
  };

  const handleTogglePin = () => {
    togglePin();
  };

  const handleDeleteTask = () => {
    deleteTask();
  };

  return (
    <ul
      style={{
        display: 'flex',
        flexFlow: 'column',
        gap: 6,
        paddingInlineStart: 0,
      }}
    >
      {list.map((task) => (
        <li key={task.id} style={{ display: 'flex', gap: 6 }}>
          <label>
            <input type="checkbox" onChange={handleToggleTask} /> {task.content}
          </label>
          <button type="button" onClick={handleTogglePin}>
            <PiPushPinLight />
          </button>
          <button type="button" onClick={handleDeleteTask}>
            <RxCross1 />
          </button>
        </li>
      ))}
    </ul>
  );
}

function AddTask() {
  const id = useId();

  const { addTask } = useTask();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    let nextStep = formData.get('nextStep');
    nextStep = nextStep.trim();

    const inputElement = document.getElementById(id);

    if (nextStep.length > 0) {
      addTask(nextStep);
      inputElement.value = '';
    } else {
      alert('다음 단계를 입력하세요.');
      inputElement.select();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={id} className="sr-only">
        add task
      </label>
      <input id={id} type="text" name="nextStep" placeholder="Next step" />
      <button type="submit">+</button>
    </form>
  );
}
