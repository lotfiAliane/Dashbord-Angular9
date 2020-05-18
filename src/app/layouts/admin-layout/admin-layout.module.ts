import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { TableauComponent } from "../../pages/tableau/tableau.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { AtelierComponent } from "../../pages/atelier/atelier.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
//import { AteliersService } from '../../services/ateliers';
import { AteliersService } from '../../services/ateliers.service';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { ParticipantComponent } from '../../pages/participant/participant.component';
import { DatePipe } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent as ModalComponent } from '../../pages/modal/modal/modal.component';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ListParticipantComponent } from '../../pages/list-participant/list-participant.component';



// import { RtlComponent } from "../../pages/rtl/rtl.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    HttpClientModule,
    NgxPaginationModule,
    MatDatepickerModule,
    Ng2SearchPipeModule,
    NgxMaterialTimepickerModule,
    //BrowserAnimationsModule,
    BsDatepickerModule,
    DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule,
    NgbModule,
   MatButtonModule,
   MatDialogModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    AtelierComponent,
    TableauComponent,
    TypographyComponent,
    ListParticipantComponent,
    NotificationsComponent,
    ParticipantComponent,
    MapComponent,


    // RtlComponent
  ],
  providers: [DatePipe],
  
   entryComponents: [ModalComponent]
})
export class AdminLayoutModule {}
