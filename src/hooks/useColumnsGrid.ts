import { useEffect, useLayoutEffect, useState } from 'react';

// limit: передаем из стора лимит карточек, он его будет менять
// width: передаем ширину карточек
// gap: передаем gap в гриде

const useColumnsGrid = (
  setLimit: (limit: number) => void,
  width: number,
  gap: number,
) => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [columns, setColumns] = useState(4);
  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useLayoutEffect(() => {
    handleSize();
    window.addEventListener('resize', handleSize);
    return () => window.removeEventListener('resize', handleSize);
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
