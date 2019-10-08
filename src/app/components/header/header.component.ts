import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from '../../services/session/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() headerName:string;
  constructor(private _auth: SessionService,private router:Router) { }

  ngOnInit() {}

  logged() {
    console.log('logues es');
    console.log(this._auth.GetThirdPartie() )
    return this._auth.GetThirdPartie() != null;
    }

    goSettings(){
      this.router.navigateByUrl('settings');
    }
}
