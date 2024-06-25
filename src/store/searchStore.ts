import { makeAutoObservable, runInAction } from 'mobx';

import { CustomPageSearchItem, SearchItem } from '../api/data-contracts';
import { myApi } from '../api/V1';
import { errorNotify } from '../utils/toaster';

class searchStore {
  isLoading = false;
  context: SearchItem['type'] = 'ADVERTISEMENT';
  results: CustomPageSearchItem = {
    content: [],
    totalPages: 0,
    totalElements: 0,
    number: 0,
    size: 8,
    isEmpty: true,
  };
  constructor() {
    makeAutoObservable(this);
  }
  setContext = (type: SearchItem['type']) => {
    this.context = type;
    this.results = {
      content: [],
      totalPages: 0,
      totalElements: 0,
      number: 0,
      size: 8,
      isEmpty: true,
    };
  };
  get hasNext() {
    return this.results.totalPages > this.results.number;
  }
  fetchSearch = async (
    query: string,
    isDD: boolean,
    size: number,
    context?: SearchItem['type'],
    page?: number,
  ) => {
    if (this.isLoading || query.length < 3) return;
    try {
      this.isLoading = true;
      const searchContext = context ? context : this.context;
      const response = await myApi.search({
        q: query,
        con: searchContext,
        size: size,
        page: page ? page : this.results.number,
        iDD: isDD,
      });
      this.results = response.data;
    } catch (error) {
      console.log(error);
      errorNotify('Произошла ошибка во время поиска, повторите попытку');
    } finally {
      this.isLoading = false;
    }
  };
  fetchMore = async (query: string) => {
    if (this.isLoading || !this.hasNext || query.length < 3) return;
    try {
      this.isLoading = true;
      const response = await myApi.search({
        q: query,
        con: this.context,
        size: this.results.size,
        page: this.results.number + 1,
        iDD: false,
      });
      runInAction(() => {
        this.results.isEmpty = response.data.isEmpty;
        this.results.number = response.data.number;
        this.results.size = response.data.size;
        this.results.totalElements = response.data.totalElements;
        this.results.totalPages = response.data.totalPages;
        this.results.content.push(...response.data.content);
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  };
}
export default new searchStore();
