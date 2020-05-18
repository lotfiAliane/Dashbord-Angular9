import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";

import { AuthentificationRoutingModule } from './authentification-routing.module';
import { AuthComponent } from './auth/auth.component';


@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AuthentificationRoutingModule,
    FormsModule,ReactiveFormsModule
  ]
})
export class AuthentificationModule { }
