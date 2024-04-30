import Button from '../../UI/Button/Button';
import styles from './changePhotoModal.module.scss';

const ChangePhotoModal = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.emoji}>😃</div>
      <div className={styles.title}>Изменить фото профиля?</div>
      <div className={styles.description}>Загрузите фотографию из своей галлереи</div>
      <label htmlFor='photo' className={styles.label}>
        <div className={styles.labelBtn}>+ Загрузить файл</div>
        Формат JPG, JPEG, PNG
      </label>
      <input className={styles.input} type='file' id='photo' />
      <Button color='blue' type='button'>
        Сохранить
      </Button>
    </div>
  );
};

export default ChangePhotoModal;
