import { Component, OnInit } from '@angular/core';

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
      center: {lat: 45.657974, lng: 25.601198},
      zoom: 12
    };
  }
}
