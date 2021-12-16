import VMasker from 'vanilla-masker';

export const formatReal = (value: number | string) => {
  return VMasker.toMoney(value ?? 0, {
    precision: 2,
    separator: ',',
    delimiter: '.',
    unit: 'R$',
    zeroCents: false,
  });
};

export const formatFloatValue = (value: number | string) => {
  return VMasker.toMoney(value ?? 0, {
    precision: 2,
    separator: '.',
    delimiter: '',
    unit: '',
    zeroCents: false,
  });
};

export const onlyNumbers = (value: string) =>
  (value ?? 0).replace(/[^0-9]/g, '');
