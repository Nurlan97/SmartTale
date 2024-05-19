import { useEffect, useLayoutEffect, useState } from 'react';

import { useDebounce } from './useDebounce';

// limit: передаем из стора лимит карточек, он его будет менять
// width: передаем ширину карточек
// gap: передаем gap в гриде

const useColumnsGrid = (
  setLimit: (limit: number) => void,
  width: number,
  gap: number,
) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [columns, setColumns] = useState(6);

  const debounceHandleSize = useDebounce(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  });
  useLayoutEffect(() => {
    window.addEventListener('resize', debounceHandleSize);
    return () => window.removeEventListener('resize', debounceHandleSize);
  }, []);

  useEffect(() => {
    const cols = Math.max(
      Math.min(Math.floor((windowSize.width - 316 + gap) / (width + gap)), 6),
      1,
    );
    setColumns(cols);
    setLimit(cols * 2);
  }, [windowSize]);
  return columns;
};

export default useColumnsGrid;
