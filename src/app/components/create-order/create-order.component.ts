import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { Ihamburger } from '../../interfaces/hamburger';
import { Idrink } from '../../interfaces/drink';
import { Ioption } from '../../interfaces/option';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { HamburgerService } from '../../services/hamburger.service';
import { DrinkService } from '../../services/drink.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Iorder } from '../../interfaces/order';
import { ClientService } from '../../services/client.service';
import { Iclient } from '../../interfaces/client';

@Component({
  selector: 'app-create-order',
  imports: [CommonModule, DropdownModule, DialogModule, FormsModule, ButtonModule, DatePicker, SelectModule, ToastModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss'
})
export class CreateOrderComponent implements OnInit {

  datetime: string = '';
  hourFormatter: string = '24';
  clients: Iclient[] = [];
  hamburgers: Ihamburger[] = [];
  drinks: Idrink[] = [];
  hamburgersOptions: Ihamburger[] = [];
  drinksOptions: Idrink[] = [];
  clientsOptions: Iclient[] = [];
  hamburgersFields: { name: string; quantity: number }[] = [];
  drinksFields: { name: string; quantity: number }[] = [];
  observationsFields: { name: string; quantity: number }[] = [{
    name: '',
    quantity: 1
  }];
  ingredientsService: any;
  order: Iorder = {
    description: '',
    client: null,
    hamburgers: [],
    drinks: [],
    observations: [],
    orderDate: '',
    totalPrice: 0
  };


  constructor(private hamburguerService: HamburgerService, private drinkService: DrinkService, private messageService: MessageService, private clientService: ClientService) {}

  @Input() visible: boolean = false;
  @Output() visibleEventEmitter = new EventEmitter<boolean>();
  @Output() saveEventEmitter = new EventEmitter<any>();

  ngOnInit(): void {
    this.setHamburguers();
    this.setDrinks();
    this.setClients();
  }

  save() {
    this.saveEventEmitter.emit(this.order);
  }

  handleClientChange(event: any) {
    console.log('Client selected:', event.value);
    this.order.client = event.value;  // Atualize manualmente
  }

  private setClients() {
    this.clientService.getAll(0, 1000).subscribe({
      next: (pageableClients) => {
        console.log(pageableClients.content);
        this.clients = pageableClients.content;
        this.clients.forEach(client => {
          console.log(client);
          this.clientsOptions.push(client)
        });
      },
      error: error => {
        this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Erro ao buscar clientes' });
        console.error(error);
      }
    });
  }

  private setHamburguers() {
    this.hamburguerService.getAll(0, 1000).subscribe({
      next: (pagebleHamburgers) => {
        console.log(pagebleHamburgers.content);
        this.hamburgers = pagebleHamburgers.content;
        this.hamburgers.forEach(hamburger => {
          this.hamburgersOptions.push(hamburger)
        });
      },
      error: error => {
        this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Erro ao buscar hamburgueres' });
        console.error(error);
      }
    });
  }

  private setDrinks() {
    this.drinkService.getAll(0, 1000).subscribe({
      next: (pageableDrink) => {
        console.log(pageableDrink.content);
        this.drinks = pageableDrink.content;
        this.drinks.forEach(drink => {
          this.drinksOptions.push(drink)
        });
      },
      error: error => {
        this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Erro ao buscar clientes' });
        console.error(error);
      }
    });
  }

  addHamburger() {
    this.hamburgersFields.push({ name: '', quantity: 1 });
    this.order.hamburgers.push();
  }

  removeHamburger(index: number) {
    this.hamburgersFields.splice(index, 1);
  }

  // Métodos para manipular bebidas
  addDrink() {
    this.drinksFields.push({ name: '', quantity: 1 });
  }

  removeDrink(index: number) {
    this.drinksFields.splice(index, 1);
  }

  addObservation() {
    this.observationsFields.push({ name: '', quantity: 1 });
    this.order.observations.push();
  }

  removeObservation(index: number) {
    this.observationsFields.splice(index, 1);
  }

  public changeVisible() {
    this.visible = false;
    this.visibleEventEmitter.emit(this.visible);
  }
}

