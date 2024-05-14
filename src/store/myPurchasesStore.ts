import { makeAutoObservable } from 'mobx';
import { CSSProperties } from 'react';

import { tableData } from '../../mockData';
import { PageSmallOrder } from '../api/data-contracts';
import { formatDate } from '../utils/helpers';

interface IStyle {
  [key: string]: (prop: string) => CSSProperties;
}
interface ITransfrom {
  [key: string]: (prop: string | number | undefined) => string;
}
interface ISorting {
  [key: string]: 'noSort' | 'asc' | 'desc';
}

interface ITable {
  headers: { name: string; title: string }[];
  style: IStyle;
  transform: ITransfrom;
  sorting: ISorting;
}
class myPurchasesStore {
  activeTab: 'active' | 'history' = 'active';
  table: ITable = {
    sorting: {
      title: 'noSort',
      price: 'noSort',
      acceptedAt: 'noSort',
      deadlineAt: 'noSort',
      completedAt: 'noSort',
      status: 'noSort',
    },
    headers: [
      { name: 'title', title: 'Название' },
      { name: 'price', title: 'Стоимость' },
      { name: 'acceptedAt', title: 'Дата принятия' },
      { name: 'deadlineAt', title: 'Дедлайн' },
      { name: 'completedAt', title: 'Дата завершения' },
      { name: 'status', title: 'Статус' },
    ],
    style: {
      status: (prop: string) => {
        const statusStyles = {
          PENDING: {
            backgroundColor: '#C3FFFB',
            borderRadius: '12px',
            padding: '12px',
          },
          NEW: { backgroundColor: '#C3FFFB', borderRadius: '12px', padding: '12px' },
          IN_PROGRESS: {
            backgroundColor: '#C5E6FF',
            borderRadius: '12px',
            padding: '12px',
          },
          CHECKING: {
            backgroundColor: '#FFFBA1',
            borderRadius: '12px',
            padding: '12px',
          },
          DISPATCHED: {
            backgroundColor: '#FFD9A1',
            borderRadius: '12px',
            padding: '12px',
          },
          ARRIVED: {
            backgroundColor: '#E6FFA1',
            borderRadius: '12px',
            padding: '12px',
          },
          COMPLETED: {
            backgroundColor: '#E6FFA1',
            borderRadius: '12px',
            padding: '12px',
          },
          CANCELED: {
            backgroundColor: '#E6FFA1',
            borderRadius: '12px',
            padding: '12px',
          },
        };

        if (prop in statusStyles) {
          const key = prop as keyof typeof statusStyles;
          return statusStyles[key];
        }
        return {};
      },
    },
    transform: {
      acceptedAt: (props: string | number | undefined) => {
        if (typeof props !== 'string') return '';
        if (props === '') return '';
        return formatDate(props);
      },
      deadlineAt: (props: string | number | undefined) => {
        if (typeof props !== 'string') return '';
        if (props === '') return '';
        return formatDate(props);
      },
      completedAt: (props: string | number | undefined) => {
        if (typeof props !== 'string') return '';
        if (props === '') return '';
        return formatDate(props);
      },
      status: (props: string | number | undefined) => {
        if (typeof props !== 'string') return '';
        const statusObj = {
          PENDING: 'В ожидании',
          NEW: 'Новое',
          IN_PROGRESS: 'В работе',
          CHECKING: 'Проверка',
          DISPATCHED: 'Отправлено',
          ARRIVED: 'Прибыло',
          COMPLETED: 'Завершено',
          CANCELED: 'Отменено',
        };
        if (props in statusObj) {
          const key = props as keyof typeof statusObj;
          return statusObj[key];
        } else return props;
      },
    },
  };

  data: PageSmallOrder = {
    totalPages: 0,
    totalElements: 0,
    size: 0,
    content: tableData,
    number: 0,
    sort: { empty: false, sorted: false, unsorted: false },
    pageable: {
      offset: 0,
      sort: { empty: false, sorted: false, unsorted: false },
      pageNumber: 0,
      pageSize: 0,
      paged: false,
      unpaged: false,
    },
    numberOfElements: 0,
    first: false,
    last: false,
    empty: false,
  };
  constructor() {
    makeAutoObservable(this);
  }
  setSorting = (column: string) => {
    console.log(column);
    if (this.table.sorting[column] === 'asc') this.table.sorting[column] = 'desc';
    else if (this.table.sorting[column] === 'desc') this.table.sorting[column] = 'noSort';
    else this.table.sorting[column] = 'asc';
    console.log(this.table.sorting[column]);
  };
  setActiveTab = (tab: 'active' | 'history') => () => {
    this.activeTab = tab;
  };
}
export default new myPurchasesStore();
