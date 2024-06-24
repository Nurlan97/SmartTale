import { makeAutoObservable, runInAction } from 'mobx';

import { OrderDashboard } from '../api/data-contracts';
import { myApi } from '../api/V1';
import { DragEvent, IColumn } from '../components/DragAndDrop/DragAndDrop';
import { errorNotify } from '../utils/toaster';
import modalStore, { Modals } from './modalStore';
import { myReposytory } from './repository';

const COLUMNS: IColumn[] = [
  {
    title: 'Не подтвержден',
    id: 'PENDING',
    allow: [],
  },
  {
    title: 'В ожидании',
    id: 'NEW',
    allow: ['NEW', 'CHECKING'],
  },
  {
    title: 'В работе',
    id: 'IN_PROGRESS',
    allow: ['NEW', 'CHECKING', 'IN_PROGRESS'],
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

const DEFAULT_DATA_STATE: Array<OrderDashboard> = [];

class kanbanStore {
  columns: IColumn[] = COLUMNS;
  orders: Array<OrderDashboard> = DEFAULT_DATA_STATE;
  prevOrders: Array<OrderDashboard> = DEFAULT_DATA_STATE;
  currentDescription: number | null = null;
  descriptionExt: {
    activeImg: number;
    activeTab: 'description' | 'size' | 'contacts' | 'employees';
  } = { activeImg: 0, activeTab: 'description' };
  isLoading: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }
  getOrders = async () => {
    try {
      const response = await myApi.getDashboard();
      this.orders = response.data;
      this.prevOrders = response.data;
    } catch (error) {
      console.log(error);
      errorNotify('Произошла ошибка при загрузке, повторите попытку');
    }
  };

  moveOrder = (event: DragEvent, activeOrder: OrderDashboard | null) => {
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
        errorNotify('Произошла ошибка при смене статуса, обновите страницу');
      }
    });
  };
  updateOrder = async (event: DragEvent, activeOrder: OrderDashboard | null) => {
    this.isLoading = true;
    const { active, over } = event;
    if (!over) return;
    try {
      if (activeOrder && over.data.current.column.allow.includes(activeOrder?.status)) {
        await myApi.changeStatus(active.id, over?.id);
        this.prevOrders = this.orders;
      }
    } catch (error) {
      this.orders = this.prevOrders;
      console.log(error);
      errorNotify('Произошла ошибка при смене статуса, обновите страницу');
    } finally {
      this.isLoading = false;
    }
  };
  showDescription = (id: number | null) => {
    this.currentDescription = id;
    modalStore.openModal(Modals.taskDescription);
  };
  private get queryOrder() {
    if (!this.currentDescription) return null;
    return myReposytory.getOrderQuery(this.currentDescription);
  }

  get description() {
    if (!this.queryOrder) return null;
    return this.queryOrder.data;
  }
  setImage = (num: number) => () => {
    this.descriptionExt.activeImg = num;
  };
  setActiveTab = (tab: 'description' | 'contacts' | 'size' | 'employees') => () => {
    this.descriptionExt.activeTab = tab;
  };
}

export default new kanbanStore();
