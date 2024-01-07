import { Hotel } from "./hotel";

export class Camera {
    idCamera: number = 0;
    tip: string = "";
    pret: number = 0;
    frigider: boolean = false;
    balcon: boolean = false;
    aerConditionat: boolean = false;
    wifi: boolean = false;
    idHotel: boolean = false;
    hotel?: Hotel;

    constructor(object?: any) {
        this.idCamera = object.idCamera;
        this.tip = object.tip;
        this.pret = object.pret;
        this.frigider = object.frigider;
        this.aerConditionat = object.aerConditionat;
        this.balcon = object.balcon;
        this.wifi = object.wifi;
        this.idHotel = object.idHotel;
        this.hotel = object.hotel;
    }
}
