import { makeAutoObservable } from 'mobx';

import { cardsArray } from '../../mockData';
import {
  FullOrder,
  FullProduct,
  Order,
  PageCard,
  PageSmallOrder,
  Product,
} from '../api/data-contracts';
import { MyApi } from '../api/V1';
import modalStore from './modalStore';
import userStore from './userStore';

const api = new MyApi(); //создаем экземпляр нашего api

export interface IAdsResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Order[] | Product[];
  number: number;
  sort: { empty: boolean; sorted: boolean; unsorted: boolean };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
interface IMyAd {
  group: 'all' | 'orders' | 'products';
  data: IAdsResponse;
  detailed: Array<FullOrder | FullProduct>;
}
interface IMyBuys {
  data: PageCard;
}
interface IOrders {
  data: Omit<PageSmallOrder, 'pageable'>;
}

class appStore {
  myOrders: IOrders = {
    data: {
      totalPages: 0,
      totalElements: 0,
      size: 0,
      content: [],
      number: 0,
      sort: {
        empty: false,
        sorted: false,
        unsorted: false,
      },
      first: false,
      last: false,
      numberOfElements: 0,
      empty: false,
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
      sort: { empty: false, sorted: false, unsorted: false },
      numberOfElements: 0,
      first: false,
      last: false,
      empty: false,
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
    },
  };

  constructor() {
    makeAutoObservable(this);
  }

  myAdsSetGroup = (group: 'all' | 'orders' | 'products') => {
    this.myAds.group = group;
    this.getMyAds();
  };
  getMyAds = async () => {
    // this.myAds.data.content = cardsArray;

    try {
      const response = await api.getAds1(
        {
          q: this.myAds.group !== 'all' ? this.myAds.group : undefined,
          page: this.myAds.data.number,
          size: this.myAds.data.size,
        },
        { headers: { Authorization: `Bearer ${userStore.accessToken}` } },
      );
      this.myAds.data = response.data;
    } catch (error) {
      console.log(error);
    }
  };
  getDetailedAd = async (id: number) => {
    this.myAds.detailed = [];
    try {
      const response = await api.getAd1(id, {
        headers: { Authorization: `Bearer ${userStore.accessToken}` },
      });

      this.myAds.detailed.push(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  getMyBuys = async (page: number = 0, limit: number = 8) => {
    // const response = await api.getPurchases();
    this.myBuys.data.content = cardsArray;
  };
  setSorting = () => {};
  getMyOrders = async () => {
    const response = await api.getOrders1(
      { q: 'active', params: {} },
      { headers: { Authorization: `Bearer ${userStore.accessToken}` } },
    );
    this.myOrders.data = response.data;
  };
  deleteAd = async (id: number) => {
    await api.interactWithAd(id, '3', {
      headers: { Authorization: `Bearer ${userStore.accessToken}` },
    });
    modalStore.closeModal();
  };
  closeAd = async (id: number) => {
    await api.interactWithAd(id, '1', {
      headers: { Authorization: `Bearer ${userStore.accessToken}` },
    });
    modalStore.closeModal();
  };
}

export default new appStore();
