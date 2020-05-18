import { Component, OnInit } from '@angular/core';
import { AteliersService } from '../../services/ateliers.service';
import { Atelier } from '../../model/atelier.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Participant } from 'src/app/model/participant.model';

@Component({
  selector: 'app-list-participant',
  templateUrl: './list-participant.component.html',
  styleUrls: ['./list-participant.component.scss']
})
export class ListParticipantComponent implements OnInit {
  atelier:Atelier;
  id:number;
  participants:Participant[];

  constructor(private atelierService: AteliersService,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {

    if(!window.localStorage.getItem('token')){
      this.router.navigate(['auth']);
      return;
    }
    this.route.params.subscribe(params => {
      
      this.id=params['id'];
      
      this.getAtelier(this.id);
      
    });
  }
  getAtelier(id:number)
  {
    this.atelierService.getAtelierById(id).subscribe((data:any) =>{
    
      this.atelier=data.atelier;
      this.participants=this.atelier.participants;
    });
  }

}
