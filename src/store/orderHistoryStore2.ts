import { makeAutoObservable, runInAction } from 'mobx';

import { CustomPageOrderAccepted } from '../api/data-contracts';
import { myApi } from '../api/V1';
import { errorNotify } from '../utils/toaster';

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
    if (this.dateFilter.from && this.dateFilter.to) this.getOrders();
  };

  setActiveTab = (tab: 'active' | 'history') => async () => {
    console.log(tab);
    try {
      this.activeTab = tab;
      this.getOrders();
    } catch (error) {
      console.log(error);
      errorNotify('Произошла ошибка при загрузке, повторите попытку');
    }
  };
  getOrders = async () => {
    try {
      const body: { [key: string]: any } = { active: this.activeTab === 'active' };
      if (getKeyByValue(dateFilters, this.dateFilter.currentType) !== 'empty') {
        body.dateFrom = this.dateFilter.from
          ? this.dateFilter.from.toISOString().slice(0, 10)
          : undefined;
        body.dateTo = this.dateFilter.to
          ? this.dateFilter.to.toISOString().slice(0, 10)
          : undefined;
        body.dateType = this.dateFilter.currentType
          ? getKeyByValue(dateFilters, this.dateFilter.currentType)
          : undefined;
      }
      const response = await myApi.getOrdersHistory(body);
      runInAction(() => {
        this.data = response.data;
      });
    } catch (error) {
      console.log(error);
      errorNotify('Произошла ошибка при загрузке, повторите попытку');
    }
  };
}
export default new orderHistoryStore();
