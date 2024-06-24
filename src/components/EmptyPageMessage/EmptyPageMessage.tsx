import Button from '../../UI/Button/Button';
import CreateOrganization from '../CreateOrganization/CreateOrganization';
import styles from './EmptyPageMessage.module.scss';

interface IEmptyPageMessage {
  editOrganization: boolean;
  setEditOrganization?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IInital {
  name: string;
  description: string;
  logo?: string;
}
const emptyForm: IInital = {
  name: '',
  description: '',
  logo: '',
};

const EmptyPageMessage = ({
  editOrganization,
  setEditOrganization,
}: IEmptyPageMessage) => {
  const handleCreateBtn = () => {
    if (setEditOrganization) {
      setEditOrganization(true);
    }
  };
  return (
    <>
      {!editOrganization && (
        <div className={styles.wrapper}>
          <div className={styles.innerBlock}>
            <div className={styles.smile}>🙂</div>
            <h1 className={styles.title}>Тут еще нет организаций</h1>

            <h2 className={styles.subtitle}>
              Создайте свою организацию и добавьте своих сотруднико
            </h2>
            <Button color='blue' type='button' handler={handleCreateBtn}>
              Создать
            </Button>
          </div>
        </div>
      )}
      {editOrganization && (
        <CreateOrganization initialValues={emptyForm} submitBtn={'Cоздать организацию'} />
      )}
    </>
  );
};

export default EmptyPageMessage;
