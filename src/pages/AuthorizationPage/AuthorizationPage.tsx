import { observer } from 'mobx-react-lite';

import AuthorizationForm from '../../components/AuthorizationForm/AuthorizationForm';
import ConfirmationForm from '../../components/ConfirmationForm/ConfirmationForm';
import userStore from '../../store/userStore';
import AuthenticationWrapper from '../../UI/AuthenticationWrapper/AuthenticationWrapper';

const AuthorizationPage = observer(() => {
  const subtitleObject = {
    1: 'Введите вашу почту, чтобы войти в систему',
    2: 'Введите вашу почту, чтобы войти в систему',
    3: 'Отправлен 4-хзначный код на указанную почту',
    4: 'Пару секунд и вы в системе! 😃',
  };
  return (
    <AuthenticationWrapper
      title='Вход'
      subtitle={subtitleObject[userStore.authenticationStage]}
      isLoading={userStore.authenticationStage === 4}
    >
      {userStore.authenticationStage === 1 && <AuthorizationForm />}
      {userStore.authenticationStage === 3 && <ConfirmationForm />}
    </AuthenticationWrapper>
  );
});

export default AuthorizationPage;
