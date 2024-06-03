import 'overlayscrollbars/overlayscrollbars.css';

import {
  Active,
  Collision,
  DataRef,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  Translate,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { observer } from 'mobx-react-lite';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import * as _ from 'radash';
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { DashboardOrder } from '../../api/data-contracts';
import { useScrollbar } from '../../hooks/useScrollbar';
import { kanbanStore } from '../../store';
import { Column } from './comps/Column';
import OrderCard from './comps/OrderCard';
import styles from './DragAndDrop.module.scss';
export interface IColumn {
  id: DashboardOrder['status'];
  title: string;
  allow: Array<DashboardOrder['status']>;
}
interface Over {
  id: DashboardOrder['status'];
  rect: ClientRect;
  disabled: boolean;
  data: { current: { type: string; column: IColumn } };
}
export interface DragEvent {
  activatorEvent: Event;
  active: {
    id: number;
    data: { current: { order: DashboardOrder } };
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
  const [activeOrder, setActiveOrder] = useState<DashboardOrder | null>(null);

  const kanbanWrapper = useRef(null);

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
    kanbanStore.moveOrder(event);
  };
  const onDragEnd = async (event: DragEvent) => {
    try {
      await kanbanStore.updateOrder(event);
      setActiveOrder(null);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    kanbanStore.getOrders();
  }, []);
  useScrollbar(kanbanWrapper, true);
  return (
    <div ref={kanbanWrapper}>
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
    </div>
  );
});
