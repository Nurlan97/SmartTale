import EmptyPageMessage from '../../components/EmptyPageMessage/EmptyPageMessage';
import Header from '../../components/Header/Header';
import styles from './AdminJobPositionsPage.module.scss';

const AdminJobPositionsPage = () => {
  const EmptyPageMessageData = {
    smile: '🙂',
    title: 'Тут еще нет должностей',
    button: 'Добавить',
  };
  return (
    <div className={styles.page}>
      <Header path={'SmartTale'} title={'Должности'} />
      <EmptyPageMessage
        smile={EmptyPageMessageData.smile}
        title={EmptyPageMessageData.title}
        button={EmptyPageMessageData.button}
      />
    </div>
  );
};

export default AdminJobPositionsPage;
