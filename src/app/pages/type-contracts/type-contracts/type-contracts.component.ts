import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TypeContract } from '../../../models/ocasional/type-contract';
import { ContractTypeService } from '../../../services/contracts-type/contract-type.service';
import { SessionService } from '../../../services/session/session.service';
import { ThirdPartie } from '../../../models/general/user';

@Component({
  selector: 'app-type-contracts',
  templateUrl: './type-contracts.component.html',
  styleUrls: ['./type-contracts.component.scss'],
})
export class TypeContractsComponent implements OnInit {

  dataList: TypeContract[]=[];
  thirdPartie:ThirdPartie;
  loading=false;
  constructor(  
    private modalController: ModalController,
    private typeContractService:ContractTypeService,
    private sesionService:SessionService
  ) {

    this.thirdPartie = this.sesionService.GetThirdPartie();
  }

  ngOnInit() {
    this.GetData();
  }

  GetData() {
    this.loading=true;
    this.typeContractService.GetTypeContracts(this.thirdPartie.IdEmpresa).subscribe(resp=>{
      this.loading=false;
      //console.log(resp);
      if (resp.Retorno === 0 && resp.ObjTransaction!=null) {
        this.dataList = resp.ObjTransaction;
      }
    },err=> {
      this.loading=false;

    })       
  }

   async setData(business: TypeContract) {
    await this.modalController.dismiss(business);
  }

  async close(){
    await this.modalController.dismiss();
  }

}
