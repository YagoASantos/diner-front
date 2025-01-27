import { Ipage } from "./page";
import { Iclient } from "./client";
import { Ihamburger } from "./hamburger";
import { Idrink } from "./drink";

export interface Iorder {
    code?: number;
    description: string;
    client: Iclient;
    hamburgers: Ihamburger[];
    drinks: Idrink[];
    observations: { message: string }[];
    orderDate: string;
    totalPrice: number;
}

export interface IorderPage extends Ipage {
    content: Iorder[];
}