import { Component, ViewChild } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { Drawer } from 'primeng/drawer';
import { SideBarComponent } from '../side-bar/side-bar.component';

@Component({
  selector: 'app-responsive-side-bar',
  imports: [
    SideBarComponent,
    ButtonModule,
    DrawerModule,
  ],
  templateUrl: './responsive-side-bar.component.html',
  styleUrl: './responsive-side-bar.component.scss'
})
export class ResponsiveSideBarComponent {
  @ViewChild('drawerRef') drawerRef!: Drawer;

    closeCallback(e: any): void {
        this.drawerRef.close(e);
    }

    visible: boolean = false;

}
