import { observer } from 'mobx-react-lite';

import { SearchItem } from '../../api/data-contracts';
import styles from './dropDownSearch.module.scss';
type Props = { results: SearchItem[] };
const DropDownSearch = observer(({ results }: Props) => {
  return (
    <div className={styles.dropdownWrapper}>
      {results.length !== 0 ? (
        results.map((result, ind) => {
          return (
            <div key={ind} className={styles.result}>
              <img src={result.imageUrl} alt={result.title} className={styles.img} />
              <div>{result.title}</div>
            </div>
          );
        })
      ) : (
        <div className={styles.emptyResult}>{'Ничего не найдено'}</div>
      )}
    </div>
  );
});

export default DropDownSearch;
