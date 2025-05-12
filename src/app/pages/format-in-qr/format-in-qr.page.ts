import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { SignaturePad } from 'angular2-signaturepad';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ActivatedRoute } from '@angular/router';
import { ManFormatoIngresoService } from 'src/app/services/format-in/format-in.service';
import { SignatureComponent } from '../signature/signature.component';
import { ThirdPartiesService } from 'src/app/services/third-parties/third-parties.service';
import { AlertService } from 'src/app/services/alert/alert.service';
@Component({
  selector: 'app-format-in-qr',
  templateUrl: './format-in-qr.page.html',
  styleUrls: ['./format-in-qr.page.scss'],
})
export class FormatInQrPage implements OnInit {


  companyCode: number;
  idFormat: number;
  driverName: string = '';
  driverIdentification: string = '';
  isSigned = false;
  isDataLoaded = false;
  driverSign: string;
  loading = false;
  singing = false;


  constructor(
    private route: ActivatedRoute,
    private manFormatService: ManFormatoIngresoService,
    private modalCtrl: ModalController,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.companyCode = params['companyCode'];
      this.idFormat = params['idFormat'];
      if (this.companyCode && this.idFormat) {
        this.fetchDriverData();
      }    
    });
  }

  async showModalSignature() {
    const modal = await this.modalCtrl.create({
      component: SignatureComponent
    });
    modal.onDidDismiss().then(resp => {
      if (resp.data != undefined) {
        this.driverSign = resp.data;
        this.isSigned= true;
      }
    });
    return await modal.present();
  }


  fetchDriverData() {
    this.loading = true;
    this.manFormatService.GetDriverInfo(this.companyCode, this.idFormat)
      .subscribe(response => {
        if (response && response.Retorno == 0) {
          this.driverName = response.ObjTransaction.DriverName;
          this.driverIdentification = response.ObjTransaction.DriverIdentification;
          this.isDataLoaded = true;
        }

      }, error => {
        console.error('Error obteniendo datos del conductor', error);
      }, () => { this.loading = false; });
  }


  async sendData() {
   
    if (!this.isSigned || !this.companyCode || !this.idFormat) return;
    const payload = {
      companyCode: this.companyCode,
      idFormat: this.idFormat,
      sign: this.driverSign
    };

    try {
      this.singing=true;
      this.manFormatService.setManFormatoSign(payload).subscribe(async resp => {
        if (resp && resp.Retorno == 0) {
          this.alert.successSweet('Formato firmado correctamente. Puedes cerrar esta ventana!');
        }
        else {
          this.alert.errorSweet(resp.TxtError);
        }
      },err=> {  },()=> { 
        this.singing=false;
      })
    } catch (err) {
      console.error('Error al enviar datos:', err);
    }
  }
}
