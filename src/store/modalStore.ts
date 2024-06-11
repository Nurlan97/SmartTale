import { makeAutoObservable } from 'mobx';

import { JobCard, OrderCard, ProductCard } from '../api/data-contracts';
import { myApi } from '../api/V1';

export enum Modals {
  closeOrder = 'closeOrder',
  errorOrder = 'errorOrder',
  errorValidation = 'errorValidation',
  successChanges = 'successChanges',
  successOrder = 'successOrder',
  successPurchase = 'successPurchase',
  successSubscribe = 'successSubscribe',
  deleteAd = 'deleteAd',
  hideAd = 'hideAd',
  exit = 'exit',
  descriptionModal = 'descriptionModal',
  changePhotoModal = 'changePhotoModal',
  inviteEmployer = 'inviteEmployer',
  loader = 'loader',
}

const pathObj = {
  '/my-purchases': 'Личный кабинет/Мои покупки',
  '/equipment': 'Маркетплейс/Оборудование',
  '/services': 'Маркетплейс/Услуги',
};
class modalStore {
  isOpen = false;
  isLoading = false;
  error = '';
  detailedExt: {
    id: number;
    path: string;
    activeImg: number;
    activeTab: 'description' | 'size' | 'contacts';
  } = { id: 0, activeImg: 0, activeTab: 'description', path: '' };
  detailed: Array<OrderCard | ProductCard | JobCard> = [];
  currentModal: Modals | null = null;

  constructor() {
    makeAutoObservable(this);
  }
  closeModal = () => {
    this.isOpen = false;
  };
  openDescription = async (id: number, path: string) => {
    this.detailed = [];
    this.isOpen = true;
    this.currentModal = Modals.loader;
    this.detailedExt.id = id;
    try {
      const response = await myApi.getAd(id);
      this.detailed.push(response.data);
      if (path === '/my-purchases' || path === '/equipment' || path === '/services') {
        this.detailedExt.path = pathObj[path];
      }
      this.detailedExt.activeImg = 0;
      this.detailedExt.activeTab = 'description';
      this.currentModal = Modals.descriptionModal;
    } catch (error) {
      console.log(error);
      this.isOpen = false;
    }
  };
  openModal = (type: Modals) => {
    this.currentModal = type;
    this.isOpen = true;
  };
  // openSimple = (type: SimpleModals) => {
  //   this.currentType = ModalsTypes.simpleModal;
  //   this.currentSimple = type;
  //   this.isOpen = true;
  // };
  // openChangePhoto = () => {
  //   this.currentType = ModalsTypes.changePhotoModal;
  //   this.isOpen = true;
  // };
  // openLoader = () => {
  //   this.currentType = ModalsTypes.loader;
  //   this.isOpen = true;
  // };
  setImage = (num: number) => () => {
    this.detailedExt.activeImg = num;
  };
  setActiveTab = (tab: 'description' | 'contacts' | 'size') => () => {
    this.detailedExt.activeTab = tab;
  };
  handleAdvertisement = (quantity?: number) => {
    try {
      myApi.handleAdvertisementAction(this.detailedExt.id, { quantity: quantity });
      this.openModal(Modals.successPurchase);
    } catch (error) {
      console.log(error);
    }
  };
}

export default new modalStore();
