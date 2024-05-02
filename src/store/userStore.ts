import { makeAutoObservable, runInAction } from 'mobx';
import { fromPromise } from 'mobx-utils';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { RegistrationRequest, VerificationRequest } from '../api/data-contracts';
import { MyApi } from '../api/V1';
import { setCookie } from '../utils/helpers';

const api = new MyApi(); //создаем экземпляр нашего api

class userStore {
  accessToken = '';
  refreshToken = '';
  lastName = '';
  firtName = '';
  middleName = '';
  email = '';
  isRemember = false;
  authenticationStage: 1 | 2 | 3 = 1;
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
      const result = await api.verifyEmail(data);
      runInAction(() => {
        // if (result.data.accessToken) this.accessToken = result.data.accessToken;
        // if (result.data.refreshToken) this.refreshToken = result.data.refreshToken;
        if (result.data.accessToken) {
          this.accessToken = result.data.accessToken;
          this.isRemember && setCookie('accessToken', result.data.accessToken, 30);
        }
        if (result.data.refreshToken) {
          this.refreshToken = result.data.refreshToken;
          this.isRemember && setCookie('refreshToken', result.data.refreshToken, 30);
        }
        console.log(this.isRemember);
      });
      navigate();
    } catch (error) {
      runInAction(() => {
        console.error(error);
        this.authenticationStage = 2;
        this.invalidCode = true;
      });
    }
  };

  resendVerificationCode = async () => {
    try {
      const result = await api.resend(JSON.stringify(this.email));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
}

export default new userStore();
