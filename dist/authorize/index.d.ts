import { CertificationNumber, JoinUserInfo } from '../types';
declare const generateCertificationNumber: (phoneNumber: string) => Promise<any>;
declare const validateCertificationNumber: (certificate: CertificationNumber) => Promise<true | void | undefined>;
declare const joinWith: (params: JoinUserInfo) => Promise<boolean>;
export { generateCertificationNumber, validateCertificationNumber, joinWith, };
