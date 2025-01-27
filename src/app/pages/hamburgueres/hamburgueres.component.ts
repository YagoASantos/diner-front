import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { SpeedDialModule } from 'primeng/speeddial';
import { TableModule, TablePageEvent } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { InsertModalComponent } from '../../components/insert-modal/insert-modal.component';
import { MenuItem, MessageService } from 'primeng/api';
import { IngredientsService } from '../../services/ingredients.service';
import { Ihamburger } from '../../interfaces/hamburger';
import { Ifield } from '../../interfaces/field';
import { HamburgerService } from '../../services/hamburger.service';
import { forkJoin } from 'rxjs';
import { Iingredient } from '../../interfaces/ingredient';
import { Ioption } from '../../interfaces/option';

@Component({
  selector: 'app-hamburgueres',
  imports: [
    TableModule,
    ButtonModule,
    TagModule,
    CommonModule,
    ChipModule,
    SpeedDialModule,
    ToastModule,
    InsertModalComponent,
  ],
  templateUrl: './hamburgueres.component.html',
  styleUrl: './hamburgueres.component.scss',
  providers: [MessageService, IngredientsService]
})
export class HamburgueresComponent implements OnInit {

  constructor(
    private hamburguerService: HamburgerService,
    private ingredientsService: IngredientsService,
    private messageService: MessageService
  ) {}

  page: number = 0;
  size: number = 1000;
  totalPages: number = 1;
  hamburgers: Ihamburger[] = [];
  ingredients: Iingredient[] = [];
  description: string  = '';
  items: MenuItem[] = [];
  selectedHamburgers: Ihamburger[] = [];
  insertModalVisible: boolean = false;
  fields: Ifield[] = [];

  public ngOnInit(): void {
    this.getAll();
    this.items = [
      {
        label: 'Excluir',
        icon: 'pi pi-trash',
        command: () => {
          this.delete()
        }
      },
      {
        label: 'Editar',
        icon: 'pi pi-pencil',
        command: () => {
          if (this.selectedHamburgers.length == 0) {
            this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Selecione um registro' });
          } else if (this.selectedHamburgers.length > 1) {
            this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Selecione apenas um registro' });
          } else if (this.selectedHamburgers.length == 1) {
            this.insertModalVisible = true;
          }
        }
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
        }
      }
    ]
  }

  public getAll(): void {
    forkJoin([this.hamburguerService.getAll(this.page, this.size), this.ingredientsService.getAll(0, 1000)]).subscribe({
      next: ([pagebleHamburgers, pagebleIngredients]) => {
        this.hamburgers = pagebleHamburgers.content;
        this.totalPages = pagebleHamburgers.totalPages;
        this.ingredients = pagebleIngredients.content;
        this.createFields();
      },
      error: error => {
        this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Erro ao buscar hamburgueres' });
        console.error(error);
      }
    });
  }

  public createFields(): void {
    this.fields = [
      {
        name: "ingredients",
        type: 'multiSelect',
        placeholder: 'Insira os ingredientes',
        label: 'Ingredientes',
        options: this.getIngredientsOptions()
      },
      {
        name: "price",
        type: 'money',
        placeholder: 'Preencha o preço.',
        label: 'Preço'
      },
      {
        name: "description",
        type: 'textarea',
        placeholder: 'Preencha a descrição',
        label: 'Descrição'
      }
    ]
    console.log(this.fields);
  }

  public getIngredientsOptions(): Ioption[] {
    return this.ingredients.map(ingredient => ({ name: ingredient.description, code: ingredient.code! }));
  }
  
  public save(ev: any) {
    console.log(ev);
    const hamburger: Ihamburger = {
      description: ev.description,
      price: ev.price,
      ingredients: ev.ingredients.map((ingredient: { code: any; }) => ingredient.code)
    }
    console.log(hamburger);
    this.hamburguerService.post(hamburger).subscribe({
      next: () => {
        this.getAll();
        this.insertModalVisible = false;
        this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Registro salvo' });
      },
      error: error => console.log(error)
    });
  }

  public validateFields(body: Ihamburger): boolean {

    return true;
  }

  public delete(): void {
    forkJoin(this.selectedHamburgers.map(hamburguer => this.hamburguerService.delete(hamburguer.code!))).subscribe({
      next: () => {
        this.getAll();
        this.selectedHamburgers = [];
        this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Registro(s) excluidos' });
      },
      error: error => console.log(error)
    });
  }

}
