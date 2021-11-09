import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import TypeValidator from '../enums/type-validator.enum';
import IPassengerValidator from '../interfaces/passenger-validator';

import { AlertService } from '../services/alert/alert.service';
import { PassengerService } from '../services/passenger/passenger.service';
import ManualValidatorService from '../services/qr/manual-validator.service';
import QrValidatorService from '../services/qr/automatic-validator.service';
export class FactoryValidator {

    constructor(private qrScanner: QRScanner, private passengerService: PassengerService, private alert: AlertService) {

    }

    public createValidator(type: TypeValidator): IPassengerValidator {

        switch (type) {
            case TypeValidator.Automatic:
                return new QrValidatorService(this.qrScanner, this.alert, this.passengerService);
            case TypeValidator.Manual:
                return new ManualValidatorService(this.passengerService, this.alert);
        }

    }
}