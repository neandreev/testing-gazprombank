export interface Documents {
  identificationNumber: number | null;
  fullName: string;
  birthDate: Date | null;
  birthPlace: string;
  citizenship: string;
  insuranceCertificate?: string;
  residentialAddress: string;
  residenceAddress: string;
}
