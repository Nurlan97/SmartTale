import { makeAutoObservable, runInAction } from 'mobx';

import { MOCK_DATA } from '../../MOCK_DATA';
import { cardsArray } from '../../mockData';
import {
  CustomPage,
  CustomPageEmployee,
  CustomPageOrderAccepted,
  CustomPagePurchaseSummary,
  CustomPageSmallOrder,
  OrderFull,
  ProductFull,
} from '../api/data-contracts';
import { myApi } from '../api/V1';
import modalStore from './modalStore';

interface IMyAd {
  group: 'all' | 'orders' | 'products';
  data: CustomPage;
  detailed: Array<OrderFull | ProductFull>;
}
interface IMyBuys {
  data: CustomPagePurchaseSummary;
}
interface IOrders {
  data: CustomPageSmallOrder;
}

interface IMyOrganization {
  group: 'orders' | 'employees';
  orders: CustomPageOrderAccepted;
  employees: CustomPageEmployee;
  description: string;
  name: string;
  logoUrl: string;
}

class appStore {
  myOrders: IOrders = {
    data: {
      totalPages: 0,
      totalElements: 0,
      size: 0,
      content: [],
      number: 0,
      isEmpty: false,
    },
  };
  myAds: IMyAd = {
    group: 'all',
    data: {
      totalPages: 0,
      totalElements: 0,
      size: 10,
      content: [],
      number: 0,
      isEmpty: false,
    },
    detailed: [],
  };
  myBuys: IMyBuys = {
    data: {
      totalPages: 0,
      totalElements: 0,
      size: 0,
      content: [],
      number: 0,
      isEmpty: false,
    },
  };
  myOrganization: IMyOrganization = {
    group: 'orders',
    description: '',
    name: '',
    logoUrl: '',
    orders: {
      totalPages: 0,
      totalElements: 0,
      size: 0,
      content: [],
      number: 0,
      isEmpty: false,
    },
    employees: {
      totalPages: 0,
      totalElements: 0,
      size: 0,
      content: [],
      number: 0,
      isEmpty: false,
    },
  };

  constructor() {
    makeAutoObservable(this);
  }

  myAdsSetGroup = (group: 'all' | 'orders' | 'products') => async () => {
    this.myAds.group = group;
    this.getMyAds();
  };
  getMyAds = async () => {
    // this.myAds.data.content = cardsArray;

    try {
      const response = await myApi.getMyAds({
        q: this.myAds.group !== 'all' ? this.myAds.group : undefined,
        page: this.myAds.data.number,
        size: this.myAds.data.size,
      });
      this.myAds.data = response.data;
    } catch (error) {
      console.log(error);
    }
  };
  myOrganizationSetGroup = (tab: 'orders' | 'employees') => async () => {
    runInAction(() => {
      this.myOrganization.group = tab;
    });
    if (tab === 'orders') {
      await this.getMyOrganizationOrders();
    } else {
      await this.getMyOrganizationEmployees();
    }
  };
  getDetailedAd = async (id: number) => {
    this.myAds.detailed = [];
    try {
      const response = await myApi.getMyAd(id);
      this.myAds.detailed.push(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  getMyBuys = async (page: number = 0, limit: number = 8) => {
    const response = await myApi.getPurchases({ page: page, size: limit });
    runInAction(() => {
      // this.myBuys.data.content = cardsArray;
      this.myBuys.data = response.data;
    });
  };
  setLimitMyBuys = (limit: number) => {
    this.getMyBuys(undefined, limit);
  };
  getMyOrders = async (status: 'active' | 'completed') => {
    const response = await myApi.getOrders1({ q: status });
    this.myOrders.data = response.data;
  };
  getMyOrganizationOrders = async () => {
    try {
      const response = await myApi.getOrders({ active: true });
      runInAction(() => {
        this.myOrganization.orders = response.data;
        // this.myOrganization.orders.content = MOCK_DATA;
      });
    } catch (error) {
      console.error('Failed to fetch orders', error);
    }
    // this.myOrganization.orders.content = MOCK_DATA;
  };
  getMyOrganizationEmployees = async () => {
    try {
      const response = await myApi.getEmployees();
      runInAction(() => {
        this.myOrganization.employees = response.data;
      });
    } catch (error) {
      console.log(error);
    }
    // this.myOrganization.employees.content = MOCK_DATA_EMPLOYEES;
  };
  get isActiveOrders() {
    return this.myOrganization.group === 'orders';
  }
  deleteAd = async (id: number) => {
    try {
      await myApi.interactWithAd1(id, '3');
      modalStore.closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  closeAd = async (id: number) => {
    try {
      await myApi.interactWithAd1(id, '1');
      modalStore.closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  restoreAd = async (id: number) => {
    try {
      await myApi.interactWithAd1(id, '2');
    } catch (error) {
      console.log(error);
    }
  };
  setMyPurchasesePage = (page: number) => {
    this.getMyBuys(page);
  };
  getMyOrganization = async () => {
    try {
      const response = await myApi.getOrganization();
      runInAction(() => {
        this.myOrganization.description = response.data.description;
        this.myOrganization.logoUrl = response.data.logoUrl;
        this.myOrganization.name = response.data.name;
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export default new appStore();
