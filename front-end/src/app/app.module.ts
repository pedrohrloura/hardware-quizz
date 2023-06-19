import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { TemplatesComponent } from './view/templates/templates.component';
import { SettingsComponent } from './view/settings/settings.component';
import { HistoricComponent } from './view/historic/historic.component';
import { RoomsComponent } from './view/rooms/rooms.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddTemplateComponent } from './view/templates/add-template/add-template.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { LobbyComponent } from './view/rooms/lobby/lobby.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MqttModule } from 'ngx-mqtt';
import { MQTT_SERVICE_OPTIONS } from './app.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TemplatesComponent,
    SettingsComponent,
    HistoricComponent,
    RoomsComponent,
    AddTemplateComponent,
    LobbyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSidenavModule,
    FontAwesomeModule,
    MatExpansionModule,
    MatRadioModule,
    MatTableModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
