import { makeAutoObservable } from 'mobx';

interface IRegistrationData {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
}

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

  constructor() {
    makeAutoObservable(this);
  }

  toggleRemember = () => {
    this.isRemember = !this.isRemember;
  };

  // fetchRegistration = async (registrationData: IRegistrationData) => {
  //   try {
  //     const response = await post('../', registrationData);

  //   } catch (error) {}
  // };
}

export default new userStore();
