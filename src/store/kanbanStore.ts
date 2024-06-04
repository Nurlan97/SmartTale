import { makeAutoObservable, runInAction } from 'mobx';

import { DashboardOrder } from '../api/data-contracts';
import { MyApi } from '../api/V1';
import { DragEvent, IColumn } from '../components/DragAndDrop/DragAndDrop';

const api = new MyApi();
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

class kanbanStore {
  columns: IColumn[] = COLUMNS;
  orders: Array<DashboardOrder> = DEFAULT_DATA_STATE;
  constructor() {
    makeAutoObservable(this);
  }
  getOrders = async () => {
    try {
      // const response = await api.getDashboard();
      // this.orders = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  moveOrder = (event: DragEvent, activeOrder: DashboardOrder | null) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    runInAction(() => {
      try {
        if (activeOrder && over.data.current.column.allow.includes(activeOrder?.status)) {
          const activeIndex = this.orders.findIndex((order) => order.id === activeId);
          this.orders[activeIndex].status = over.id;
          const order = this.orders.splice(activeIndex, 1);
          this.orders.unshift(order[0]);
        }
      } catch (error) {
        console.log(error);
      }
    });
  };
  updateOrder = async (event: DragEvent) => {
    try {
      // if (event.over?.id) return api.changeStatus(event.active.id, event.over?.id);
    } catch (error) {
      console.log(error);
      throw new Error('Error');
    }
  };
}

export default new kanbanStore();
