import { Injectable } from '@angular/core';
import {AppConfig} from "./statistics.component";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  config: AppConfig = {
    theme: 'lara-light-blue',
    dark: false,
    inputStyle: 'outlined',
    ripple: true
  };

  private configUpdate = new Subject<AppConfig>();

  configUpdate$ = this.configUpdate.asObservable();

  updateConfig(config: AppConfig) {
    this.config = config;
    this.configUpdate.next(config);
  }

  getConfig() {
    return this.config;
  }
}
