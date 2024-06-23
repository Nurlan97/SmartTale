import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { myApi } from '../../api/V1';
import Header from '../../components/Header/Header';
import { errorNotify } from '../../utils/toaster';
import styles from './acceptOrder.module.scss';

const AcceptOrder = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get('code');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    if (code) {
      setIsLoading(true);
      try {
        myApi.confirmOrder({ code }).then(() => {
          setSearchParams('');
        });
      } catch (error) {
        console.log(error);
        errorNotify('Произошла ошибка, проверьте запросы в своих объявлениях');
        setIsError(true);
      }
      setIsLoading(false);
    }
  }, [code]);
  return (
    <div className={styles.page}>
      <Header path={''} title={'Подтверждение заказа'} />
      <div className={styles.message}>
        {isLoading
          ? 'Отправляем запрос на подвтерждение заказа'
          : `${isError ? 'Произошла ошибка, проверьте запросы в своих объявлениях' : 'Заказ подтвержден'}`}
      </div>
    </div>
  );
};

export default AcceptOrder;
