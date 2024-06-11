import { FormikErrors } from 'formik';

import { CreateProductRequest } from '../../api/data-contracts';
import styles from './tabSwitch.module.scss';

type Props = {
  tabs: { tab: string; title: string }[];
  activeTab: string;
  switchFunc: (tab: any) => () => Promise<void> | void;
  disabled?: boolean;
};
const TabSwitch = ({ tabs, activeTab, switchFunc, disabled = false }: Props) => {
  return (
    <div className={styles.switchBtnGroup}>
      {tabs.map((tab, ind) => {
        return (
          <button
            disabled={disabled}
            key={ind}
            className={activeTab === tab.tab ? styles.switchBtnActive : styles.switchBtn}
            onClick={switchFunc(tab.tab)}
            type='button'
          >
            {tab.title}
          </button>
        );
      })}
    </div>
  );
};

export default TabSwitch;
