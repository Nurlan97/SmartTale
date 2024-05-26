import { observer } from 'mobx-react-lite';
import { CSSProperties, JSXElementConstructor, useRef, useState } from 'react';

import { Employee, OrderSummary, SmallOrder } from '../../api/data-contracts';
import { Asc, Desc, NoSort } from '../../assets';
import styles from './tableCustom.module.scss';
interface IHeader {
  name: string;
  title: string;
}
interface IStyle {
  [key: string]: (prop: any) => CSSProperties;
}
interface ITransform {
  [key: string]: (prop: string | number | OrderSummary[]) => string | JSX.Element[];
}
interface IProps {
  headers: IHeader[];
  rows: SmallOrder[] | Employee[];
  styling?: IStyle;
  transform?: ITransform;
  sorting?: ISorting;
  setSorting?: (column: string) => void;
  myRef?: React.RefObject<HTMLTableElement>;
}
const sortIcons = {
  asc: <Asc className={styles.sortIcon} />,
  desc: <Desc className={styles.sortIcon} />,
  noSort: <NoSort className={styles.sortIcon} />,
};

interface ISorting {
  [key: string]: 'noSort' | 'asc' | 'desc';
}

const TableCustom = observer(
  ({ headers, rows, styling, transform, sorting, setSorting, myRef }: IProps) => {
    return (
      <div className={styles.tableWrapper}>
        <table className={styles.table} ref={myRef}>
          <thead>
            <tr>
              {headers.map((header) => {
                return (
                  <th className={styles.header} key={header.name}>
                    <div className={styles.headerDiv}>
                      <button
                        className={styles.btn}
                        onClick={() => {
                          if (!sorting || !sorting[header.name]) return;
                          if (setSorting) setSorting(header.name);
                        }}
                      >
                        {header.title}
                        {sorting &&
                          sorting[header.name] &&
                          sortIcons[sorting[header.name]]}
                      </button>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={styles.tableContainer}>
            {rows &&
              rows.map((row, ind) => (
                <tr key={ind} className={styles.row}>
                  {headers.map((header) => {
                    const key = header.name as keyof typeof row;
                    return (
                      <td key={header.name} className={styles.cell}>
                        <div
                          style={
                            styling &&
                            styling[header.name] &&
                            styling[header.name](row[key])
                          }
                        >
                          {transform && transform[header.name]
                            ? transform[key](row[key])
                            : row[key]}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  },
);
export default TableCustom;
