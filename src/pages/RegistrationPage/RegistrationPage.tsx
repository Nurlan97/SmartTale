import { observer } from 'mobx-react-lite';

import ConfirmationForm from '../../components/ConfirmationForm/ConfirmationForm';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import { userStore } from '../../store';
import AuthenticationWrapper from '../../UI/AuthenticationWrapper/AuthenticationWrapper';

const RegistrationPage = observer(() => {
  console.log('Registration Page render');
  const subtitleObject = {
    1: 'Введите ваши ФИО и почту, чтобы войти в систему',
    2: 'Введите ваши ФИО и почту, чтобы войти в систему',
    3: 'Отправлен 4-хзначный код на указанную почту',
    4: 'Пару секунд и вы в системе! 😃',
  };
  return (
    <AuthenticationWrapper
      title='Регистрация'
      subtitle={subtitleObject[userStore.authenticationStage]}
      isLoading={userStore.authenticationStage === 4}
    >
      {(userStore.authenticationStage === 1 || userStore.authenticationStage === 2) && (
        <RegistrationForm />
      )}
      {userStore.authenticationStage === 3 && <ConfirmationForm />}
    </AuthenticationWrapper>
  );
});

export default RegistrationPage;
