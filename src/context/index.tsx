import React, { useState, createContext, useContext, FC } from "react";
import _find from "lodash-es/find";
import _uniqueId from "lodash-es/uniqueId";

import { LicenseI } from "../models/License.model";
import { Data } from "../models/Data.model";
import { FormState } from "final-form";

type Status = "filling" | "error" | "complete";

const initialFillingStatus = {
  information: {
    fields: [
      "identificationNumber",
      "fullName",
      "birthPlace",
      "citizenship",
      "residentialAddress",
      "birthDate",
    ],
    status: "filling" as Status,
    name: "Информация",
  },
  registration: {
    fields: ["registrationDate", "registrationNumber", "registrationPlace"],
    status: "filling" as Status,
    name: "Сведения",
  },
  licenses: {
    fields: ["type", "number", "typeOfActivity", "issuer"],
    status: "filling" as Status,
    name: "Лицензии",
  },
  poll: {
    status: "filling" as Status,
    name: "Опросник",
  },
};

export type FillingStatus = typeof initialFillingStatus;

export interface LicenseFormState
  extends FormState<Record<string, any>, Partial<Record<string, any>>> {
  id: string;
}

const useStore = () => {
  const [licenses, setLicenses] = useState<LicenseI[]>([]);
  const [licensesForms, setLicensesForms] = useState<LicenseFormState[]>([]);
  const [data, setData] = useState<Data | null>(null);
  const [licensesIds, setLicensesIds] = useState<string[]>([_uniqueId()]);
  const [fillingStatus, setFillingStatus] =
    useState<typeof initialFillingStatus>(initialFillingStatus);

  return {
    licenses,
    licensesForms,
    licensesIds,
    data,
    fillingStatus,
    setLicenses,
    setLicensesForms,
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
  useContext(StoreContext)?.licenses as LicenseI[];
export const useLicensesForms = () =>
  useContext(StoreContext)?.licensesForms as LicenseFormState[];
export const useLicensesIds = () =>
  useContext(StoreContext)?.licensesIds as string[];
export const useLicense = (id: string) =>
  _find(useContext(StoreContext)?.licenses, { id });
export const useData = () => useContext(StoreContext)?.data;
export const useFillingStatus = () =>
  useContext(StoreContext)?.fillingStatus as FillingStatus;

export const useSetLicenses = () => useContext(StoreContext)?.setLicenses;
export const useSetLicensesForms = () =>
  useContext(StoreContext)?.setLicensesForms;
export const useSetLicensesIds = () => useContext(StoreContext)?.setLicensesIds;
export const useSetData = () => useContext(StoreContext)?.setData;
export const useSetFillingStatus = () =>
  useContext(StoreContext)?.setFillingStatus;
