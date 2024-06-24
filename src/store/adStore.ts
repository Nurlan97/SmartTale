import { arrayMove } from '@dnd-kit/sortable';
import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

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
  filePosition?: number;
}
interface ADD {
  action: 'ADD';
  targetPosition: number;
  filePosition: number;
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
  filePosition: number;
}
export type AdType = 'Order' | 'Product' | 'Job';
export type ImageExt = {
  id: string;
  url: string;
  file: File | undefined;
};
export default class adStore {
  ad: Array<OrderFull | ProductFull | Job> = [];
  isLoading = false;
  showForm = true;
  type: AdType = 'Product';
  // currentImages: Array<string> = [];
  // #viewedImages: IImage[] = [];
  // #oldImages: IImage[] = [];
  // additionalImages: Array<string> = [];
  // additionalFiles: File[] = [];
  // viewedImages: Array<string> = [];
  prevImages: ImageExt[] = [];
  currImages: ImageExt[] = [];
  addFiles: File[] = [];
  // imageActions: IAction[] = [];
  imageOperations: IAction[] = [];
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
      const imagesArr =
        'imageUrls' in this.ad[0] ? this.ad[0].imageUrls : this.ad[0].images;
      this.prevImages = imagesArr.map((url) => {
        return {
          id: uuidv4(),
          url: url,
          file: undefined,
        };
      });
      this.currImages = [...this.prevImages];
      // this.currentImages.forEach((val, ind) => {
      //   this.#viewedImages.push({ index: ind, type: 'currentImages', id: uuidv4() });
      // });
      // this.#oldImages = [...this.#viewedImages];
      // this.updateViewed();
    });
  };
  setType = (type: AdType) => () => {
    this.type = type;
  };
  // calcActions = () => {
  //   let currentView = [...this.#oldImages];
  //   const newView = [...this.#viewedImages];
  //   let filePointer = 0;
  //   const length = currentView.length - 1;
  //   for (let i = length; i >= 0; i--) {
  //     if (!newView.some((obj) => obj.id === currentView[i].id)) {
  //       let action: REPLACE | ADD | REMOVE | MOVE;
  //       if (currentView.length <= newView.length) {
  //         console.log('action add/replace');
  //         if (filePointer < this.additionalFiles.length) {
  //           action = {
  //             action: 'REPLACE',
  //             arrayPosition: i,
  //             filePosition: filePointer,
  //           };
  //           filePointer += 1;
  //           currentView.splice(i, 1, newView[i]);
  //         } else {
  //           action = {
  //             action: 'ADD',
  //             targetPosition: i,
  //             filePosition: filePointer,
  //           };
  //           currentView = [...currentView, newView[i]];
  //         }
  //       } else {
  //         action = {
  //           action: 'REMOVE',
  //           arrayPosition: i,
  //         };
  //         currentView.splice(i, 1);
  //         for (let j = i; j < currentView.length; j++) {
  //           currentView[j].index -= 1;
  //         }
  //       }
  //       this.imageActions.push(action);
  //     }
  //   }
  //   currentView = currentView.filter((curObj) =>
  //     newView.some((obj) => obj.id === curObj.id),
  //   );
  //   let newPostion = currentView.length;

  //   newView.forEach((obj, ind) => {
  //     if (!currentView.some((obj) => obj.id === newView[ind].id)) {
  //       this.imageActions.push({
  //         action: 'ADD',
  //         targetPosition: newPostion,
  //         filePosition: obj.index,
  //       });
  //       newPostion += 1;
  //     }
  //   });
  //   return this.imageActions;
  // };
  // updateViewed = () => {
  //   this.viewedImages = this.#viewedImages.map((cur) => {
  //     return this[cur.type][cur.index];
  //   });
  // };
  // addImage = async (file: File) => {
  //   const ind = this.additionalImages.length;
  //   this.additionalFiles.push(file);
  //   this.additionalImages.push(URL.createObjectURL(file));
  //   this.#viewedImages.push({ index: ind, type: 'additionalImages', id: uuidv4() });
  //   this.updateViewed();
  // };
  // deleteImage = (ind: number) => {
  //   const deletedImage = this.#viewedImages.splice(ind, 1)[0];
  //   this[deletedImage.type].splice(deletedImage.index, 1);
  //   this.#viewedImages = this.#viewedImages.map((obj) => {
  //     if (obj.type !== deletedImage.type) return obj;
  //     if (obj.index < deletedImage.index) return obj;
  //     return { ...obj, index: obj.index - 1 };
  //   });
  //   if (deletedImage.type === 'additionalImages') {
  //     this.additionalFiles.splice(deletedImage.index, 1);
  //     this.imageActions = this.imageActions.filter((obj) => obj.targetPosition !== ind);
  //   }
  //   this.updateViewed();
  // };

  // replaceImage = (file: File, ind: number) => {
  //   const imageToChange = this.#viewedImages[ind];
  //   const additionalInd = this.additionalImages.length;
  //   if (imageToChange.type === 'additionalImages') {
  //     this.additionalFiles.splice(imageToChange.index, 1, file);
  //     this.additionalImages.splice(imageToChange.index, 1, URL.createObjectURL(file));
  //     this.#viewedImages.splice(ind, 1, {
  //       index: imageToChange.index,
  //       type: 'additionalImages',
  //       id: uuidv4(),
  //     });
  //   } else {
  //     this.additionalFiles.push(file);
  //     this.additionalImages.push(URL.createObjectURL(file));
  //     this.#viewedImages.splice(ind, 1, {
  //       index: additionalInd,
  //       type: 'additionalImages',
  //       id: uuidv4(),
  //     });
  //   }

  //   this.#viewedImages = this.#viewedImages.map((obj) => {
  //     if (obj.type !== imageToChange.type) return obj;
  //     if (obj.index < imageToChange.index) return obj;
  //     return { ...obj, index: obj.index - 1 };
  //   });
  //   this.updateViewed();
  // };

  updateImg = (imageFile: File, id: string) => {
    this.currImages = this.currImages.map((img) => {
      if (img.id === id) {
        return {
          file: imageFile,
          url: URL.createObjectURL(imageFile),
          id: uuidv4(),
        };
      } else {
        return img;
      }
    });
  };
  deleteImg = (id: string) => {
    this.currImages = this.currImages.filter((img) => img.id !== id);
  };
  addImg = (image: ImageExt) => {
    this.currImages.push(image);
    console.log(toJS(this.currImages), toJS(this.prevImages));
  };
  replaceImg = (activeId: string, overId: string) => {
    const getImgPos = (id: string) => this.currImages.findIndex((img) => img.id == id);
    const activeIndex = getImgPos(activeId);
    const overIndex = getImgPos(overId);
    this.currImages = arrayMove(this.currImages, activeIndex, overIndex);
  };
  calcOperations = async () => {
    const currArray = toJS(this.currImages);
    const prevArray = toJS(this.prevImages);
    console.log(currArray, prevArray);
    currArray.forEach(async (image, ind) => {
      // console.log(image);
      if (prevArray.length > ind + 1 && image.id === prevArray[ind].id) {
        console.log('нет изменений');
        return;
      }
      const currIndex = currArray.findIndex(
        (currImage) => currImage.id === prevArray[ind].id,
      );
      const prevIndex = prevArray.findIndex((prevImage) => prevImage.id === image.id);
      if (image.file) {
        if (prevArray.length <= ind) {
          this.imageOperations.push({
            action: 'ADD',
            targetPosition: ind,
            filePosition: this.addFiles.length,
          });
          this.addFiles.push(image.file);
          console.log('добавляем', ind, this.addFiles.length);
          return;
        } else {
          if (currIndex !== -1) {
            this.imageOperations.push({
              action: 'ADD',
              targetPosition: ind,
              filePosition: this.addFiles.length,
            });
            this.addFiles.push(image.file);
            const prevArrLength = prevArray.length;
            prevArray.push({
              id: image.id,
              url: '',
              file: undefined,
            });
            console.log('добавляем', ind, this.addFiles.length);
            this.imageOperations.push({
              action: 'MOVE',
              arrayPosition: prevArrLength,
              targetPosition: ind,
            });
            arrayMove(prevArray, ind, prevArrLength);
            console.log('перемещаем', currIndex, ind);
            return;
          } else {
            this.imageOperations.push({
              action: 'REPLACE',
              arrayPosition: ind,
              filePosition: this.addFiles.length,
            });
            this.addFiles.push(image.file);
            console.log('меняем на новый', ind, this.addFiles.length - 1);
            return;
          }
        }
      } else {
        this.imageOperations.push({
          action: 'MOVE',
          arrayPosition: prevIndex,
          targetPosition: ind,
        });
        arrayMove(prevArray, ind, prevIndex);
        console.log('перемещаем', currIndex, ind);
        return;
      }
    });
    if (prevArray.length > this.currImages.length) {
      for (let i = prevArray.length - 1; i >= this.currImages.length; i--) {
        this.imageOperations.push({
          action: 'REMOVE',
          arrayPosition: i,
        });
        console.log('удаляем лишнее', i);
      }
    }
  };
  fillAddFiles = () => {
    // const currArray = toJS(this.currImages);
    this.currImages.forEach(async (image, ind) => {
      if (image.file) this.addFiles.push(image.file);
    });
  };
  resetImgs = () => {
    this.currImages = [...this.prevImages];
  };
  placeAd = async (
    dto: CreateProductRequest | CreateOrderRequest | CreateJobRequest,
    // images: File[] = [],
  ) => {
    modalStore.openModal(Modals.loader);

    this.fillAddFiles();
    const obj = { dto: dto, images: toJS(this.addFiles) };

    try {
      const response = await myApi.placeAdvertisement(obj);
      this.resetForm();
      successNotify('Объявление успешно добавлено');
    } catch (error) {
      console.log(error);
      errorNotify('Произошла ошибка, повторите попытку');
    } finally {
      this.resetForm();
      modalStore.closeModal();
    }
  };
  resetForm = () => {
    this.isLoading = false;
    this.showForm = true;
    this.type = 'Product';
    // this.currentImages = [];
    // this.#viewedImages = [];
    // this.#oldImages = [];
    // this.additionalImages = [];
    // this.additionalFiles = [];
    // this.viewedImages = [];
    this.imageOperations = [];
    this.addFiles = [];
    this.currImages = [];
    this.prevImages = [];
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
    await this.calcOperations();
    if ('jobId' in dto) {
      const obj = {
        dto: { ...dto, imageOperations: this.imageOperations },
        images: this.addFiles,
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
        dto: { ...dto, imageOperations: this.imageOperations },
        images: this.addFiles,
      };
      try {
        const response = await myApi.updateAd(obj);
        successNotify('Объявление успешно обновлено');
      } catch (error) {
        console.log(error);
        errorNotify('Произошла ошибка при обновлении объявления');
      }
    }
    this.resetForm();
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
