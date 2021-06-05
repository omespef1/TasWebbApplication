import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SignatureComponent } from '../signature/signature.component';


@Component({
  selector: 'app-occasional-fuec',
  templateUrl: './occasional-fuec.page.html',
  styleUrls: ['./occasional-fuec.page.scss'],
})
export class OccasionalFuecPage implements OnInit {
  signatureImg:string;
  constructor(private modal:ModalController) { }

  ngOnInit() {
  }


  async showModalSignature() {
    const modal = await this.modal.create({
      component: SignatureComponent
    });
    modal.onDidDismiss().then(resp => {
     
      console.log(resp);
     this.signatureImg = resp.data;
    });
    return await modal.present();
  }

}
