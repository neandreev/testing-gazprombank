export interface LicenseI {
  id: string,
  type: string,
  number: string,
  typeOfActivity: string,
  issuer: string,
  issuanceDate?: string,
  expirationDate?: string,
  isPermanent?: boolean,
}