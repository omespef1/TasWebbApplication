import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TypeContract } from '../../../models/ocasional/type-contract';
import { ContractTypeService } from '../../../services/contracts-type/contract-type.service';
import { SessionService } from '../../../services/session/session.service';

@Component({
  selector: 'app-type-contracts',
  templateUrl: './type-contracts.component.html',
  styleUrls: ['./type-contracts.component.scss'],
})
export class TypeContractsComponent implements OnInit {

  dataList: TypeContract[]=[];
  loading=false;
  constructor(  
    private modalController: ModalController,
    private typeContractService:ContractTypeService,
    private sesionService:SessionService
  ) {}

  ngOnInit() {
    this.GetData();
  }

  GetData() {
    this.loading=true;
    this.typeContractService.GetTypeContracts(this.sesionService.GetUser().IdEmpresa).subscribe(resp=>{
      this.loading=false;
      //console.log(resp);
      if (resp.Retorno === 0 && resp.ObjTransaction!=null) {
        this.dataList = resp.ObjTransaction;
      }
    },err=> {
      this.loading=false;

    })       
  }

   async SetData(business: TypeContract) {
    await this.modalController.dismiss(business);
  }

}
