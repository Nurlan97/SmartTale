import { makeAutoObservable, runInAction } from 'mobx';

import { CustomPageCard } from '../api/data-contracts';
import { myApi } from '../api/V1';
import { errorNotify } from '../utils/toaster';
import modalStore, { Modals } from './modalStore';

class servicesStore {
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
      const response = await myApi.getAds({
        type: 'orders',
        page: page,
        size: limit,
      });
      runInAction(() => {
        this.data = response.data;
      });
    } catch (error) {
      console.log(error);
      errorNotify('Произошла ошибка при загрузке, повторите попытку');
    } finally {
      this.isLoading = false;
      modalStore.closeModal();
    }
  };
}
export default new servicesStore();
