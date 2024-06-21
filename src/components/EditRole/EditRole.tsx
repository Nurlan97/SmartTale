import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import * as yup from 'yup';

import { PositionDto } from '../../api/data-contracts';
import { userStore } from '../../store';
import rolesStore from '../../store/rolesStore';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import styles from './editRole.module.scss';
type Props = { position?: PositionDto };

const EditRole = observer(({ position }: Props) => {
  const userHierarchy = userStore.hierarchy !== undefined ? userStore.hierarchy : 99999;
  const positionHierarchy = position?.hierarchy !== undefined ? position.hierarchy : 0;
  const isEditable =
    userHierarchy < positionHierarchy &&
    userStore.authorities.includes('UPDATE_POSITION');

  const [isEdit, setIsEdit] = useState(!position);
  const navigate = useNavigate();
  const availableHierarchy = Array.from(
    { length: 10 },
    (v, i) => Number(userStore.hierarchy) + 1 + i,
  );
  const formik = useFormik({
    initialValues: {
      title: position ? position.title : '',
      roles: position ? position.authorities : [],
      hierarchy: position ? position.hierarchy : availableHierarchy[0],
    },
    onSubmit: (values) => {
      console.log(values);
      if (position) {
        rolesStore.updatePostiion({
          positionId: position.positionId,
          title: values.title,
          hierarchy: values.hierarchy,
          authorities: values.roles,
          organizationId: Number(userStore.orgId),
        });
      } else {
        rolesStore.createPosition({
          title: values.title,
          hierarchy: values.hierarchy,
          authorities: values.roles,
          organizationId: Number(userStore.orgId),
        });
      }
      navigate(-1);
    },
  });
  const roles = [
    { title: 'Создание заказа', value: 'CREATE_ORDER' },
    { title: 'Создание и выдача Роли', value: 'CREATE_POSITION' },
    { title: 'Изменение прав доступа у ролей', value: 'UPDATE_POSITION' },
    { title: 'Добавление работника', value: 'INVITE_EMPLOYEE' },
    { title: 'Назначение работника', value: 'ASSIGN_EMPLOYEES' },
    { title: 'Изменение статуса заказа до проверки', value: 'UPDATE_STATUS_TO_CHECKING' },
    {
      title: 'Изменение статуса заказа от проверки',
      value: 'UPDATE_STATUS_FROM_CHECKING',
    },
    { title: 'Удаление заказа', value: 'DELETE_ORDER' },
    { title: 'Удаление работника', value: 'DELETE_EMPLOYEE' },
    { title: 'Удаление роли', value: 'DELETE_POSITION' },
  ];

  return (
    <div className={styles.wrapper}>
      <form onSubmit={formik.handleSubmit}>
        <Input
          onChange={formik.handleChange}
          value={formik.values.title}
          id='title'
          label='Название должности'
          disabled={!isEdit}
        />
        <div className={styles.title}>Уровень иерархии</div>
        <Select
          className={styles.select}
          options={availableHierarchy.map((option) => {
            return {
              value: option,
              label: option,
            };
          })}
          onChange={(option: any) => {
            formik.setFieldValue('hierarchy', option.value);
          }}
          defaultValue={formik.values.hierarchy}
          isSearchable={false}
          isDisabled={!isEdit}
        />
        <div className={styles.title}>Выдача прав доступа</div>
        {roles.map((role) => (
          <div key={role.value}>
            <input
              className={styles.customCheckbox}
              type='checkbox'
              id={role.value}
              name='roles'
              value={role.value}
              onChange={formik.handleChange}
              checked={formik.values.roles.includes(role.value)}
              disabled={!isEdit}
            />
            <label htmlFor={role.value}>{role.title}</label>
          </div>
        ))}
      </form>
      <div className={styles.footer}>
        <div className={styles.horizontalLine}></div>
        <div className={styles.buttons}>
          <Button
            color={'white'}
            type={'button'}
            handler={() => {
              navigate(-1);
              rolesStore.deletePosition();
            }}
          >
            Назад
          </Button>

          {!position ? (
            <Button
              color={'blue'}
              type={'submit'}
              handler={formik.handleSubmit}
              disabled={!formik.values.title}
            >
              Добавить должность
            </Button>
          ) : isEditable ? (
            isEdit ? (
              <Button color={'blue'} type={'button'} handler={() => setIsEdit(false)}>
                Сохранить
              </Button>
            ) : (
              <Button color={'blue'} type={'button'} handler={() => setIsEdit(true)}>
                Редактировать
              </Button>
            )
          ) : (
            <>Нет прав на редактирование</>
          )}
        </div>
      </div>
    </div>
  );
});

export default EditRole;
