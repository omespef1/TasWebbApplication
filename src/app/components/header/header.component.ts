import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from '../../services/session/session.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() headerName:string;
  @Input() showBackButton = true;
  constructor(private _auth: SessionService,private router:Router,private _nav:NavController) { }

  ngOnInit() {}



  logged() { 
   
    return this._auth.GetThirdPartie() != null;
    }

    goSettings(){
      this._nav.navigateRoot('tabs/settings');
    }
}
