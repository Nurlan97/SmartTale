import { observer } from 'mobx-react-lite';

import { modalStore } from '../../store';
import Button from '../../UI/Button/Button';
import styles from './descriptionModal.module.scss';

const DescriptionModal = observer(() => {
  const createTab = (
    tab: 'description' | 'contacts' | 'size',
    text: 'Описание' | 'Контакты автора' | 'Размеры',
  ) => {
    return (
      <button
        className={modalStore.detailed.activeTab === tab ? styles.tabActive : styles.tab}
        onClick={modalStore.setActiveTab(tab)}
      >
        {text}
      </button>
    );
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.images}>
        <img
          className={styles.bigImage}
          src={modalStore.detailed.images[modalStore.detailed.activeImg]}
          alt=''
        />
        {modalStore.detailed.images.map((img, ind) => {
          return (
            <button key={ind} onClick={modalStore.setImage(ind)}>
              <img
                className={
                  ind === modalStore.detailed.activeImg
                    ? styles.smallImageActive
                    : styles.smallImage
                }
                src={img}
                alt=''
              />
            </button>
          );
        })}
      </div>
      <div className={styles.descriptionPart}>
        <div>
          <div className={styles.path}>{modalStore.detailed.path}</div>
          <div className={styles.adTitle}>
            {modalStore.detailed.title}
            {modalStore.detailed.status && (
              <div className={styles.orderStatus}>{modalStore.detailed.status}</div>
            )}
            {modalStore.detailed.deadline && (
              <div className={styles.orderStatus}>{modalStore.detailed.deadline}</div>
            )}
          </div>
          <div className={styles.price}>{modalStore.detailed.price} сом</div>
          <div className={styles.horizontalLine}></div>
          <div className={styles.authorBlock}>
            <img
              className={styles.authorImg}
              src={modalStore.detailed.authorImg}
              alt=''
            />
            <div>
              <div className={styles.authorName}>{modalStore.detailed.author}</div>
              <div className={styles.authorLabel}>Автор объявления</div>
            </div>
          </div>
          <div className={styles.tabsContainer}>
            {createTab('description', 'Описание')}
            {createTab('contacts', 'Контакты автора')}
            {modalStore.detailed.type === 'service' && createTab('size', 'Размеры')}
          </div>
          <div className={styles.tabDescription}>
            {modalStore.detailed[modalStore.detailed.activeTab]}
          </div>
        </div>
        <div className={styles.button}>
          <Button
            color='blue'
            type='button'
            width='100%'
            margin='auto auto 0px 0px'
            handler={() => {
              console.log(modalStore.detailed.id);
              modalStore.openSimple('');
            }}
          >
            Принять заказ
          </Button>
        </div>
      </div>
    </div>
  );
});

export default DescriptionModal;
