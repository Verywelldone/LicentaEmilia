import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-board',
  templateUrl: './service-board.component.html',
  styleUrls: ['./service-board.component.scss']
})
export class ServiceBoardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  printSomething($event: MouseEvent) {
    console.log("something")
  }
}
