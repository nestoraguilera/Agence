import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-consultor-informe01',
  templateUrl: './consultor-informe01.component.html',
  styleUrls: ['./consultor-informe01.component.css']
})
export class ConsultorInforme01Component implements OnInit {
  @Input() ConsultorInforme01;
  co_usuario = 0;
  no_usuario = "";
  results = [];
  total = null;
  columns = [];

  constructor() {
    this.columns = ['Periodo','Neto','Costo','Comision','Total'];
  }

  ngOnInit() {
    if (this.ConsultorInforme01) {
      this.co_usuario = this.ConsultorInforme01.co_usuario;
      this.no_usuario = this.ConsultorInforme01.no_usuario;
      this.results = this.ConsultorInforme01.results;
      this.total = this.ConsultorInforme01.total;
      this.results.push(this.total);
    }
  }
}

/*
{
  "co_usuario": "carlos.arruda",
  "no_usuario": "Carlos Flávio Girão de Arruda",
  "results": [
    {
      "aaaa": 2007,
      "mm": 1,
      "valor": 19173,
      "ganancia_neta": 16105.32,
      "costo_fijo": 2683,
      "comision": 1610.53,
      "total": 11812
    },
    {
      "aaaa": 2007,
      "mm": 2,
      "valor": 25767,
      "ganancia_neta": 21503.88,
      "costo_fijo": 2683,
      "comision": 1869.07,
      "total": 16952
    },
    {
      "aaaa": 2007,
      "mm": 3,
      "valor": 42371.6,
      "ganancia_neta": 35451.74,
      "costo_fijo": 2683,
      "comision": 3263.86,
      "total": 29505
    },
    {
      "aaaa": 2007,
      "mm": 4,
      "valor": 36303.97,
      "ganancia_neta": 30210.93,
      "costo_fijo": 2683,
      "comision": 3254.87,
      "total": 24273
    },
    {
      "aaaa": 2007,
      "mm": 5,
      "valor": 44382.8,
      "ganancia_neta": 37391.22,
      "costo_fijo": 2683,
      "comision": 3555.69,
      "total": 31153
    },
    {
      "aaaa": 2007,
      "mm": 6,
      "valor": 42709.11,
      "ganancia_neta": 35695.89,
      "costo_fijo": 2683,
      "comision": 3892.7,
      "total": 29120
    },
    {
      "aaaa": 2007,
      "mm": 7,
      "valor": 103009.49,
      "ganancia_neta": 86198.21,
      "costo_fijo": 2683,
      "comision": 6178.53,
      "total": 77337
    },
    {
      "aaaa": 2007,
      "mm": 8,
      "valor": 41449.38,
      "ganancia_neta": 34391.63,
      "costo_fijo": 2683,
      "comision": 3454.61,
      "total": 28254
    },
    {
      "aaaa": 2007,
      "mm": 9,
      "valor": 74461.68,
      "ganancia_neta": 61671.97,
      "costo_fijo": 2683,
      "comision": 5679.43,
      "total": 53310
    }
  ],
  "total": {
    "valor": 429628.02999999997,
    "ganancia_neta": 358620.79000000004,
    "costo_fijo": 24147,
    "comision": 32759.29,
    "total": 301716
  }
}
*/