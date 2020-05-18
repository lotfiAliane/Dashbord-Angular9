import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { TableauComponent } from "../../pages/tableau/tableau.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { AtelierComponent } from "../../pages/atelier/atelier.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { ParticipantComponent } from '../../pages/participant/participant.component';
import { ListParticipantComponent } from '../../pages/list-participant/list-participant.component';
// import { RtlComponent } from "../../pages/rtl/rtl.component";
import { AuthentificationComponent } from '../../pages/authentification/authentification.component';
import { Component } from '@angular/core';



export const AdminLayoutRoutes: Routes = [
  //{ path: "dashboard", component: DashboardComponent },
  { path: "authentification", component: AuthentificationComponent},
  { path: "tableau", component: TableauComponent },
  { path: "maps", component: MapComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "user", component: UserComponent },
  { path: "atelier", component: AtelierComponent },
  { path: "typography", component: TypographyComponent },
  { path: "participant", component: ParticipantComponent },
  { path: "list/:id", component:ListParticipantComponent},
   { path: "", component: AtelierComponent }

];
