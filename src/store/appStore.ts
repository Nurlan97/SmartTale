import { makeAutoObservable } from 'mobx';

import { cardsArray } from '../../mockData';
import {
  FullOrder,
  Order,
  PageCard,
  PageSmallOrder,
  Product,
} from '../api/data-contracts';
import { MyApi } from '../api/V1';
import userStore from './userStore';

const api = new MyApi(); //создаем экземпляр нашего api

export interface IType {
  type: 'equipment' | 'services';
}
interface IAdsResponse {
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
  group: 'all' | 'service' | 'equipment';
  data: IAdsResponse;
  detailed: FullOrder & IType;
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
      size: 0,
      content: [],
      number: 0,
      sort: { empty: false, sorted: false, unsorted: false },
      numberOfElements: 0,
      first: false,
      last: false,
      empty: false,
    },
    detailed: {
      acceptanceRequests: [],
      acceptedBy: 0,
      acceptedAt: '',
      organizationLogoUrl: '',
      organizationName: '',
      type: 'equipment',
      orderId: 0,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
      imageUrls: [
        'https://kartinki.pics/pics/uploads/posts/2022-08/thumbs/1661232571_2-kartinkin-net-p-shveinoe-delo-fon-krasivo-2.jpg',
        'https://kartinki.pics/pics/uploads/posts/2022-08/thumbs/1661232571_2-kartinkin-net-p-shveinoe-delo-fon-krasivo-2.jpg',
        'https://kartinki.pics/pics/uploads/posts/2022-08/thumbs/1661232571_2-kartinkin-net-p-shveinoe-delo-fon-krasivo-2.jpg',
      ],
      deadlineAt: '14 march 2025',
      price: 1000,
      title: 'Нитки',
      isClosed: false,
      isDeleted: false,
      publishedAt: '',

      views: 0,
      size: '',
    },
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

  myAdsSetGroup = (group: 'all' | 'service' | 'equipment') => {
    this.myAds.group = group;
  };
  getMyAds = () => {
    this.myAds.data.content = cardsArray;
  };
  getDetailedAd = (id: number) => {
    this.myAds.detailed.orderId = id;
    // api.getAd1(id).then((response) => {
    //   this.myAds.detailed.orderId = response.data.orderId;
    //   this.myAds.detailed.description = response.data.description;
    //   this.myAds.detailed.title = response.data.title;
    //   if (response.data.price) this.myAds.detailed.price = response.data.price;
    //   if (response.data.imageUrls) {
    //     this.myAds.detailed.imageUrls = response.data.imageUrls;
    //   }
    //   if (response.data.deadlineAt) {
    //     this.myAds.detailed.deadlineAt = response.data.deadlineAt;
    //   }
    // });
  };
  getMyBuys = async () => {
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
}

export default new appStore();
