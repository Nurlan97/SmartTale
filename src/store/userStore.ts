import { makeAutoObservable, runInAction } from 'mobx';

import {
  RegistrationRequest,
  UpdateProfileRequest,
  VerificationRequest,
} from '../api/data-contracts';
import { myApi } from '../api/V1';
import { getRolesFromMask, Roles } from '../utils/authorizationHelpers';
import { decodeJWT, removeCookie } from '../utils/helpers';
import { setCookie } from '../utils/helpers';
import modalStore, { Modals } from './modalStore';
import notifyStore from './notifyStore';

class userStore {
  userId: number | undefined = undefined;
  orgId: number | undefined = undefined;
  roles = '';
  hierarchy: number | undefined = undefined;
  authorities: Roles[] = [];
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
      const result = await myApi.register(registrationData);
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
      const result = await myApi.isEmailAvailable(emailValue);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };
  sendVerificationCode = async (data: VerificationRequest, navigate: () => void) => {
    this.authenticationStage = 3;
    try {
      const response = await myApi.verifyEmail(data);
      runInAction(() => {
        this.setTokens(response.data.accessToken, response.data.refreshToken);

        if (this.isRemember) {
          setCookie('accessToken', response.data.accessToken, 1);
          setCookie('refreshToken', response.data.refreshToken, 168);
        }
      });
      this.getUser();
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
        await myApi.resend(this.email);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('Email пустой');
    }
  };

  fetchAuthorization = async (authorizationData: string) => {
    try {
      await myApi.login(authorizationData);
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
      // const response = await myApi.getProfile();
      const response = await myApi.getProfile();
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
      await myApi.updateAvatar({ avatar: 'any' }, { avatar: file });
      this.profilePhoto = URL.createObjectURL(file);
    } catch (error) {
      console.log(error);
    }
    modalStore.closeModal();
  };
  updateProfile = async (data: UpdateProfileRequest) => {
    modalStore.openModal(Modals.loader);
    try {
      const response = await myApi.updateProfile(data);
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
      const response = await myApi.subscribe();
      modalStore.openModal(Modals.successSubscribe);
    } catch (error) {
      console.log(error);
    }
  };
  setTokens = (accessToken: string, refreshToken: string, isRemember?: boolean) => {
    runInAction(() => {
      this.isAuth = true;
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.orgId = decodeJWT(accessToken).orgId;
      this.userId = decodeJWT(accessToken).userId;
      this.hierarchy = decodeJWT(accessToken).hierarchy;
      this.roles = decodeJWT(accessToken).roles;
      this.authorities = getRolesFromMask(decodeJWT(accessToken).authorities);
      console.log(getRolesFromMask(decodeJWT(accessToken).authorities));

      notifyStore.connect();
      if (isRemember) {
        setCookie('accessToken', accessToken, 1);
        setCookie('refreshToken', refreshToken, 168);
        this.isRemember = true;
      }
    });
  };
  refreshTokens = async (refresh?: string, isRemember?: boolean) => {
    try {
      const refreshToken = refresh ? refresh : this.refreshToken;
      const response = await myApi.refreshToken(`Bearer ${refreshToken}`);
      runInAction(() => {
        this.setTokens(response.data.accessToken, response.data.refreshToken, isRemember);
      });
    } catch (error) {
      console.log(error);
    }
  };
  logout = () => {
    this.userId = undefined;
    this.orgId = undefined;
    this.roles = '';
    this.hierarchy = undefined;
    this.authorities = [];
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
    this.isAuth = false;
    this.anyAds = false;
    this.invalidCode = false;
    removeCookie('accessToken');
    removeCookie('refreshToken');
  };
}

export default new userStore();
