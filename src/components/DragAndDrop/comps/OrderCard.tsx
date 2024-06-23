import { useDraggable } from '@dnd-kit/core';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import { MonitoringOrder, OrderDashboard } from '../../../api/data-contracts';
import { Clock, defaultImage, defaultPhoto } from '../../../assets';
import { kanbanStore } from '../../../store';
import Button from '../../../UI/Button/Button';
import { cutText, formatDate, toCamelCase } from '../../../utils/helpers';
import TaskDescription from '../../TaskDescription/TaskDescription';
import styles from './orderCard.module.scss';

interface Props {
  order: OrderDashboard;
}
enum Statuses {
  PENDING = 'Не подтвержден',
  NEW = 'В ожидании',
  IN_PROGRESS = 'В работе',
  CHECKING = 'Проверка',
  DISPATCHED = 'Отправка',
  ARRIVED = 'Прибыл',
  COMPLETED = 'Завершен',
  CANCELED = 'Отменен',
}
const OrderCard = observer(({ order }: Props) => {
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
        <button
          className={styles.notDruggable}
          onClick={() => {
            kanbanStore.showDescription(order.id);
          }}
        >
          <div>{order.title}</div>
          <div className={styles.description}>{cutText(order.comment, 60)}</div>
          <div className={styles.date}>
            <Clock /> <p>{formatDate(order.deadlineAt)}</p>
          </div>
        </button>
      );
    } else {
      return (
        <button
          ref={setNodeRef}
          className={styles.wrapper}
          {...listeners}
          {...attributes}
          onClick={() => {
            kanbanStore.showDescription(order.id);
          }}
        >
          <div>{order.title}</div>
          <div className={styles.description}>{cutText(order.comment, 60)}</div>
          <div className={styles.date}>
            <Clock /> <p>{formatDate(order.deadlineAt)}</p>
          </div>
        </button>
      );
    }
  }
});

export default OrderCard;
