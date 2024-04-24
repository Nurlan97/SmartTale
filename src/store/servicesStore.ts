import { flow, makeAutoObservable, runInAction } from 'mobx';

import { cardsArray } from '../../mockData';
import { ICard } from '../utils/types';

class servicesStore {
  isLoading = false;
  #grid: Array<ICard> = [];
  totalCards = 0;
  page = 1;
  limit = 12;
  detailed = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  setPage = (page: number) => {
    this.page = page;
    this.getRecipesAction();
  };
  setDetailedPage = (id: number) => {
    this.detailed = id;
  };
  setLimit = (limit: number) => {
    this.limit = limit;
  };
  getRecipesAction = async () => {
    //  await userStore.checkTokens();
    this.isLoading = true;
    try {
      // const response = await getRecipesByCategoryAPI(
      //   userStore.accessToken,
      //   this.category,
      //   this.page,
      //   this.limit,
      // );
      this.#grid = cardsArray;
      this.totalCards = 8;
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  };
  get grid() {
    return this.#grid.slice(0, this.limit);
  }
}
export default new servicesStore();
