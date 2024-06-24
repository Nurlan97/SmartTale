import { useEffect } from 'react';

import Header from '../../components/Header/Header';
import VacancyList from '../../components/VacancyList/VacancyList';
import vacancyStore from '../../store/vacancyStore';
import styles from './organizationVacancy.module.scss';

const OrganizationVacancy = () => {
  useEffect(() => {
    vacancyStore.getPositions();
  }, []);
  return (
    <div className={styles.page}>
      <Header path={'Организация/Вакансии'} title={'Вакансии'} />
      <VacancyList />
    </div>
  );
};

export default OrganizationVacancy;
