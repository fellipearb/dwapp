import VMasker from 'vanilla-masker';
import { onlyNumbers } from './money';

export const maskCPF = (text: string | number): string => {
  return VMasker.toPattern(text, '999.999.999-99');
};

export const maskCEP = (text: string | number): string => {
  return VMasker.toPattern(text, '99999-999');
};

export const maskPhone = (text: string): string => {
  let phone = `${onlyNumbers(text)}`;

  if (typeof text === 'string' && text.indexOf('+55') !== -1) {
    phone = text.substring(3);
  }

  if (phone.length > 11) {
    phone = phone.replace(/^.{0,2}/, '');
  }

  return VMasker.toPattern(phone, '(99) 9 9999-9999');
};
