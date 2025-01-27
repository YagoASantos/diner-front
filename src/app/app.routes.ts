import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { HamburgueresComponent } from './pages/hamburgueres/hamburgueres.component';
import { BebidasComponent } from './pages/bebidas/bebidas.component';
import { IngredientesComponent } from './pages/ingredientes/ingredientes.component';
import { ClientesComponent } from './pages/clientes/clientes.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'pedidos',
        component: PedidosComponent
    },
    {
        path: 'hamburgueres',
        component: HamburgueresComponent
    },
    {
        path: 'bebidas',
        component: BebidasComponent
    },
    {
        path: 'ingredientes',
        component: IngredientesComponent
    },
    {
        path: 'clientes',
        component: ClientesComponent
    }
];
