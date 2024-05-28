import { makeAutoObservable, runInAction } from 'mobx';

import { cardsArray } from '../../mockData';
import { PageCard } from '../api/data-contracts';
import { MyApi } from '../api/V1';
import modalStore, { Modals } from './modalStore';

const api = new MyApi();
class servicesStore {
  isLoading = false;
  detailedPage = 0;
  data: Omit<PageCard, 'pageable'> = {
    totalPages: 0,
    totalElements: 0,
    size: 0,
    content: [],
    number: 0,
    sort: { empty: false, sorted: false, unsorted: false },
    first: false,
    last: false,
    numberOfElements: 0,
    empty: false,
  };

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  setPage = (page: number) => {
    this.getCardsAction(page, this.data.size);
  };
  setDetailedPage = (id: number) => {
    this.detailedPage = id;
  };
  setLimit = (limit: number) => {
    this.getCardsAction(undefined, limit);
  };
  getCardsAction = async (page: number = 0, limit: number = 8) => {
    //  await userStore.checkTokens();
    modalStore.openModal(Modals.loader);
    this.isLoading = true;
    try {
      const response = await api.getAds({
        type: 'orders',
        page: page,
        size: limit,
      });
      runInAction(() => {
        this.data = response.data;
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
      modalStore.closeModal();
    }
  };
}
export default new servicesStore();
