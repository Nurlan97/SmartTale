import { useState } from 'react';
import Select, { StylesConfig } from 'react-select';

import { ArrowLeft, ArrowRight } from '../../../assets';
import styles from './tablePagesGroup.module.scss';
interface IPagesBtnGroup {
  currPage: number;
  total: number;
  setPage: (page: number) => void;
}
const TablePagesGroup = ({ currPage, total, setPage }: IPagesBtnGroup) => {
  console.log(currPage, total);
  // const [currPage, setCurrPage] = useState(0);
  // const [total, setTotal] = useState(6);
  // const setPage = (page: number) => {
  //   setCurrPage(page);
  // };

  const availablePages = Array.from({ length: total }, (v, i) => {
    return { value: i, label: i + 1 };
  });
  type OptionType = {
    value: string;
    label: string;
  };
  const customStyles: StylesConfig<OptionType, false> = {
    option: (provided, state) => ({
      ...provided,
      textAlign: 'left',
      color: 'black',
      backgroundColor: state.isSelected ? '#FC0' : 'white',
      '&:hover': {
        backgroundColor: state.isSelected ? '#FC0' : 'rgba(255, 200, 0, 0.2)',
      },
    }),
    menu: (provided) => ({
      ...provided,
      // borderRadius: 8,
      marginLeft: 1,
      overflow: 'hidden',
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
    }),
    control: (baseStyles) => ({
      ...baseStyles,
      marginLeft: 1,
      textAlign: 'left',
      minWidth: 50,

      borderColor: 'white',
      boxShadow: 'none',
      // borderRadius: 8,
      '&:hover': {
        borderColor: '#FCA',
        boxShadow: '0 0 0 1px #FCA',
      },
    }),
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.btnGroup}>
        <button
          className={styles.arrowLeft}
          onClick={() => setPage(Number(currPage) - 1)}
          disabled={currPage < 1}
        >
          <ArrowLeft />
        </button>
        <Select
          options={availablePages}
          onChange={(option: any) => {
            setPage(option.value);
          }}
          value={{
            value: currPage,
            label: currPage + 1,
          }}
          styles={customStyles}
        />
        <button
          className={styles.arrowRight}
          onClick={() => setPage(Number(currPage) + 1)}
          disabled={currPage >= total - 1}
        >
          <ArrowRight />
        </button>
      </div>

      <div>{`всего: ${total}`}</div>
    </div>
  );
};

export default TablePagesGroup;
