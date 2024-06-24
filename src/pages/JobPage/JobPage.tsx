import { observer } from 'mobx-react-lite';

import Grid from '../../components/Grid/Grid';
import Header from '../../components/Header/Header';
import useColumnsGrid from '../../hooks/useColumnsGrid';
import { jobStore } from '../../store';
import PageBtnGroup from '../../UI/PageBtnGroup/PageBtnGroup';
import ScrollableWrapper from '../../UI/ScrollableWrapper/ScrollableWrapper';
import styles from './jobPage.module.scss';

const JobPage = observer(() => {
  const columns = useColumnsGrid(jobStore.setLimit, 286, 24);
  return (
    <div className={styles.page}>
      <Header path='Маркетплейс/Услуги' title='Услуги' />
      <ScrollableWrapper>
        <Grid array={jobStore.data.content} columns={columns} />
        <PageBtnGroup store={jobStore} setPage={jobStore.setPage} />
      </ScrollableWrapper>
    </div>
  );
});

export default JobPage;
