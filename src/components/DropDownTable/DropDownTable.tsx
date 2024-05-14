import { useEffect, useRef, useState } from 'react';

import { ArrowRight, Asc, Desc } from '../../assets';
import styles from './dropDownTable.module.scss';

interface DropdownProps {
  tableRef: React.RefObject<HTMLTableElement>;
}
const DropDownTable = ({ tableRef }: DropdownProps) => {
  type Option =
    | 'PENDING'
    | 'NEW'
    | 'IN_PROGRESS'
    | 'CHECKING'
    | 'DISPATCHED'
    | 'ARRIVED'
    | 'COMPLETED'
    | 'CANCELED';
  const options: Option[] = [
    'PENDING',
    'NEW',
    'IN_PROGRESS',
    'CHECKING',
    'DISPATCHED',
    'ARRIVED',
    'COMPLETED',
    'CANCELED',
  ];
  const dropdownRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    PENDING: false,
    NEW: false,
    IN_PROGRESS: false,
    CHECKING: false,
    DISPATCHED: false,
    ARRIVED: false,
    COMPLETED: false,
    CANCELED: false,
  });

  const toggleFilters = () => setIsFilterOpen((prev) => !prev);
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    setIsFilterOpen(false);
  };
  const toggleCheckbox = (option: Option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };
  useEffect(() => {
    if (isOpen && dropdownRef.current && tableRef.current) {
      const tableRect = tableRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      if (dropdownRect.right > tableRect.right) {
        dropdownRef.current.style.left = `-${dropdownRect.width}px`;
      }
    }
  }, [isOpen, tableRef]);
  useEffect(() => {
    if (isOpen && filterRef.current && tableRef.current) {
      const tableRect = tableRef.current.getBoundingClientRect();
      const filterRect = filterRef.current.getBoundingClientRect();
      if (filterRect.right > tableRect.right) {
        filterRef.current.style.left = `-${filterRect.width}px`;
      }
    }
  }, [isFilterOpen, tableRef]);
  return (
    <div className={styles.dropdownWrapper}>
      <button onClick={toggleDropdown} className={styles.button}>
        Отфильтровать по дате
      </button>
      {isOpen && (
        <div ref={dropdownRef} className={styles.settings}>
          <button className={styles.button}>
            <Asc className={styles.icon} /> По возрастанию
          </button>
          <button className={styles.button}>
            <Desc className={styles.icon} /> По убыванию
          </button>
          <div className={styles.filterMenu}>
            <button onClick={toggleFilters} className={styles.button}>
              <ArrowRight className={styles.icon} />
            </button>
            {isFilterOpen && (
              <ul ref={filterRef} className={styles.filterDropdown}>
                {options.map((option) => (
                  <li key={option}>
                    <label className={styles.option}>
                      <input
                        type='checkbox'
                        checked={!!selectedOptions[option]}
                        onChange={() => toggleCheckbox(option)}
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDownTable;
