import { flow, makeAutoObservable, runInAction } from 'mobx';

import { CustomPageCard } from '../api/data-contracts';
import { myApi } from '../api/V1';
import modalStore, { Modals } from './modalStore';

class jobStore {
  isLoading = false;
  detailedPage = 0;
  data: CustomPageCard = {
    totalPages: 0,
    totalElements: 0,
    size: 0,
    content: [],
    number: 0,
    isEmpty: false,
  };

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  setPage = (page: number) => {
    // this.page = page;
    this.getCardsAction(page, this.data.size);
  };
  setDetailedPage = (id: number) => {
    this.detailedPage = id;
  };
  setLimit = (limit: number) => {
    this.getCardsAction(undefined, limit);
  };
  getCardsAction = async (page: number = 0, limit: number = 8) => {
    this.isLoading = true;
    modalStore.openModal(Modals.loader);
    try {
      const response = await myApi.getAds({
        type: 'jobs',
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
export default new jobStore();
