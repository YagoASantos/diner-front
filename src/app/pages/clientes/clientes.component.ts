import { Component, OnInit } from '@angular/core';
import { Iclient } from '../../interfaces/client';
import { TableModule } from 'primeng/table';
import { SpeedDialModule } from 'primeng/speeddial';
import { MenuItem, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { InsertModalComponent } from '../../components/insert-modal/insert-modal.component';
import { ToastModule } from 'primeng/toast';
import { Ifield } from '../../interfaces/field';
import { ClientService } from '../../services/client.service';
import { forkJoin } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { DescribeModalComponent } from "../../components/describe-modal/describe-modal.component";
import { FieldDescribe } from '../../interfaces/field-describe';

@Component({
  selector: 'app-clientes',
  imports: [TableModule, SpeedDialModule, CommonModule, InsertModalComponent, ToastModule, ButtonModule, DescribeModalComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss',
  providers: [MessageService]
})
export class ClientesComponent implements OnInit {

  page: number = 0;
  size: number = 1000;
  totalPages: number = 1;
  clients: Iclient[] = [];
  selectedClients: Iclient[] = [];
  items: MenuItem[] = [];
  insertModalVisible: boolean = false;
  describeModalVisible: boolean = false;
  fields: Ifield[] = [];
  fieldsAddress: FieldDescribe[] = [];

  constructor(private clientService: ClientService, private messageService: MessageService) {}

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
    forkJoin(this.selectedClients.map(client => this.clientService.delete(client.code!))).subscribe({
            next: () => {
              this.getAll();
              this.selectedClients = [];
              this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Registro(s) excluidos' });
            },
          error: error => console.log(error)
        });
  }

  getAll() {
    this.clientService.getAll(this.page, this.size).subscribe({
      next: pageable => {
        this.clients = pageable.content;
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
        name: "name",
        type: 'text',
        placeholder: 'Preencha o nome do cliente.',
        label: 'Nome'
      },
      {
        name: "phone",
        type: 'phone',
        placeholder: 'Preencha o telefone.',
        label: 'Telefone'
      },
      {
        name: "cep",
        type: 'cep',
        placeholder: 'Preencha o cep.',
        label: 'Cep'
      },
      {
        name: "street",
        type: 'text',
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

  createFieldsAddress() {
    this.fieldsAddress = [
      {
        content: this.selectedClients[0].address!.cep,
        labelContent: "CEP"
      },
      {
        content: this.selectedClients[0].address!.street,
        labelContent: "Logradouro"
      },
      {
        content: this.selectedClients[0].address!.number,
        labelContent: "Número"
      },
      {
        content: this.selectedClients[0].address!.complement,
        labelContent: "Complemento"
      },
    ]
  }


  save(ev: any) {
    const body: Iclient = {
      name: ev.name,
      phone: ev.phone,
      address: {
        cep: ev.cep,
        street: ev.street,
        number: ev.number,
        complement: ev.complement
      }
    } 
    if(!this.validateFields(body)) {
      return;
    }
    this.clientService.post(body).subscribe({
      next: () => {
        this.getAll();
        this.insertModalVisible = false;
        this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Registro salvo' });
      },
      error: error => console.log(error)
    });
  }

  displayAddress(ev: any, client: Iclient) {
    this.selectedClients = [];
    this.selectedClients[0] = client;
    this.createFieldsAddress();
    this.describeModalVisible = true;
  }

  validateFields(body: Iclient) {
    if (body.name == null || body.name.trim() == '') {
      this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Campo nome é obrigatório' });
      return false;
    }

    if (body.phone == null || body.phone.trim() == '') {
      this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Campo telefone é obrigatório' });
      return false;
    }

    if (body.address?.cep == null || body.address?.cep.trim() == '') {
      this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Campo CEP é obrigatório' });
      return false;
    }

    if (body.address.number == null) {
      this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Campo número é obrigatório' });
      return false;
    }

    if (body.address.street == null) {
      this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Campo logradouro é obrigatório' });
      return false;
    }
    return true;
  }
}

