import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Popover } from 'primeng/popover';
import { PopoverModule } from 'primeng/popover';
import { TableFilterEvent, TableLazyLoadEvent, TableModule, TablePageEvent } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { IngredientsService } from '../../services/ingredients.service';
import { Iingredient } from '../../interfaces/ingredient';
import { CommonModule } from '@angular/common';
import { ChipModule } from 'primeng/chip';
import { SpeedDialModule } from 'primeng/speeddial';
import { forkJoin } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { InsertModalComponent } from '../../components/insert-modal/insert-modal.component';
import { Ifield } from '../../interfaces/field';

@Component({
  selector: 'app-ingredientes',
  imports: [
    PopoverModule,
    TableModule,
    ButtonModule,
    TagModule,
    CommonModule,
    ChipModule,
    SpeedDialModule,
    ToastModule,
    InsertModalComponent
  ],
  templateUrl: './ingredientes.component.html',
  styleUrl: './ingredientes.component.scss',
  providers: [MessageService, IngredientsService]
})
export class IngredientesComponent {

  page: number = 0;
  size: number = 1000;
  totalPages: number = 1;
  ingredients: Iingredient[] = [];
  description: string = '';
  selectedIngredients: Iingredient[] = [];
  items: MenuItem[] = [];
  insertModalVisible: boolean = false;
  fields: Ifield[] = [
    {
      name: "isAdditional",
      type: 'select',
      placeholder: 'É adicional?',
      label: 'Adicional',
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
      placeholder: 'Preencha a descrição',
      label: 'Descrição'
    },
    {
      name: "price",
      type: 'money',
      placeholder: 'Preencha o preço.',
      label: 'Preço'
    },
    
  ]

  constructor(private ingredientService: IngredientsService, private messageService: MessageService){}

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
          if (this.selectedIngredients.length == 0) {
            this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Selecione um registro' });
          } else if (this.selectedIngredients.length > 1) {
            this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Selecione apenas um registro' });
          } else if (this.selectedIngredients.length == 1) {
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
          if(this.description != '') {
            this.getByDescription();
          } else {
            this.getAll();
          }
        },
      },
    ]
  }

  public getAll() {
    this.ingredientService.getAll(this.page, this.size).subscribe({
      next: pageable => {
        this.ingredients = pageable.content;
        this.totalPages = pageable.totalPages;
      },
      error: error => {
        this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Erro ao buscar registros' });
        console.log(error)
      }
    });
  }

  public getByDescription() {
    this.ingredientService.getByDescription(this.description, this.page, this.size).subscribe({
      next: pageable => {
        this.ingredients = pageable.content;
        this.totalPages = pageable.totalPages;
      },
      error: error => console.log(error)
    });
  }

  public delete() {
    forkJoin(this.selectedIngredients.map(ingredient => this.ingredientService.delete(ingredient.code!))).subscribe({
      next: () => {
        this.getAll();
        this.selectedIngredients = [];
        this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Registro(s) excluidos' });
      },
      error: error => console.log(error)
    });
  }

  public changePage(ev: TablePageEvent) {
      this.page = ev.first;
      this.size = ev.rows;
      if(this.description != '') {
        this.getByDescription();
      } else {
        this.getAll();
      }
  }

  public save(ev: any) {
    const body: Iingredient = {
      isAdditional: ev.isAdditional?.code ?? null,
      description: ev.description,
      price: ev.price
    }

    if (!this.validateFields(body)) {
      return;
    }

    if (ev.code) {
      body.code = ev.code;
      this.ingredientService.patch(body).subscribe({
        next: () => {
          this.getAll();
          this.insertModalVisible = false;
          this.selectedIngredients = [];
          this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Registro atualizado' });
        },
        error: error => console.log(error)
      });
    } else {
      this.ingredientService.post(body).subscribe({
        next: () => {
          this.getAll();
          this.insertModalVisible = false;
          this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Registro salvo' });
        },
        error: error => console.log(error)
      });
    }

  }

  public validateFields(body: Iingredient): boolean {
    if (body.isAdditional == null) {
      this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Campo adicional é obrigatório' });
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

}
