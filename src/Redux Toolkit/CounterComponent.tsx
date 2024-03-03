// CounterComponent.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './Store';
import { increment, decrement } from './counterSlice';

const CounterComponent: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
          <div>Count: {count}</div>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default CounterComponent;
