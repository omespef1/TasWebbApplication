import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session/session.service';

@Component({
  selector: 'app-logo-component',
  templateUrl: './logo-component.component.html',
  styleUrls: ['./logo-component.component.scss'],
})
export class LogoComponentComponent implements OnInit {
  screenWidth: number;
  logoApp: string = "assets/imgs/icon.png";
  logoAppHori: string = "assets/imgs/iconHori.png";  // URL predeterminada

  constructor(public _sesion: SessionService) { }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.loadLogo();

  }
  getLogoClass() {
    return this.screenWidth > 768 ? 'logo-large' : 'logo-small';
}
  loadLogo() {
    const business = this._sesion.GetBussiness();
    if (business) {
      this.logoAppHori = !!business.LogoAppHori ? business.LogoAppHori : this.logoAppHori; // Asumiendo que LogoApp es la propiedad del objeto business
    }
  }

}
