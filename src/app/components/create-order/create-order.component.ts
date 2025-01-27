import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-order',
  imports: [CommonModule, DropdownModule, DialogModule, FormsModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss'
})
export class CreateOrderComponent implements OnInit {
  displayModal = true;

  // Estrutura do pedido
  pedido = {
    description: '',
    client: '',
    hamburgers: [{ hamburger: null, quantity: 1 }],
    drinks: [{ drink: null, quantity: 1 }],
    observations: '',
  };

  // Dados das opções de hambúrgueres e bebidas
  hamburgers: { id: number; name: string }[] = [];
  drinks: { id: number; name: string }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadHamburgers();
  }

  // Carregar hambúrgueres da API
  loadHamburgers() {
    this.hamburgers.push(
      {
        id: 1,
        name: 'x bagunca'
      }
    )
  }

  // Carregar bebidas da API
  loadDrinks() {
    this.http.get<{ id: number; name: string }[]>('/api/drinks').subscribe({
      next: (data) => {
        this.drinks = data;
      },
      error: (err) => {
        console.error('Erro ao carregar bebidas:', err);
      },
    });
  }

  // Adicionar um novo campo de hambúrguer
  addHamburger() {
    this.pedido.hamburgers.push({ hamburger: null, quantity: 1 });
  }

  // Remover um campo de hambúrguer
  removeHamburger(index: number) {
    this.pedido.hamburgers.splice(index, 1);
  }

  // Adicionar um novo campo de bebida
  addDrink() {
    this.pedido.drinks.push({ drink: null, quantity: 1 });
  }

  // Remover um campo de bebida
  removeDrink(index: number) {
    this.pedido.drinks.splice(index, 1);
  }

  // Salvar o pedido (enviar para API ou banco de dados)
  save() {
    console.log(this.pedido);
    // Aqui você pode fazer uma chamada para sua API para salvar o pedido
  }

  // Cancelar e fechar o modal
  cancel() {
    this.displayModal = false;
  }
}

