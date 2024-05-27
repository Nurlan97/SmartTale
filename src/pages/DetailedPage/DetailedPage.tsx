import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import DetailedAd from '../../components/DetailedAd/DetailedAd';
import Header from '../../components/Header/Header';
import { appStore, modalStore } from '../../store';
import { Modals } from '../../store/modalStore';
import Button from '../../UI/Button/Button';
import styles from './detailedPage.module.scss';

const DetailedPage = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    appStore.getDetailedAd(Number(id));
  }, []);
  return (
    <div className={styles.page}>
      <Header path='Личный кабинет/Мои объявления' title='Детальная информация' />
      {appStore.myAds.detailed.length === 0 ? (
        ''
      ) : (
        <DetailedAd ad={appStore.myAds.detailed[0]} />
      )}
      <div className={styles.footer}>
        <Button color='orange' type='button' handler={() => navigate(-1)}>
          Назад
        </Button>
        <div className={styles.btnGroup}>
          <Button
            color='red'
            type='button'
            handler={() => modalStore.openModal(Modals.deleteAd)}
          >
            Удалить
          </Button>
          <Button
            color='blue'
            type='button'
            handler={() => modalStore.openModal(Modals.hideAd)}
          >
            Скрыть объявление
          </Button>
        </div>
      </div>
    </div>
  );
});

export default DetailedPage;
