import { IInital } from '../../pages/AdminOrganizationPage/AdminOrganizationPage';
import Button from '../../UI/Button/Button';
import CreateOrganization from '../CreateOrganization/CreateOrganization';
import styles from './EmptyPageMessage.module.scss';

interface IEmptyPageMessage {
  smile: string;
  title: string;
  subtitle?: string;
  button: string;
  editOrganization: boolean;
  setEditOrganization?: React.Dispatch<React.SetStateAction<boolean>>;
  initialValues: IInital;
  submitBtn: string;
}

const EmptyPageMessage = ({
  smile,
  title,
  subtitle,
  button,
  editOrganization,
  setEditOrganization,
  initialValues,
  submitBtn,
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
            <div className={styles.smile}>{smile}</div>
            <h1 className={styles.title}>{title}</h1>

            <h2 className={styles.subtitle}>{subtitle}</h2>
            <Button color='blue' type='button' handler={handleCreateBtn}>
              {button}
            </Button>
          </div>
        </div>
      )}
      {editOrganization && (
        <CreateOrganization initialValues={initialValues} submitBtn={submitBtn} />
      )}
    </>
  );
};

export default EmptyPageMessage;
