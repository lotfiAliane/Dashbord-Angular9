import { Participant } from './participant.model';

export class Atelier {

  id:number;
  name:string;
  laboratory:string;
  animator: string;
  places:number;
  reserve:number;
  horaire:string;
  date:string;
  participants:Participant[];



}
