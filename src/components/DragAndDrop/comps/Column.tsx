import { useDroppable } from '@dnd-kit/core';

import { DashboardOrder } from '../../../api/data-contracts';
import { toCamelCase } from '../../../utils/helpers';
import { IColumn } from '../DragAndDrop';
import styles from './Column.module.scss';
import OrderCard from './OrderCard';

interface Props {
  elements: Array<DashboardOrder>;
  column: IColumn;
}

export const Column = ({ column, elements }: Props) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  });

  return (
    <div className={styles.columnWrapper} ref={setNodeRef}>
      <div className={styles[toCamelCase(column.id)]}>{column.title}</div>
      {elements.map((elm, ind) => (
        <OrderCard order={elm} key={ind} />
      ))}
    </div>
  );
};
