import { flow, makeAutoObservable, runInAction } from 'mobx';

import { PageCard } from '../api/data-contracts';
import { MyApi } from '../api/V1';
import modalStore from './modalStore';
import userStore from './userStore';

const api = new MyApi();
class mainStore {
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
    console.log('equipment');
    //  await userStore.checkTokens();
    this.isLoading = true;
    modalStore.openLoader();
    try {
      const auth = userStore.isAuth
        ? {
            headers: { Authorization: `Bearer ${userStore.accessToken}` },
          }
        : {};
      const response = await api.getAds(
        {
          type: 'products',
          page: page,
          size: limit,
          params: {},
        },
        auth,
      );
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
export default new mainStore();
