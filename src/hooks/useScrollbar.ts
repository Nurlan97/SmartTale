import { OverlayScrollbars } from 'overlayscrollbars';
import React from 'react';
import { useEffect } from 'react';

const useScrollbar = (root: React.RefObject<HTMLDivElement>, hasScroll: boolean) => {
  useEffect(() => {
    let scrollbars = null;
    if (root.current && hasScroll) {
      scrollbars = OverlayScrollbars(root.current, {
        scrollbars: {
          visibility: 'auto',
          autoHide: 'never',
        },
        // overflow: {
        //   y: 'visible',
        //   x: 'visible',
        // },
      });
    }
    return () => {
      if (scrollbars) {
        scrollbars.destroy();
      }
    };
  }, [root, hasScroll]);
};

export { useScrollbar };
