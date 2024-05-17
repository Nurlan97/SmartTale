import { observer } from 'mobx-react-lite';

import { defaultImage, defaultPhoto } from '../../assets';
import { modalStore } from '../../store';
import { SimpleModals } from '../../store/modalStore';
import Button from '../../UI/Button/Button';
import { formatDate } from '../../utils/helpers';
import styles from './descriptionModal.module.scss';

const DescriptionModal = observer(() => {
  const createTab = (
    tab: 'description' | 'contacts' | 'size',
    text: 'Описание' | 'Контакты автора' | 'Размеры',
  ) => {
    return (
      <button
        className={
          modalStore.detailedExt.activeTab === tab ? styles.tabActive : styles.tab
        }
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
          src={
            modalStore.detailed.imageUrls[modalStore.detailedExt.activeImg]
              ? modalStore.detailed.imageUrls[modalStore.detailedExt.activeImg]
              : defaultImage
          }
          alt=''
        />
        {modalStore.detailed.imageUrls.map((img, ind) => {
          return (
            <button key={ind} onClick={modalStore.setImage(ind)}>
              <img
                className={
                  ind === modalStore.detailedExt.activeImg
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
          <div className={styles.path}>{modalStore.detailedExt.path}</div>
          <div className={styles.adTitle}>
            {modalStore.detailed.title}
            {/* {modalStore.detailed.status && (
              <div className={styles.orderStatus}>{modalStore.detailed.status}</div>
            )} */}
            {'deadlineAt' in modalStore.detailed && (
              <div className={styles.orderStatus}>
                До {formatDate(modalStore.detailed.deadlineAt)}
              </div>
            )}
          </div>
          <div className={styles.price}>
            {modalStore.detailed.price
              ? `${modalStore.detailed.price} сом`
              : 'Договорная'}
          </div>
          <div className={styles.horizontalLine}></div>
          <div className={styles.authorBlock}>
            <img
              className={styles.authorImg}
              src={
                modalStore.detailed.publisherAvatarUrl
                  ? modalStore.detailed.publisherAvatarUrl
                  : defaultPhoto
              }
              alt=''
            />
            <div>
              <div className={styles.authorName}>{modalStore.detailed.publisherName}</div>
              <div className={styles.authorLabel}>Автор объявления</div>
            </div>
          </div>
          <div className={styles.tabsContainer}>
            {createTab('description', 'Описание')}
            {createTab('contacts', 'Контакты автора')}
            {'size' in modalStore.detailed && createTab('size', 'Размеры')}
          </div>
          <div className={styles.tabDescription}>
            {modalStore.detailedExt.activeTab !== 'contacts' ? (
              modalStore.detailedExt.activeTab !== 'size' &&
              modalStore.detailed[modalStore.detailedExt.activeTab]
            ) : (
              <>
                <p>{modalStore.detailed.publisherPhoneNumber}</p>
                <p>{modalStore.detailed.publisherEmail}</p>
              </>
            )}
          </div>
        </div>
        <div className={styles.button}>
          <Button
            color='blue'
            type='button'
            width='100%'
            margin='auto auto 0px 0px'
            handler={() => {
              console.log(modalStore.detailed.advertisementId);
              modalStore.openSimple(SimpleModals.successOrder);
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
