import { makeAutoObservable } from 'mobx';

import { CustomPageJobSummary } from '../api/data-contracts';
import { myApi } from '../api/V1';
import { errorNotify, successNotify } from '../utils/toaster';
import modalStore from './modalStore';

class vacancyStore {
  positionsList: CustomPageJobSummary | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }
  getPositions = async () => {
    const response = await myApi.getAdvertisements();
    this.positionsList = response.data;
  };
  deleteAd = async (id: number) => {
    try {
      await myApi.interactWithAd1(id, '3');
      modalStore.closeModal();
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
}

export default new vacancyStore();
