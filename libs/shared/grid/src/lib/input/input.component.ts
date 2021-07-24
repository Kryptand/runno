import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'runno-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements ICellEditorAngularComp {
  @ViewChild('control') control: any;
  private params: any;
  public inputType = 'text';
  private previousValue = null;
  public inputControl = new FormControl();

  agInit(params: any): void {
    this.params = params;
    if (this.params.value) {
      this.previousValue = this.params.value;
      this.inputControl.patchValue(this.params.value);
    }
    if (this.params.type) {
      this.inputType = this.params.type;
    }
    if (this.params.validators) {
      this.inputControl.setValidators(this.params.validators);
    }
  }

  getValue() {
    return this.inputControl.valid
      ? this.inputControl.value
      : this.previousValue;
  }

  isPopup(): boolean {
    return false;
  }
}
