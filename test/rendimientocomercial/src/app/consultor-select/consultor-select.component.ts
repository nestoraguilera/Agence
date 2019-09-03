import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { Moment, monthsShort, now } from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { AppConfigService } from '../services/app-config.service';

@Component({
  selector: 'app-consultor-select',
  templateUrl: './consultor-select.component.html',
  styleUrls: ['./consultor-select.component.css']
})
export class ConsultorSelectComponent implements OnInit {
  consultorList_data = [];
  selectedIDs = [];
  activeView = 0;
  months = [
    { id: 1, value: 'Ene' },
    { id: 2, value: 'Feb' },
    { id: 3, value: 'Mar' },
    { id: 4, value: 'Abr' },
    { id: 5, value: 'May' },
    { id: 6, value: 'Jun' },
    { id: 7, value: 'Jul' },
    { id: 8, value: 'Ago' },
    { id: 9, value: 'Sep' },
    { id: 10, value: 'Oct' },
    { id: 11, value: 'Nov' },
    { id: 12, value: 'Dic' }
  ];
  years = [];
  dateF = null;
  dateT = null;
  dataReport = null;
  barChartPanelUrl = null;
  pieChartPanelUrl = null;

  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    private appConfig: AppConfigService
  ) {
    let _now = new Date();
    let thisYear = _now.getFullYear();
    for (let i = thisYear; i >= thisYear - 30; i--)this.years.push(i);
    this.dateF = { y: 2007, m: 1 };
    this.dateT = { y: thisYear, m: 12 };
  }

  ngOnInit() {
    this.consultorList_data = [];
    this.httpClient.get(this.appConfig.restResource("consultor")).toPromise()
      .then((results) => {
        for (let i in results) {
          this.consultorList_data.push(results[i]);
        }
      })
      .catch((err) => {
        console.log("EXCEPTION:" + err);
      });
  }

  selectConsultor(selectAll) {
    this.selectedIDs = [];
    if (selectAll)
      this.consultorList_data.forEach((value) => { this.selectedIDs.push(value.id) });
  }

  setView(view) {
    let dateF = this.dateF.y + "-" + this.dateF.m;
    let dateT = this.dateT.y + "-" + this.dateT.m;
    switch (view) {
      case 1: this.load_informe01(); break;
      case 2: {
        this.barChartPanelUrl =
          this.sanitizer.bypassSecurityTrustResourceUrl(this.appConfig.restResource("chart/bar_inf01/" + dateF + "/" + dateT + "/" + this.selectedIDs.toString()));
        this.activeView = 2;
        break;
      }
      case 3: {
        this.pieChartPanelUrl =
          this.sanitizer.bypassSecurityTrustResourceUrl(this.appConfig.restResource("chart/pie_inf01/" + dateF + "/" + dateT + "/" + this.selectedIDs.toString()));
        this.activeView = 3;
        break;
      }
      default: return;
    }
  }

  readyForLaunch() {
    if (this.selectedIDs.length) {
      if (this.dateF.y < this.dateT.y)
        return true;
      if (this.dateF.y == this.dateT.y)
        if (this.dateF.m <= this.dateT.m)
          return true;
    }
    return false;
  }

  load_informe01() {
    let dateF = this.dateF.y + "-" + this.dateF.m;
    let dateT = this.dateT.y + "-" + this.dateT.m;
    let url = this.appConfig.restResource("consultor/Informe01_multi/"
      + dateF + "/" + dateT + "/" + this.selectedIDs.toString());
    this.httpClient.get(url).toPromise()
      .then((results) => {
        this.dataReport = results;
        this.activeView = 1;
      })
      .catch((err) => {
        console.log("EXCEPTION:" + err);
      });
  }

}