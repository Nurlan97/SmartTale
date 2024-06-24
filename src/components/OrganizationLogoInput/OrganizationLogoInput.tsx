import { observer } from 'mobx-react-lite';

import { DeleteImg } from '../../assets';
import { typePlaceOrderStore } from '../../store';
import organizationOrderStore from '../../store/organizationOrderStore';
import styles from './OrganizationLogoInput.module.scss';

interface IImageInput {
  store: typePlaceOrderStore;
}

const OrganizationLogoInput = observer(() => {
  return (
    <div className={styles.photoContainer}>
      {organizationOrderStore.viewedImage && (
        <div className={styles.currentImages}>
          <label htmlFor='fileImage' className={styles.inputPhotoFilled}>
            <img
              className={styles.smallImg}
              src={organizationOrderStore.viewedImage}
              alt='Change'
            />
            <div className={styles.changeImage}>Change photo</div>
            <button
              className={styles.deleteImage}
              onClick={() => organizationOrderStore.deleteImage()}
              type='button'
            >
              <DeleteImg />
            </button>
          </label>
          <input
            id='fileImage'
            type='file'
            className={styles.hiddenInput}
            onChange={(ev) => {
              if (!ev.target.files) return;
              organizationOrderStore.updateImage(ev.target.files[0]);
            }}
          />
        </div>
      )}

      {!organizationOrderStore.viewedImage && (
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
              organizationOrderStore.addImage(ev.target.files[0]);
            }}
          />
        </>
      )}
    </div>
  );
});

export default OrganizationLogoInput;
