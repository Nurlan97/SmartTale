import axios from 'axios';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { NavbarProfile } from '../../assets';
import Header from '../../components/Header/Header';
import { modalStore, userStore } from '../../store';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import PhoneInput from '../../UI/PhoneInput/PhoneInput';
import Subscribe from '../../UI/Subscribe/Subscribe';
import styles from './profilePage.module.scss';

const ProfilePage = observer(() => {
  useEffect(() => {
    // userStore.getUser();
  }, []);
  return (
    <div className={styles.page}>
      <div>
        <Header path='Личный кабинет/Профиль' title='Ваш профиль' />
        <Subscribe period={''} />
        <div className={styles.profileHeader}>
          {userStore.profilePhoto ? (
            <>
              <label className={styles.profilePhoto} htmlFor='photo'>
                <img
                  className={styles.profilePhotoImg}
                  src={userStore.profilePhoto}
                  alt=''
                />{' '}
              </label>
              <button
                id='photo'
                className={styles.hiddenInput}
                type='button'
                onClick={modalStore.openChangePhoto}
              ></button>
            </>
          ) : (
            <>
              <label className={styles.profilePhoto} htmlFor='emptyPhoto'>
                <NavbarProfile className={styles.profilePhotoSVG} />{' '}
              </label>
              <button
                id='emptyPhoto'
                className={styles.hiddenInput}
                type='button'
              ></button>
            </>
          )}

          <div>
            <p className={styles.name}>Кирилл Олейников</p>
            <p className={styles.changePhoto}>Изменить фото профиля</p>
          </div>
        </div>
        <h3 className={styles.title}>Личные данные</h3>
        <div className={styles.personalInformation}>
          <Input
            onChange={userStore.changeFirstName}
            value={userStore.firstName}
            label='Имя'
            disabled={!userStore.profileEdit}
          />
          <Input
            onChange={userStore.changeLastName}
            value={userStore.lastName}
            label='Фамилия'
            disabled={!userStore.profileEdit}
          />
          <div className={styles.fullWidthInput}>
            <Input
              onChange={userStore.changeMiddleName}
              value={userStore.middleName}
              label='Отчество'
              disabled={!userStore.profileEdit}
            />
          </div>
        </div>
        <h3 className={styles.title}>Контактные данные</h3>
        <div className={styles.contactInformation}>
          <Input
            onChange={userStore.changeEmail}
            value={userStore.email}
            label='Почта'
            disabled={!userStore.profileEdit}
          />
          <PhoneInput
            onChange={userStore.changePhone}
            value={userStore.phone}
            label='Номер телефона'
            disabled={!userStore.profileEdit}
          />
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.horizontalLine}></div>
        {userStore.profileEdit ? (
          <div className={styles.buttonGroup}>
            <Button
              color='white'
              type='button'
              width='fit-content'
              handler={userStore.changeProfileEdit}
            >
              Отменить изменения
            </Button>
            <Button
              color='orange'
              type='button'
              width='fit-content'
              handler={userStore.changeProfileEdit}
            >
              Сохранить изменения
            </Button>
          </div>
        ) : (
          <Button
            color='blue'
            type='button'
            width='fit-content'
            handler={userStore.changeProfileEdit}
          >
            Изменить данные
          </Button>
        )}
      </div>
    </div>
  );
});

export default ProfilePage;
