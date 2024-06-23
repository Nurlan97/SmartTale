import styles from './sizeInput.module.scss';
type Props = {
  selectedSize: Set<string>;
  setSelectedSize: React.Dispatch<React.SetStateAction<Set<string>>>;
  disabled?: boolean;
};
const SizeInput = ({ selectedSize, setSelectedSize, disabled = false }: Props) => {
  const sizes = [
    'XXS',
    'XS',
    'S',
    'M',
    'L',
    'XL',
    'XXL',
    '3XL',
    '4XL',
    '38',
    '40',
    '42',
    '44',
    '46',
    '48',
    '50',
    '52',
    '54',
    '56',
  ];
  //   console.log(selectedSize);
  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>Размеры</div>
      <div className={styles.grid}>
        {sizes.map((size) => {
          return (
            <button
              disabled={disabled}
              type='button'
              key={size}
              className={selectedSize.has(size) ? styles.sizeSelected : styles.size}
              onClick={() => {
                if (selectedSize.has(size)) {
                  setSelectedSize((prev) => {
                    prev.delete(size);
                    return new Set(prev);
                  });
                } else {
                  setSelectedSize((prev) => new Set(prev.add(size)));
                }
              }}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SizeInput;
