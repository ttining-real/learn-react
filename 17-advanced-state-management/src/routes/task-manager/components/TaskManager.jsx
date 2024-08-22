/* eslint-disable react/prop-types */
import taskReducer, {
  addTask,
  deleteTask,
  INITIAL_TASKS,
  togglePin,
  setTask,
} from '@/stores/tasks';
import { createContext, useContext, useId, useMemo, useReducer } from 'react';
import { PiPushPinFill, PiPushPinLight } from 'react-icons/pi';
import { RxCross1 } from 'react-icons/rx';
import S from './TaskManager.module.css';

const taskContext = createContext();

const useTask = () => useContext(taskContext);

function TaskManager() {
  const [taskList, dispatch] = useReducer(taskReducer, INITIAL_TASKS);

  const taskMethods = useMemo(() => {
    const handleAddTask = (nextStep) => dispatch(addTask(nextStep));
    const handleDeleteTask = (deleteId) => dispatch(deleteTask(deleteId));
    const handleTogglePin = (taskId) => dispatch(togglePin(taskId));
    const handleSetTask = (taskId, isCompleted) =>
      dispatch(setTask(taskId, isCompleted));

    return {
      addTask: handleAddTask,
      deleteTask: handleDeleteTask,
      setTask: handleSetTask,
      togglePin: handleTogglePin,
    };
  }, []);

  const pinnedTaskList = taskList.filter((task) => task.isPin);
  const unpinnedTaskList = taskList.filter((task) => !task.isPin);

  return (
    <taskContext.Provider
      value={{ pinnedTaskList, unpinnedTaskList, methods: taskMethods }}
    >
      <div className={S.component}>
        <PinnedTaskList list={taskList} />
        <TaskList list={taskList} />
        <AddTask />
      </div>
    </taskContext.Provider>
  );
}

export default TaskManager;

function PinnedTaskList() {
  const {
    pinnedTaskList,
    methods: { togglePin, setTask },
  } = useTask();

  const handleSetTask = (taskId, isCompleted) => {
    setTask(taskId, isCompleted);
  };

  const handleTogglePin = (taskId) => {
    togglePin(taskId);
  };

  return (
    <ul
      style={{
        display: 'flex',
        flexFlow: 'column',
        paddingInlineStart: 0,
        gap: 6,
      }}
    >
      {pinnedTaskList.map((task) => {
        return (
          <li key={task.id} style={{ display: 'flex', gap: 6 }}>
            <label
              style={{
                textDecoration: task.isCompleted ? 'line-through' : null,
                fontSize: 24,
              }}
            >
              <input
                type="checkbox"
                defaultChecked={task.isCompleted}
                onChange={(e) => handleSetTask(task.id, e.target.checked)}
              />{' '}
              {task.content}
            </label>
            <button type="button" onClick={() => handleTogglePin(task.id)}>
              {task.isPin ? <PiPushPinFill /> : <PiPushPinLight />}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function TaskList() {
  const {
    unpinnedTaskList,
    methods: { setTask, togglePin, deleteTask },
  } = useTask();

  const handleSetTask = (taskId, isCompleted) => {
    setTask(taskId, isCompleted);
  };

  const handleTogglePin = (taskId) => {
    togglePin(taskId);
  };

  const handleDeleteTask = (deleteId) => {
    deleteTask(deleteId);
  };

  return (
    <ul
      style={{
        display: 'flex',
        flexFlow: 'column',
        paddingInlineStart: 0,
        gap: 6,
      }}
    >
      {unpinnedTaskList.map((task) => (
        <li key={task.id} style={{ display: 'flex', gap: 6 }}>
          <label
            style={{ textDecoration: task.isCompleted ? 'line-through' : null }}
          >
            <input
              type="checkbox"
              defaultChecked={task.isCompleted}
              onChange={(e) => handleSetTask(task.id, e.target.checked)}
            />{' '}
            {task.content}
          </label>
          <button type="button" onClick={() => handleTogglePin(task.id)}>
            {task.isPin ? <PiPushPinFill /> : <PiPushPinLight />}
          </button>
          <button type="button" onClick={() => handleDeleteTask(task.id)}>
            <RxCross1 />
          </button>
        </li>
      ))}
    </ul>
  );
}

function AddTask() {
  const id = useId();

  const {
    methods: { addTask },
  } = useTask();

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
