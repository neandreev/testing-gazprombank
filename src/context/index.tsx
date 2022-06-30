import React, { useState, createContext, useContext, FC } from "react";
import { License } from "../models/License.model";
import { Documents } from "../models/Documents.model";
import { Registration } from "../models/Registration.model";
import { AdditionalInfo } from "../models/AdditionalInfo.model";

const useStore = () => {
  const [documents, setDocuments] = useState<License | null>(null);
  const [registration, setRegistration] = useState<Documents | null>(null);
  const [licenses, setLicenses] = useState<Registration | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfo | null>(null);

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

type storeType = ReturnType<typeof useStore>

const StoreContext = createContext<storeType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const StoreContextProvider: FC<Props> = ({ children }) => {
  return (
    <StoreContext.Provider value={useStore()}>
      {children}
    </StoreContext.Provider>
  );
};

export const useDocs = () => useContext(StoreContext)?.documents;
export const useRegistration = () => useContext(StoreContext)?.registration;
export const useLicenses = () => useContext(StoreContext)?.licenses;
export const useAdditionalInfo = () => useContext(StoreContext)?.additionalInfo;

export const useSetDocs = () => useContext(StoreContext)?.setDocuments;
export const useSetRegistration = () => useContext(StoreContext)?.setRegistration;
export const useSetLicenses = () => useContext(StoreContext)?.setRegistration;
export const useSetAdditionalInfo = () => useContext(StoreContext)?.setAdditionalInfo;
