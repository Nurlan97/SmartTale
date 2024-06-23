import { observer } from 'mobx-react-lite';
import { useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';

import { EmployeeSummary } from '../../api/data-contracts';
import { defaultImage, defaultPhoto } from '../../assets';
import Header from '../../components/Header/Header';
import { userStore } from '../../store';
import taskStore from '../../store/taskStore';
import Button from '../../UI/Button/Button';
import { formatDate, toCamelCase } from '../../utils/helpers';
import { createStyles } from '../../utils/selectHelpers';
import styles from './taskDetailedPage.module.scss';

const store = new taskStore();
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
type OptionType = {
  value: number;
  label: string;
  data: EmployeeSummary;
};
const TaskDetailedPage = observer(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  useLayoutEffect(() => {
    store.getTask(Number(id));
    store.getDDEmployees();
    console.log('new render');
  }, []);
  const task = store.task;
  const [isEdit, setIsEdit] = useState(false);
  const [addedEmployees, setAddedEmployees] = useState<EmployeeSummary[]>([]);
  const [removedEmployees, setRemovedEmployees] = useState<number[]>([]);
  const customStyles = createStyles<OptionType>(false);
  const options = store.employeesDD
    .filter((option) => {
      if (removedEmployees.some((id) => id === option.employeeId)) return true;
      return (
        !addedEmployees.some((employee) => employee.employeeId === option.employeeId) &&
        !(
          task && task.employees.some((employee) => employee.userId === option.employeeId)
        )
      );
    })
    .map((option) => {
      return {
        value: option.employeeId,
        label: `${option.position} - ${option.employeeName}`,
        data: option,
      };
    });

  if (task) {
    return (
      <div className={styles.page}>
        <Header path={''} title={'Подробности заказа'} />
        <div className={styles.wrapper}>
          <div className={styles.images}>
            <img
              className={styles.bigImage}
              src={
                task.imageUrls[store.detailedExt.activeImg]
                  ? task.imageUrls[store.detailedExt.activeImg]
                  : defaultImage
              }
              alt=''
            />
            {task.imageUrls.map((img, ind) => {
              return (
                <button key={ind} onClick={store.setImage(ind)}>
                  <img
                    className={
                      ind === store.detailedExt.activeImg
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
            <div className={styles.adTitle}>{`${task.key} / ${task.title}`}</div>
            <div className={styles.status}>
              <div className={styles[toCamelCase(task.status)]}>
                {Statuses[task.status as keyof typeof Statuses]}
              </div>
              <div className={styles.dates}>
                <div>{`Дата принятия: ${formatDate(task.acceptedAt)}`}</div>
                <div>{`Дедлайн: ${formatDate(task.deadlineAt)}`}</div>
              </div>
            </div>
            <div className={styles.title}>Заказчик:</div>
            <div className={styles.authorBlock}>
              <img
                className={styles.authorImg}
                src={task.publisherAvatarUrl ? task.publisherAvatarUrl : defaultPhoto}
                alt=''
              />
              <div className={styles.authorInfo}>
                <div className={styles.authorName}>Имя: {task.publisherName}</div>
                <div className={styles.authorName}>
                  Email: {task.publisherEmail ? task.publisherEmail : 'Не указан'}
                </div>
                <div className={styles.authorName}>
                  Телефон: {task.publisherPhone ? task.publisherPhone : 'Не указан'}
                </div>
              </div>
            </div>
            <div className={styles.title}>Описание:</div>
            <div className={styles.description}>{task.description}</div>
            <div className={styles.title}>Сотрудники:</div>
            <div className={styles.employees}>
              {isEdit ? (
                <div className={styles.edit}>
                  {!!task.employees.length && (
                    <div className={styles.employeesList}>
                      {task.employees.map((employee) => {
                        if (removedEmployees.includes(employee.userId)) {
                          console.log(removedEmployees);
                          return;
                        }

                        return (
                          <div key={employee.userId} className={styles.employee}>
                            <div className={styles.employeeInfo}>
                              <img
                                src={
                                  employee.avatarUrl ? employee.avatarUrl : defaultPhoto
                                }
                                alt=''
                                className={styles.employeeAvatar}
                              />
                              <div>{employee.name}</div>
                            </div>

                            <Button
                              color={'red'}
                              type={'button'}
                              height='32px'
                              handler={() => {
                                setRemovedEmployees([
                                  ...removedEmployees,
                                  employee.userId,
                                ]);
                              }}
                            >
                              Удалить
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {!!addedEmployees.length && (
                    <div className={styles.employeesList}>
                      {addedEmployees.map((employee, ind) => {
                        return (
                          <div key={employee.employeeId} className={styles.addedEmployee}>
                            <div className={styles.addedEmployeeText}>
                              <div>{employee.employeeName}</div>
                              <div>{employee.position}</div>
                            </div>

                            <Button
                              color={'red'}
                              type={'button'}
                              height='32px'
                              handler={() => {
                                setAddedEmployees((prev) => {
                                  const updatedEmployees = prev.filter(
                                    (_, index) => index !== ind,
                                  );
                                  return updatedEmployees;
                                });
                              }}
                            >
                              Удалить
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <Select
                    options={options}
                    onChange={(option) => {
                      if (!option) return;
                      console.log(option);
                      const removedId = removedEmployees.findIndex(
                        (id) => id === option.value,
                      );
                      if (removedId !== -1) {
                        setRemovedEmployees((prev) =>
                          prev.filter((_, ind) => ind !== removedId),
                        );
                        return;
                      }
                      setAddedEmployees((prev) => [
                        ...prev,
                        option.data as EmployeeSummary,
                      ]);
                    }}
                    isSearchable={options.length !== 0}
                    noOptionsMessage={() => 'Нет сотрудников для назначения'}
                    styles={customStyles}
                  />
                </div>
              ) : (
                <>
                  {task.employees.length !== 0 ? (
                    task.employees.map((employee) => {
                      return (
                        <div key={employee.userId} className={styles.employee}>
                          <div className={styles.employeeInfo}>
                            <img
                              src={employee.avatarUrl ? employee.avatarUrl : defaultPhoto}
                              alt=''
                              className={styles.employeeAvatar}
                            />
                            <div>{employee.name}</div>
                          </div>

                          <div className={styles.employeeSalary}>
                            {employee.reward} Сом
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className={styles.noEmployees}>Нет назначенных сотрудников</div>
                  )}
                </>
              )}
            </div>
            {task.status !== 'COMPLETED' &&
              task.status !== 'PENDING' &&
              userStore.authorities.includes('ASSIGN_EMPLOYEES') && (
                <div className={styles.btnGroup}>
                  {isEdit ? (
                    <>
                      <Button
                        color={'blue'}
                        type={'button'}
                        height='40px'
                        handler={() => {
                          store.updateTask({
                            taskId: Number(id),
                            addedEmployees: addedEmployees.map(
                              (employee) => employee.employeeId,
                            ),
                            removedEmployees: removedEmployees,
                          });
                          setIsEdit(false);
                          setAddedEmployees([]);
                          setRemovedEmployees([]);
                        }}
                      >
                        Сохранить изменения
                      </Button>
                      <Button
                        color={'red'}
                        type={'button'}
                        height='40px'
                        handler={() => {
                          setIsEdit(false);
                          setAddedEmployees([]);
                          setRemovedEmployees([]);
                        }}
                      >
                        Отменить
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        color={'orange'}
                        type={'button'}
                        height='40px'
                        handler={() => {
                          navigate(-1);
                          store.removeTask();
                        }}
                      >
                        Назад
                      </Button>
                      <Button
                        color={'blue'}
                        type={'button'}
                        height='40px'
                        handler={() => {
                          setIsEdit(true);
                        }}
                      >
                        Назначить сотрудников
                      </Button>
                    </>
                  )}
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
  return <div>Загрузка</div>;
});

export default TaskDetailedPage;
