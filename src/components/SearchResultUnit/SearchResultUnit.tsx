import { useNavigate } from 'react-router-dom';

import { SearchItem } from '../../api/data-contracts';
import { defaultImage } from '../../assets';
import { modalStore } from '../../store';
import { PathEnum } from '../../store/modalStore';
import { addImageSize, cutText } from '../../utils/helpers';
import styles from './searchResultUnit.module.scss';
type Props = {
  item: SearchItem;
  context: SearchItem['type'];
};
const SearchResultUnit = ({ item, context }: Props) => {
  const navigate = useNavigate();
  const contextHandlers: { [key in SearchItem['type']]: () => void } = {
    ADVERTISEMENT: () => {
      modalStore.openDescription(item.id, PathEnum['/search']);
    },
    MY_ADVERTISEMENT: () => {
      modalStore.openDescription(item.id, PathEnum['/search']);
    },
    PRODUCT: () => {
      modalStore.openDescription(item.id, PathEnum['/search']);
    },
    MY_PRODUCT: () => {
      modalStore.openDescription(item.id, PathEnum['/search']);
    },
    ORDER: () => {
      modalStore.openDescription(item.id, PathEnum['/search']);
    },
    MY_ORDER: () => {
      modalStore.openDescription(item.id, PathEnum['/search']);
    },
    ORG_ORDER: () => {
      navigate(`/task/${item.id}`);
    },
    ORGANIZATION: () => {},
    USER: () => {},
    EMPLOYEE: () => {
      navigate(`/employees/${item.id}`);
    },
    PURCHASE: () => {
      modalStore.openDescription(item.id, PathEnum['/search-purchases']);
    },
  };

  return (
    <button
      type='button'
      className={styles.wrapper}
      onClick={contextHandlers[context]}
      disabled={context === 'ORGANIZATION' || context === 'USER'}
    >
      <img
        className={styles.img}
        src={item.imageUrl ? addImageSize(item.imageUrl, 180, 180) : defaultImage}
        alt=''
      />
      <div className={styles.descriptionBlock}>
        <div className={styles.title}>{cutText(item.title, 100)}</div>
      </div>
    </button>
  );
};

export default SearchResultUnit;
