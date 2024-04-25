import { ArrowLeft, ArrowLeftDouble, ArrowRight, ArrowRightDouble } from '../../assets';
import equipmentStore from '../../store/equipmentStore';
import servicesStore from '../../store/servicesStore';
import styles from './pageBtnGroup.module.scss';

interface IPagesBtnGroup {
  store: typeof equipmentStore | typeof servicesStore;
}

const PageBtnGroup = ({ store }: IPagesBtnGroup) => {
  const currPage = store.page;
  const limit = store.limit;
  const total = store.totalCards;
  const pages = [];
  const setPage = (page: number) => (event: any) => {
    store.setPage(page);
  };
  if (currPage > 2)
    pages.push(
      <button className={styles.arrow} onClick={setPage(1)}>
        <ArrowLeftDouble />
      </button>,
    );
  if (currPage > 1)
    pages.push(
      <button className={styles.arrow} onClick={setPage(currPage - 1)}>
        <ArrowLeft />
      </button>,
      <button className={styles.page} onClick={setPage(currPage - 1)}>
        {currPage - 1}
      </button>,
    );
  pages.push(
    <button disabled className={styles.currentPage}>
      {currPage}
    </button>,
  );

  if (currPage * limit < total) {
    pages.push(
      <button className={styles.page} onClick={setPage(currPage + 1)}>
        {currPage + 1}
      </button>,
    );
    if ((currPage + 1) * limit < total) {
      pages.push(
        <button className={styles.page} onClick={setPage(currPage + 2)}>
          {currPage + 2}
        </button>,
      );
    }

    pages.push(
      <button className={styles.arrow} onClick={setPage(currPage + 1)}>
        <ArrowRight />
      </button>,
    );
    if ((currPage + 2) * limit < total) {
      pages.push(
        <button className={styles.arrow} onClick={setPage(Math.ceil(total / limit))}>
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
