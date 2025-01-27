import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-bar-link',
  imports: [RouterModule],
  templateUrl: './side-bar-link.component.html',
  styleUrl: './side-bar-link.component.scss'
})
export class SideBarLinkComponent {
  @Input() path: string = "";
  @Input() pageName: string = "";

}
