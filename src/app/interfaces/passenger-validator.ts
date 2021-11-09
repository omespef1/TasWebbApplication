import { transactionObj } from '../models/general/transaction';
export default interface IPassengerValidator {


    validPassenger(companyId:number,requestId:number): Promise<transactionObj<Boolean>>;

    uploadPassenger(companyId: number, requestId: number):void;
}