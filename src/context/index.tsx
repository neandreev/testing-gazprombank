import React, { useState, createContext, useContext, FC } from "react";
import _find from "lodash-es/find";
import _uniqueId from "lodash-es/uniqueId";

import { License } from "../models/License.model";
import { Data } from "../models/Data.model";

type Status = 'filling' | 'error' | 'complete';

const initialFillingStatus = {
  information: {
    fields: ['identificationNumber', 'fullName', 'birthPlace', 'citizenship', 'residentialAddress', 'birthDate'],
    status: 'filling' as Status,
  },
  registration: {
    fields: ['registrationDate', 'registrationNumber', 'registrationPlace'],
    status: 'filling' as Status,
  },
  licenses: {
    status: 'filling' as Status,
  },
  poll: {
    status: 'filling' as Status,
  }
}

export type FillingStatus = typeof initialFillingStatus;

const useStore = () => {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [data, setData] = useState<Data | null>(null);
  const [licensesIds, setLicensesIds] = useState<string[]>([_uniqueId()]);
  const [fillingStatus, setFillingStatus] = useState<typeof initialFillingStatus>(initialFillingStatus);

  return {
    licenses,
    licensesIds,
    data,
    fillingStatus,
    setLicenses,
    setLicensesIds,
    setData,
    setFillingStatus,
  };
};

type storeType = ReturnType<typeof useStore>;

const StoreContext = createContext<storeType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const StoreContextProvider: FC<Props> = ({ children }) => {
  return (
    <StoreContext.Provider value={useStore()}>{children}</StoreContext.Provider>
  );
};

export const useLicenses = () =>
  useContext(StoreContext)?.licenses as License[];
export const useLicensesIds = () =>
  useContext(StoreContext)?.licensesIds as string[];
export const useLicense = (id: string) =>
  _find(useContext(StoreContext)?.licenses, { id });
export const useData = () => useContext(StoreContext)?.data;
export const useFillingStatus = () => useContext(StoreContext)?.fillingStatus;

export const useSetLicenses = () => useContext(StoreContext)?.setLicenses;
export const useSetLicensesIds = () => useContext(StoreContext)?.setLicensesIds;
export const useSetData = () => useContext(StoreContext)?.setData;
export const useSetFillingStatus = () => useContext(StoreContext)?.setFillingStatus;
