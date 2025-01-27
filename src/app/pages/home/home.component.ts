import { Component } from '@angular/core';
import { CreateOrderComponent } from "../../components/create-order/create-order.component";

@Component({
  selector: 'app-home',
  imports: [CreateOrderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
