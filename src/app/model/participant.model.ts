import { Atelier } from './atelier.model';
export class Participant {

    id:number;
    city: string;
    email: string;
    firstname: string;
    lastName: string;
    phone: string;
    profession:string;
    ateliers:Atelier[];
}
