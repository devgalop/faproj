import { Reparation } from "../reparation/reparation.interface";

export interface Car {
    id:number;
    plaque: string;
    model: number;
    brand: string;
    ownerId: number;
    revisions: Reparation[]
}