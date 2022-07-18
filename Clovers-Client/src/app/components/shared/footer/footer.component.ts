import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  options: any;
  overlays: any[];

  constructor() {
  }

  ngOnInit(): void {
    this.options = {
      center: {lat: 44.4268, lng: 426.1025},
      zoom: 12
    };
  }
}
