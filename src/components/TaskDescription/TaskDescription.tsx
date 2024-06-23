import { observer } from 'mobx-react-lite';

import { defaultImage, defaultPhoto } from '../../assets';
import { kanbanStore } from '../../store';
import { formatDate, toCamelCase } from '../../utils/helpers';
import styles from './taskDescription.module.scss';

enum Statuses {
  PENDING = 'Не подтвержден',
  NEW = 'В ожидании',
  IN_PROGRESS = 'В работе',
  CHECKING = 'Проверка',
  DISPATCHED = 'Отправка',
  ARRIVED = 'Прибыл',
  COMPLETED = 'Завершен',
  CANCELED = 'Отменен',
}
const TaskDescription = observer(() => {
  const description = kanbanStore.description?.data;
  const tabs: {
    tab: 'description' | 'contacts' | 'size' | 'employees';
    text: 'Описание' | 'Контакты' | 'Размеры' | 'Сотрудники';
  }[] = [
    { tab: 'description', text: 'Описание' },
    { tab: 'contacts', text: 'Контакты' },
    { tab: 'employees', text: 'Сотрудники' },
  ];
  if (description && 'size' in description && !!description.size)
    tabs.push({ tab: 'size', text: 'Размеры' });

  return (
    <>
      {description ? (
        <div className={styles.descriptionPopUp}>
          <div className={styles.images}>
            <img
              src={
                description.imageUrls[kanbanStore.descriptionExt.activeImg]
                  ? description.imageUrls[kanbanStore.descriptionExt.activeImg]
                  : defaultImage
              }
              alt=''
              className={styles.bigImage}
            />
            {description.imageUrls.map((img, ind) => {
              return (
                <button key={ind} onClick={kanbanStore.setImage(ind)}>
                  <img
                    className={
                      ind === kanbanStore.descriptionExt.activeImg
                        ? styles.smallImageActive
                        : styles.smallImage
                    }
                    src={img}
                    alt=''
                  />
                </button>
              );
            })}
          </div>

          <div className={styles.descriptionPart}>
            <div className={styles.descriptionHeader}>
              <div className={styles[toCamelCase(`description ${description.status}`)]}>
                {Statuses[description.status as keyof typeof Statuses]}
              </div>
              <div className={styles.orderStatus}>
                До {formatDate(description.deadlineAt)}
              </div>
            </div>
            <div className={styles.adTitle}>{description.title}</div>

            <div className={styles.tabsContainer}>
              {tabs.map((tab, ind) => {
                return (
                  <button
                    key={ind}
                    className={
                      kanbanStore.descriptionExt.activeTab === tab.tab
                        ? styles.tabActive
                        : styles.tab
                    }
                    onClick={kanbanStore.setActiveTab(tab.tab)}
                  >
                    {tab.text}
                  </button>
                );
              })}
            </div>
            <div className={styles.tabDescription}>
              {kanbanStore.descriptionExt.activeTab === 'contacts' && (
                <>
                  <p>
                    {description &&
                      'publisherPhone' in description &&
                      description.publisherPhone}
                  </p>
                  <p>{'publisherEmail' in description && description.publisherEmail}</p>
                </>
              )}
              {kanbanStore.descriptionExt.activeTab === 'description' && (
                <p>{description.description}</p>
              )}
              {kanbanStore.descriptionExt.activeTab === 'size' && (
                <p>{'size' in description && description.size}</p>
              )}
              {kanbanStore.descriptionExt.activeTab === 'employees' &&
                (description.employees.length > 0 ? (
                  <div className={styles.employeesList}>
                    {description.employees.map((employee) => {
                      return (
                        <div key={employee.userId} className={styles.employee}>
                          <div className={styles.employeeDescription}>
                            <img
                              className={styles.employeeAvatar}
                              src={employee.avatarUrl ? employee.avatarUrl : defaultPhoto}
                              alt=''
                            />
                            <div>{employee.name}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  'Нет назначенных сотрудников'
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.descriptionPopUp}>Загрузка</div>
      )}
    </>
  );
});

export default TaskDescription;
