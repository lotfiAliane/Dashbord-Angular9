import { Component, OnInit } from "@angular/core";
import { AteliersService } from '../../services/ateliers.service';
import { Atelier } from '../../model/atelier.model';
import { Participant } from '../../model/participant.model';
import { Router } from '@angular/router';
@Component({
  selector: "app-icons",
  templateUrl: "tableau.component.html"
})
export class TableauComponent implements OnInit {

  ateliers: Atelier[] = [];
  listAteliers: Atelier[] = [];
  participant: Participant;
  m:number=5;
  term:string="";
  p:any;


  constructor(private atelierService: AteliersService,private router: Router) { }

  
  getAtelier()
  {
    this.atelierService.getAteliers().subscribe((res: any) => {
      this.ateliers = res.ateliers;
      console.log(this.ateliers);
    }, err => {
      console.log(err);
    },()=>{console.log('finished');}
    );
  }
  
  ngOnInit() {
  
    if(!window.localStorage.getItem('token'))
    {
      this.router.navigate(['auth']);
      return;
    }

   this.getAtelier();
  
   


  }

  keyUpFunction(event) {
    if (event.keyCode == 13) {


      this.atelierService.getParticipantByNum(event.target.value).subscribe((data: any) => {
        event.target.value='';
        this.participant = data.participant;
        // event.target.value=this.participant.firstname;
        console.log(this.participant);
        
      },err=>{console.log(err);},
      ()=>{
        this.viderTableau();
        this.participant.ateliers.forEach(atelier => {

          this.listAteliers.push(atelier);
          document.getElementById('' + atelier.id).style.backgroundColor = 'lightgreen';
          console.log(this.listAteliers);
        });
      }
      );
    } else {
    }
  }
  viderTableau() {
    this.listAteliers.forEach(atelier => {

      document.getElementById('' + atelier.id).style.backgroundColor = '#11ffee00';

    });
    this.listAteliers = [];
   
  }

  inscriptionAtelier(atel: Atelier) {
    if(this.participant){
    var m = this.listAteliers.find(atelier => atelier.id === atel.id);

    if (!m) {



      var exist = this.listAteliers.find(atelier => atelier.horaire === atel.horaire);
      if (!exist) {
        if (atel.reserve > 0) {

          this.listAteliers.push(atel);
          document.getElementById('' + atel.id).style.backgroundColor = 'lightgreen';

        }
        else
        {
          alert("Plus de place disponible meme pas en réserve ");
        }
      }
      else {
        alert("Impossible d'ajouter deux ateliers qui aurons lieu au meme temps ");
      }

      console.log(this.listAteliers);
    }
    else {
      console.log('je suis m' + m);
      const index = this.listAteliers.findIndex(atelier => atelier.id === atel.id);

      console.log(this.listAteliers);
      document.getElementById('' + atel.id).style.backgroundColor = '#11ffee00';
      this.listAteliers.splice(index, 1);
      console.log(this.listAteliers);
      console.log('kayen deja');
    }
  }
  else
  {
    alert('merci de scanner le code à barre du Participant');
  }
  }

  validation() {
    if(!this.participant){
      alert('merci de sélectionée un participant');
    }
    else{
    this.atelierService.ajoutPaticipantAteliet(this.participant, this.listAteliers).subscribe(data => {
      console.log(data);
      this.getAtelier();
      this.viderTableau();
      delete this.participant;
    });
  }
  }
}
