import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AppConfigService} from "./app-config.service";


export interface AppConfig {
  inputStyle?: string;
  dark?: boolean;
  theme?: string;
  ripple?: boolean;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {


  pieData: any;

  chartOptions: any;

  subscription: Subscription;

  config: AppConfig;

  barData: any;
  polarAreaData: { datasets: { backgroundColor: string[]; data: number[]; hoverBackgroundColor: string[] }[]; labels: string[] };


  constructor(private configService: AppConfigService) {
  }

  ngOnInit(): void {
    this.setPieData();
    this.setPolarAreaData();
    this.setBarData();

  }

  private setPieData() {
    this.pieData = {
      labels: ['Bakery', 'Cereals', 'Diary'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            "#42A5F5",
            "#66BB6A",
            "#FFA726"
          ],
          hoverBackgroundColor: [
            "#64B5F6",
            "#81C784",
            "#FFB74D"
          ]
        }
      ]
    }
  }

  private setPolarAreaData() {
    this.polarAreaData = {
      labels: ['Dark Chocolate Bar', 'Milk Chocolate', 'Butter', 'Medium Eggs', 'Cream Cheese', 'Fresh Plain Baguette', 'Country White Bread'],
      datasets: [
        {
          data: [91, 50, 100 ,42 ,61, 78 , 25],
          backgroundColor: [
            "#42A5F5",
            "#66BB6A",
            "#FFA726",
            "#2B70A7",
            "#BF1E2E",
            "#EF4136",
            "#009445"

          ],
          hoverBackgroundColor: [
            "#64B5F6",
            "#81C784",
            "#FFB74D"
          ]
        }
      ]
    }
  }

  private setBarData() {

    this.barData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        type: 'line',
        label: 'Dataset 1',
        borderColor: '#42A5F5',
        borderWidth: 2,
        fill: false,
        data: [
          50,
          25,
          12,
          48,
          56,
          76,
          42
        ]
      }, {
        type: 'bar',
        label: 'Dataset 2',
        backgroundColor: '#66BB6A',
        data: [
          21,
          84,
          24,
          75,
          37,
          65,
          34
        ],
        borderColor: 'white',
        borderWidth: 2
      }, {
        type: 'bar',
        label: 'Dataset 3',
        backgroundColor: '#FFA726',
        data: [
          41,
          52,
          24,
          74,
          23,
          21,
          32
        ]
      }]

    }
  }
}
