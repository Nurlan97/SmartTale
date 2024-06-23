import { SearchItem } from '../../api/data-contracts';
import { defaultImage } from '../../assets';
import { addImageSize, cutText } from '../../utils/helpers';
import styles from './searchResultUnit.module.scss';
type Props = {
  item: SearchItem;
};
const SearchResultUnit = ({ item }: Props) => {
  return (
    <div className={styles.wrapper}>
      <img
        className={styles.img}
        src={item.imageUrl ? addImageSize(item.imageUrl, 180, 180) : defaultImage}
        alt=''
      />
      <div className={styles.descriptionBlock}>
        <div className={styles.title}>{cutText(item.title, 100)}</div>
      </div>
    </div>
  );
};

export default SearchResultUnit;
