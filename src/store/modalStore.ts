import { makeAutoObservable } from 'mobx';
import { fromPromise } from 'mobx-utils';

import { FullOrderCard, FullProductCard } from '../api/data-contracts';
import { MyApi } from '../api/V1';
import userStore from './userStore';

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
interface IDetailed {
  id: number;
  path: string;
  title: string;
  deadline: string;
  status: string;
  price: number;
  authorImg: string;
  author: string;
  images: string[];
  activeImg: number;
  type: string;
  activeTab: 'description' | 'contacts' | 'size';
  description: string;
  contacts: string;
  size: string;
}
const api = new MyApi();
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
    path: string;
    activeImg: number;
    activeTab: 'description' | 'size' | 'contacts';
  } = { activeImg: 0, activeTab: 'description', path: '' };
  detailed: FullProductCard | FullOrderCard = {
    acceptedBy: 0,
    advertisementId: 0,
    deadlineAt: '',
    description: '',
    imageUrls: [],
    organizationLogoUrl: '',
    organizationName: '',
    price: 0,
    publishedAt: '',
    publishedBy: 0,
    publisherAvatarUrl: '',
    publisherEmail: '',
    publisherName: '',
    publisherPhoneNumber: '',
    purchasedAt: '',
    size: '',
    title: '',
    views: 0,
  };
  currentModal: Modals | null = null;

  constructor() {
    makeAutoObservable(this);
  }
  closeModal = () => {
    this.isOpen = false;
  };
  openDescription = async (id: number, path: string) => {
    this.isOpen = true;
    this.currentModal = Modals.loader;
    try {
      const response = await api.getAd(id, {
        headers: { Authorization: `Bearer ${userStore.accessToken}` },
      });
      this.detailed = response.data;
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
}

export default new modalStore();
