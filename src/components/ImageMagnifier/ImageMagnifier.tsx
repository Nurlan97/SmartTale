import { useEffect, useRef, useState } from 'react';

import styles from './imageMagnifier.module.scss';
type Props = {
  imgUrl: string;
  className: string;
};
const ImageMagnifier = ({ imgUrl, className }: Props) => {
  const [position, setPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y, width, height });
    setCursorPosition({ x: e.pageX - left, y: e.pageY - top });
  };

  return (
    <div
      className={className}
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
    >
      <div className={styles.wrapper}>
        <img className={styles.magnifierImg} src={imgUrl} alt='' />
        {showMagnifier && (
          <div
            style={{
              position: 'absolute',
              left: `${cursorPosition.x - 100}px`,
              top: `${cursorPosition.y - 100}px`,
              pointerEvents: 'none',
            }}
          >
            <div className={styles.magnifierPan} />
          </div>
        )}
      </div>

      {showMagnifier && (
        <div
          style={{
            position: 'absolute',
            right: `-${position.width + 32}px`,
            top: 0,
            pointerEvents: 'none',
          }}
        >
          <div
            className={styles.magnifierImage}
            style={{
              backgroundImage: `url(${imgUrl})`,
              backgroundSize: `${position.width * 3}px ${position.height * 3}px`,
              backgroundPosition: `${position.x}% ${position.y}%`,
              width: `${position.width}px`,
              height: `${position.height}px`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageMagnifier;
