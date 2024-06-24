import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';

import organizationOrderStore from '../../store/organizationOrderStore';
import Button from '../../UI/Button/Button';
import DateRangeCustomInput from '../../UI/DateRangeCustomInput/DateRangeCustomInput';
import TabSwitch from '../../UI/TabSwitch/TabSwitch';
import { formatDate } from '../../utils/helpers';
import AdRow from '../AdRow/AdRow';
import CreateOrganization from '../CreateOrganization/CreateOrganization';
import DropDownFilterDate from '../DropDownFilterDate/DropDownFilterDate';
import { IInital } from '../EmptyPageMessage/EmptyPageMessage';
import styles from './AdminOrderAndEmployeeDashboard.module.scss';

type Props = {
  editOrganization: boolean;
  setEditOrganization?: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdminOrderAndEmployeeDashboard = observer(
  ({ editOrganization, setEditOrganization }: Props) => {
    const tableRef = useRef<HTMLTableElement>(null);

    const editOrganizationForm: IInital = {
      name: organizationOrderStore.myOrganization.name,
      description: organizationOrderStore.myOrganization.description,
      logo: organizationOrderStore.myOrganization.logoUrl,
    };

    const handleEditButton = () => {
      if (setEditOrganization) {
        setEditOrganization(true);
      }
    };

    useEffect(() => {
      organizationOrderStore.getOrders();
      organizationOrderStore.getMyOrganization();
    }, []);

    return (
      <div className={styles.wrapper}>
        {!editOrganization && (
          <>
            <div className={styles.logoWrapper}>
              <div className={styles.logoHeader}>
                {organizationOrderStore.myOrganization.logoUrl ? (
                  <img
                    className={styles.logo}
                    src={organizationOrderStore.myOrganization.logoUrl}
                    alt='organization logo'
                  />
                ) : (
                  <div className={styles.logo}>ST</div>
                )}{' '}
                <div className={styles.companyDescription}>
                  <div>
                    {' '}
                    <h1 className={styles.title}>
                      {organizationOrderStore.myOrganization.name}
                    </h1>
                    <div className={styles.description}>
                      {organizationOrderStore.myOrganization.description}
                    </div>
                  </div>

                  <div className={styles.organizationEstablishedDate}>
                    Создан{' '}
                    {formatDate(organizationOrderStore.myOrganization.registeredAt)}
                  </div>
                </div>
              </div>
              <div className={styles.editBtn}>
                <Button color='blue' type='button' handler={handleEditButton}>
                  Редактировать
                </Button>
              </div>
            </div>
            <div className={styles.btnGroup}>
              <div className={styles.btnList}>
                <TabSwitch
                  tabs={[
                    { tab: 'active', title: 'Текущие' },
                    { tab: 'completed', title: 'Завершенные' },
                  ]}
                  activeTab={organizationOrderStore.activeTab}
                  switchFunc={(tab: 'active' | 'completed') =>
                    organizationOrderStore.setActiveTab(tab)
                  }
                />
              </div>
              <div className={styles.filterBtnGrp}>
                <DropDownFilterDate
                  tableRef={tableRef}
                  setDate={organizationOrderStore.setDateRange}
                  filter={organizationOrderStore.dateFilter.currentType}
                  setFilter={organizationOrderStore.setFilter}
                />
                <div>
                  <DatePicker
                    selectsRange={true}
                    startDate={organizationOrderStore.dateFilter.from}
                    endDate={organizationOrderStore.dateFilter.to}
                    onChange={(update) => {
                      organizationOrderStore.setDateRange(update);
                    }}
                    customInput={<DateRangeCustomInput />}
                    locale='ru'
                  />
                </div>
              </div>
            </div>
            <div className={styles.list}>
              {organizationOrderStore.data &&
                organizationOrderStore.data.content &&
                organizationOrderStore.data.content.map((item, index) => (
                  <AdRow key={index} item={item}>
                    {item.price}
                  </AdRow>
                ))}
            </div>
          </>
        )}
        {editOrganization && (
          <CreateOrganization
            initialValues={editOrganizationForm}
            submitBtn={'Сохранить изменения'}
            cancelBtn={'Отменить'}
            setEditOrganization={setEditOrganization}
          />
        )}
      </div>
    );
  },
);

export default AdminOrderAndEmployeeDashboard;
