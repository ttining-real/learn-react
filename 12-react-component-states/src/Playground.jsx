import Counter from '@/components/Counter';
import CounterClass from '@/components/Counter.class';

function Playground() {
  return (
    <>
      <Counter count={3} min={2} max={6} />
      <CounterClass min={9} count={10} step={101} />
      {/* <Counter count={10} step={4} min={20} max={40} /> */}
    </>
  );
}

export default Playground;
