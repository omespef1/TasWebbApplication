import { Component, OnInit } from '@angular/core';
import { ThirdPartie } from '../../models/general/user';
import { GENTercerosService } from '../../services/GENTerceros/genterceros.service';
import { SessionService } from '../../services/session/session.service';
import { transaction } from '../../models/general/transaction';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-third-parties',
  templateUrl: './third-parties.page.html',
  styleUrls: ['./third-parties.page.scss'],
})
export class ThirdPartiesPage implements OnInit {
  thirdParties:ThirdPartie[]=[];
  thirdPartiesFilter:ThirdPartie[]=[];
  loading=false;
  constructor(private _genTerceros :GENTercerosService,private _session: SessionService,private _nav:NavController) { }

  ngOnInit() {
    this.GetThirdParties();
  }


   GetThirdParties(){
     this.loading = true;
     const user: ThirdPartie =  this._session.GetUser();
     this._genTerceros.GetGENTerceros(user.IdEmpresa).subscribe((resp: transaction) => {
      this.loading = false;
      if (resp !== undefined && resp.Retorno === 0 ) {
         this.thirdParties = resp.ObjTransaction;
         this.thirdPartiesFilter = this.thirdParties;
       }
   });

  }

  setThirdPartie(thirdPartie: ThirdPartie){
     this._session.SetThirdPartie(thirdPartie);
     this._nav.navigateRoot("tabs/vehicle");
  }

  filterThirdParties(event) {

    this.thirdPartiesFilter = [];
    this.thirdPartiesFilter = this.thirdParties.filter(
      v =>
        v.NombreCompleto.toUpperCase().indexOf(
          event.target.value.toUpperCase()
        ) > -1
    );

  }
}
