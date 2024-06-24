import { FormikErrors, FormikProps, FormikState } from 'formik';
import { observer } from 'mobx-react-lite';

import { CreateProductRequest } from '../../../api/data-contracts';
import { typePlaceAdvStore, userStore } from '../../../store';
import ImageInput from '../../../UI/ImageInput/ImageInput';
import Input from '../../../UI/Input/Input';
import SortableImageInput from '../../../UI/SortableImageInput/SortableImageInput';
import TabSwitch from '../../../UI/TabSwitch/TabSwitch';
import Textarea from '../../../UI/Textarea/Textarea';
import ImageModal from '../../ImageModal/ImageModal';
import styles from './productForm.module.scss';

type Props = {
  store: typePlaceAdvStore;
  values: CreateProductRequest;
  handleChange: (e: React.ChangeEvent<any>) => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void | FormikErrors<CreateProductRequest>>;
  isEdit?: boolean;
};

const ProductForm = observer(
  ({ values, handleChange, store, setFieldValue, isEdit = true }: Props) => {
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>{`Информация об оборудовании`}</div>
        <Input
          onChange={handleChange}
          value={values.title}
          required={true}
          label='Название'
          width='100%'
          id='title'
          disabled={!isEdit}
        />
        <div className={styles.helper}>максимум 250 символов, минимум 5</div>
        <Textarea
          onChange={handleChange}
          value={values.description}
          required={true}
          label='Описание'
          width='100%'
          id='description'
          disabled={!isEdit}
        />
        <div className={styles.helper}>максимум 1000 символов, минимум 5</div>

        <Input
          onChange={(e) => {
            const regex = new RegExp(/^\+?[0-9]*$/);
            if (!regex.test(e.target.value)) return;
            handleChange(e);
          }}
          value={String(values.price ? values.price : '')}
          label='Стоимость в cомах'
          placeholder='Не указана'
          width='100%'
          id='price'
          disabled={!isEdit}
        />

        <Input
          onChange={(e) => {
            const regex = new RegExp(/^\+?[0-9]*$/);
            if (!regex.test(e.target.value)) return;
            handleChange(e);
          }}
          value={String(values.quantity ? values.quantity : '')}
          placeholder='Укажите количество'
          label='Количество'
          width='100%'
          id='quantity'
          required={true}
          disabled={!isEdit}
        />

        <div className={styles.title}>Галерея фотографий</div>
        {/* <ImageInput store={store} disabled={!isEdit} />
         */}
        <SortableImageInput store={store} disabled={!isEdit} />
        <div className={styles.title}>
          Выберите какую контактную информацию показывать в объявлении
        </div>
        <div className={styles.contactsWrapper}>
          <div className={styles.contactsGrp}>
            <span
              className={
                values.contactInfo.includes('PHONE')
                  ? styles.contactsItemActive
                  : styles.contactsItem
              }
            >
              {userStore.phone}
            </span>
            <span
              className={
                values.contactInfo.includes('EMAIL')
                  ? styles.contactsItemActive
                  : styles.contactsItem
              }
            >
              {userStore.email}
            </span>
          </div>
          <TabSwitch
            tabs={[
              { tab: 'PHONE', title: 'Телефон' },
              { tab: 'EMAIL', title: 'E-mail' },
              { tab: 'EMAIL_PHONE', title: 'Оба' },
            ]}
            activeTab={values.contactInfo}
            switchFunc={(tab: any) => () => {
              setFieldValue('contactInfo', tab);
            }}
            disabled={!isEdit}
          />
        </div>
      </div>
    );
  },
);

export default ProductForm;
