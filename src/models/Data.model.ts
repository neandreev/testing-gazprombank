import { License } from "./License.model";

export interface Data {
  identificationNumber: string;
  fullName: string;
  birthDate: Date;
  birthPlace: string;
  citizenship: string;
  insuranceCertificate?: string;
  residentialAddress: string;
  residenceAddress?: string;

  registrationDate: Date;
  registrationNumber: string;
  registrationPlace: string;

  licenses: License[];

  isProvidingInternet: boolean;
  isPublicOfficial: boolean;
  haveBeneficiaries: boolean;
  haveRepresentatives: boolean;
  haveBeneficialOwner: boolean;
}
