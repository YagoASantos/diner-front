import { Component, OnInit } from '@angular/core';
import { ChipModule } from 'primeng/chip';
import { SpeedDial } from 'primeng/speeddial';
import { TableModule } from 'primeng/table';
import { InsertModalComponent } from '../../components/insert-modal/insert-modal.component';
import { ToastModule } from 'primeng/toast';
import { forkJoin } from 'rxjs';
import { Idrink } from '../../interfaces/drink';
import { MenuItem, MessageService } from 'primeng/api';
import { Ifield } from '../../interfaces/field';
import { DrinkService } from '../../services/drink.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bebidas',
  imports: [TableModule, SpeedDial, ChipModule, InsertModalComponent, ToastModule, CommonModule],
  templateUrl: './bebidas.component.html',
  styleUrl: './bebidas.component.scss',
  providers: [MessageService]
})
export class BebidasComponent implements OnInit{

  constructor(private messageService: MessageService, private drinkService: DrinkService){}
 
  page: number = 0;
  size: number = 1000;
  totalPages: number = 1;
  drinks: Idrink[] = [];
  selectedDrinks: Idrink[] = [];
  description = '';
  items: MenuItem[] = [];
  insertModalVisible = false;
  fields: Ifield[] = [];

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
        label: 'Atualizar',
        icon: 'pi pi-pencil',
        command: () => {
          if (this.selectedDrinks.length == 0) {
            this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Selecione um registro' });
          } else if (this.selectedDrinks.length > 1) {
            this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Selecione apenas um registro' });
          } else if (this.selectedDrinks.length == 1) {
            this.insertModalVisible = true;
          }
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
          this.getAll()
        },
      },
    ]
  }

  public getAll() {
    this.drinkService.getAll(this.page, this.size).subscribe({
      next: pageable => {
        this.drinks = pageable.content;
        this.totalPages = pageable.totalPages;
        this.createFields();
      },
      error: error => {
        this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Erro ao buscar registros' });
        console.log(error)
      }
    });
  }

  private createFields(): void {
    this.fields = [
      {
        name: "haveSugar",
        type: 'select',
        placeholder: 'Contém açúcar?',
        label: 'Açucar',
        options: [
          {
            code: true,
            name: 'Sim'
          },
          {
            code: false,
            name: 'Não'
          }
        ]
      },
      {
        name: "description",
        type: 'text',
        placeholder: 'Preencha a descrição.',
        label: 'Descrição'
      },
      {
        name: "price",
        type: 'money',
        placeholder: 'Preencha o preço.',
        label: 'Preço'
      },
    ]
  }

  public save(ev: any) {
    const body: Idrink = {
      haveSugar: ev.haveSugar?.code ?? null,
      description: ev.description,
      price: ev.price
    }  

    if(!this.validateFields(body)) {
      return;
    }

    if (ev.code) {
      body.code = ev.code;
      this.drinkService.patch(body).subscribe({
        next: () => {
          this.getAll();
          this.insertModalVisible = false;
          this.selectedDrinks = [];
          this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Registro atualizado' });
        },
        error: error => console.log(error)
      });
    } else {
      this.drinkService.post(body).subscribe({
        next: () => {
          this.getAll();
          this.insertModalVisible = false;
          this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Registro salvo' });
        },
        error: error => console.log(error)
      });
    }
  }

  validateFields(body: Idrink) {
    if (body.haveSugar == null) {
      this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Campo contém açúcar é obrigatório' });
      return false;
    }

    if (body.description == null || body.description.trim() == '') {
      this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Campo descrição é obrigatório' });
      return false;
    }

    if (body.price == null) {
      this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Campo preço é obrigatório' });
      return false;
    }
    return true;
  }

  public delete() {
    forkJoin(this.selectedDrinks.map(drink => this.drinkService.delete(drink.code!))).subscribe({
        next: () => {
          this.getAll();
          this.selectedDrinks = [];
          this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Registro(s) excluidos' });
        },
      error: error => console.log(error)
    });
  }

}
