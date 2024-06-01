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
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import * as _ from 'radash';
import { MutableRefObject, useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { DashboardOrder } from '../../api/data-contracts';
import { useScrollbar } from '../../hooks/useScrollbar';
import { Column } from './comps/Column';
import OrderCard from './comps/OrderCard';
import styles from './DragAndDrop.module.scss';
export interface IColumn {
  id: DashboardOrder['status'];
  title: string;
  allow: Array<DashboardOrder['status']>;
}
const COLUMNS: IColumn[] = [
  {
    title: 'В ожидании',
    id: 'PENDING',
    allow: ['PENDING', 'IN_PROGRESS'],
  },
  {
    title: 'В работе',
    id: 'IN_PROGRESS',
    allow: ['PENDING', 'CHECKING', 'IN_PROGRESS'],
  },
  {
    title: 'Проверка',
    id: 'CHECKING',
    allow: ['IN_PROGRESS', 'CHECKING'],
  },
  {
    title: 'Отправка',
    id: 'DISPATCHED',
    allow: ['CHECKING', 'DISPATCHED'],
  },
  { title: 'Прибыл', id: 'ARRIVED', allow: [] },
];

export const DEFAULT_COLUMN = COLUMNS[0].id;

const DEFAULT_DATA_STATE: Array<DashboardOrder> = [
  {
    id: 1,
    title: 'Marketing Manager',
    key: 'Cleverley',
    comment:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    deadlineAt: '2023-10-19',
    status: 'ARRIVED',
  },
  {
    id: 2,
    title: 'Librarian',
    key: 'Grannell',
    comment:
      'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    deadlineAt: '2024-02-11',
    status: 'IN_PROGRESS',
  },
  {
    id: 3,
    title: 'Help Desk Technician',
    key: 'Ogilvy',
    comment:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    deadlineAt: '2023-08-14',
    status: 'CHECKING',
  },
  {
    id: 4,
    title: 'Nurse Practicioner',
    key: 'de Zamora',
    comment:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    deadlineAt: '2024-02-25',
    status: 'ARRIVED',
  },
  {
    id: 5,
    title: 'Recruiting Manager',
    key: 'Chesworth',
    comment:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
    deadlineAt: '2023-06-19',
    status: 'COMPLETED',
  },
  {
    id: 6,
    title: 'Actuary',
    key: 'Crutchfield',
    comment:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    deadlineAt: '2023-12-17',
    status: 'ARRIVED',
  },
  {
    id: 7,
    title: 'Web Developer III',
    key: 'Tatford',
    comment:
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
    deadlineAt: '2024-05-23',
    status: 'DISPATCHED',
  },
  {
    id: 8,
    title: 'Tax Accountant',
    key: 'Tommasi',
    comment:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
    deadlineAt: '2023-06-12',
    status: 'PENDING',
  },
  {
    id: 9,
    title: 'Chemical Engineer',
    key: 'Murrhardt',
    comment:
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
    deadlineAt: '2023-09-23',
    status: 'CHECKING',
  },
  {
    id: 10,
    title: 'Assistant Professor',
    key: 'Sisson',
    comment:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    deadlineAt: '2024-03-14',
    status: 'ARRIVED',
  },
];

export const DragAndDrop = () => {
  const [data, setData] = useState<Array<DashboardOrder>>(DEFAULT_DATA_STATE);
  const [activeOrder, setActiveOrder] = useState<DashboardOrder | null>(null);

  const kanbanWrapper = useRef(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  interface Over {
    id: DashboardOrder['status'];
    rect: ClientRect;
    disabled: boolean;
    data: { current: { type: string; column: IColumn } };
  }
  interface DragEvent {
    activatorEvent: Event;
    active: {
      id: UniqueIdentifier;
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

  const onDragStart = (event: DragStartEvent) => {
    event.active.data.current && setActiveOrder({ ...event.active.data.current.order });
  };
  const onDragOver = (event: DragEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    if (activeOrder && over.data.current.column.allow.includes(activeOrder.status)) {
      setData((orders) => {
        const activeIndex = orders.findIndex((order) => order.id === activeId);
        orders[activeIndex].status = over.id;
        return arrayMove(orders, activeIndex, 0);
      });
    }
  };
  const onDragEnd = () => {
    setActiveOrder(null);
  };

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
          {COLUMNS.map((column, columnIndex) => (
            <Column
              key={`column-${columnIndex}`}
              column={column}
              elements={data.filter((order) => order.status === column.id)}
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
};
