import { makeAutoObservable } from 'mobx';
import { fromPromise } from 'mobx-utils';
import { useNavigate } from 'react-router-dom';

import { RegistrationRequest, VerificationRequest } from '../api/data-contracts';
import { MyApi } from '../api/V1';

const navigate = useNavigate();
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

  constructor() {
    makeAutoObservable(this);
  }

  toggleRemember = () => {
    this.isRemember = !this.isRemember;
  };

  fetchRegistration = async (registrationData: RegistrationRequest) => {
    //Можно писать стандартно через try/catch
    try {
      api.register(registrationData);
      this.authenticationStage = 2;
    } catch (error) {
      console.log(error);
    }
  };
  sendVerificationCode = async (data: VerificationRequest) => {
    const result = fromPromise(api.verifyEmail(data)); //можно использовать fromPromise из mobx-utils
    result.case({
      pending: () => {
        this.authenticationStage = 3; //включаем лоадер
      },
      rejected: (error) => {
        this.authenticationStage = 2; //если ошибка возврашаем на ввод кода
        console.log(error);
      },
      fulfilled: (value) => {
        console.log(value);
        navigate('/equipment'); //если все норм, редиректим напримре на маркетплейс
      },
    });
  };
}

export default new userStore();
