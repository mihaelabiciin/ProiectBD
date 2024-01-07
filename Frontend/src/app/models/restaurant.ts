import { Locatie } from "./locatie";

export class Restaurant {
    idRestaurant: number = 0;
    nume: string = '';
    notaRecenzie: number = 0;
    adresa: string = '';
    contact: string = '';
    specificRestaurant: string = '';
    idLocatie: number = 0;
    pret: number = 0;
    locatie: Locatie | undefined = undefined;

    constructor(object?: any) {
        this.idRestaurant = object.idRestaurant;
        this.nume = object.nume;
        this.notaRecenzie = object.notaRecenzie;
        this.adresa = object.adresa;
        this.contact = object.contact;
        this.pret = object.pret;
        this.specificRestaurant = object.specificRestaurant;
        this.idLocatie = object.idLocatie;
        this.locatie = object.locatie;
    }
}