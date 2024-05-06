import { makeAutoObservable, runInAction } from 'mobx';
import { NavigateFunction } from 'react-router-dom';

import { adsRowMock } from '../../mockData';
import {
  FullOrder,
  RegistrationRequest,
  VerificationRequest,
} from '../api/data-contracts';
import { MyApi } from '../api/V1';
import { fullPromise } from '../utils/helpers';
import { setCookie } from '../utils/helpers';
import modalStore, { SimpleModals } from './modalStore';

const api = new MyApi(); //создаем экземпляр нашего api
interface IOneAd {
  id: number;
  title: string;
  type: string;
  description: string;
  image: string;
}
export interface IType {
  type: 'equipment' | 'services';
}

interface IMyAd {
  group: 'all' | 'service' | 'equipment';
  data: IOneAd[];
  detailed: FullOrder & IType;
}

class userStore {
  accessToken = '';
  refreshToken = '';
  profileEdit = false;
  lastName = '';
  firstName = '';
  middleName = '';
  email = '';
  phone = '';
  profilePhoto =
    'https://img.freepik.com/free-psd/3d-illustration-of-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2116175301.1714435200&semt=ais';
  subscribePeriod = '';
  isRemember = false;
  authenticationStage: 1 | 2 | 3 = 1;
  isAuth = false;
  anyAds = false;
  myAds: IMyAd = {
    group: 'all',
    data: adsRowMock,
    detailed: {
      type: 'equipment',
      orderId: 0,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
      imageUrls: [
        'https://kartinki.pics/pics/uploads/posts/2022-08/thumbs/1661232571_2-kartinkin-net-p-shveinoe-delo-fon-krasivo-2.jpg',
        'https://kartinki.pics/pics/uploads/posts/2022-08/thumbs/1661232571_2-kartinkin-net-p-shveinoe-delo-fon-krasivo-2.jpg',
        'https://kartinki.pics/pics/uploads/posts/2022-08/thumbs/1661232571_2-kartinkin-net-p-shveinoe-delo-fon-krasivo-2.jpg',
      ],
      deadlineAt: '14 march 2025',
      price: 1000,
      title: 'Нитки',
      isClosed: false,
      isDeleted: false,
      publishedAt: '',
      publishedBy: 0,
      views: 0,
      size: '',
    },
  };  invalidCode = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleRemember = () => {
    this.isRemember = !this.isRemember;
  };

  fetchRegistration = async (registrationData: RegistrationRequest) => {
    // const result = fromPromise(api.register(registrationData));
    // result.then(
    //   (result) => {
    //     this.email = result.data;
    //     this.authenticationStage = 2;
    //   },
    //   (rejectReason) =>
    //     console.error('fetchResult was rejected, reason: ' + rejectReason),
    // );
    try {
      const result = await api.register(registrationData);
      runInAction(() => {
        this.email = result.data;
        this.authenticationStage = 2;
      });
    } catch (error) {
      console.error(error);
    }
  };
  sendVerificationCode = async (
    data: VerificationRequest,
    // navigate: NavigateFunction,
    navigate: () => void,
  ) => {
    //функция fullPromise принимает 3 аргумента
    //promise - сам промис
    //fullfilled - каллбек вызовется если промис зарезолвится
    //rejected - каллбек вызовется если промис зереджектится
    this.authenticationStage = 3; //включаем лоадер
    fullPromise(
      api.verifyEmail(data),
      (value) => {
        console.log(value);
        navigate('/equipment'); //если все норм, редиректим напримре на маркетплейс
      },
      (error) => {
        this.authenticationStage = 2; //если ошибка возврашаем на ввод кода
        console.log(error);
      },
    );
  };
  resendVerification = async (data: string) => {
    const response = await api.resend(data);
  };
  getUser = async () => {
    try {
      // const response = await api.getProfile();
      const response = await api.getProfile({
        headers: { Authorization: `Bearer ${this.accessToken}` },
      });
      runInAction(() => {
        this.firstName = response.data.firstName;
        this.lastName = response.data.lastName;
        this.middleName = response.data.middleName;
        this.email = response.data.email;
        if (response.data.avatarUrl) {
          this.profilePhoto = response.data.avatarUrl;
        }
        if (response.data.phoneNumber) {
          this.phone = response.data.phoneNumber;
        }
        if (response.data.subscriptionEndDate) {
          this.subscribePeriod = response.data.subscriptionEndDate;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  changeFirstName = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.firstName = ev.target.value;
  };
  changeLastName = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.lastName = ev.target.value;
  };
  changeMiddleName = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.middleName = ev.target.value;
  };
  changeEmail = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.email = ev.target.value;
  };
  changePhone = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.phone = ev.target.value;
  };
  changePhoto = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.profilePhoto = ev.target.value;
  };
  changeProfileEdit = () => {
    this.profileEdit = !this.profileEdit;
  };
  updatePhoto = (file: File) => {
    // const data = new FormData();
    // data.append('file', file, file.name);
    api.updateAvatar({ avatar: 'image/' }, { avatar: file });
  };
  subscribe = async () => {
    try {
      // const response = await api.subscribe();
      // console.log(response);
      modalStore.openSimple(SimpleModals.successSubscribe);
    } catch (error) {
      console.log(error);
    }
  };
  myAdsSetGroup = (group: 'all' | 'service' | 'equipment') => {
    this.myAds.group = group;
  };
  getDetailedAd = (id: number) => {
    this.myAds.detailed.orderId = id;
    // api.getAd1(id).then((response) => {
    //   this.myAds.detailed.orderId = response.data.orderId;
    //   this.myAds.detailed.description = response.data.description;
    //   this.myAds.detailed.title = response.data.title;
    //   if (response.data.price) this.myAds.detailed.price = response.data.price;
    //   if (response.data.imageUrls) {
    //     this.myAds.detailed.imageUrls = response.data.imageUrls;
    //   }
    //   if (response.data.deadlineAt) {
    //     this.myAds.detailed.deadlineAt = response.data.deadlineAt;
    //   }
    // });
  };
}

export default new userStore();
