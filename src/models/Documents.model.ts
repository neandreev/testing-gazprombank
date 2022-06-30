export interface Documents {
  identificationNumber: number;
  fullName: string;
  birthDate: Date;
  birthPlace: string;
  citizenship: string;
  insuranceCertificate?: string;
  residentialAddress: string;
  residenceAddress?: string;
}
