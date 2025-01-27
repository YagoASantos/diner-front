import { Ipage } from "./page";
import { Iaddress } from "./address";

export interface Iclient {
    code?: number;
    name: string;
    phone: string;
    address: Iaddress;
}

export interface IclientPage extends Ipage {
    content: Iclient[];
}