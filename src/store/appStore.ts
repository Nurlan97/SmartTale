import { makeAutoObservable, runInAction } from 'mobx';

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
import { errorNotify, successNotify } from '../utils/toaster';
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
  isLoading = false;
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
    this.myAds.data = {
      totalPages: 0,
      totalElements: 0,
      size: 10,
      content: [],
      number: 0,
      isEmpty: false,
    };
    this.getMyAds();
  };
  getMyAds = async (page?: number) => {
    if (this.isLoading) return;
    try {
      this.isLoading = true;
      const response = await myApi.getMyAds({
        q: this.myAds.group !== 'all' ? this.myAds.group : undefined,
        page: page ? page : this.myAds.data.number,
        size: this.myAds.data.size,
      });

      this.myAds.data.content.push(...response.data.content);
      this.myAds.data.isEmpty = response.data.isEmpty;
      this.myAds.data.number = response.data.number;
      this.myAds.data.size = response.data.size;
      this.myAds.data.totalElements = response.data.totalElements;
      this.myAds.data.totalPages = response.data.totalPages;
    } catch (error) {
      console.log(error);
      errorNotify('Произошла ошибка при загрузке, повторите попытку');
    } finally {
      this.isLoading = false;
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
      errorNotify('Произошла ошибка при загрузке, повторите попытку');
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
  getMyOrganizationOrders = async (page?: number) => {
    try {
      const response = await myApi.getOrders({ active: true, page });
      runInAction(() => {
        this.myOrganization.orders = response.data;
      });
    } catch (error) {
      console.error('Failed to fetch orders', error);
    }
  };
  getMyOrganizationEmployees = async (page?: number) => {
    try {
      const response = await myApi.getEmployees({ page });
      runInAction(() => {
        this.myOrganization.employees = response.data;
      });
    } catch (error) {
      console.log(error);
      errorNotify('Произошла ошибка при загрузке сотрудников, повторите попытку');
    }
  };
  get isActiveOrders() {
    return this.myOrganization.group === 'orders';
  }

  get isEmployees() {
    return this.myOrganization.group === 'employees';
  }

  deleteAd = async (id: number) => {
    try {
      await myApi.interactWithAd1(id, '3');
      modalStore.closeModal();
      this.myAds.data.content.filter((ad) => {
        if ('productId' in ad) return ad.productId !== id;
        else {
          return ad.orderId !== id;
        }
      });
      successNotify('Объявлени успешно удалено');
    } catch (error) {
      console.log(error);
      errorNotify('Произошла ошибка при удалении, повторите попытку');
    }
  };
  closeAd = async (id: number) => {
    try {
      await myApi.interactWithAd1(id, '1');
      modalStore.closeModal();
      successNotify('Объявлени успешно скрыто');
    } catch (error) {
      console.log(error);
      errorNotify('Произошла ошибка при скрытии, повторите попытку');
    }
  };
  restoreAd = async (id: number) => {
    try {
      await myApi.interactWithAd1(id, '2');
      successNotify('Объявлени успешно восставнолено');
    } catch (error) {
      console.log(error);
      errorNotify('Произошла ошибка при восстановлении, повторите попытку');
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
      errorNotify('Произошла ошибка при загрузке, повторите попытку');
    }
  };
}

export default new appStore();
