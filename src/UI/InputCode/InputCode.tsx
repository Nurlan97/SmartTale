import { useEffect, useRef, useState } from 'react';

import styles from './inputCode.module.scss';

interface IInputCode {
  setValue: React.Dispatch<React.SetStateAction<string>>; //передаем setState из useState
  isError?: boolean; // для красного border
  margin?: string;
}
const InputCode = ({ setValue, isError = false, margin }: IInputCode) => {
  const [symbols, setSymbols] = useState(new Array(4).fill(''));
  useEffect(() => {
    setValue(symbols.join(''));
  }, []);

  const refArr = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const index = Number(event.currentTarget.getAttribute('data-index'));
    const value = event.key;
    if (!(event.code === 'KeyV' && event.ctrlKey)) {
      event.preventDefault();
    }
    const regex = /[0-9]|\./;
    if (value === 'Backspace') {
      if (event.currentTarget.value === '') {
        setSymbols(symbols.map((val, i) => (i === index - 1 ? '' : val)));
        if (index > 0) {
          refArr[index - 1].current?.focus();
          refArr[index - 1].current?.select();
        }
      } else {
        setSymbols(symbols.map((val, i) => (i === index ? '' : val)));
      }
    } else if (index > 0 && event.key === 'ArrowLeft') {
      refArr[index - 1].current?.focus();
      refArr[index - 1].current?.select();
    } else if (index < symbols.length - 1 && event.key === 'ArrowRight') {
      refArr[index + 1].current?.focus();
      refArr[index + 1].current?.select();
    } else if (regex.test(value)) {
      setSymbols(symbols.map((val, i) => (i === index ? value : val)));
      if (index < symbols.length - 1) {
        refArr[index + 1].current?.focus();
        refArr[index + 1].current?.select();
      }
    }
  };
  const onFocus = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const index = (event.target.dataset.index && +event.target.dataset.index) || 0;
    refArr[index].current?.select();
  };
  const onPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = event.clipboardData.getData('text');
    const regex = /[0-9]|\./;
    if (regex.test(paste)) setSymbols([...paste.slice(0, 4)]);
  };
  return (
    <div className={styles.wrapper} style={{ margin: margin }}>
      {symbols.map((symbol, i) => (
        <input
          key={i}
          className={styles.oneSymbol}
          style={{ borderColor: isError ? '#FF3B30' : '' }}
          defaultValue={symbol}
          ref={refArr[i]}
          maxLength={1}
          data-index={i}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onPaste={onPaste}
        />
      ))}
    </div>
  );
};

export default InputCode;
