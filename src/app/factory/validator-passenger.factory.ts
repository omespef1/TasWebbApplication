
import TypeValidator from '../enums/type-validator.enum';
import IPassengerValidator from '../interfaces/passenger-validator';

import { AlertService } from '../services/alert/alert.service';
import { PassengerService } from '../services/passenger/passenger.service';
import ManualValidatorService from '../services/qr/manual-validator.service';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import QrValidatorService from '../services/qr/automatic-validator.service';
export class FactoryValidator {

    constructor(private passengerService: PassengerService, private alert: AlertService,private barcodeScanner: BarcodeScanner) {

    }

    public createValidator(type: TypeValidator): IPassengerValidator {

        switch (type) {
            case TypeValidator.Automatic:
                return new QrValidatorService(this.alert, this.passengerService,this.barcodeScanner);
            case TypeValidator.Manual:
                return new ManualValidatorService(this.passengerService, this.alert);
        }

    }
}