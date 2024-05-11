import { makeAutoObservable, runInAction } from 'mobx';

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
  productId: number;
  title: string;
  type: string;
  description: string;
  imageUrl: string;
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
  authenticationStage: 1 | 2 | 3 = 2;
  isAuth = false;
  anyAds = false;

  invalidCode = false;

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
  fetchAvailableEmail = async (emailValue: string) => {
    // function debounce(cb, delay = 1000) {
    //   let timeout;
    //   return (...args) => {
    //     clearTimeout(timeout);
    //     timeout = setTimeout(() => {
    //       cb(...args);
    //     }, delay);
    //   };
    // }
    try {
      const result = await api.checkAvailable(emailValue);
      return result.data;
    } catch (error) {
      console.log(error);
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
        runInAction(() => {
          this.accessToken = value.data.accessToken;
          this.refreshToken = value.data.refreshToken;
          if (this.isRemember) {
            setCookie('accessToken', value.data.accessToken, 30);
            setCookie('refreshToken', value.data.refreshToken, 30);
          }
        });
        setTimeout(() => {
          navigate();
        }, 500);
      },
      (error) => {
        runInAction(() => {
          console.error(error);
          this.authenticationStage = 2;
          this.invalidCode = true;
        });
      },
    );
  };

  resendVerificationCode = async () => {
    if (this.email !== '') {
      try {
        await api.resend(this.email);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('Email пустой');
    }
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
}

export default new userStore();
