import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { CSSProperties } from 'react';

import { CustomPageSmallOrder } from '../api/data-contracts';
import { myApi } from '../api/V1';
import { formatDate } from '../utils/helpers';
import { errorNotify } from '../utils/toaster';

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

const sorting: ISorting = {
  // acceptedAt: 'noSort',
  // deadlineAt: 'noSort',
  // completedAt: 'noSort',
};
const headers = [
  { name: 'title', title: 'Название' },
  { name: 'price', title: 'Стоимость' },
  { name: 'acceptedAt', title: 'Дата принятия' },
  { name: 'deadlineAt', title: 'Дедлайн' },
  { name: 'status', title: 'Статус' },
];
const style: IStyle = {
  status: (prop: string) => {
    const statusStyles = {
      PENDING: {
        backgroundColor: '#C3FFFB',
        borderRadius: '12px',
        padding: '12px',
        display: 'flex',
        justifyContent: 'center',
      },
      NEW: {
        backgroundColor: '#C3FFFB',
        borderRadius: '12px',
        padding: '12px',
        display: 'flex',
        justifyContent: 'center',
      },
      IN_PROGRESS: {
        backgroundColor: '#C5E6FF',
        borderRadius: '12px',
        padding: '12px',
        display: 'flex',
        justifyContent: 'center',
      },
      CHECKING: {
        backgroundColor: '#FFFBA1',
        borderRadius: '12px',
        padding: '12px',
        display: 'flex',
        justifyContent: 'center',
      },
      DISPATCHED: {
        backgroundColor: '#FFD9A1',
        borderRadius: '12px',
        padding: '12px',
        display: 'flex',
        justifyContent: 'center',
      },
      ARRIVED: {
        backgroundColor: '#E6FFA1',
        borderRadius: '12px',
        padding: '12px',
        display: 'flex',
        justifyContent: 'center',
      },
      COMPLETED: {
        backgroundColor: '#E6FFA1',
        borderRadius: '12px',
        padding: '12px',
        display: 'flex',
        justifyContent: 'center',
      },
      CANCELED: {
        backgroundColor: '#E6FFA1',
        borderRadius: '12px',
        padding: '12px',
        display: 'flex',
        justifyContent: 'center',
      },
    };

    if (prop in statusStyles) {
      const key = prop as keyof typeof statusStyles;
      return statusStyles[key];
    }
    return {};
  },
};

const transform: ITransfrom = {
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
};
export type TDate = [Date | null, Date | null];
export enum dateFilters {
  accepted = 'дате принятия',
  deadline = 'дедлайну',
  completed = 'дате завершения',
  empty = '. . .',
}
interface dateFilter {
  currentType: dateFilters;
  from: Date | null;
  to: Date | null;
}
class orderHistoryStore {
  activeTab: 'active' | 'history' = 'active';
  table: ITable = {
    sorting: sorting,
    headers: headers,
    style: style,
    transform: transform,
  };
  dateFilter: dateFilter = {
    currentType: dateFilters.empty,
    from: null,
    to: null,
  };
  data: CustomPageSmallOrder = {
    totalPages: 0,
    totalElements: 0,
    size: 0,
    content: [],
    number: 0,
    isEmpty: false,
  };
  constructor() {
    makeAutoObservable(this);
  }

  setDateRange = (range: TDate) => {
    this.dateFilter.from = range[0];
    this.dateFilter.to = range[1];
  };
  setFilter = (type: dateFilters) => {
    this.dateFilter.currentType = type;
  };
  setSorting = (column: string) => {
    if (this.table.sorting[column] === 'asc') this.table.sorting[column] = 'desc';
    else if (this.table.sorting[column] === 'desc') this.table.sorting[column] = 'noSort';
    else this.table.sorting[column] = 'asc';
  };
  setActiveTab = (tab: 'active' | 'history', page?: number) => async () => {
    try {
      this.activeTab = tab;
      const response = await myApi.getOrders1({ q: tab, page });

      runInAction(() => {
        this.data = response.data;
        this.table.headers.pop();
        if (tab === 'active') {
          this.table.headers.push({ name: 'status', title: 'Статус' });
        } else {
          this.table.headers.push({ name: 'completedAt', title: 'Дата завершения' });
        }
      });
    } catch (error) {
      console.log(error);
      errorNotify('Произошла ошибка при загрузке, повторите попытку');
    }
  };
}
export default new orderHistoryStore();
