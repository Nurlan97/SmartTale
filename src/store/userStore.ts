import { makeAutoObservable, runInAction } from 'mobx';

import {
  FullOrder,
  RegistrationRequest,
  UpdateProfileRequest,
  VerificationRequest,
} from '../api/data-contracts';
import { MyApi } from '../api/V1';
import { fullPromise, removeCookie } from '../utils/helpers';
import { setCookie } from '../utils/helpers';
import modalStore, { Modals } from './modalStore';

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
  profilePhoto = '';
  subscribePeriod = '';
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
    try {
      const result = await api.isEmailAvailable(emailValue);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };
  sendVerificationCode = async (data: VerificationRequest, navigate: () => void) => {
    this.authenticationStage = 3;
    fullPromise(
      api.verifyEmail(data),
      (value) => {
        runInAction(() => {
          this.accessToken = value.data.accessToken;
          this.refreshToken = value.data.refreshToken;
          this.isAuth = true;
          if (this.isRemember) {
            setCookie('accessToken', value.data.accessToken, 1);
            setCookie('refreshToken', value.data.refreshToken, 168);
          }
        });
        this.getUser();
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

  fetchAuthorization = async (authorizationData: string) => {
    try {
      await api.login(authorizationData);
      runInAction(() => {
        this.email = authorizationData;
        this.authenticationStage = 2;
      });
    } catch (error) {
      console.error(error);
    }
  };
  getUser = async () => {
    try {
      // const response = await api.getProfile();
      const response = await api.getProfile();
      runInAction(() => {
        this.firstName = response.data.firstName;
        this.lastName = response.data.lastName;
        this.middleName = response.data.middleName;
        this.email = response.data.email;
        this.profilePhoto = response.data.avatarUrl;
        this.phone = response.data.phoneNumber;
        if (response.data.subscriptionEndDate) {
          this.subscribePeriod = response.data.subscriptionEndDate;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  changeProfileEdit = () => {
    this.profileEdit = !this.profileEdit;
  };
  updatePhoto = async (file: File) => {
    modalStore.openModal(Modals.loader);
    try {
      await api.updateAvatar({ avatar: 'any' }, { avatar: file });
      this.profilePhoto = URL.createObjectURL(file);
    } catch (error) {
      console.log(error);
    }
    modalStore.closeModal();
  };
  updateProfile = async (data: UpdateProfileRequest) => {
    modalStore.openModal(Modals.loader);
    try {
      const response = await api.updateProfile(data);
      runInAction(() => {
        this.firstName = response.data.firstName;
        this.lastName = response.data.lastName;
        this.middleName = response.data.middleName;
        this.email = response.data.email;
        this.profilePhoto = response.data.avatarUrl;
        this.phone = response.data.phoneNumber;
        if (response.data.subscriptionEndDate) {
          this.subscribePeriod = response.data.subscriptionEndDate;
        }
      });
    } catch (error) {
      console.log(error);
    }
    modalStore.closeModal();
  };
  subscribe = async () => {
    modalStore.openModal(Modals.loader);
    try {
      const response = await api.subscribe();
      modalStore.openModal(Modals.successSubscribe);
    } catch (error) {
      console.log(error);
    }
  };
  setTokens = (accessToken: string, refreshToken: string) => {
    runInAction(() => {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      setCookie('accessToken', accessToken, 1);
      setCookie('refreshToken', refreshToken, 168);
    });
  };
  refreshTokens = async () => {
    try {
      console.log('refresh tokens');
      const response = await api.refreshToken(`Bearer ${this.refreshToken}`);
      runInAction(() => {
        this.setTokens(response.data.accessToken, response.data.refreshToken);
      });
    } catch (error) {
      console.log(error);
    }
  };
  logout = () => {
    this.isAuth = false;
    this.accessToken = '';
    this.refreshToken = '';
    this.profileEdit = false;
    this.lastName = '';
    this.firstName = '';
    this.middleName = '';
    this.email = '';
    this.phone = '';
    this.profilePhoto = '';
    this.subscribePeriod = '';
    this.isRemember = false;
    this.authenticationStage = 1;
    this.anyAds = false;
    this.invalidCode = false;
    removeCookie('accessToken');
    removeCookie('refreshToken');
  };
}

export default new userStore();
