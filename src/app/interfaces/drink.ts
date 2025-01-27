import { Ipage } from "./page";

export interface Idrink {
    code?: number;
    description: string;
    price: number;
    haveSugar: boolean;
    quantity?: number;
}

export interface IdrinkPage extends Ipage {
    content: Idrink[];
}