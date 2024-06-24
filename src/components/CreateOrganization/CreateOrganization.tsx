import { useFormik } from 'formik';

import { userStore } from '../../store';
import modalStore, { Modals } from '../../store/modalStore';
import organizationOrderStore from '../../store/organizationOrderStore';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Textarea from '../../UI/Textarea/Textarea';
import { nameSchema } from '../../utils/nameSchema';
import { descriptionSchema } from '../../utils/yupShemas';
import { IInital } from '../EmptyPageMessage/EmptyPageMessage';
import OrganizationLogoInput from '../OrganizationLogoInput/OrganizationLogoInput';
import styles from './CreateOrganization.module.scss';

type Props = {
  initialValues: IInital;
  submitBtn: string;
  cancelBtn?: string;
  setEditOrganization?: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateOrganization = ({
  initialValues,
  submitBtn,
  cancelBtn,
  setEditOrganization,
}: Props) => {
  const schema = nameSchema.concat(descriptionSchema);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: ({ name, description }) => {
      schema
        .validate({ name, description }, { abortEarly: false })
        .then(() => {
          userStore.orgId
            ? organizationOrderStore.updateOrganization({ name, description })
            : organizationOrderStore.createOrganization({ name, description });
          formik.resetForm();
        })
        .catch((e) => {
          console.log(e);
          modalStore.openModal(Modals.errorValidation);
        });
    },
  });

  const handleCancelBtn = () => {
    if (setEditOrganization) {
      setEditOrganization(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <div className={styles.formBody}>
        <div className={styles.imageInputWrapper}>
          <div className={styles.logoTitle}>Ваш логотип</div>
          <OrganizationLogoInput />
        </div>
        <div className={styles.inputsWrapper}>
          <div className={styles.inputsTitle}>Создание организации</div>
          <div className={styles.inputWrapper}>
            <Input
              onChange={formik.handleChange}
              value={formik.values.name}
              required={true}
              label='Название'
              width='100%'
              id='name'
            />
            <div className={styles.helper}>максимум 250 символов, минимум 5</div>
          </div>
          <div className={styles.inputWrapper}>
            <Textarea
              onChange={formik.handleChange}
              value={formik.values.description}
              required={true}
              label='Описание'
              width='100%'
              id='description'
              height='132px'
            />
            <div className={styles.helper}>максимум 1000 символов, минимум 5</div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.horizontalLine}></div>
        {
          <div className={styles.footerBtnGroup}>
            {cancelBtn && (
              <Button color='red' type='button' width='238px' handler={handleCancelBtn}>
                {cancelBtn}
              </Button>
            )}
            <Button
              color='blue'
              type='submit'
              disabled={!formik.values.name || !formik.values.description}
              width='238px'
            >
              {submitBtn}
            </Button>
          </div>
        }
      </div>
    </form>
  );
};

export default CreateOrganization;
