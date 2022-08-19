import { Car } from "../car/car.interface";

export interface Customer {
    id: number;
    name: string;
    nit: string;
    cellphone: string;
    email: string;
    address: string;
    ownCars: Car[];
}
