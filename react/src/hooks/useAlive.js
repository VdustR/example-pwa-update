import { useCallback, useEffect, useRef } from 'react';

const useAlive = () => {
  const isAliveRef = useRef(true);
  useEffect(
    () => () => {
      isAliveRef.current = false;
    },
    []
  );
  const checkAlive = useCallback(() => isAliveRef.current, []);
  return checkAlive;
};

export default useAlive;
