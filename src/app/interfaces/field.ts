import { Ioption } from "./option";

export interface Ifield {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'email' | 'password' | 'select' | 'multiSelect' | 'money' | 'textarea' | 'phone' | 'cep';
  placeholder?: string;
  options?: Ioption[];
  optionValue?: any
};