import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { CSSProperties } from 'react';

import { tableData } from '../../mockData';
import { PageOrderSummary, PageSmallOrder } from '../api/data-contracts';
import { MyApi } from '../api/V1';
import { formatDate } from '../utils/helpers';

const api = new MyApi();

export type TDate = [Date | null, Date | null];
export enum dateFilters {
  accept = 'дате принятия',
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

  dateFilter: dateFilter = {
    currentType: dateFilters.empty,
    from: null,
    to: null,
  };
  data: PageOrderSummary = {
    totalPages: 0,
    totalElements: 0,
    size: 0,
    content: [],
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

  setDateRange = (range: TDate) => {
    this.dateFilter.from = range[0];
    this.dateFilter.to = range[1];
  };
  setFilter = (type: dateFilters) => {
    this.dateFilter.currentType = type;
  };

  setActiveTab = (tab: 'active' | 'history') => async () => {
    console.log(tab);
    try {
      const response = await api.getOrdersHistory({ active: tab === 'active' });
      runInAction(() => {
        this.activeTab = tab;
        this.data = response.data;
      });
    } catch (error) {
      console.log(error);
    }
  };
  getOrders = async () => {
    try {
      const response = await api.getOrdersHistory({
        active: this.activeTab === 'active',
      });
      runInAction(() => {
        this.data = response.data;
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export default new orderHistoryStore();
