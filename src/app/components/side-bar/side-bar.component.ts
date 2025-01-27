import { Component, ViewChild } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClass } from 'primeng/styleclass';
import { Drawer } from 'primeng/drawer';
import { SideBarLinkComponent } from "./side-bar-link/side-bar-link.component";

@Component({
  selector: 'app-side-bar',
  imports: [
    ButtonModule,
    DrawerModule,
    SideBarLinkComponent
],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  
}
