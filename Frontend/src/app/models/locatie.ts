export class Locatie {
    id: number = 0;
    nume: string = "";
    descriere: string | null = null;

    constructor(nume: string, descriere: string | null) {
        this.nume = nume;
        this.descriere = descriere;
    }
}
