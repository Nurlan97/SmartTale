import React, { useEffect, useRef, useState } from 'react';

import { dateFilters, TDate } from '../../store/orderHistoryStore';
import styles from './dropDownFilterDate.module.scss';

enum dateRanges {
  week,
  month,
  year,
}
interface IProps {
  tableRef: React.RefObject<HTMLTableElement>;
  setDate: (range: TDate) => void;
  filter: dateFilters;
  setFilter: (type: dateFilters) => void;
}
const DropDownFilterDate = ({ tableRef, setDate, filter, setFilter }: IProps) => {
  const [isMainHovering, setIsMainHovering] = useState(false);
  const [isAcceptHovering, setIsAcceptHovering] = useState(false);
  const [isDeadlineHovering, setIsDeadlineHovering] = useState(false);
  const [isCompletedHovering, setIsCompletedHovering] = useState(false);
  const acceptRef = useRef<HTMLDivElement>(null);
  const deadlineRef = useRef<HTMLDivElement>(null);
  const completeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isAcceptHovering && acceptRef.current && tableRef.current) {
      const tableRect = tableRef.current.getBoundingClientRect();
      const filterRect = acceptRef.current.getBoundingClientRect();
      if (filterRect.right > tableRect.right) {
        acceptRef.current.style.left = `-${filterRect.width}px`;
      }
    }
  }, [isAcceptHovering]);
  useEffect(() => {
    if (isDeadlineHovering && deadlineRef.current && tableRef.current) {
      const tableRect = tableRef.current.getBoundingClientRect();
      const filterRect = deadlineRef.current.getBoundingClientRect();
      if (filterRect.right > tableRect.right) {
        deadlineRef.current.style.left = `-${filterRect.width}px`;
      }
    }
  }, [isDeadlineHovering]);
  useEffect(() => {
    if (isCompletedHovering && completeRef.current && tableRef.current) {
      const tableRect = tableRef.current.getBoundingClientRect();
      const filterRect = completeRef.current.getBoundingClientRect();
      if (filterRect.right > tableRect.right) {
        completeRef.current.style.left = `-${filterRect.width}px`;
      }
    }
  }, [isCompletedHovering]);
  const setDateHandler =
    (type: dateFilters, range?: dateRanges) =>
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();
      setFilter(type);
      if (type === dateFilters.empty) {
        setDate([null, null]);
      }
      setIsMainHovering(false);
      if (range === undefined) return;
      const currentDate = new Date();
      if (range === dateRanges.week) {
        setDate([new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000), new Date()]);
      } else if (range === dateRanges.month) {
        setDate([
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            currentDate.getDate(),
          ),
          new Date(),
        ]);
      } else {
        setDate([
          new Date(
            currentDate.getFullYear() - 1,
            currentDate.getMonth(),
            currentDate.getDate(),
          ),
          new Date(),
        ]);
      }
    };

  return (
    <div
      className={styles.dropdownMainItem}
      onMouseLeave={() => setIsMainHovering(false)}
    >
      <div
        className={styles.dropdownMainItem}
        onMouseEnter={() => setIsMainHovering(true)}
      >
        Отфильтровать по {filter}
        {isMainHovering && (
          <div className={styles.dropdownContent}>
            <div
              className={styles.dropdownItem}
              onMouseEnter={() => setIsAcceptHovering(true)}
              onMouseLeave={() => setIsAcceptHovering(false)}
            >
              <button
                type='button'
                onClick={setDateHandler(dateFilters.accepted)}
                className={styles.mainBtn}
              >
                Дате принятия
              </button>
              {isAcceptHovering && (
                <div className={styles.dropdownSubcontent} ref={acceptRef}>
                  <button
                    onClick={setDateHandler(dateFilters.accepted, dateRanges.week)}
                    className={styles.dropdownItem}
                  >
                    За последнюю неделю
                  </button>
                  <button
                    onClick={setDateHandler(dateFilters.accepted, dateRanges.month)}
                    className={styles.dropdownItem}
                  >
                    За последний месяц
                  </button>
                  <button
                    onClick={setDateHandler(dateFilters.accepted, dateRanges.year)}
                    className={styles.dropdownItem}
                  >
                    За последний год
                  </button>
                </div>
              )}
            </div>
            <div
              className={styles.dropdownItem}
              onMouseEnter={() => setIsDeadlineHovering(true)}
              onMouseLeave={() => setIsDeadlineHovering(false)}
            >
              <button
                type='button'
                onClick={setDateHandler(dateFilters.deadline)}
                className={styles.mainBtn}
              >
                Дедлайну
              </button>
              {isDeadlineHovering && (
                <div className={styles.dropdownSubcontent} ref={deadlineRef}>
                  <button
                    className={styles.dropdownItem}
                    onClick={setDateHandler(dateFilters.deadline, dateRanges.week)}
                  >
                    За последнюю неделю
                  </button>
                  <button
                    className={styles.dropdownItem}
                    onClick={setDateHandler(dateFilters.deadline, dateRanges.month)}
                  >
                    За последний месяц
                  </button>
                  <button
                    className={styles.dropdownItem}
                    onClick={setDateHandler(dateFilters.deadline, dateRanges.year)}
                  >
                    За последний год
                  </button>
                </div>
              )}
            </div>
            <div
              className={styles.dropdownItem}
              onMouseEnter={(e) => setIsCompletedHovering(true)}
              onMouseLeave={() => setIsCompletedHovering(false)}
            >
              <button
                type='button'
                onClick={setDateHandler(dateFilters.completed)}
                className={styles.mainBtn}
              >
                Дате завершения
              </button>
              {isCompletedHovering && (
                <div className={styles.dropdownSubcontent} ref={completeRef}>
                  <button
                    className={styles.dropdownItem}
                    onClick={setDateHandler(dateFilters.completed, dateRanges.week)}
                  >
                    За последнюю неделю
                  </button>
                  <button
                    className={styles.dropdownItem}
                    onClick={setDateHandler(dateFilters.completed, dateRanges.month)}
                  >
                    За последний месяц
                  </button>
                  <button
                    className={styles.dropdownItem}
                    onClick={setDateHandler(dateFilters.completed, dateRanges.year)}
                  >
                    За последний год
                  </button>
                </div>
              )}
            </div>
            <div className={styles.dropdownItem}>
              <button
                type='button'
                onClick={setDateHandler(dateFilters.empty)}
                className={styles.mainBtn}
              >
                Сбросить
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDownFilterDate;
