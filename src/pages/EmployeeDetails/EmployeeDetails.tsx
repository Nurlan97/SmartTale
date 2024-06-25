import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useLayoutEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { ArrowLeft, defaultPhoto } from '../../assets';
import Header from '../../components/Header/Header';
import OrganizationTask from '../../components/OrganizationTask/OrganizationTask';
import { userStore } from '../../store';
import employeeStore from '../../store/employeeStore';
import Button from '../../UI/Button/Button';
import TabSwitch from '../../UI/TabSwitch/TabSwitch';
import styles from './employeeDetails.module.scss';

const EmployeeDetails = observer(() => {
  const { id } = useParams();
  useLayoutEffect(() => {
    employeeStore.getEmployeeDetails(Number(id));
  }, []);
  const navigate = useNavigate();
  const buttons: { tab: 'active' | 'history'; title: string }[] = [
    { tab: 'active', title: 'Текущие заказы' },
    { tab: 'history', title: 'Выполненные' },
  ];
  const employeeDetail = toJS(employeeStore.employeeDetail);
  const employee = employeeStore.findEmployee;

  return (
    <div className={styles.page}>
      <Header
        path={userStore.organization?.name ? userStore.organization.name : 'SmartTale'}
        title={'Сотрудники'}
      />
      <div className={styles.employee}>
        <Link to={'/employees'} className={styles.backLink}>
          <ArrowLeft className={styles.arrow} />
          {'Детали сотрудника'}
        </Link>
        <div className={styles.employeeDetails}>
          <img
            src={
              employeeDetail?.employee.avatarUrl
                ? employeeDetail?.employee.avatarUrl
                : defaultPhoto
            }
            alt=''
            className={styles.avatar}
          />
          <div className={styles.textDetails}>
            <div className={styles.name}>{employeeDetail?.employee.name}</div>
            <div className={styles.phone}>{employeeDetail?.employee.phoneNumber}</div>
            <div className={styles.position}>{employeeDetail?.employee.position}</div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <TabSwitch
            tabs={buttons}
            activeTab={employeeStore.employeeDetailExt.activeTab}
            switchFunc={(tab: 'history' | 'active') =>
              employeeStore.switchDetailsTab(tab)
            }
          />
          {userStore.authorities.includes('DELETE_EMPLOYEE') && (
            <>
              {employee?.status === 'Invited' && (
                <Button
                  color={'red'}
                  type={'button'}
                  height='40px'
                  handler={async () => {
                    try {
                      await employeeStore.revokeInvitation(employee.employeeId);
                      navigate(-1);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  Отозвать приглашение
                </Button>
              )}
              {employee?.status === 'Authorized' &&
                employeeDetail &&
                userStore.hierarchy !== undefined &&
                employeeDetail.employee.hierarchy > userStore.hierarchy &&
                employeeDetail.tasks.empty && (
                  <Button
                    color={'red'}
                    type={'button'}
                    height='40px'
                    handler={async () => {
                      try {
                        await employeeStore.deleteEmployee(employee.employeeId);
                        navigate(-1);
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    Удалить сотрдуника
                  </Button>
                )}
            </>
          )}
        </div>

        {employeeDetail?.tasks.content?.map((task) => {
          return <OrganizationTask task={task} key={task.orderId} id={Number(id)} />;
        })}
      </div>
    </div>
  );
});

export default EmployeeDetails;
