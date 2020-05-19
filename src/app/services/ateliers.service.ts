import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Atelier } from '../model/atelier.model';
import { Participant } from '../model/participant.model';
import { Observable, throwError, of} from 'rxjs';
import { map } from 'rxjs/operators'



@Injectable({
  providedIn: 'root'
})
export class AteliersService {

  constructor(private httpClient: HttpClient) { }

  private url ='https://event.ooneclick.com/api/';


  login(identifiant:any){
      return this.httpClient.post(this.url+'login',identifiant);
  }
    getAteliers():Observable<any>
  {
    console.log('on est la');
      return this.httpClient.get<Atelier[]>(this.url+'Ateliers');
  }

  getParticipant()
  {
    return this.httpClient.get(this.url+'Participants');
  }
  getParticipantByNum(num:any)
  {
    let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json');
    return this.httpClient.get(this.url+'Participant/'+num,{headers: headers})
    .pipe(
      map((data: Participant) => {
        return data;
      }));
  }
  postParticipant(particpant:Participant)
  {

    return this.httpClient.post(this.url+'Participants',particpant);
  }

  editParticipant(participant:Participant)
  {
   return  this.httpClient.put(this.url+'Participants/'+participant.id,participant);
  }

  deleteParicipant(participant:Participant)
  {
    return this.httpClient.delete(this.url+'Participants/'+participant.id);
  }

  postAtelier(atelier:Atelier)
  {
    return  this.httpClient.post(this.url+'Ateliers',atelier);
  }
  updateAtelier(atelier:Atelier)
  {
    return this.httpClient.put(this.url+'Ateliers/'+atelier.id,atelier);
  }
  deleteAtelier(atelier: Atelier){
    return this.httpClient.delete(this.url+'Ateliers/'+atelier.id);
  }
  getAtelierById(id:number){
    
    return this.httpClient.get<Atelier>(this.url+'Ateliers/'+id);
  }

  ajoutPaticipantAteliet(participant:Participant,listAtelier:any)
  {
    return this.httpClient.post(this.url+'Participant/inscription/'+participant.id,listAtelier);
  }
}
