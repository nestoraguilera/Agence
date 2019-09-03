import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap';

import {
  MatButtonModule, MatToolbarModule,
  MatInputModule, MatProgressSpinnerModule,
  MatCardModule, MatAutocompleteModule,
  MatCheckboxModule, MatMenuModule,
  MatIconModule, MatDatepickerModule,
  MatListModule, MatSelectModule,
} from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsultorSelectComponent } from './consultor-select/consultor-select.component';
import { ConsultorInforme01Component } from './consultor-informe01/consultor-informe01.component';
import { MonthNamePipe } from './pipes/month-name.pipe';
import { AppConfigService } from './services/app-config.service';

@NgModule({
  declarations: [
    AppComponent,
    ConsultorSelectComponent,
    ConsultorInforme01Component,
    MonthNamePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    MatMomentDateModule,
    HttpClientModule,
    AlertModule.forRoot(),

    MatButtonModule, MatToolbarModule,
    MatInputModule, MatProgressSpinnerModule,
    MatCardModule, MatAutocompleteModule,
    MatCheckboxModule, MatMenuModule,
    MatIconModule, MatDatepickerModule,
    MatListModule, MatSelectModule,
    MatTableModule

  ],
  providers: [
    AppConfigService,
    { provide: MAT_DATE_LOCALE, useValue: 'es-CL' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
