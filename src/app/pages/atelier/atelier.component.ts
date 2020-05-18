import { Component, OnInit } from "@angular/core";
import { AteliersService } from '../../services/ateliers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Atelier } from '../../model/atelier.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal/modal.component';
import * as $ from 'jquery';
import { DatePipe, Time } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: "app-tables",
  templateUrl: "atelier.component.html"
})
export class AtelierComponent implements OnInit {
  atelierForm: FormGroup
  ately: Atelier;
  selectedDate: Date;
  hour: Date;
  term:string="";
  p:any;
  picker:any="";



  constructor(private datePipe: DatePipe,private router:Router , private atelier: AteliersService, private formBuilder: FormBuilder, public matDialog: MatDialog) { }
  ateliers: any = [];
  numberOfUnreadAlerts: number = 0;
  isSubmitted = false;
  operation: string = '';
  update: boolean = false;
  hide() {
    this.numberOfUnreadAlerts = 1;
    this.atelierForm.reset();
    this.operation = 'Ajout Atelier';

  }

  openModal(atelier: Atelier) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    //dialogConfig.disableClose = true;

    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(result => {
      this.numberOfUnreadAlerts = 0;
      if (result?.event) {
        if (result.event == 'delete') {
          this.deleteAtelier(atelier);
        }

      }
    });
  }
  deleteAtelier(atelier: Atelier) {
    this.atelier.deleteAtelier(atelier).subscribe(data => {

      this.getAteliers();
    });
  }
  ajoutAtelier() {

    this.isSubmitted = true;
    if (this.atelierForm.invalid) {
      return;
    }

    this.ately = this.atelierForm.value;
    this.atelierForm.reset();
    this.isSubmitted = false;
    this.numberOfUnreadAlerts = 0;
    // = '2020-02-19 18:28:00';
    var neddate = this.datePipe.transform(this.ately.date, 'yyyy-MM-dd') + ' ' + this.ately.horaire;

    this.ately.horaire = this.datePipe.transform(neddate, 'yyyy-MM-dd h:mm ');
    if (!this.ately.id) {

      this.postAtelier();
    }
    else {
      this.updateAtelier();
    }
  }

  edit(atelier) {
    console.log(atelier);
    this.operation = 'Modifier atelier';
    this.numberOfUnreadAlerts = 1;
    this.atelierForm.patchValue({
      id: atelier.id,
      name: atelier.name,
      laboratory: atelier.laboratory,
      animator: atelier.animator,
      places: atelier.places,
      reserve: atelier.reserve,
      date: atelier.horaire

    });
    this.ately = atelier;
    this.update = true;

  }
  postAtelier() {
    this.atelier.postAtelier(this.ately).subscribe(data => {

      this.getAteliers();
    });
  }
  updateAtelier() {
    this.atelier.updateAtelier(this.ately).subscribe(data => {

      this.getAteliers();
    });
  }

  afficher(id:number)
  {
    this.router.navigate(['list',id]);

  }
  getAteliers() {
    this.atelier.getAteliers().subscribe(data => {
      this.ateliers = data;

    });
  }
  get formControls() { return this.atelierForm.controls; }
  ngOnInit() {


   if(!window.localStorage.getItem('token'))
   {
    this.router.navigate(['auth']);
    return;
    

   }
   this.getAteliers();
    this.atelierForm = this.formBuilder.group({
      id: '',
      name: ['', Validators.required],
      laboratory: ['', Validators.required],
      animator: ['', Validators.required],
      places: ['', Validators.required],
      reserve: ['', Validators.required],
      horaire: ['', Validators.required],
      date: ['', Validators.required],

    });

  }
}
