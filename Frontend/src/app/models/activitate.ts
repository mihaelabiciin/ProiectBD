import { Locatie } from "./locatie";

export class Activitate {
    idActivitate: number = 0;
    nume: string = '';
    pret: number = 0;
    antrenor: boolean | undefined;
    contact: string = '';
    idLocatie: number = 0;
    locatie: Locatie | undefined = undefined;

    constructor(object?: any) {
        this.idActivitate = object.idActivitate;
        this.nume = object.nume;
        this.pret = object.pret;
        this.antrenor = object.antrenor;
        this.contact = object.contact;
        this.idLocatie = object.idLocatie;
        this.locatie = object.locatie;
    }
}
