import { Ipage } from "./page";

export interface Iingredient {
    code?: number;
    description: string;
    price: number;
    isAdditional: boolean;
}

export interface IpageIngredients extends Ipage {
    content: Iingredient[];
}