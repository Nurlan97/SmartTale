import { RefObject } from 'react';

import navbarStore from '../store/navbarStore';

export const setHeight = (
  ref: React.RefObject<HTMLDivElement>,
  type: 'extended' | 'rolled up',
) => {
  if (ref.current) {
    ref.current.style.height = `${ref.current.scrollHeight}px`;
    setTimeout(() => {
      if (ref.current)
        ref.current.style.height =
          type === 'rolled up' ? '0' : `${ref.current.scrollHeight}px`;
    }, 0);
  }
};

export const collapseCalc = (
  refObj: {
    [key: string]: RefObject<HTMLDivElement>;
  },
  first: RefObject<HTMLDivElement>,
  last: RefObject<HTMLDivElement>,
) => {
  const start = first.current && first.current.getBoundingClientRect().top;
  let blockHeight = 0;

  for (const key in refObj) {
    if (typeof refObj[key] !== 'string' && refObj[key].current) {
      if (navbarStore.tabs[key] === 'extended')
        blockHeight = blockHeight + Number(refObj[key].current?.scrollHeight);
    }
  }

  if (last.current)
    if (
      last.current.getBoundingClientRect().top + window.scrollY <
      Number(start) + blockHeight + 200
    ) {
      navbarStore.collapse();
      for (const key in refObj) {
        if (refObj[key].current) {
          setHeight(
            refObj[key],
            navbarStore.tabs[key] === 'rolled up' ? 'rolled up' : 'extended',
          );
        }
      }
    }
};
