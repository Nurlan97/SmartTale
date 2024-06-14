import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import { OrderDashboard } from '../../../api/data-contracts';
import { Clock } from '../../../assets';
import { cutText, formatDate, toCamelCase } from '../../../utils/helpers';
import styles from './orderCard.module.scss';

interface Props {
  order: OrderDashboard;
}

const OrderCard = ({ order }: Props) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: order.id,
    data: {
      type: 'Order',
      order,
    },
  });

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        className={styles[toCamelCase(order.status)]}
        {...listeners}
        {...attributes}
      ></div>
    );
  } else {
    if (
      order.status === 'PENDING' ||
      order.status === 'DISPATCHED' ||
      order.status === 'ARRIVED'
    ) {
      return (
        <div className={styles.notDruggable}>
          <div>{order.title}</div>
          <div className={styles.description}>{cutText(order.comment, 60)}</div>
          <div className={styles.date}>
            <Clock /> <p>{formatDate(order.deadlineAt)}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div ref={setNodeRef} className={styles.wrapper} {...listeners} {...attributes}>
          <div>{order.title}</div>
          <div className={styles.description}>{cutText(order.comment, 60)}</div>
          <div className={styles.date}>
            <Clock /> <p>{formatDate(order.deadlineAt)}</p>
          </div>
        </div>
      );
    }
  }
};

export default OrderCard;
