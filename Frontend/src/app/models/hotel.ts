export class Hotel {
    idHotel: number = 0;
    nume: string = "";
    numarStele: number | null = null;
    notaRecenzieHotel: number | null = null;
    adresa: string = "";
    contact: string = "";
    micDejun: boolean = false;
    pretMicDejun: number | undefined;
    idLocatie: number = 0;

    constructor() {
    }
}
