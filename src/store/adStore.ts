import { makeAutoObservable, runInAction } from 'mobx';
import uniqid from 'uniqid';

import {
  CreateJobRequest,
  CreateOrderRequest,
  CreateProductRequest,
  Job,
  OrderFull,
  PositionSummary,
  ProductFull,
  UpdateJobRequest,
  UpdateOrderRequest,
  UpdateProductRequest,
} from '../api/data-contracts';
import { myApi } from '../api/V1';
import { errorNotify, successNotify } from '../utils/toaster';
import modalStore, { Modals } from './modalStore';

interface IImage {
  type: 'currentImages' | 'additionalImages';
  index: number;
  id: string;
}
interface IAction {
  action: 'ADD' | 'MOVE' | 'REMOVE' | 'REPLACE';
  arrayPosition?: number;
  targetPosition?: number;
  filePosiiton?: number;
}
interface ADD {
  action: 'ADD';
  targetPosition: number;
  filePosiiton: number;
}
interface MOVE {
  action: 'MOVE';
  arrayPosition: number;
  targetPosition: number;
}
interface REMOVE {
  action: 'REMOVE';
  arrayPosition: number;
}
interface REPLACE {
  action: 'REPLACE';
  arrayPosition: number;
  filePosiiton: number;
}
export type AdType = 'Order' | 'Product' | 'Job';
export default class adStore {
  ad: Array<OrderFull | ProductFull | Job> = [];
  isLoading = false;
  showForm = true;
  type: AdType = 'Product';
  currentImages: Array<string> = [];
  #viewedImages: IImage[] = [];
  #oldImages: IImage[] = [];
  additionalImages: Array<string> = [];
  additionalFiles: File[] = [];
  viewedImages: Array<string> = [];
  imageActions: IAction[] = [];
  posiitons: PositionSummary[] = [];

  constructor(id?: number, type?: AdType) {
    if (id) {
      this.createStore(id, type);
    }
    makeAutoObservable(this);
  }
  createStore = async (id: number, type?: AdType) => {
    if (type === 'Job') {
      this.type = 'Job';
      await this.fetchJob(id);
    } else {
      await this.fetchAd(id);
    }
    runInAction(() => {
      this.currentImages =
        'imageUrls' in this.ad[0] ? this.ad[0].imageUrls : this.ad[0].images;
      this.currentImages.forEach((val, ind) => {
        this.#viewedImages.push({ index: ind, type: 'currentImages', id: uniqid() });
      });
      this.#oldImages = [...this.#viewedImages];
      this.updateViewed();
    });
  };
  setType = (type: AdType) => () => {
    this.type = type;
  };
  calcActions = () => {
    let currentView = [...this.#oldImages];
    const newView = [...this.#viewedImages];
    let filePointer = 0;
    const length = currentView.length - 1;
    for (let i = length; i >= 0; i--) {
      if (!newView.some((obj) => obj.id === currentView[i].id)) {
        let action: REPLACE | ADD | REMOVE | MOVE;
        if (currentView.length <= newView.length) {
          console.log('action add/replace');
          if (filePointer < this.additionalFiles.length) {
            action = {
              action: 'REPLACE',
              arrayPosition: i,
              filePosiiton: filePointer,
            };
            filePointer += 1;
            currentView.splice(i, 1, newView[i]);
          } else {
            action = {
              action: 'ADD',
              targetPosition: i,
              filePosiiton: filePointer,
            };
            currentView = [...currentView, newView[i]];
          }
        } else {
          action = {
            action: 'REMOVE',
            arrayPosition: i,
          };
          currentView.splice(i, 1);
          for (let j = i; j < currentView.length; j++) {
            currentView[j].index -= 1;
          }
        }
        this.imageActions.push(action);
      }
    }
    currentView = currentView.filter((curObj) =>
      newView.some((obj) => obj.id === curObj.id),
    );
    let newPostion = currentView.length;

    newView.forEach((obj, ind) => {
      if (!currentView.some((obj) => obj.id === newView[ind].id)) {
        this.imageActions.push({
          action: 'ADD',
          targetPosition: newPostion,
          filePosiiton: obj.index,
        });
        newPostion += 1;
      }
    });
    return this.imageActions;
  };
  updateViewed = () => {
    this.viewedImages = this.#viewedImages.map((cur) => {
      return this[cur.type][cur.index];
    });
  };
  addImage = async (file: File) => {
    const ind = this.additionalImages.length;
    this.additionalFiles.push(file);
    this.additionalImages.push(URL.createObjectURL(file));
    this.#viewedImages.push({ index: ind, type: 'additionalImages', id: uniqid() });
    this.updateViewed();
  };
  deleteImage = (ind: number) => {
    const deletedImage = this.#viewedImages.splice(ind, 1)[0];
    this[deletedImage.type].splice(deletedImage.index, 1);
    this.#viewedImages = this.#viewedImages.map((obj) => {
      if (obj.type !== deletedImage.type) return obj;
      if (obj.index < deletedImage.index) return obj;
      return { ...obj, index: obj.index - 1 };
    });
    if (deletedImage.type === 'additionalImages') {
      this.additionalFiles.splice(deletedImage.index, 1);
      this.imageActions = this.imageActions.filter((obj) => obj.targetPosition !== ind);
    }
    this.updateViewed();
  };

  replaceImage = (file: File, ind: number) => {
    const imageToChange = this.#viewedImages[ind];
    const additionalInd = this.additionalImages.length;
    if (imageToChange.type === 'additionalImages') {
      this.additionalFiles.splice(imageToChange.index, 1, file);
      this.additionalImages.splice(imageToChange.index, 1, URL.createObjectURL(file));
      this.#viewedImages.splice(ind, 1, {
        index: imageToChange.index,
        type: 'additionalImages',
        id: uniqid(),
      });
    } else {
      this.additionalFiles.push(file);
      this.additionalImages.push(URL.createObjectURL(file));
      this.#viewedImages.splice(ind, 1, {
        index: additionalInd,
        type: 'additionalImages',
        id: uniqid(),
      });
    }

    this.#viewedImages = this.#viewedImages.map((obj) => {
      if (obj.type !== imageToChange.type) return obj;
      if (obj.index < imageToChange.index) return obj;
      return { ...obj, index: obj.index - 1 };
    });
    this.updateViewed();
  };
  placeAd = async (
    dto: CreateProductRequest | CreateOrderRequest | CreateJobRequest,
    images: File[] = [],
  ) => {
    modalStore.openModal(Modals.loader);
    const obj = { dto: dto, images: images };
    try {
      const response = await myApi.placeAdvertisement(obj);
      this.resetForm();
      successNotify('Объявление успешно добавлено');
    } catch (error) {
      console.log(error);
      errorNotify('Произошла ошибка, повторите попытку');
    }
    modalStore.closeModal();
  };
  resetForm = () => {
    this.isLoading = false;
    this.showForm = true;
    this.type = 'Product';
    this.currentImages = [];
    this.#viewedImages = [];
    this.#oldImages = [];
    this.additionalImages = [];
    this.additionalFiles = [];
    this.viewedImages = [];
    this.imageActions = [];
  };
  fetchAd = async (id: number) => {
    try {
      const response = await myApi.getMyAd(id);
      this.ad = [];
      this.ad.push(response.data);
    } catch (error) {
      console.log(error);
      errorNotify('Произошла ошибка при загрузке, повторите попытку');
    }
  };
  fetchJob = async (id: number) => {
    try {
      const response = await myApi.getAdvertisement(id);
      this.ad = [];
      this.ad.push(response.data);
    } catch (error) {
      console.log(error);
      errorNotify('Произошла ошибка при загрузке, повторите попытку');
    }
  };
  getDropdownPositions = async () => {
    try {
      const response = await myApi.getPositionsDropdown();
      runInAction(() => {
        this.posiitons = response.data;
      });
    } catch (error) {
      console.log(error);
      errorNotify('Произошла ошибка при загрузке доступных позиций, повторите попытку');
    }
  };
  updateAd = async (
    dto:
      | UpdateProductRequest
      | UpdateOrderRequest
      | UpdateJobRequest
      | CreateProductRequest
      | CreateOrderRequest,
  ) => {
    const imageActions = this.calcActions();

    if ('jobId' in dto) {
      const obj = {
        dto: { ...dto, imageOperations: imageActions },
        images: this.additionalFiles,
      };
      try {
        const response = await myApi.updateAdvertisement(obj);
        successNotify('Объявление успешно обновлено');
      } catch (error) {
        console.log(error);
        errorNotify('Произошла ошибка при обновлении объявления');
      }
    }
    if ('advertisementId' in dto) {
      const obj = {
        dto: { ...dto, imageOperations: imageActions },
        images: this.additionalFiles,
      };
      try {
        const response = await myApi.updateAd(obj);
        successNotify('Объявление успешно обновлено');
      } catch (error) {
        console.log(error);
        errorNotify('Произошла ошибка при обновлении объявления');
      }
    }
  };
  confirmRequest = async (code: string) => {
    try {
      const response = await myApi.confirmOrder({ code: code });
      if ('acceptanceRequests' in this.ad[0]) this.ad[0].acceptanceRequests = [];
      successNotify('Пришлашение успешно принято');
    } catch (error) {
      console.log(error);
      errorNotify('Произошла ошибка при подтверждении заказа, повторите попытку');
    }
  };
}
