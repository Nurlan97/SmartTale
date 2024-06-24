import { observer } from 'mobx-react-lite';
import { SetStateAction, useState } from 'react';

import { DeleteImg } from '../../assets';
import ImageModal from '../../components/ImageModal/ImageModal';
import { typePlaceAdvStore } from '../../store';
import styles from './imageInput.module.scss';

interface IImageInput {
  store: typePlaceAdvStore;
  disabled?: boolean;
}

const ImageInput = observer(({ store, disabled = false }: IImageInput) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [current, setCurrent] = useState(0);
  return (
    <div className={styles.photoContainer}>
      {store.viewedImages.map((img, ind) => {
        return (
          <div key={ind} className={styles.currentImages}>
            <label htmlFor={`current${ind}`} className={styles.inputPhotoFilled}>
              <img className={styles.smallImg} src={img} alt='Change' />
              {!disabled ? (
                <>
                  <div className={styles.changeImage}>Change photo</div>
                  <button
                    className={styles.deleteImage}
                    onClick={() => store.deleteImage(ind)}
                    type='button'
                  >
                    <DeleteImg />
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={styles.viewImage}
                    onClick={() => {
                      setCurrent(ind);
                      setIsOpen(true);
                    }}
                    type='button'
                  >
                    <div className={styles.changeImage}>view photo</div>
                  </button>
                </>
              )}
            </label>
            <input
              disabled={disabled}
              id={`current${ind}`}
              type='file'
              className={styles.hiddenInput}
              onChange={(ev) => {
                if (!ev.target.files) return;
                store.replaceImage(ev.target.files[0], ind);
              }}
            />
          </div>
        );
      })}
      {store.viewedImages.length < 5 && !disabled && (
        <>
          <label htmlFor='newFile' className={styles.inputPhoto}>
            {<div className={styles.addFile}>+ Добавить файл</div>}
          </label>
          <input
            id='newFile'
            type='file'
            className={styles.hiddenInput}
            onChange={(ev) => {
              if (!ev.target.files) return;
              store.addImage(ev.target.files[0]);
            }}
          />
        </>
      )}
      <ImageModal
        urls={store.viewedImages}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        current={current}
        setCurrent={setCurrent}
      />
    </div>
  );
});

export default ImageInput;
