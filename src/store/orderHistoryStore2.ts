import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { CSSProperties } from 'react';

import { MOCK_DATA } from '../../MOCK_DATA';
import { tableData } from '../../mockData';
import { CustomPageOrderAccepted } from '../api/data-contracts';
import { myApi } from '../api/V1';
import { formatDate } from '../utils/helpers';

export type TDate = [Date | null, Date | null];
export enum dateFilters {
  accepted = 'дате принятия',
  deadline = 'дедлайну',
  completed = 'дате завершения',
  empty = '. . .',
}
function getKeyByValue(object: any, value: any) {
  return Object.keys(object).find((key) => object[key] === value);
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
  data: CustomPageOrderAccepted = {
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
    if (this.dateFilter.from && this.dateFilter.to) this.getOrders();
  };
  setFilter = (type: dateFilters) => {
    this.dateFilter.currentType = type;
    this.getOrders();
  };

  setActiveTab = (tab: 'active' | 'history') => async () => {
    console.log(tab);
    try {
      this.activeTab = tab;
      this.getOrders();
      // const response = await api.getOrdersHistory({ active: tab === 'active' });
      // runInAction(() => {
      //   this.data = response.data;
      // });
    } catch (error) {
      console.log(error);
    }
  };
  getOrders = async () => {
    try {
      // console.log(
      //   this.dateFilter.from,
      //   this.dateFilter.to,
      //   getKeyByValue(dateFilters, this.dateFilter.currentType),
      // );
      const body: { [key: string]: any } = { active: this.activeTab === 'active' };
      if (getKeyByValue(dateFilters, this.dateFilter.currentType) !== 'empty') {
        body.dateFrom = this.dateFilter.from
          ? this.dateFilter.from.toISOString().slice(0, 10)
          : undefined;
        body.dateTo = this.dateFilter.to
          ? this.dateFilter.to.toISOString().slice(0, 10)
          : undefined;
        body.dateType = this.dateFilter.currentType
          ? this.dateFilter.currentType
          : undefined;
      }
      const response = await myApi.getOrdersHistory(body);
      runInAction(() => {
        this.data = response.data;
        // if (this.activeTab === 'active') {
        //   this.data.content = MOCK_DATA.filter(
        //     (order) =>
        //       order.status === 'NEW' ||
        //       order.status === 'CHECKING' ||
        //       order.status === 'IN_PROGRESS' ||
        //       order.status === 'PENDING' ||
        //       order.status === 'DISPATCHED' ||
        //       order.status === 'CANCELED' ||
        //       order.status === 'COMPLETED',
        //   );
        // } else {
        //   this.data.content = MOCK_DATA.filter(
        //     (order) =>
        //       order.status === 'ARRIVED' ||
        //       order.status === 'CANCELED' ||
        //       order.status === 'COMPLETED',
        //   );
        // }
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export default new orderHistoryStore();
