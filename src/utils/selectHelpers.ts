import { StylesConfig } from 'react-select';

export function createStyles<T>(isError: boolean): StylesConfig<T, false> {
  const customStyles: StylesConfig<T, false> = {
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
      borderRadius: 8,
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
      minWidth: 300,
      borderColor: isError ? 'red' : 'white',
      boxShadow: 'none',
      borderRadius: 8,
      '&:hover': {
        borderColor: '#FCA',
        boxShadow: '0 0 0 1px #FCA',
      },
    }),
  };
  return customStyles;
}
