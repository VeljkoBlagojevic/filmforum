import { createContext, useContext } from 'react';

export const baseUrl = '"http://192.168.0.13:8080';

export type IValid = {
  value: boolean;
  setValue: (value: boolean) => void;
};
export const ValidDefault: IValid = {
  value: false,
  setValue: () => null,
};
export const IsValidContext = createContext<IValid>(ValidDefault);
export const useValidInformation = () => useContext(IsValidContext);