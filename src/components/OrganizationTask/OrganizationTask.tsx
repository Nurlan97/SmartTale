import { Task } from '../../api/data-contracts';
import { defaultPhoto } from '../../assets';
import employeeStore from '../../store/employeeStore';
import Button from '../../UI/Button/Button';
import { formatDate } from '../../utils/helpers';
import styles from './organizationTask.module.scss';
type Props = { task: Task; id: number };

const OrganizationTask = ({ task, id }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <div className={styles.headerKey}>{`Заказ №${task.key}`}</div>
          <div className={styles.headerTitle}>{task.title}</div>
          <div className={styles.headerDescription}>{task.description}</div>
          <div className={styles.headerPrice}>{`${task.price} сом`}</div>
        </div>
        {task.status === 'COMPLETED' ? (
          <div
            className={styles.headerDateCompleted}
          >{`Выполнен ${formatDate(task.date)}`}</div>
        ) : task.status === 'CANCELED' ? (
          <div className={styles.headerDateAccept}>
            {`Отклонен ${formatDate(task.date)}`}
          </div>
        ) : (
          <div
            className={styles.headerDateAccept}
          >{`Принят ${formatDate(task.date)}`}</div>
        )}
      </div>
      <div className={styles.horizontalLine}></div>
      <div>
        <div className={styles.smallTitle}>Сотрудники</div>
        <div className={styles.employees}>
          {task.employees.map((employee) => {
            return (
              <div key={employee.userId} className={styles.person}>
                <img
                  src={employee.avatarUrl ? employee.avatarUrl : defaultPhoto}
                  alt=''
                  className={styles.avatar}
                />
                <div>
                  <div className={styles.name}>{employee.name}</div>
                  <div className={styles.reward}>{`ЗП ${employee.reward} сом`}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.horizontalLine}></div>
      <div>
        <div className={styles.smallTitle}>Заказчик</div>
        <div className={styles.person}>
          <img
            src={task.publisherAvatarUrl ? task.publisherAvatarUrl : defaultPhoto}
            alt=''
            className={styles.avatar}
          />
          <div>
            <div className={styles.name}>{task.publisherName}</div>
            <div className={styles.phone}>{task.publisherPhoneNumber}</div>
          </div>
        </div>
      </div>
      {(task.status !== 'CANCELED' || 'COMPLETED') && (
        <div className={styles.footer}>
          <div className={styles.horizontalLine}></div>
          <Button
            color={'blue'}
            type={'button'}
            height='40px'
            handler={() => employeeStore.removeEmployeeFromTask(task.orderId, id)}
          >
            Остранить от заказа
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrganizationTask;
