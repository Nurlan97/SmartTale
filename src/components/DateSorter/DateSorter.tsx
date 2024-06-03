import React, { useState } from "react";
import styles from "./DateSorter.module.scss";

interface Date {
  day: number;
  month: number;
  year: number;
}

const DateSorter: React.FC = () => {
  const [dates, setDates] = useState<Date[]>([]);
  const [sortedDates, setSortedDates] = useState<Date[]>([]);

  const generateRange = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  const days = generateRange(1, 31);
  const months = generateRange(1, 12);
  const years = generateRange(2020, new Date().getFullYear());

  const handleAddDate = (day: number, month: number, year: number) => {
    const newDate: Date = { day, month, year };
    setDates([...dates, newDate]);
  };

  const handleSortDates = () => {
    const sorted = [...dates].sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      if (a.month !== b.month) return a.month - b.month;
      return a.day - b.day;
    });
    setSortedDates(sorted);
  };

  return (
    <div className={styles.dateSorter}>
        <p>Фильтр по дате принятия заказа</p>
      <div className={styles.inputContainer}>
        <select>
          <option value="">Day</option>
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <select>
          <option value="">Month</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <select>
          <option value="">Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.dates}>
        {sortedDates.map((date, index) => (
          <div key={index} className={styles.date}>
            {date.day}/{date.month}/{date.year}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DateSorter;