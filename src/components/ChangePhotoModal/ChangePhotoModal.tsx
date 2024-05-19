import { useState } from 'react';

import { modalStore, userStore } from '../../store';
import Button from '../../UI/Button/Button';
import styles from './changePhotoModal.module.scss';
interface IFile {
  view: string | null;
  file: File | null;
}

const ChangePhotoModal = () => {
  const [photo, setPhoto] = useState<IFile>({ view: null, file: null });
  return (
    <div className={styles.wrapper}>
      <div className={styles.emoji}>😃</div>
      <div className={styles.title}>Изменить фото профиля?</div>
      <div className={styles.description}>Загрузите фотографию из своей галлереи</div>
      <label
        htmlFor='changePhoto'
        className={photo.view === null ? styles.label : styles.photo}
      >
        {photo.view === null ? (
          <>
            <div className={styles.labelBtn}>+ Загрузить файл</div>
            Формат JPG, JPEG, PNG
          </>
        ) : (
          <>
            <img className={styles.image} src={photo.view} alt='' />
          </>
        )}
      </label>
      <input
        className={styles.input}
        type='file'
        id='changePhoto'
        onChange={(e) => {
          if (!e.target.files) return;
          const file = e.target.files[0];
          setPhoto({
            view: URL.createObjectURL(file),
            file: file,
          });
        }}
      />
      <Button
        color='blue'
        type='button'
        handler={() => {
          if (photo.file) {
            userStore.updatePhoto(photo.file);
          }
        }}
      >
        Сохранить
      </Button>
    </div>
  );
};

export default ChangePhotoModal;
