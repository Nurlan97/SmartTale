import { useDraggable } from '@dnd-kit/core';
import { observer } from 'mobx-react-lite';

import { MonitoringOrder, OrderDashboard } from '../../../api/data-contracts';
import { Clock, defaultPhoto } from '../../../assets';
import { kanbanStore } from '../../../store';
import { cutText, formatDate, toCamelCase } from '../../../utils/helpers';
import styles from './orderCard.module.scss';

interface Props {
  order: OrderDashboard;
}
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
const OrderCard = observer(({ order }: Props) => {
  const description =
    kanbanStore.description?.data &&
    kanbanStore.description?.data.orderId === order.id &&
    kanbanStore.description?.data;
  const tabs: {
    tab: 'description' | 'contacts' | 'size';
    text: 'Описание' | 'Контакты' | 'Размеры';
  }[] = [
    { tab: 'description', text: 'Описание' },
    { tab: 'contacts', text: 'Контакты' },
  ];
  if (description && 'size' in description && !!description.size)
    tabs.push({ tab: 'size', text: 'Размеры' });
  const mouseEnterHandler = () => {
    kanbanStore.showDescription(order.id);
  };
  const mouseLeaveHandler = () => {
    kanbanStore.showDescription(null);
  };

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: order.id,
    data: {
      type: 'Order',
      order,
    },
  });

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        className={styles[toCamelCase(order.status)]}
        {...listeners}
        {...attributes}
      ></div>
    );
  } else {
    if (
      order.status === 'PENDING' ||
      order.status === 'DISPATCHED' ||
      order.status === 'ARRIVED'
    ) {
      return (
        <div
          className={styles.notDruggable}
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
        >
          <div>{order.title}</div>
          <div className={styles.description}>{cutText(order.comment, 60)}</div>
          <div className={styles.date}>
            <Clock /> <p>{formatDate(order.deadlineAt)}</p>
          </div>
          {description && (
            <div className={styles.descriptionPopUp}>
              <div className={styles.images}>
                <img
                  src={description.imageUrls[kanbanStore.descriptionExt.activeImg]}
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
                <div>
                  <div className={styles.descriptionHeader}>
                    <div className={styles[toCamelCase(`description ${order.status}`)]}>
                      {Statuses[order.status as keyof typeof Statuses]}
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
                        <p>
                          {'publisherEmail' in description && description.publisherEmail}
                        </p>
                      </>
                    )}
                    {kanbanStore.descriptionExt.activeTab === 'description' && (
                      <p>{description.description}</p>
                    )}
                    {kanbanStore.descriptionExt.activeTab === 'size' && (
                      <p>{'size' in description && description.size}</p>
                    )}
                  </div>
                </div>

                <div className={styles.footer}>
                  <div>Сотрудники</div>
                  {description.employees.length > 0
                    ? description.employees.map((employee, ind) => {
                        return (
                          <div key={ind} className={styles.employee}>
                            <img
                              className={styles.employeeAvatar}
                              src={employee.avatarUrl ? employee.avatarUrl : defaultPhoto}
                              alt=''
                            />
                            <div className={styles.employeeName}>{employee.name}</div>
                          </div>
                        );
                      })
                    : 'Нет назначенных сотрудников'}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div ref={setNodeRef} className={styles.wrapper} {...listeners} {...attributes}>
          <div>{order.title}</div>
          <div className={styles.description}>{cutText(order.comment, 60)}</div>
          <div className={styles.date}>
            <Clock /> <p>{formatDate(order.deadlineAt)}</p>
          </div>
          {/* {showDescription && <div>Test</div>} */}
        </div>
      );
    }
  }
});

export default OrderCard;
