import React, { useState, createContext, useContext, FC } from "react";
import _find from "lodash-es/find";

import { License } from "../models/License.model";
import { Documents } from "../models/Documents.model";
import { Registration } from "../models/Registration.model";
import { AdditionalInfo } from "../models/AdditionalInfo.model";

const useStore = () => {
  const [documents, setDocuments] = useState<Documents | null>(null);
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [licenses, setLicenses] = useState<License[] | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfo | null>(
    null
  );

  return {
    documents,
    registration,
    licenses,
    additionalInfo,
    setDocuments,
    setRegistration,
    setLicenses,
    setAdditionalInfo,
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

export const useDocs = () => useContext(StoreContext)?.documents as Documents;
export const useRegistration = () => useContext(StoreContext)?.registration as Registration;
export const useLicenses = () => useContext(StoreContext)?.licenses as License[];
export const useLicense = (id: string) => _find(useContext(StoreContext)?.licenses, { id }) as License;
export const useAdditionalInfo = () => useContext(StoreContext)?.additionalInfo as AdditionalInfo;

export const useSetDocs = () => useContext(StoreContext)?.setDocuments;
export const useSetRegistration = () =>
  useContext(StoreContext)?.setRegistration;
export const useSetLicenses = () => useContext(StoreContext)?.setLicenses;
export const useSetAdditionalInfo = () =>
  useContext(StoreContext)?.setAdditionalInfo;
