import React, { useState, createContext, useContext, FC } from "react";
import _find from "lodash-es/find";

import { License } from "../models/License.model";
import { Data } from "../models/Data.model";

const useStore = () => {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [data, setData] = useState<Data | null>(null);

  return {
    licenses,
    data,
    setLicenses,
    setData,
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
export const useLicense = (id: string) =>
  _find(useContext(StoreContext)?.licenses, { id });
export const useData = () => useContext(StoreContext)?.data;

export const useSetLicenses = () => useContext(StoreContext)?.setLicenses;
export const useSetData = () => useContext(StoreContext)?.setData;
