import { makeAutoObservable } from 'mobx';

import { CustomPageSearchItem, SearchItem } from '../api/data-contracts';
import { myApi } from '../api/V1';

class searchStore {
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
  };
  fetchSearch = async (
    query: string,
    isDD: boolean,
    size: number,
    context?: SearchItem['type'],
  ) => {
    try {
      const searchContext = context ? context : this.context;
      const response = await myApi.search({
        q: query,
        con: searchContext,
        size: size,
        page: this.results.number,
        iDD: isDD,
      });
      this.results = response.data;
    } catch (error) {
      console.log(error);
    }
  };
}
export default new searchStore();
