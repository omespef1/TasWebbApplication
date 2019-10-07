import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from '../../services/session/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() headerName:string;
  constructor(private _auth: SessionService) { }

  ngOnInit() {}

  logged() {
    return this._auth.GetThirdPartie() != null;
    }
}
