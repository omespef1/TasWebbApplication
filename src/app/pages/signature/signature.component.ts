import { Component, OnInit, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad';
import { NavParams, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss'],

})
export class SignatureComponent implements OnInit {
  signatureImg:string;
@ViewChild(SignaturePad,{static:true}) public signaturePad;
  constructor(private navParams:NavParams,private modal:ModalController) { }


  public signatureOptions= {
    'minWidth':1,
    'canvasWidth':'340',
    'canvasHeight':200
  }
  ngOnInit() {


  }


  canvasResize(){
    let canvas = document.querySelector('canvas');
   canvas.style.width="100%";
   canvas.style.border="2px dashed #2A4558"
  }
  
  ngAfterViewInit() {
    // this.signaturePad is now available
 this.signaturePad.set('minWidth', 1); // set szimek/signature_pad options at runtime
 this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
 this.canvasResize();
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event    
    this.signatureImg = this.signaturePad.toDataURL();
    this.setSignature();
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }

  drawClear(){
    this.signaturePad.clear();
  }

  async setSignature() {
    await this.modal.dismiss(this.signatureImg);
  }

  async close(){
    await this.modal.dismiss();
  }
}
