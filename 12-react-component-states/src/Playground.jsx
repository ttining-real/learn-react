import Counter from '@/components/Counter';
// import CounterClass from '@/components/Counter.class';
// import { UsersPage } from '@/pages/users';

function Playground() {
  return (
    <div style={styles}>
      <Counter min={-50} count={3} max={50} />
      {/* <UsersPage /> */}
    </div>
  );
}

const styles = {
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
};

export default Playground;
