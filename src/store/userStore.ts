import { AxiosHeaders } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import { fromPromise } from 'mobx-utils';
import { NavigateFunction } from 'react-router-dom';

import { RegistrationRequest, VerificationRequest } from '../api/data-contracts';
import { MyApi } from '../api/V1';
import { setCookie } from '../utils/helpers';
import modalStore, { SimpleModals } from './modalStore';

const api = new MyApi(); //создаем экземпляр нашего api

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
    // const result = fromPromise(api.verifyEmail(data)); //можно использовать fromPromise из mobx-utils
    // result.case({
    //   pending: () => {
    //     this.authenticationStage = 3; //включаем лоадер
    //   },
    //   rejected: (error) => {
    //     this.authenticationStage = 2; //если ошибка возврашаем на ввод кода
    //     console.log(error);
    //   },
    //   fulfilled: (value) => {
    //     console.log(value);
    //     if (value.data.accessToken) this.accessToken = value.data.accessToken;
    //     if (value.data.refreshToken) this.refreshToken = value.data.refreshToken;
    //     navigate(); //если все норм, редиректим напримре на маркетплейс
    //   },
    // });

    try {
      this.authenticationStage = 3;
      const result = await api.verifyEmail(data);
      runInAction(() => {
        // if (result.data.accessToken) this.accessToken = result.data.accessToken;
        // if (result.data.refreshToken) this.refreshToken = result.data.refreshToken;
        // if (result.data.accessToken) {
        this.accessToken = result.data.accessToken;
        // this.isRemember && setCookie('accessToken', result.data.accessToken, 30);
        // }
        // if (result.data.refreshToken) {
        this.refreshToken = result.data.refreshToken;
        // this.isRemember && setCookie('refreshToken', result.data.refreshToken, 30);
        if (this.isRemember) {
          setCookie('accessToken', result.data.accessToken, 30);
          setCookie('refreshToken', result.data.refreshToken, 30);
        }
        // }
      });
      setTimeout(() => {
        navigate();
      }, 500);
    } catch (error) {
      runInAction(() => {
        console.error(error);
        this.authenticationStage = 2;
        this.invalidCode = true;
      });
    }
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
      const response = await api.subscribe();
      console.log(response);
      modalStore.openSimple(SimpleModals.successSubscribe);
    } catch (error) {
      console.log(error);
    }
  };
}

export default new userStore();
