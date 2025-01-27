import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Ifield } from '../../interfaces/field';
import { CommonModule } from '@angular/common';
import { FieldDescribe } from '../../interfaces/field-describe';

@Component({
  selector: 'app-describe-modal',
  imports: [DialogModule, CommonModule],
  templateUrl: './describe-modal.component.html',
  styleUrl: './describe-modal.component.scss'
})
export class DescribeModalComponent implements OnInit{
  @Input() visible: boolean = false;
  @Input() title: string = '';
  @Input() fields: FieldDescribe[] = [];
  @Output() visibleEventEmitter = new EventEmitter<boolean>();

  ngOnInit(): void {
    console.log(this.fields);
  }

  public changeVisible() {
    this.visible = false;
    this.visibleEventEmitter.emit(this.visible);
  }

}
