import { transactionObj } from '../models/general/transaction';
export default interface IPassengerValidator {


    identification:string;

    validPassenger(companyId:number,requestId:number): Promise<transactionObj<Boolean>>;

    uploadPassenger(companyId: number, requestId: number,latitude:number, longitude:number):void;
}