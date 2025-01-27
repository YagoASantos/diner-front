import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SpeedDialModule } from 'primeng/speeddial';
import { Iorder } from '../../interfaces/order';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Ifield } from '../../interfaces/field';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { FieldDescribe } from '../../interfaces/field-describe';
import { Ihamburger } from '../../interfaces/hamburger';
import { DescribeModalComponent } from "../../components/describe-modal/describe-modal.component";
import { forkJoin } from 'rxjs';
import { Idrink } from '../../interfaces/drink';
import { Iclient } from '../../interfaces/client';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CreateOrderComponent } from "../../components/create-order/create-order.component";

@Component({
  selector: 'app-pedidos',
  imports: [TableModule, SpeedDialModule, ButtonModule, ToastModule, CommonModule, DescribeModalComponent, DialogModule, FormsModule, CreateOrderComponent],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss',
  providers: [MessageService]

})
export class PedidosComponent implements OnInit {

  page: number = 0;
  size: number = 1000;
  totalPages = 1;
  orders: Iorder[] = [];
  selectedOrders: Iorder[] = [];
  items: MenuItem[] = [];
  insertModalVisible: boolean = false;
  describeModalVisible: boolean = false;
  fields: Ifield[] = [];
  fieldsDescription: FieldDescribe[] = [];
  fieldsDrinks: FieldDescribe[] = [];
  displayModal: boolean = false;
  formFields: { name: string; value: string }[] = [
    { name: '', value: '' }
  ];

  constructor(private messageService: MessageService, private orderService: OrderService) {}

  ngOnInit(): void {
    this.getAll();
    this.items = [
      {
        label: 'Excluir',
        icon: 'pi pi-trash',
        command: () => {
          this.delete();
        },
      },
      {
        label: 'Adicionar',
        icon: 'pi pi-save',
        command: () => {
          this.insertModalVisible = true;
        },
      },
      {
        label: 'Recarregar',
        icon: 'pi pi-refresh',
        command: () => {
          this.getAll();
        },
      },
    ]
  }

  delete() {
    forkJoin(this.selectedOrders.map(order => this.orderService.delete(order.code!))).subscribe({
      next: () => {
        this.getAll();
        this.selectedOrders = [];
        this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Registro(s) excluidos' });
      },
      error: error => console.log(error)
    });
  }

  save(ev: any) {
    const body: Iorder = {
      description: ev.description,
      client: ev.client.code,
      hamburgers: ev.hamburgers.map((hamburger: any) => ({
        code: hamburger.code,
        quantity: hamburger.quantity
      })),
      drinks: ev.drinks.map((drink: any) => ({
        code: drink.code,
        quantity: drink.quantity
      })),
      observations: ev.observations.map((observation: any) => ({
        message: observation.message
      })),
      orderDate: ev.orderDate
    }

    console.log(body);

    if (!this.validateFields(body)) {
      return;
    }

    this.orderService.post(body).subscribe({
      next: () => {
        this.getAll();
        this.insertModalVisible = false;
        this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Registro salvo' });
      },
      error: error => console.log(error)
    });

  }


  validateFields(body: Iorder) {
    if (body.description == null || body.description.trim() == '') {
      this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Campo descrição é obrigatório' });
      return false;
    }

    if (body.client == null) {
      this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Campo cliente é obrigatório' });
      return false;
    }

    if (body.hamburgers == null || body.hamburgers.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Campo hambúrgueres é obrigatório' });
      return false;
    }

    if (body.drinks == null || body.drinks.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Campo bebidas é obrigatório' });
      return false;
    }

    if (body.orderDate == null) {
      this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Campo data do pedido é obrigatório' });
      return false;
    }

    return true;
  }

  getAll() {
  this.orderService.getAll(this.page, this.size).subscribe({
      next: pageable => {
        console.log(pageable.content);
        pageable.content.forEach(content => {
          content.orderDate = new Date(content.orderDate).toLocaleString();
        })
        this.orders = pageable.content;
        this.totalPages = pageable.totalPages;
        this.createFields();
      },
      error: error => {
        this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Erro ao buscar registros' });
        console.log(error)
      }
    });
  }
  createFields() {
    this.fields = [
      {
        name: "description",
        type: 'text',
        placeholder: 'Preencha a descrição.',
        label: 'Descricao'
      },
      {
        name: "client",
        type: 'select',
        placeholder: 'Insira um cliente.',
        label: 'Cliente'
      },
      {
        name: "hamburgers",
        type: 'multiSelect',
        placeholder: 'Escolha os hambúrgueres.',
        label: 'Cep'
      },
      {
        name: "drinks",
        type: 'multiSelect',
        placeholder: 'Preencha o logradouro.',
        label: 'Logradouro'
      },
      {
        name: "number",
        type: 'number',
        placeholder: 'Preencha o número do endereço.',
        label: 'Número'
      },
      {
        name: "complement",
        type: 'text',
        placeholder: 'Preencha o complemento.',
        label: 'Complemento'
      }
    ]
  }

  displayHamburgers(ev: any, order: Iorder) {
    this.selectedOrders = [];
    this.selectedOrders[0] = order;
    this.fieldsDescription = [];
    this.createFieldsHamburgers(order.hamburgers);
    this.describeModalVisible = true;
  }

  displayDrinks(ev: any, order: Iorder) {
    this.selectedOrders = [];
    this.selectedOrders[0] = order;
    this.fieldsDescription = [];
    this.createFieldsDrinks(order.drinks);
    this.describeModalVisible = true;
  }

  displayClients(ev: any, order: Iorder) {
    this.selectedOrders = [];
    this.selectedOrders[0] = order;
    this.fieldsDescription = [];
    this.createFieldsClients(order.client!);
    this.describeModalVisible = true;
  }

  displayObservations(ev: any, order: Iorder) {
    console.log(order);
    this.selectedOrders = [];
    this.selectedOrders[0] = order;
    this.fieldsDescription = [];
    this.createFieldsObservations(order.observations);
    this.describeModalVisible = true;
  }

  createFieldsHamburgers(hamburgers: Ihamburger[]) {
    hamburgers.forEach(hamburger => {
      this.fieldsDescription.push({
        content: hamburger.description,
        labelContent: "Hambúrguer",
        quantity: hamburger.quantity
      })
    })
  }

  createFieldsObservations(observations: { message: string }[]) {
    console.log(observations);
    observations.forEach(observation => {
      this.fieldsDescription.push({
        content: observation.message,
        labelContent: "Observação",
      })
    })
  }

  createFieldsDrinks(drinks: Idrink[]) {
    drinks.forEach(drink => {
      this.fieldsDescription.push({
        content: drink.description,
        labelContent: "Bebida",
        quantity: drink.quantity
      })
    })
  }

  createFieldsClients(client: Iclient) {
    let fields: FieldDescribe[] = [];
      this.fieldsDescription.push({
        content: client.name,
        labelContent: "Nome",
      });
      this.fieldsDescription.push({
        content: client.phone,
        labelContent: "Telefone"
      });
      this.fieldsDescription.push({
        content: client.address?.cep!,
        labelContent: "CEP"
      });
      this.fieldsDescription.push({
        content: client.address?.street!,
        labelContent: "Rua"
      });
      this.fieldsDescription.push({
        content: client.address?.number!,
        labelContent: "Número"
      });
  }
}
