import { Injectable } from '@angular/core';
import { ThirdPartie } from '../../models/general/user';
import { SessionService } from '../session/session.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ThirdPartiesService {


private thirdparties: ThirdPartie[] = [];

  constructor(
  private _session : SessionService,
  private _nav: NavController


  ) {


   }

addThirdPartie(newThirdPartie: ThirdPartie){
  const currentThirdPartie = this._session.GetThirdPartie();
  if(currentThirdPartie === undefined  || currentThirdPartie === null){
    this._session.SetThirdPartie(newThirdPartie);
  }
  if(this.thirdparties.indexOf(newThirdPartie)<=-1) {
  this.thirdparties.push(newThirdPartie);
  }
 
}

GetThirdParties(){
  return this.thirdparties;
}

removeThirdPartiesSession(){
  this.thirdparties=[];
}

removeThirdParties(removeThirdPartie: ThirdPartie){
  const index = this.thirdparties.indexOf(removeThirdPartie, 0);
  if (index > -1) {
     this.thirdparties.splice(index, 1);
  }
}



}
