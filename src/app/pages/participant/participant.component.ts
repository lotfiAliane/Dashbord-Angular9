import { Component, OnInit } from '@angular/core';
import { AteliersService } from '../../services/ateliers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Participant } from '../../model/participant.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal/modal.component';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent implements OnInit {
  participants: any = [];
  participantForm: FormGroup;
  numberOfUnreadAlerts: number = 0;
  operation: string = '';
  update: boolean = false;
  participant: Participant;
  isSubmited: boolean = false;

  constructor(private atelierService: AteliersService,
    private formBuilder: FormBuilder, public matDialog: MatDialog) { }

    openModal(participant: Participant) {
      const dialogConfig = new MatDialogConfig();
      // The user can't close the dialog by clicking outside its body
      //dialogConfig.disableClose = true;
  
      dialogConfig.id = "modal-component";
      dialogConfig.height = "250px";
      dialogConfig.width = "450px";
      // https://material.angular.io/components/dialog/overview
      const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  
      modalDialog.afterClosed().subscribe(result => {
        this.numberOfUnreadAlerts = 0;
        if (result?.event) {
          if (result.event == 'delete') {
          this.deleteParticipant(participant);
          }
  
        }
      });
    }

  getParticipant() {
    this.atelierService.getParticipant().subscribe(data => {


      this.participants = data;
      console.log(this.participants);

    });
  }
  get formControls() { return this.participantForm.controls; }
  ngOnInit(): void {
    this.getParticipant();

    this.participantForm = this.formBuilder.group({
      id: '',
      city: ['', Validators.required],
      email: ['', Validators.required],
      firstname: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      profession: ['', Validators.required]

    });


  }

  show() {
    this.numberOfUnreadAlerts = 1;
    this.operation = 'Ajout Participant';
    this.participantForm.reset();
    document.getElementById("add").scrollIntoView();
  }
  addParticipant(participant: Participant) {
    this.atelierService.postParticipant(participant).subscribe(data => {
     
      this.getParticipant();
    });

  }
  edtiPaticipant(participant: Participant) {
    this.atelierService.editParticipant(participant).subscribe(data => {
      
     
      this.getParticipant();
      
    });
  }
  ajoutParticipant() {
    this.isSubmited = true;
    if (this.participantForm.invalid) {
      return;
    }
    this.participant = this.participantForm.value;

    if (!this.participant.id) {
      this.addParticipant(this.participant);
    }
    else {
      this.edtiPaticipant(this.participant);
    }
  }
  deleteParticipant(participant: Participant)
  {
    this.atelierService.deleteParicipant(participant).subscribe(data => {

      this.getParticipant();
    });
  }

  edit(participant) {
    this.numberOfUnreadAlerts = 1;
   
    this.operation = 'Modifier atelier';
    this.numberOfUnreadAlerts = 1;
    this.participantForm.patchValue({
      id: participant.id,
      city: participant.city,
      email: participant.email,
      firstname: participant.firstname,
      lastName: participant.lastName,
      phone: participant.phone,
      profession: participant.profession

    });
    this.participant = participant;
    this.update = true;
    document.getElementById("add").scrollIntoView();
  


  }

}
