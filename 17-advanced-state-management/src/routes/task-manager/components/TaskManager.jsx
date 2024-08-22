/* eslint-disable react/prop-types */
import S from './TaskManager.module.css';
import { PiPushPinLight, PiPushPinFill } from 'react-icons/pi';
import { RxCross1 } from 'react-icons/rx';

function TaskManager() {
  const taskList = [
    { id: 1, content: 'Draiange systems', isCompleted: false, isPin: false },
    {
      id: 2,
      content: 'Reereational faeilities',
      isCompleted: false,
      isPin: false,
    },
  ];

  return (
    <div className={S.component}>
      <PinnedTaskList />
      <TaskList list={taskList} />
      <AddTask />
    </div>
  );
}

export default TaskManager;

function PinnedTaskList({ list = [] }) {
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
            <input type="checkbox" name="" /> {task.content}
          </label>
          <button type="button">
            <PiPushPinFill />
          </button>
        </li>
      ))}
    </ul>
  );
}

function TaskList({ list = [] }) {
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
            <input type="checkbox" name="" /> {task.content}
          </label>
          <button type="button">
            <PiPushPinLight />
          </button>
          <button type="button">
            <RxCross1 />
          </button>
        </li>
      ))}
    </ul>
  );
}

function AddTask() {
  return (
    <form>
      <label htmlFor="" className="sr-only">
        add task
      </label>
      <input type="text" placeholder="Next step" />
      <button type="submit">+</button>
    </form>
  );
}
