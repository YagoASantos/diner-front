import { Ipage } from "./page";
import { Iingredient } from "./ingredient";

export interface Ihamburger {
    code?: number;
    description?: string;
    price?: number;
    quantity?: number,
    ingredients?: number[] | Iingredient[];
}

export interface IhamburgerPage extends Ipage {
    content: Ihamburger[];
}