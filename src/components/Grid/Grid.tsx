import { ICard } from '../../utils/types';
import Card from '../Card/Card';
import styles from './grid.module.scss';
interface IGridParams {
  array: ICard[] | number[];
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
      {array.map((card) => {
        if (typeof card !== 'number')
          return (
            <Card
              author={card.author}
              authorImage={card.authorImage}
              description={card.description}
              id={card.id}
              image={card.image}
              key={card.id}
              price={card.price}
              title={card.title}
            />
          );
      })}
    </div>
  );
};

export default Grid;
