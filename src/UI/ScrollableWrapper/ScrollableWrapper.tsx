import React, { useRef } from 'react';

import { useScrollbar } from '../../hooks/useScrollbar';
type Props = {
  children: React.ReactNode;
};
const ScrollableWrapper = ({ children }: Props) => {
  const pageWrapper = useRef(null);
  useScrollbar(pageWrapper, true);
  return <div ref={pageWrapper}>{children}</div>;
};

export default ScrollableWrapper;
