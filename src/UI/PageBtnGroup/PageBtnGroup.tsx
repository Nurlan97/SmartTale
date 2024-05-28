import { ArrowLeft, ArrowLeftDouble, ArrowRight, ArrowRightDouble } from '../../assets';
import { appStore } from '../../store';
import equipmentStore from '../../store/equipmentStore';
import servicesStore from '../../store/servicesStore';
import styles from './pageBtnGroup.module.scss';

interface IPagesBtnGroup {
  store: typeof equipmentStore | typeof servicesStore | typeof appStore.myBuys;
  setPage: (page: number) => void;
}

const PageBtnGroup = ({ store, setPage }: IPagesBtnGroup) => {
  const currPage = store.data.number;
  const limit = store.data.size;
  const total = store.data.totalPages;
  const pages = [];

  if (currPage > 1)
    pages.push(
      <button className={styles.arrow} onClick={() => setPage(0)}>
        <ArrowLeftDouble />
      </button>,
    );
  if (currPage > 0)
    pages.push(
      <button className={styles.arrow} onClick={() => setPage(currPage - 1)}>
        <ArrowLeft />
      </button>,
      <button className={styles.page} onClick={() => setPage(currPage - 1)}>
        {currPage - 1}
      </button>,
    );
  pages.push(
    <button disabled className={styles.currentPage}>
      {currPage}
    </button>,
  );

  if (total !== 0 && currPage + 1 < total) {
    pages.push(
      <button className={styles.page} onClick={() => setPage(currPage + 1)}>
        {currPage + 1}
      </button>,
    );
    if (currPage + 2 < total) {
      pages.push(
        <button className={styles.page} onClick={() => setPage(currPage + 2)}>
          {currPage + 2}
        </button>,
      );
    }

    pages.push(
      <button className={styles.arrow} onClick={() => setPage(currPage + 1)}>
        <ArrowRight />
      </button>,
    );
    if (currPage + 3 < total) {
      pages.push(
        <button className={styles.arrow} onClick={() => setPage(total - 1)}>
          <ArrowRightDouble />
        </button>,
      );
    }
  }
  return (
    <div className={styles.wrapper}>
      {pages.map((btn, ind) => (
        <div key={ind}>{btn}</div>
      ))}
    </div>
  );
};

export default PageBtnGroup;
