import { makeAutoObservable } from 'mobx';
import { fromPromise } from 'mobx-utils';

import { MyApi } from '../api/V1';
export enum SimpleModals {
  closeOrder = 'closeOrder',
  errorOrder = 'errorOrder',
  errorValidation = 'errorValidation',
  successChanges = 'successChanges',
  successOrder = 'successOrder',
  successPurchase = 'successPurchase',
  successSubscribe = 'successSubscribe',
}
export enum ChoiseModals {
  deleteAd = 'deleteAd',
  hideAd = 'hideAd',
  exit = 'exit',
}

export enum ModalsTypes {
  simpleModal = 'simpleModal', //Модалки с одной кнопкой
  choiseModal = 'choiseModal', //Модалки с двумя кнопками
  descriptionModal = 'descriptionModal', //Модалки с описанием объявления или заказа
  changePhotoModal = 'changePhotoModal', //Модалка изменения фото профиля
  inviteEmployer = 'inviteEmployer', //Модалка приглашения сотрудника
  loader = '',
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
  detailed: IDetailed = {
    id: 0,
    path: 'Маркетплейс/Услуги',
    title: 'Заказ №5',
    deadline: 'Срок: до 15 апреля',
    status: '',
    price: 1000,
    authorImg:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKQLLq7RG9cNzHqCcnSoUlUIZcBhuI5YoCkfOA7OAdag&s',
    author: 'Sandy Wilder Cheng',
    images: [
      'https://img.freepik.com/free-photo/sewing-items-arranged-neatly_463209-40.jpg',
      'https://imgs2.tribun.com.ua/images/285/09/19607f50ca0f427e3935613776bed214_28509.jpg',
      'https://lh4.googleusercontent.com/proxy/uR_4lgcMWQd2ZSZMTYaXB4EEu5rHl-tNkAcKIDZXZr7bt-Fwvdj5YxWm7CnJQmd85bZn2h28LsMeQR-eoFDM2mwIQC3mGDOEQi2egSvkrSfyS7MFGpkQvuaX_A',
      'https://img.freepik.com/premium-photo/sewing-products-seamstress-tools-scissors-tape-measure-thread-pins_587895-714.jpg',
      'https://burdastyle.ru/images/cache/2022/4/26/resize_900_900_true_q90_5351761_e1645fc8ab3cde7e9e6b95860.jpeg',
    ],
    activeImg: 0,
    type: 'equipment',
    activeTab: 'description',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    contacts: '+996 123 456 789',
    size: 'XXL',
  };
  currentSimple: SimpleModals = SimpleModals.errorValidation;
  currentChoise: ChoiseModals = ChoiseModals.hideAd;
  currentType: ModalsTypes | null = ModalsTypes.loader;
  constructor() {
    makeAutoObservable(this);
  }
  closeModal = () => {
    this.isOpen = false;
  };
  openDescription = (id: number, path: string) => {
    this.currentType = ModalsTypes.descriptionModal;
    if (path === '/my-purchases' || path === '/equipment' || path === '/services') {
      this.detailed.path = pathObj[path];
    }
    this.detailed.id = id;
    this.isOpen = true;
    // const response = fromPromise(api.getAd(id));
    // response.case({
    //   pending: () => {
    //     this.isLoading = true; //включаем лоадер
    //   },
    //   rejected: (error) => {
    //     this.error = error;
    //     console.log(error);
    //   },
    //   fulfilled: (value) => {
    //     console.log(value);
    //     this.isLoading = false;
    //   },
    // });
  };
  openChoise = (type: ChoiseModals) => {
    this.currentType = ModalsTypes.choiseModal;
    this.currentChoise = type;
    this.isOpen = true;
  };
  openSimple = (type: SimpleModals) => {
    this.currentType = ModalsTypes.simpleModal;
    this.currentSimple = type;
    this.isOpen = true;
  };
  openChangePhoto = () => {
    this.currentType = ModalsTypes.changePhotoModal;
    this.isOpen = true;
  };
  openLoader = () => {
    this.currentType = ModalsTypes.loader;
    this.isOpen = true;
  };
  setImage = (num: number) => () => {
    this.detailed.activeImg = num;
  };
  setActiveTab = (tab: 'description' | 'contacts' | 'size') => () => {
    this.detailed.activeTab = tab;
  };
}

export default new modalStore();
