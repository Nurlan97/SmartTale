import { makeAutoObservable } from 'mobx';

import {
  InviteRequest,
  JobCard,
  OrderCard,
  PositionSummary,
  ProductCard,
  Purchase,
} from '../api/data-contracts';
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
  '/services': 'Маркетплейс/Заказы',
  '/job': 'Маркетплейс/Услуги',
  '/orders-history': 'Заказы/История',
};
export enum PathEnum {
  '/my-purchases' = 'Личный кабинет/Мои покупки',
  '/equipment' = 'Маркетплейс/Оборудование',
  '/services' = 'Маркетплейс/Заказы',
  '/job' = 'Маркетплейс/Услуги',
  '/orders-history' = 'Заказы/История',
}
class modalStore {
  isOpen = false;
  isLoading = false;
  error = '';
  dropDownPositions: PositionSummary[] = [];
  detailedExt: {
    id: number;
    path: string;
    activeImg: number;
    activeTab: 'description' | 'size' | 'contacts';
  } = { id: 0, activeImg: 0, activeTab: 'description', path: '' };
  detailed: Array<OrderCard | ProductCard | JobCard | Purchase> = [];
  currentModal: Modals | null = null;

  constructor() {
    makeAutoObservable(this);
  }
  closeModal = () => {
    this.isOpen = false;
  };
  openDescription = async (id: number, path: PathEnum) => {
    this.detailed = [];
    this.isOpen = true;
    this.currentModal = Modals.loader;
    this.detailedExt.id = id;
    try {
      let response;
      if (path === PathEnum['/my-purchases']) {
        response = await myApi.getPurchase(id);
      } else {
        response = await myApi.getAd(id);
      }

      this.detailed.push(response.data);
      // if (
      //   path === '/my-purchases' ||
      //   path === '/equipment' ||
      //   path === '/services' ||
      //   path === '/job'
      // ) {
      //   this.detailedExt.path = pathObj[path];
      // }
      this.detailedExt.path = path;
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
  getPositions = async () => {
    try {
      const response = await myApi.getPositionsDropdown();
      this.dropDownPositions = response.data;
    } catch (error) {
      console.log(error);
    }
  };
  senInvite = (data: InviteRequest) => {
    myApi.inviteEmployee(data);
    this.closeModal();
  };
}

export default new modalStore();
