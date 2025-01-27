import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Ifield } from '../../interfaces/field';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { Iingredient } from '../../interfaces/ingredient';
import { Ihamburger } from '../../interfaces/hamburger';
import { MultiSelectModule } from 'primeng/multiselect';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-insert-modal',
  imports: [
    DialogModule,
    ButtonModule,
    CommonModule,
    SelectModule,
    InputTextModule,
    FormsModule,
    InputNumberModule,
    MultiSelectModule,
    TextareaModule
  ],
  templateUrl: './insert-modal.component.html',
  styleUrl: './insert-modal.component.scss'
})
export class InsertModalComponent implements OnInit {
  @Input() title: string = '';
  @Input() visible: boolean = false;
  @Input() fields: Ifield[] = [];
  @Input() updateObject: Iingredient | Ihamburger | null = null;
  @Output() visibleEventEmitter = new EventEmitter<boolean>();
  @Output() saveEventEmitter = new EventEmitter<any>();

  formData: { [key: string]: any } = {};

  public ngOnInit(): void {
    if (this.updateObject) {
      this.fields.forEach((field) => {
        const fieldName = field.name as keyof (Iingredient | Ihamburger);
        if (this.updateObject && this.updateObject[fieldName] !== undefined) {
          this.formData[field.name] = this.updateObject[fieldName];
        }
      });
      this.formData['code'] = this.updateObject.code;
    }
  }

  public changeVisible() {
    this.visible = false;
    this.visibleEventEmitter.emit(this.visible);
  }

  public save() {
    this.saveEventEmitter.emit(this.formData);
  }
}