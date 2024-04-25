import { observer } from 'mobx-react-lite';

import ConfirmationForm from '../../components/ConfirmationForm/ConfirmationForm';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import userStore from '../../store/userStore';
import AuthenticationWrapper from '../../UI/AuthenticationWrapper/AuthenticationWrapper';

const RegistrationPage = observer(() => {
  const subtitleObject = {
    1: 'Введите ваши ФИО и почту, чтобы войти в систему',
    2: 'Отправлен 4-хзначный код на указанную почту',
    3: 'Пару секунд и вы в системе! 😃',
  };
  return (
    <AuthenticationWrapper
      title='Регистрация'
      subtitle={subtitleObject[userStore.authenticationStage]}
      isLoading={userStore.authenticationStage === 3}
    >
      {userStore.authenticationStage === 1 && <RegistrationForm />}
      {userStore.authenticationStage === 2 && <ConfirmationForm />}
    </AuthenticationWrapper>
  );
});

export default RegistrationPage;
