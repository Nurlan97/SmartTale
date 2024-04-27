import { observer } from 'mobx-react-lite';

import { DeleteImg } from '../../assets';
import { typePlaceOrderStore } from '../../store';
import styles from './imageInput.module.scss';

interface IImageInput {
  store: typePlaceOrderStore;
}

const ImageInput = observer(({ store }: IImageInput) => {
  return (
    <div className={styles.photoContainer}>
      {store.viewedImages.map((img, ind) => {
        return (
          <div key={ind} className={styles.currentImages}>
            <label htmlFor={`current${ind}`} className={styles.inputPhotoFilled}>
              <img className={styles.smallImg} src={img} alt='Change' />
              <div className={styles.changeImage}>Change photo</div>
              <button
                className={styles.deleteImage}
                onClick={() => store.deleteImage(ind)}
              >
                <DeleteImg />
              </button>
            </label>
            <input
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
      {store.viewedImages.length < 5 && (
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
      {/* <button onClick={placeOrderStore.calcActions}>test</button> */}
    </div>
  );
});

export default ImageInput;
