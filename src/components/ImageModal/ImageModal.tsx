import { useState } from 'react';
import Modal from 'react-modal';

import styles from './imageModal.module.scss';
type Props = {
  urls: string[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
};
const ImageModal = ({ urls, isOpen, setIsOpen, current, setCurrent }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      className={styles.wrapper}
      overlayClassName={styles.overlay}
      appElement={document.getElementById('root') as HTMLElement}
    >
      <div className={styles.imageWrapper}>
        <img src={urls[current]} alt='' className={styles.image} />
      </div>
      {urls.length > 1 && (
        <>
          <button
            className={styles.prevBtn}
            type='button'
            onClick={() =>
              setCurrent((prev) => {
                if (prev === 0) return urls.length - 1;
                return prev - 1;
              })
            }
          >
            {'<'}
          </button>
          <button
            className={styles.nextBtn}
            type='button'
            onClick={() =>
              setCurrent((current) => {
                if (current === urls.length - 1) return 0;
                return current + 1;
              })
            }
          >
            {'>'}
          </button>
        </>
      )}
    </Modal>
  );
};

export default ImageModal;
