import { observer } from 'mobx-react-lite';

import { Card as ICard, PurchaseSummary } from '../../api/data-contracts';
import Card from '../Card/Card';
import styles from './grid.module.scss';
interface IGridParams {
  array: PurchaseSummary[] | ICard[] | undefined;
  columns: number;
}
const stylesObj = {
  1: styles.gridWrapper1,
  2: styles.gridWrapper2,
  3: styles.gridWrapper3,
  4: styles.gridWrapper4,
  5: styles.gridWrapper5,
  6: styles.gridWrapper6,
};
type ObjKey = keyof typeof stylesObj;
const Grid = observer(({ array, columns }: IGridParams) => {
  const key = columns as ObjKey;

  return (
    <div className={stylesObj[key]}>
      {array &&
        array.map((card) => {
          const id = 'purchaseId' in card ? card.purchaseId : card.advertisementId;
          return <Card card={card} key={id} />;
        })}
    </div>
  );
});

export default Grid;
