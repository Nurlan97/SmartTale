import { Card as ICard } from '../../api/data-contracts';
import Card from '../Card/Card';
import styles from './grid.module.scss';
interface IGridParams {
  array: Omit<ICard, 'publishedAt'>[] | undefined;
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
const Grid = ({ array, columns }: IGridParams) => {
  const key = columns as ObjKey;
  return (
    <div className={stylesObj[key]}>
      {array &&
        array.map((card) => {
          return <Card card={card} key={card.productId} />;
        })}
    </div>
  );
};

export default Grid;
