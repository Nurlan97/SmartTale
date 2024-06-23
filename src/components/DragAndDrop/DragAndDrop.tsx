import 'overlayscrollbars/overlayscrollbars.css';

import {
  Collision,
  DndContext,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  Translate,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { observer } from 'mobx-react-lite';
import * as _ from 'radash';
import { MutableRefObject, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { OrderDashboard } from '../../api/data-contracts';
import { kanbanStore } from '../../store';
import ScrollableWrapper from '../../UI/ScrollableWrapper/ScrollableWrapper';
import { errorNotify } from '../../utils/toaster';
import { Column } from './comps/Column';
import OrderCard from './comps/OrderCard';
import styles from './DragAndDrop.module.scss';
export interface IColumn {
  id: OrderDashboard['status'];
  title: string;
  allow: Array<OrderDashboard['status']>;
}
interface Over {
  id: OrderDashboard['status'];
  rect: ClientRect;
  disabled: boolean;
  data: { current: { type: string; column: IColumn } };
}
export interface DragEvent {
  activatorEvent: Event;
  active: {
    id: number;
    data: { current: { order: OrderDashboard } };
    rect: MutableRefObject<{
      initial: ClientRect | null;
      translated: ClientRect | null;
    }>;
  };
  collisions: Collision[] | null;
  delta: Translate;
  over: Over | null;
}

export const DragAndDrop = observer(() => {
  // const [data, setData] = useState<Array<DashboardOrder>>(DEFAULT_DATA_STATE);
  const [activeOrder, setActiveOrder] = useState<OrderDashboard | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  const onDragStart = (event: DragStartEvent) => {
    event.active.data.current && setActiveOrder({ ...event.active.data.current.order });
  };
  const onDragOver = async (event: DragEvent) => {
    kanbanStore.moveOrder(event, activeOrder);
  };
  const onDragEnd = async (event: DragEvent) => {
    try {
      await kanbanStore.updateOrder(event, activeOrder);
      setActiveOrder(null);
    } catch (error) {
      console.log(error);
      errorNotify('Произошла ошибка, обновите страницу');
    }
  };
  useEffect(() => {
    kanbanStore.getOrders();
  }, []);

  return (
    <ScrollableWrapper>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className={styles.dragAndDrop}>
          {kanbanStore.columns.map((column, columnIndex) => (
            <Column
              key={`column-${columnIndex}`}
              column={column}
              elements={kanbanStore.orders.filter((order) => order.status === column.id)}
            />
          ))}
        </div>
        {createPortal(
          <DragOverlay>{activeOrder && <OrderCard order={activeOrder} />}</DragOverlay>,
          document.body,
        )}
      </DndContext>
    </ScrollableWrapper>
  );
});
