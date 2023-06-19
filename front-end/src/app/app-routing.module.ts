import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { RoomsComponent } from './view/rooms/rooms.component';
import { TemplatesComponent } from './view/templates/templates.component';
import { SettingsComponent } from './view/settings/settings.component';
import { HistoricComponent } from './view/historic/historic.component';
import { AddTemplateComponent } from './view/templates/add-template/add-template.component';
import { LobbyComponent } from './view/rooms/lobby/lobby.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "rooms",
    component: RoomsComponent
  },
  {
    path: "templates",
    component: TemplatesComponent
  },
  {
    path: "lobby/:id",
    component: LobbyComponent
  },
  {
    path: "templates/add",
    component: AddTemplateComponent
  },
  {
    path: "templates/edit/:id",
    component: AddTemplateComponent
  },
  {
    path: "settings",
    component: SettingsComponent
  },
  {
    path: "historic",
    component: HistoricComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
